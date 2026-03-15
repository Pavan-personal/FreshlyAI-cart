"use client";
import { useState, useEffect } from "react";
import products from "@/data/products.json";
import { useCart } from "@/context/CartContext";

const filters = ["All", "Desserts", "Vegetables", "Beverage"];

const categoryMap: Record<string, string> = {
  Desserts: "desserts",
  Vegetables: "vegetables",
  Beverage: "drinks-and-beverages",
};



const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#f5c518" : "none"} stroke={filled ? "#f5c518" : "#ddd"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#e74c3c" : "none"} stroke={filled ? "#e74c3c" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const categoryLabel = (cat: string) => {
  if (cat === "drinks-and-beverages") return "Beverage";
  if (cat === "fresh-fruits") return "Fresh Fruits";
  if (cat === "fish-and-meat") return "Fish & Meat";
  if (cat === "pets-and-animals") return "Pets & Animals";
  return cat.charAt(0).toUpperCase() + cat.slice(1);
};

export default function FeaturedProducts() {
  const [active, setActive] = useState("All");
  const { addToCart, toggleWishlist, isWishlisted, getItemQty } = useCart();

  useEffect(() => {
    const handler = (e: Event) => {
      const filter = (e as CustomEvent).detail;
      if (filters.includes(filter)) setActive(filter);
    };
    window.addEventListener("setFeaturedFilter", handler);
    return () => window.removeEventListener("setFeaturedFilter", handler);
  }, []);

  const filtered = active === "All"
    ? products
    : products.filter((p) => p.category === categoryMap[active]);

  return (
    <section id="featured-products" style={{ padding: "40px 0" }}>
      <style>{`
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        .fp-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: thin;
        }
        @media (max-width: 1024px) {
          .fp-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .fp-grid { grid-template-columns: repeat(2, 1fr); }
          .fp-header { flex-direction: column; align-items: flex-start !important; gap: 12px; }
        }
        @media (max-width: 480px) {
          .fp-grid { grid-template-columns: 1fr; max-width: 300px; margin: 0 auto; }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }} className="fp-header">
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Featured Products</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{ background: "none", border: "none", fontSize: 14, color: active === f ? "#1a5c3a" : "#888", cursor: "pointer", padding: "4px 8px", fontWeight: active === f ? 600 : 500 }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable row for All, grid for filtered */}
        <div className={active === "All" ? "fp-scroll" : "fp-grid"}>
          {filtered.map((p) => {
            const disc = Math.round(((p.price - p.discountPrice) / p.price) * 100);
            const qty = getItemQty(p.id);
            return (
              <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", ...(active === "All" ? { minWidth: 220, maxWidth: 220, flexShrink: 0 } : {}) }}>
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#888" }}>{categoryLabel(p.category)}</span>
                  <button onClick={() => toggleWishlist(p.id, p.name)} style={{ background: "none", border: "1px solid #eee", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", color: "#ccc", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", outline: "none" }} aria-label="Wishlist"><HeartIcon filled={isWishlisted(p.id)} /></button>
                </div>
                {/* Image */}
                <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <img src={p.image} alt={p.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
                {/* Sizes */}
                <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                  {p.sizes.map((s) => (
                    <span key={s} style={{ fontSize: 11, color: "#666", border: "1px solid #e0e0e0", borderRadius: 4, padding: "2px 8px" }}>{s}</span>
                  ))}
                </div>
                {/* Pricing */}
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6, flexWrap: "wrap" as const }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>${p.discountPrice.toFixed(2)}</span>
                  <span style={{ fontSize: 13, color: "#aaa", textDecoration: "line-through" }}>${p.price.toFixed(2)}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", background: "#e74c3c", borderRadius: 4, padding: "1px 6px", marginLeft: 2 }}>-{disc}%</span>
                </div>
                {/* Name */}
                <p style={{ fontSize: 13, color: "#444", lineHeight: 1.4, margin: "0 0 8px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{p.name}</p>
                {/* Rating */}
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 1 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} filled={i < Math.floor(p.rating)} />
                    ))}
                  </div>
                  <span style={{ fontSize: 12, color: "#999" }}>({p.rating.toFixed(2)})</span>
                </div>
                {/* Button */}
                <button onClick={() => addToCart(p.id, p.name)} style={{ display: "flex", alignItems: "center", gap: 6, background: qty > 0 ? "#27ae60" : "#effbf4ff", color: qty > 0 ? "#fff" : "#27ae60", borderRadius: 24, margin: "auto", padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: "auto", width: "fit-content", border: "none" }}>
                  <CartIcon /> {qty > 0 ? `Added (${qty})` : "Select Options"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
