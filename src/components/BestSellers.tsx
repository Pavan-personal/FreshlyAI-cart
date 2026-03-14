"use client";
import { useState, useEffect } from "react";
import products from "@/data/products.json";
import { useCart } from "@/context/CartContext";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#f5c518" : "none"} stroke={filled ? "#f5c518" : "#ddd"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#e74c3c" : "none"} stroke={filled ? "#e74c3c" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const aptamil = products.find((p) => p.id === 2)!;
const leftCards = [products[5], products[2], products[8]];
const rightCards = [products[6], products[7], products[9]];

const initialTimers = [
  21 * 86400 + 16 * 3600 + 20 * 60 + 20,
  22 * 86400 + 16 * 3600 + 20 * 60 + 20,
  20 * 86400 + 16 * 3600 + 20 * 60 + 20,
];

function useCountdown(totalSeconds: number) {
  const [remaining, setRemaining] = useState(totalSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : totalSeconds));
    }, 1000);
    return () => clearInterval(interval);
  }, [totalSeconds]);
  const d = Math.floor(remaining / 86400);
  const h = Math.floor((remaining % 86400) / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  return [d, h, m, s];
}

function SmallCard({ item, timerIdx }: { item: typeof products[0]; timerIdx: number }) {
  const { addToCart, toggleWishlist, isWishlisted, getItemQty } = useCart();
  const timer = useCountdown(initialTimers[timerIdx]);
  const disc = Math.round(((item.price - item.discountPrice) / item.price) * 100);
  const wishlisted = isWishlisted(item.id);
  const qty = getItemQty(item.id);

  return (
    <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 14, flex: 1 }}>
        {/* Left: image + badge + wishlist */}
        <div style={{ position: "relative", flexShrink: 0, width: 110 }}>
          <span style={{ position: "absolute", top: -4, left: -4, background: "#e74c3c", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 12, zIndex: 1 }}>{disc}%</span>
          <button onClick={() => toggleWishlist(item.id, item.name)} style={{ position: "absolute", top: -4, right: -4, background: "#fff", border: "1px solid #eee", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 1, padding: 0, outline: "none" }}>
            <HeartIcon filled={wishlisted} />
          </button>
          <img src={item.image} alt={item.name} style={{ width: 110, height: 100, objectFit: "contain", borderRadius: 8 }} />
        </div>
        {/* Right: info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#333", lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{item.name}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "6px 0" }}>
            <div style={{ display: "flex", gap: 1 }}>
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} filled={i < Math.floor(item.rating)} />)}
            </div>
            <span style={{ fontSize: 12, color: "#999" }}>{item.reviewCount}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#27ae60" }}>${item.discountPrice.toFixed(2)}</span>
            <span style={{ fontSize: 13, color: "#aaa", textDecoration: "line-through" }}>${item.price.toFixed(2)}</span>
          </div>
          <button onClick={() => addToCart(item.id, item.name)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: qty > 0 ? "#27ae60" : "none", border: qty > 0 ? "none" : "1px solid #e0e0e0", borderRadius: 6, padding: "6px 12px", fontSize: 13, color: qty > 0 ? "#fff" : "#555", cursor: "pointer", fontWeight: qty > 0 ? 600 : 400 }}>
            {qty > 0 ? `Added to cart (${qty})` : "Add to cart"}
            <PlusIcon />
          </button>
        </div>
      </div>
      {/* Timer */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, paddingTop: 12, borderTop: "1px solid #f0f0f0" }}>
        {timer.map((val, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {i === 2 && <span style={{ fontWeight: 700, color: "#333", fontSize: 13, margin: "0 1px" }}>:</span>}
            <span style={{ background: "#f5f5f5", border: "1px solid #e8e8e8", borderRadius: 4, padding: "3px 6px", fontSize: 12, fontWeight: 600, color: "#333", minWidth: 26, textAlign: "center" }}>{String(val).padStart(2, "0")}</span>
          </span>
        ))}
        <span style={{ fontSize: 11, color: "#bbb", marginLeft: 4 }}>Remains until the end of the offer</span>
      </div>
    </div>
  );
}

