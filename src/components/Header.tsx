"use client";

import { useState, useRef, useEffect } from "react";
import { TbRosetteDiscount } from "react-icons/tb";
import { useCart } from "@/context/CartContext";
import products from "@/data/products.json";

const categories = [
  { img: "/navbar/i1.png", label: "Vegetables", count: "6 Products", filter: "Vegetables" },
  { img: "/navbar/i2.png", label: "Fresh Fruits", count: "4 Products", filter: "All" },
  { img: "/navbar/i3.png", label: "Desserts", count: "6 Products", filter: "Desserts" },
  { img: "/navbar/i4.png", label: "Drinks & Juice", count: "6 Products", filter: "Beverage" },
  { img: "/navbar/i5.png", label: "Fish & Meats", count: "4 Products", filter: "All" },
  { img: "/navbar/i6.png", label: "Pets & Animals", count: "4 Products", filter: "All" },
];

const navItems = [
  { label: "Home", hasDropdown: true },
  { label: "Pages", hasDropdown: true },
  { label: "Shop", hasDropdown: true },
  { label: "Vendor", hasDropdown: true },
  { label: "Elements", hasDropdown: true },
  { label: "Blog", hasDropdown: true },
  { label: "Contact", hasDropdown: false },
];

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#276749" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 3.75L5 6.25L7.5 3.75" />
  </svg>
);

function scrollToFeatured(filter?: string) {
  const el = document.getElementById("featured-products");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    if (filter) {
      // Dispatch custom event so FeaturedProducts can pick it up
      window.dispatchEvent(new CustomEvent("setFeaturedFilter", { detail: filter }));
    }
  }
}

