"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import toast from "react-hot-toast";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: number[];
  addToCart: (id: number, name?: string) => void;
  addToCartWithQty: (id: number, quantity: number, name?: string) => void;
  removeFromCart: (id: number) => void;
  removeFromCartByQty: (id: number, quantity: number, name?: string) => void;
  removeFromCartFull: (id: number, name?: string) => void;
  getCartCount: () => number;
  getItemQty: (id: number) => number;
  toggleWishlist: (id: number, name?: string) => void;
  addToWishlistOnly: (id: number, name?: string) => void;
  removeFromWishlist: (id: number, name?: string) => void;
  isWishlisted: (id: number) => boolean;
  getWishlistCount: () => number;
  resetAll: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const addToCart = useCallback((id: number, name?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        const newQty = existing.quantity + 1;
        setTimeout(() => toast.success(`${name || "Item"} quantity: ${newQty}`, { id: `cart-${id}` }), 0);
        return prev.map((item) => item.id === id ? { ...item, quantity: newQty } : item);
      }
      setTimeout(() => toast.success(`${name || "Item"} added to cart`, { id: `cart-${id}` }), 0);
      return [...prev, { id, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const addToCartWithQty = useCallback((id: number, quantity: number, name?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        setTimeout(() => toast.success(`${name || "Item"} quantity: ${newQty}`, { id: `cart-${id}` }), 0);
        return prev.map((item) => item.id === id ? { ...item, quantity: newQty } : item);
      }
      setTimeout(() => toast.success(`${name || "Item"} x${quantity} added to cart`, { id: `cart-${id}` }), 0);
      return [...prev, { id, quantity }];
    });
  }, []);

  const removeFromCartByQty = useCallback((id: number, quantity: number, name?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (!existing) return prev;
      const newQty = existing.quantity - quantity;
      if (newQty <= 0) {
        setTimeout(() => toast(`${name || "Item"} removed from cart`, { id: `cart-${id}` }), 0);
        return prev.filter((item) => item.id !== id);
      }
      setTimeout(() => toast(`${name || "Item"} quantity: ${newQty}`, { id: `cart-${id}` }), 0);
      return prev.map((item) => item.id === id ? { ...item, quantity: newQty } : item);
    });
  }, []);

  const removeFromCartFull = useCallback((id: number, name?: string) => {
    setCart((prev) => {
      if (!prev.find((item) => item.id === id)) return prev;
      setTimeout(() => toast(`${name || "Item"} removed from cart`, { id: `cart-${id}` }), 0);
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const getCartCount = useCallback(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const getItemQty = useCallback((id: number) => cart.find((item) => item.id === id)?.quantity || 0, [cart]);

  const addToWishlistOnly = useCallback((id: number, name?: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) return prev;
      setTimeout(() => toast.success(`${name || "Item"} wishlisted`, { id: `wish-${id}` }), 0);
      return [...prev, id];
    });
  }, []);

  const removeFromWishlist = useCallback((id: number, name?: string) => {
    setWishlist((prev) => {
      if (!prev.includes(id)) return prev;
      setTimeout(() => toast(`${name || "Item"} removed from wishlist`, { id: `wish-${id}` }), 0);
      return prev.filter((x) => x !== id);
    });
  }, []);

  const toggleWishlist = useCallback((id: number, name?: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        setTimeout(() => toast(`${name || "Item"} removed from wishlist`, { id: `wish-${id}` }), 0);
        return prev.filter((x) => x !== id);
      }
      setTimeout(() => toast.success(`${name || "Item"} wishlisted`, { id: `wish-${id}` }), 0);
      return [...prev, id];
    });
  }, []);

  const isWishlisted = useCallback((id: number) => wishlist.includes(id), [wishlist]);
  const getWishlistCount = useCallback(() => wishlist.length, [wishlist]);

  const resetAll = useCallback(() => {
    setCart([]);
    setWishlist([]);
    setTimeout(() => toast("Cart & Wishlist cleared", { id: "reset" }), 0);
  }, []);

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, addToCartWithQty, removeFromCart, removeFromCartByQty, removeFromCartFull, getCartCount, getItemQty, toggleWishlist, addToWishlistOnly, removeFromWishlist, isWishlisted, getWishlistCount, resetAll }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
