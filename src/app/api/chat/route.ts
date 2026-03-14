import { openai } from "@ai-sdk/openai";
import { generateText, tool, stepCountIs } from "ai";
import { z } from "zod";
import products from "@/data/products.json";

export const maxDuration = 30;

const productCatalog = products
  .map(
    (p) =>
      `ID:${p.id} | ${p.name} | Category: ${p.category} | Price: $${p.price} | Discount: $${p.discountPrice} | Rating: ${p.rating}/5 (${p.reviewCount} reviews) | Stock: ${p.stock} | Sizes: ${p.sizes.join(", ")} | BestSeller: ${p.isBestSeller} | Trending: ${p.isTrending}`
  )
  .join("\n");

const systemPrompt = `You are Freshly's shopping assistant for an online grocery store. You help users find products, compare prices, and manage their cart and wishlist.

Here is the complete product catalog:
${productCatalog}

Rules:
- Be friendly, concise, and helpful
- When users ask about products, search the catalog and give specific answers with prices
- When users want to add items to cart or wishlist, use the appropriate tool
- Always mention the discount price as the current price
- If a user asks for the cheapest/lowest price item in a category, find it from the catalog
- Categories: vegetables, desserts, drinks-and-beverages, fresh-fruits, fish-and-meat, pets-and-animals
- Keep responses short and to the point
- When adding to cart/wishlist, confirm what was added with the product name and price
- You can call multiple tools in one response if needed
- IMPORTANT: When a user says "add 2 bananas" or "add 5 broccoli", use the quantity parameter in addToCart. Do NOT call addToCart multiple times for the same product.
- When a user asks to remove items, use removeFromCart or removeFromWishlist tools
- When a user asks what's in their cart or wishlist, use getCart or getWishlist tools
- Do NOT call the same tool with the same productId more than once per request`;

export async function POST(req: Request) {
  try {
    const { messages, cartState, wishlistState } = await req.json();

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      stopWhen: stepCountIs(5),
      tools: {
        addToCart: tool({
          description: "Add a product to the user's shopping cart with a specified quantity",
          inputSchema: z.object({
            productId: z.number().describe("The product ID to add to cart"),
            productName: z.string().describe("The product name for confirmation"),
            quantity: z.number().min(1).default(1).describe("How many to add (e.g. 2 for 'add 2 bananas')"),
          }),
          execute: async ({ productId, productName, quantity }) => {
            return { action: "addToCart", productId, productName, quantity: quantity || 1 };
          },
        }),
        removeFromCart: tool({
          description: "Remove a product from the user's shopping cart. Reduces quantity by the specified amount, or removes entirely.",
          inputSchema: z.object({
            productId: z.number().describe("The product ID to remove from cart"),
            productName: z.string().describe("The product name for confirmation"),
            quantity: z.number().min(1).default(1).describe("How many to remove. Use a large number like 999 to remove all."),
            removeAll: z.boolean().default(false).describe("Set to true to remove the item entirely regardless of quantity"),
          }),
          execute: async ({ productId, productName, quantity, removeAll }) => {
            return { action: "removeFromCart", productId, productName, quantity: quantity || 1, removeAll: removeAll || false };
          },
        }),
        addToWishlist: tool({
          description: "Add a product to the user's wishlist",
          inputSchema: z.object({
            productId: z.number().describe("The product ID to add to wishlist"),
            productName: z.string().describe("The product name for confirmation"),
          }),
          execute: async ({ productId, productName }) => {
            return { action: "addToWishlist", productId, productName };
          },
        }),
        removeFromWishlist: tool({
          description: "Remove a product from the user's wishlist",
          inputSchema: z.object({
            productId: z.number().describe("The product ID to remove from wishlist"),
            productName: z.string().describe("The product name for confirmation"),
          }),
          execute: async ({ productId, productName }) => {
            return { action: "removeFromWishlist", productId, productName };
          },
        }),
        getCart: tool({
          description: "Get the current contents of the user's shopping cart with product names, quantities, and prices",
          inputSchema: z.object({}),
          execute: async () => {
            const cartItems = (cartState || []).map((item: { id: number; quantity: number }) => {
              const product = products.find((p) => p.id === item.id);
              return product
                ? { id: product.id, name: product.name, quantity: item.quantity, price: product.discountPrice, total: +(product.discountPrice * item.quantity).toFixed(2) }
                : { id: item.id, name: "Unknown", quantity: item.quantity, price: 0, total: 0 };
            });
            const totalItems = cartItems.reduce((sum: number, i: { quantity: number }) => sum + i.quantity, 0);
            const totalPrice = cartItems.reduce((sum: number, i: { total: number }) => sum + i.total, 0);
            return { items: cartItems, totalItems, totalPrice: +totalPrice.toFixed(2) };
          },
        }),
        getWishlist: tool({
          description: "Get the current contents of the user's wishlist with product names and prices",
          inputSchema: z.object({}),
          execute: async () => {
            const wishlistItems = (wishlistState || []).map((id: number) => {
              const product = products.find((p) => p.id === id);
              return product
                ? { id: product.id, name: product.name, price: product.discountPrice }
                : { id, name: "Unknown", price: 0 };
            });
            return { items: wishlistItems, totalItems: wishlistItems.length };
          },
        }),
        searchProducts: tool({
          description: "Search products by name, category, or keyword",
          inputSchema: z.object({
            query: z.string().describe("Search query - product name, category, or keyword"),
          }),
          execute: async ({ query }) => {
            const q = query.toLowerCase();
            const words = q.split(/\s+/);
            const matches = products.filter((p) => {
              const text = `${p.name} ${p.category} ${p.description}`.toLowerCase();
              return words.some((w: string) => {
                return text.split(/\s+/).some((tw: string) => tw.includes(w) || w.includes(tw));
              });
            });
            return matches.map((p) => ({
              id: p.id,
              name: p.name,
              category: p.category,
              price: p.discountPrice,
              originalPrice: p.price,
              rating: p.rating,
              stock: p.stock,
            }));
          },
        }),
      },
    });

    // Collect all actions from tool results across all steps, deduplicated by action+productId
    const actionMap = new Map<string, { type: string; productId: number; productName: string; quantity?: number; removeAll?: boolean }>();
    for (const step of result.steps) {
      for (const tr of step.toolResults) {
        const res = tr.output as { action?: string; productId?: number; productName?: string; quantity?: number; removeAll?: boolean } | undefined;
        if (res && res.action) {
          const validActions = ["addToCart", "removeFromCart", "addToWishlist", "removeFromWishlist"];
          if (validActions.includes(res.action)) {
            const key = `${res.action}-${res.productId}`;
            if (!actionMap.has(key)) {
              actionMap.set(key, {
                type: res.action,
                productId: res.productId!,
                productName: res.productName!,
                quantity: res.quantity,
                removeAll: res.removeAll,
              });
            }
          }
        }
      }
    }

    return Response.json({ reply: result.text, actions: Array.from(actionMap.values()) });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Something went wrong";
    return Response.json(
      { reply: `Sorry, I encountered an error: ${message}`, actions: [] },
      { status: 500 }
    );
  }
}
