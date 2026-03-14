"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useCart } from "@/context/CartContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" /><rect x="2" y="8" width="20" height="12" rx="2" />
    <circle cx="8" cy="14" r="1.5" fill="white" /><circle cx="16" cy="14" r="1.5" fill="white" />
    <path d="M9 18h6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToCart, addToCartWithQty, addToWishlistOnly, removeFromWishlist, removeFromCartByQty, removeFromCartFull, cart, wishlist } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          cartState: cart,
          wishlistState: wishlist,
        }),
      });

      const data = await res.json();

      // Execute any cart/wishlist actions
      if (data.actions && Array.isArray(data.actions)) {
        for (const action of data.actions) {
          if (action.type === "addToCart") {
            const qty = action.quantity || 1;
            if (qty === 1) {
              addToCart(action.productId, action.productName);
            } else {
              addToCartWithQty(action.productId, qty, action.productName);
            }
          } else if (action.type === "removeFromCart") {
            if (action.removeAll) {
              removeFromCartFull(action.productId, action.productName);
            } else {
              removeFromCartByQty(action.productId, action.quantity || 1, action.productName);
            }
          } else if (action.type === "addToWishlist") {
            addToWishlistOnly(action.productId, action.productName);
          } else if (action.type === "removeFromWishlist") {
            removeFromWishlist(action.productId, action.productName);
          }
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "Sorry, I could not process that.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Open chat" style={{
          position: "fixed", bottom: 24, right: 24, width: 56, height: 56,
          borderRadius: "50%", background: "#634C9F", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(99,76,159,0.4)", zIndex: 1000,
        }}>
          <BotIcon />
        </button>
      )}

      {open && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, width: 380, height: 520,
          background: "#fff", borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          display: "flex", flexDirection: "column", zIndex: 1000, overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            background: "#634C9F", padding: "14px 18px",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <BotIcon />
              <div>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>Freshly Assistant</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Ask me about products, prices, cart</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{
              background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4, display: "flex",
            }}>
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: 16,
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            {messages.length === 0 && (
              <div style={{ textAlign: "center", color: "#999", fontSize: 13, marginTop: 40 }}>
                <p style={{ margin: "0 0 4px", fontWeight: 500, color: "#666" }}>Hi, welcome to Freshly</p>
                <p style={{ margin: 0 }}>Ask me anything about our products</p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px",
                  borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: m.role === "user" ? "#634C9F" : "#f0f0f0",
                  color: m.role === "user" ? "#fff" : "#333",
                  fontSize: 13, lineHeight: 1.5, whiteSpace: m.role === "user" ? "pre-wrap" : "normal", wordBreak: "break-word",
                }}>
                  {m.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p style={{ margin: "0 0 8px" }}>{children}</p>,
                        ul: ({ children }) => <ul style={{ margin: "4px 0", paddingLeft: 18, listStyleType: "disc" }}>{children}</ul>,
                        ol: ({ children }) => <ol style={{ margin: "4px 0", paddingLeft: 18, listStyleType: "decimal" }}>{children}</ol>,
                        li: ({ children }) => <li style={{ marginBottom: 2, display: "list-item" }}>{children}</li>,
                        strong: ({ children }) => <strong style={{ fontWeight: 600 }}>{children}</strong>,
                        em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
                        h1: ({ children }) => <h1 style={{ fontSize: 18, fontWeight: 700, margin: "8px 0 4px" }}>{children}</h1>,
                        h2: ({ children }) => <h2 style={{ fontSize: 16, fontWeight: 700, margin: "8px 0 4px" }}>{children}</h2>,
                        h3: ({ children }) => <h3 style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 4px" }}>{children}</h3>,
                        a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "#634C9F", textDecoration: "underline" }}>
                            {children}
                          </a>
                        ),
                        img: ({ src, alt }) => (
                          <img src={src} alt={alt || ""} style={{ maxWidth: "100%", borderRadius: 8, margin: "6px 0" }} />
                        ),
                        blockquote: ({ children }) => (
                          <blockquote style={{ borderLeft: "3px solid #634C9F", paddingLeft: 10, margin: "6px 0", color: "#666", fontStyle: "italic" }}>
                            {children}
                          </blockquote>
                        ),
                        code: ({ children }) => (
                          <code style={{ background: "#e8e8e8", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>
                            {children}
                          </code>
                        ),
                        hr: () => <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "8px 0" }} />,
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "10px 14px", borderRadius: "14px 14px 14px 4px",
                  background: "#f0f0f0", color: "#999", fontSize: 13,
                }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 16px", borderTop: "1px solid #eee", flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products..."
              style={{
                flex: 1, border: "1px solid #e0e0e0", borderRadius: 24,
                padding: "10px 16px", fontSize: 13, outline: "none", background: "#fafafa",
              }}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send message" style={{
              width: 36, height: 36, borderRadius: "50%",
              background: input.trim() ? "#634C9F" : "#ccc",
              border: "none", cursor: input.trim() ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", flexShrink: 0,
            }}>
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
