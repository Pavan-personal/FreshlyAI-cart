"use client";

const sellers = [
  { name: "Eleanor Pena", featured: false, rating: 4 },
  { name: "Dianne Russell", featured: true, rating: 5 },
  { name: "Michel Richard", featured: false, rating: 4.5 },
  { name: "Marvin McKinney", featured: false, rating: 5 },
];

const Star = ({ filled, half }: { filled: boolean; half?: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" stroke="#F5C518" strokeWidth="1.5" fill="none">
    {half ? (
      <>
        <defs>
          <clipPath id="halfClip">
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" />
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#F5C518" clipPath="url(#halfClip)" />
      </>
    ) : (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={filled ? "#F5C518" : "none"} />
    )}
  </svg>
);

export default function PromoSection() {
  return (
    <section className="container" style={{ margin: "0 auto", padding: "32px 24px 0" }}>

      {/* 3 BANNERS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 36 }}>
        {/* Banner 1 - Creamy Fruits */}
        <div style={{
          borderRadius: 12, overflow: "hidden", height: 180,
          backgroundImage: "url(/middle-banner/middle-banner1.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "center",
          position: "relative"
        }}>
          <h3 style={{ fontFamily: "var(--font-pacifico)", fontSize: 18, color: "#2d4a2d", margin: "0 0 1px", fontWeight: 400 }}>Creamy Fruits</h3>
          <p style={{ fontSize: 13, color: "rgba(45,74,45,0.7)", margin: "0 0 6px" }}>baby Jem</p>
          <p style={{ fontSize: 12, color: "#555", margin: "0 0 0px" }}>Only</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 12px" }}>$12.99</p>
          <button onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })} style={{
            background: "#fff", color: "#333", border: "none",
            padding: "8px 20px", borderRadius: 20, fontSize: 12,
            fontWeight: 600, cursor: "pointer", width: "fit-content"
          }}>Shop Now</button>
        </div>

        {/* Banner 2 - Organic Fruits */}
        <div style={{
          borderRadius: 12, overflow: "hidden", height: 180,
          backgroundImage: "url(/middle-banner/middle-banner2.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          padding: "22px 24px", display: "flex", flexDirection: "column",
          alignItems: "flex-end", justifyContent: "center", textAlign: "right"
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: "0 0 2px" }}>Organic Fruits</h3>
          <p style={{ fontSize: 12, color: "#666", margin: "0 0 6px" }}>100% Organic</p>
          <p style={{ fontSize: 12, color: "#555", margin: "0 0 0px" }}>Only</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 12px" }}>$14.99</p>
          <button onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })} style={{
            background: "#fff", color: "#333", border: "none",
            padding: "8px 20px", borderRadius: 20, fontSize: 12,
            fontWeight: 600, cursor: "pointer"
          }}>Shop Now</button>
        </div>

        {/* Banner 3 - Kids Car Toys */}
        <div style={{
          borderRadius: 12, overflow: "hidden", height: 180,
          backgroundImage: "url(/middle-banner/middle-banner3.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "center"
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: "0 0 2px" }}>Kids Car Toys</h3>
          <p style={{ fontSize: 12, color: "#666", margin: "0 0 6px" }}>2023 Colletions</p>
          <p style={{ fontSize: 12, color: "#555", margin: "0 0 0px" }}>Only</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 12px" }}>$5.99</p>
          <button onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })} style={{
            background: "#fff", color: "#333", border: "none",
            padding: "8px 20px", borderRadius: 20, fontSize: 12,
            fontWeight: 600, cursor: "pointer", width: "fit-content"
          }}>Shop Now</button>
        </div>
      </div>

      {/* TOP SELLER USERS */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: 0, whiteSpace: "nowrap" }}>Top Seller Users</h3>
          <span style={{ width: 36, height: 3, background: "#1a5c3a", borderRadius: 2, flexShrink: 0 }} />
          <span style={{ flex: 1, height: 1, background: "#eee" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {sellers.map((s) => (
            <div key={s.name} style={{
              background: "#e9e8e8ad", border: "1px solid #eee", borderRadius: 10,
              padding: "14px 16px", display: "flex", alignItems: "center", gap: 14
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "10%", boxShadow: "1px 1px 10px rgba(0,0,0,0.2)", overflow: "hidden", flexShrink: 0
              }}>
                <img src="/person.png" alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {s.featured && (
                  <span style={{ fontSize: 11, color: "green", fontWeight: 600 }}>Featured</span>
                )}
                <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{s.name}</span>
                <div style={{ display: "flex", gap: 1 }}>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const diff = s.rating - i;
                    if (diff >= 1) return <Star key={i} filled={true} />;
                    if (diff >= 0.5) return <Star key={i} filled={false} half={true} />;
                    return <Star key={i} filled={false} />;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SAFETY BANNER */}
      <div style={{
        background: "linear-gradient(135deg, #d5d0e8, #c4bde0)",
        borderRadius: 12, padding: "0 32px",
        display: "flex", alignItems: "center",
        overflow: "visible", marginBottom: 32, position:"relative", 
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#2d2d4e", margin: "0 0 6px", lineHeight: 1.3 }}>
            In store or online your health &amp; safety is our top priority
          </h3>
          <p style={{ fontSize: 13, color: "#666", margin: 0, lineHeight: 1.5 }}>
            The only supermarket that makes your life easier, makes you enjoy life and makes it better
          </p>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", gap: 50, flexShrink: 0, overflow: "visible" }}>
          <span style={{ fontSize: 64, fontWeight: 800, background: "linear-gradient(90deg, rgba(140,120,180,0.5) 0%, rgba(180,120,200,0.8) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>%50</span>
          <img src="/special-img.png" alt="Discount product" style={{ height: 80, width: "auto", zIndex: 9, objectFit: "contain", scale: "1.2", translate: "0 -10px"}} />
        </div>
      </div>
    </section>
  );
}