function FeaturedCard() {
  const { addToCart, toggleWishlist, isWishlisted, getItemQty } = useCart();
  const progressPercent = (aptamil.stock / 100) * 100;
  const wishlisted = isWishlisted(aptamil.id);
  const qty = getItemQty(aptamil.id);

  return (
    <div style={{ background: "#fff", border: "2px solid #5a2d82", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", width: "100%" }}>
      <button onClick={() => toggleWishlist(aptamil.id, aptamil.name)} style={{ position: "absolute", top: 16, right: 16, background: "#fff", border: "1px solid #eee", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, outline: "none" }}>
        <HeartIcon filled={wishlisted} />
      </button>
      <div style={{ marginBottom: 20, flexShrink: 0 }}>
        <img src={aptamil.image} alt={aptamil.name} style={{ width: 200, height: 220, objectFit: "contain", borderRadius: 12 }} />
      </div>
      <div style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
          <div style={{ display: "flex", gap: 1 }}>
            {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} filled={i < Math.floor(aptamil.rating)} />)}
          </div>
          <span style={{ fontSize: 12, color: "#999" }}>{aptamil.reviewCount}</span>
        </div>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#333", margin: "6px 0 4px", lineHeight: 1.4 }}>{aptamil.name}</p>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", margin: "0 0 10px" }}>${aptamil.discountPrice.toFixed(2)}</p>
        <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5, margin: "0 0 16px" }}>
          Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper.
        </p>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 6px" }}>This product is about to run out</p>
          <div style={{ width: "100%", height: 6, background: "#f0f0f0", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg, #27ae60, #e74c3c)", borderRadius: 3, width: `${progressPercent}%` }} />
          </div>
          <p style={{ fontSize: 12, color: "#888", margin: 0 }}>available only: <strong>{aptamil.stock}</strong></p>
        </div>
        <button onClick={() => addToCart(aptamil.id, aptamil.name)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: qty > 0 ? "#27ae60" : "#5a2d82", color: "#fff", border: "none", borderRadius: 8, padding: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: "auto" }}>
          <CartIcon /> {qty > 0 ? `Added to cart (${qty})` : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default function BestSellers() {
  return (
    <section style={{ padding: "40px 0" }}>
      <style>{`
        .bestsellers-header {
          display: flex;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 24px;
        }
        .bestsellers-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }
        .bestsellers-featured {
          display: flex;
          order: 0;
        }
        .bestsellers-left { order: 0; }
        .bestsellers-featured { order: 0; }
        .bestsellers-right { order: 0; }
        @media (max-width: 1024px) {
          .bestsellers-grid {
            grid-template-columns: 1fr 1fr;
          }
          .bestsellers-left { order: 1; }
          .bestsellers-right { order: 2; }
          .bestsellers-featured {
            order: 3;
            grid-column: 1 / -1;
          }
          .bestsellers-featured > div {
            max-width: 500px;
            margin: 0 auto;
          }
        }
        @media (max-width: 768px) {
          .bestsellers-grid {
            grid-template-columns: 1fr;
          }
          .bestsellers-featured {
            order: 0;
            grid-column: 1;
          }
          .bestsellers-left { order: 1; }
          .bestsellers-right { order: 2; }
          .bestsellers-header {
            flex-direction: column;
            gap: 6px;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div className="bestsellers-header">
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Best Sellers</h2>
          <p style={{ fontSize: 13, color: "#999", margin: 0 }}>Dont miss this opportunity at a special discount just for this week.</p>
        </div>
        <div className="bestsellers-grid">
          <div className="bestsellers-left" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {leftCards.map((item, i) => <SmallCard key={item.id} item={item} timerIdx={i} />)}
          </div>
          <div className="bestsellers-featured" style={{ display: "flex" }}>
            <FeaturedCard />
          </div>
          <div className="bestsellers-right" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {rightCards.map((item, i) => <SmallCard key={item.id} item={item} timerIdx={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