export default function Header() {
  const { getCartCount, getWishlistCount, resetAll, addToCart, removeFromCart, toggleWishlist, isWishlisted, cart, wishlist } = useCart();
  const [showCategories, setShowCategories] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const wishRef = useRef<HTMLDivElement>(null);

  const cartProducts = cart.map((item) => {
    const p = products.find((pr) => pr.id === item.id);
    return p ? { ...p, quantity: item.quantity } : null;
  }).filter(Boolean) as (typeof products[0] & { quantity: number })[];

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const cartTotal = cartProducts.reduce((sum, p) => sum + p.discountPrice * p.quantity, 0);

  const searchResults = searchQuery.trim().length > 0
    ? products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
    : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) setShowSearch(false);
      if (catRef.current && !catRef.current.contains(target)) setShowCategories(false);
      if (cartRef.current && !cartRef.current.contains(target)) setShowCart(false);
      if (wishRef.current && !wishRef.current.contains(target)) setShowWishlist(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
      <style>{`
        .hdr-topbar-text { font-size: 13px; }
        .hdr-main { display: flex; align-items: center; height: 76px; gap: 20px; }
        .hdr-logo { font-size: 34px; }
        .hdr-cat-pill { display: flex; }
        .hdr-search-wrap { display: flex; flex: 1; }
        .hdr-icons { display: flex; }
        .hdr-hamburger { display: none; padding: 5px; background: none; border: none; cursor: pointer; color: #555; }
        .hdr-navbar { display: flex; width: 100%; }
        .hdr-navbar-right { display: flex; }
        .hdr-catbar { display: flex; width: 100%; }
        .hdr-mobile-search { display: none; }
        .hdr-mobile-menu-overlay { display: none; }
        .hdr-mobile-drawer { display: none; }

        @media (max-width: 1024px) {
          .hdr-navbar-right { display: none; }
        }

        @media (max-width: 768px) {
          .hdr-topbar-text { font-size: 11px; padding: 0 12px; }
          .hdr-main { height: 56px; gap: 10px; padding: 0 14px !important; }
          .hdr-logo { font-size: 26px; }
          .hdr-cat-pill { display: none; }
          .hdr-search-wrap { display: none; }
          .hdr-hamburger { display: flex; }
          .hdr-navbar { display: none; }
          .hdr-catbar { display: none; }
          .hdr-mobile-search {
            display: flex;
            padding: 0 14px 8px;
            background: #fff;
          }
          .hdr-mobile-search .mob-search-inner {
            display: flex; align-items: center; height: 38px;
            border: 1px solid #E8E8E8; border-radius: 50px;
            background: #F3F3F3; overflow: hidden; width: 100%;
          }
          .hdr-mobile-search .mob-search-inner input {
            flex: 1; height: 100%; padding: 0 14px; font-size: 13px;
            color: #666; outline: none; border: none; background: #F3F3F3;
          }
          .hdr-mobile-search .mob-search-inner button {
            display: flex; align-items: center; padding: 0 14px; height: 100%;
            background: #F5C518; border: none; cursor: pointer; flex-shrink: 0;
          }
          .hdr-mobile-menu-overlay.open {
            display: block; position: fixed; inset: 0; z-index: 999;
            background: rgba(0,0,0,0.4);
          }
          .hdr-mobile-drawer {
            display: block;
            position: fixed; top: 0; left: 0; bottom: 0; width: 280px;
            background: #fff; z-index: 1000; overflow-y: auto;
            transform: translateX(-100%); transition: transform 0.25s ease;
            padding: 20px 0;
          }
          .hdr-mobile-drawer.open { transform: translateX(0); }
        }

        @media (max-width: 480px) {
          .hdr-main { height: 50px; gap: 8px; padding: 0 10px !important; }
          .hdr-logo { font-size: 22px; }
        }
      `}</style>

      {/* TOP BAR */}
      <div style={{ width: "100%", background: "#634C9F", padding: "8px 0", textAlign: "center" }}>
        <p className="hdr-topbar-text" style={{ color: "white", fontWeight: 500, letterSpacing: 0.3, margin: 0 }}>
          FREE delivery &amp; 40% Discount for next 3 orders! Place your 1st order in
        </p>
      </div>

      {/* MAIN HEADER */}
      <div style={{ width: "100%", background: "#fff", padding: "6px" }}>
        <div className="hdr-main" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <span className="hdr-logo" style={{ fontFamily: "var(--font-pacifico)", color: "#634C9F", flexShrink: 0, lineHeight: 1 }}>Freshly</span>

          {/* All Categories pill - hidden on mobile */}
          <div ref={catRef} className="hdr-cat-pill" style={{ position: "relative", alignItems: "center", gap: 8, borderRadius: 50, padding: "0 16px", height: 42, cursor: "pointer", flexShrink: 0, border: "1px solid #E8E8E8" }}
            onClick={() => setShowCategories(!showCategories)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ display: "block", width: 16, height: 2, background: "#276749", borderRadius: 1 }} />
              <span style={{ display: "block", width: 12, height: 2, background: "#276749", borderRadius: 1 }} />
              <span style={{ display: "block", width: 8, height: 2, background: "#276749", borderRadius: 1 }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#333", whiteSpace: "nowrap" }}>All Categories</span>
            <ChevronDown />
            {showCategories && (
              <div style={{ position: "absolute", top: 48, left: 0, background: "#fff", border: "1px solid #eee", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", padding: "8px 0", zIndex: 100, minWidth: 220 }}
                onClick={(e) => e.stopPropagation()}>
                {categories.map((cat) => (
                  <div key={cat.label} onClick={() => { scrollToFeatured(cat.filter); setShowCategories(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer", fontSize: 14, color: "#333" }}>
                    <img src={cat.img} alt={cat.label} style={{ width: 28, height: 28, objectFit: "contain" }} />
                    <div>
                      <div style={{ fontWeight: 500 }}>{cat.label}</div>
                      <div style={{ fontSize: 11, color: "#999" }}>{cat.count}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search bar - hidden on mobile (replaced by mobile search below) */}
          <div ref={searchRef} className="hdr-search-wrap" style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", height: 42, border: "1px solid #E8E8E8", borderRadius: 50, background: "#F3F3F3", overflow: "hidden", width: "100%" }}>
              <input type="text" placeholder="Type Your Products ..." value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
                onFocus={() => setShowSearch(true)}
                style={{ flex: 1, height: "100%", padding: "0 16px", fontSize: 13, color: "#666", outline: "none", border: "none", background: "#F3F3F3" }} />
              <button onClick={() => { if (searchQuery.trim()) setShowSearch(true); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 18px", height: "100%", background: "#F5C518", fontSize: 13, fontWeight: 600, color: "#333", border: "none", cursor: "pointer", flexShrink: 0 }}>
                Search
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
            {showSearch && searchResults.length > 0 && (
              <div style={{ position: "absolute", top: 46, left: 0, right: 0, background: "#fff", border: "1px solid #eee", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", padding: "8px 0", zIndex: 200, maxHeight: 360, overflowY: "auto" }}>
                {searchResults.map((p) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", fontSize: 14, color: "#333" }}>
                    <img src={p.image} alt={p.name} style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 4 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 500, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#27ae60", fontWeight: 600 }}>${p.discountPrice.toFixed(2)} <span style={{ color: "#aaa", textDecoration: "line-through", fontWeight: 400 }}>${p.price.toFixed(2)}</span></div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id, p.name); }} style={{ background: "none", border: "1px solid #eee", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, outline: "none" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted(p.id) ? "#e74c3c" : "none"} stroke={isWishlisted(p.id) ? "#e74c3c" : "#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); addToCart(p.id, p.name); }} style={{ background: "none", border: "1px solid #eee", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, outline: "none" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {showSearch && searchQuery.trim().length > 0 && searchResults.length === 0 && (
              <div style={{ position: "absolute", top: 46, left: 0, right: 0, background: "#fff", border: "1px solid #eee", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", padding: "20px 16px", zIndex: 200, textAlign: "center", color: "#999", fontSize: 14 }}>
                No products found
              </div>
            )}
          </div>

          {/* Right icons */}
          <div className="hdr-icons" style={{ alignItems: "center", flexShrink: 0 }}>
            <button style={{ padding: 5, border: "none", background: "rgba(36, 248, 36, 0.12)", borderRadius: 1000, cursor: "pointer", display: "flex", color: "#555" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#276749" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <div style={{ width: 1, height: 24, background: "#E0E0E0", margin: "0 10px" }} />

            {/* Reset */}
            <button onClick={resetAll} style={{ position: "relative", padding: 5, background: "none", border: "none", cursor: "pointer", display: "flex", color: "#555" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </button>

            {/* Wishlist */}
            <div ref={wishRef} style={{ position: "relative", marginLeft: 4 }}>
              <button onClick={() => { setShowWishlist(!showWishlist); setShowCart(false); }} style={{ position: "relative", padding: 5, background: "none", border: "none", cursor: "pointer", display: "flex", color: "#555" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span style={{ position: "absolute", top: -1, left: -3, background: "#F5C518", color: "#333", fontSize: 9, fontWeight: 700, width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>{getWishlistCount()}</span>
              </button>
              {showWishlist && (
                <>
                  <div onClick={() => setShowWishlist(false)} style={{ position: "fixed", inset: 0, zIndex: 199 }} />
                  <div style={{ position: "absolute", top: 40, right: 0, background: "#fff", border: "1px solid #eee", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", padding: "8px 0", zIndex: 200, minWidth: 300, maxHeight: 400, overflowY: "auto" }}>
                  {wishlistProducts.length === 0 ? (
                    <div style={{ padding: "24px 16px", textAlign: "center", color: "#999", fontSize: 13 }}>Your wishlist is empty</div>
                  ) : (
                    <>
                      <div style={{ padding: "8px 16px 6px", fontSize: 13, fontWeight: 600, color: "#333", borderBottom: "1px solid #f0f0f0" }}>
                        Wishlist ({wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"})
                      </div>
                      {wishlistProducts.map((p) => (
                        <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 13, color: "#333" }}>
                          <img src={p.image} alt={p.name} style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 4 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 500, fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                            <div style={{ fontSize: 12, color: "#27ae60", fontWeight: 600 }}>${p.discountPrice.toFixed(2)}</div>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); addToCart(p.id, p.name); }} title="Add to cart" style={{ background: "none", border: "1px solid #eee", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id, p.name); }} title="Remove from wishlist" style={{ background: "none", border: "1px solid #eee", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                </>
              )}
            </div>

            {/* Cart */}
            <div ref={cartRef} style={{ position: "relative", marginLeft: 4 }}>
              <button onClick={() => { setShowCart(!showCart); setShowWishlist(false); }} style={{ position: "relative", padding: 5, background: "none", border: "none", cursor: "pointer", display: "flex", color: "#555" }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span style={{ position: "absolute", top: -1, left: -3, background: "#F5C518", color: "#333", fontSize: 9, fontWeight: 700, width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>{getCartCount()}</span>
              </button>
              {showCart && (
                <>
                <div onClick={() => setShowCart(false)} style={{ position: "fixed", inset: 0, zIndex: 199 }} />
                <div style={{ position: "absolute", top: 40, right: 0, background: "#fff", border: "1px solid #eee", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", padding: "8px 0", zIndex: 200, minWidth: 320, maxHeight: 420, overflowY: "auto" }}>
                  {cartProducts.length === 0 ? (
                    <div style={{ padding: "24px 16px", textAlign: "center", color: "#999", fontSize: 13 }}>Your cart is empty</div>
                  ) : (
                    <>
                      <div style={{ padding: "8px 16px 6px", fontSize: 13, fontWeight: 600, color: "#333", borderBottom: "1px solid #f0f0f0" }}>
                        Cart ({getCartCount()} {getCartCount() === 1 ? "item" : "items"})
                      </div>
                      {cartProducts.map((p) => (
                        <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 13, color: "#333" }}>
                          <img src={p.image} alt={p.name} style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 4 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 500, fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                            <div style={{ fontSize: 12, color: "#27ae60", fontWeight: 600 }}>
                              ${p.discountPrice.toFixed(2)} × {p.quantity} = ${(p.discountPrice * p.quantity).toFixed(2)}
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                            <button onClick={(e) => { e.stopPropagation(); removeFromCart(p.id); }} style={{ background: "#f5f5f5", border: "1px solid #eee", borderRadius: 4, width: 24, height: 24, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#666" }}>−</button>
                            <span style={{ fontSize: 12, fontWeight: 600, minWidth: 16, textAlign: "center" }}>{p.quantity}</span>
                            <button onClick={(e) => { e.stopPropagation(); addToCart(p.id, p.name); }} style={{ background: "#f5f5f5", border: "1px solid #eee", borderRadius: 4, width: 24, height: 24, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#666" }}>+</button>
                          </div>
                        </div>
                      ))}
                      <div style={{ padding: "10px 16px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Total:</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#27ae60" }}>${cartTotal.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
                </>
              )}
            </div>

            {/* Hamburger - mobile only */}
            <button className="hdr-hamburger" onClick={() => setMobileMenuOpen(true)} style={{ marginLeft: 4 }}>
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="0" y1="1" x2="22" y2="1" /><line x1="0" y1="8" x2="16" y2="8" /><line x1="0" y1="15" x2="22" y2="15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH BAR - visible only on mobile */}
      <div className="hdr-mobile-search" style={{ position: "relative" }}>
        <div className="mob-search-inner">
          <input type="text" placeholder="Search products..." value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
            onFocus={() => setShowSearch(true)} />
          <button onClick={() => { if (searchQuery.trim()) setShowSearch(true); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        {showSearch && searchResults.length > 0 && (
          <div style={{ position: "absolute", top: "100%", left: 14, right: 14, background: "#fff", border: "1px solid #eee", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", padding: "8px 0", zIndex: 200, maxHeight: 300, overflowY: "auto" }}>
            {searchResults.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", fontSize: 13, color: "#333" }}>
                <img src={p.image} alt={p.name} style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 4 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#27ae60", fontWeight: 600 }}>${p.discountPrice.toFixed(2)}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); addToCart(p.id, p.name); }} style={{ background: "none", border: "1px solid #eee", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NAVIGATION BAR - hidden on mobile */}
      <div className="hdr-navbar" style={{ width: "100%", background: "#fff", padding: "6px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <ul style={{ border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: 8, display: "flex", alignItems: "center", listStyle: "none", margin: 0, padding: 0 }}>
            {navItems.map((item) => (
              <li key={item.label}>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveNav(item.label); }}
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "12px 16px", fontSize: 14, fontWeight: activeNav === item.label ? 600 : 500, color: activeNav === item.label ? "#2e9e6a" : "#333", textDecoration: "none", whiteSpace: "nowrap" }}>
                  {item.label}
                  {item.hasDropdown && <ChevronDown />}
                </a>
              </li>
            ))}
          </ul>
          <div className="hdr-navbar-right" style={{ alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#333", whiteSpace: "nowrap" }}>
              <TbRosetteDiscount style={{ fontSize: 20, color: "#1a6b4a" }} />
              Weekly Discount!
            </div>
            <img src="/navbar/mobileno.webp" alt="Hotline Number +9888-256-666" style={{ height: 64, width: "auto", objectFit: "contain" }} />
          </div>
        </div>
      </div>

      {/* CATEGORY BAR - hidden on mobile */}
      <div className="hdr-catbar" style={{ width: "100%", background: "#fff", borderBottom: "1px solid #eee", padding: "16px 0" }}>
        <div className="container overflow-scroll" style={{ margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {categories.map((cat, index) => (
            <div key={cat.label} style={{ display: "flex", alignItems: "center" }}>
              <div onClick={() => scrollToFeatured(cat.filter)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "4px 6px", borderRadius: 8 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#eed2f4", padding: 10 }}>
                  <img src={cat.img} alt={cat.label} style={{ width: 36, height: 36, objectFit: "contain" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#333", whiteSpace: "nowrap" }}>{cat.label}</span>
                  <span style={{ fontSize: 11, color: "#aaa" }}>{cat.count}</span>
                </div>
              </div>
              {index < categories.length - 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 3, margin: "0 14px" }}>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#ccc" }} />
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#ccc" }} />
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#ccc" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      <div className={`hdr-mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`hdr-mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        {/* Drawer header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px 16px", borderBottom: "1px solid #eee" }}>
          <span style={{ fontFamily: "var(--font-pacifico)", fontSize: 26, color: "#634C9F" }}>Freshly</span>
          <button onClick={() => setMobileMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div style={{ padding: "12px 0" }}>
          {navItems.map((item) => (
            <a key={item.label} href="#" onClick={(e) => { e.preventDefault(); setActiveNav(item.label); setMobileMenuOpen(false); }}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", fontSize: 15, fontWeight: activeNav === item.label ? 600 : 500, color: activeNav === item.label ? "#2e9e6a" : "#333", textDecoration: "none", borderBottom: "1px solid #f5f5f5" }}>
              {item.label}
              {item.hasDropdown && <ChevronDown />}
            </a>
          ))}
        </div>

        {/* Categories in drawer */}
        <div style={{ padding: "8px 20px 4px", fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 0.5 }}>Categories</div>
        {categories.map((cat) => (
          <div key={cat.label} onClick={() => { scrollToFeatured(cat.filter); setMobileMenuOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", cursor: "pointer" }}>
            <img src={cat.img} alt={cat.label} style={{ width: 28, height: 28, objectFit: "contain" }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#333" }}>{cat.label}</div>
              <div style={{ fontSize: 10, color: "#aaa" }}>{cat.count}</div>
            </div>
          </div>
        ))}

        {/* Discount + phone */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #eee", marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>
            <TbRosetteDiscount style={{ fontSize: 18, color: "#1a6b4a" }} />
            Weekly Discount!
          </div>
          <img src="/navbar/mobileno.webp" alt="Hotline Number" style={{ height: 48, width: "auto", objectFit: "contain" }} />
        </div>
      </div>
    </header>
  );
}
