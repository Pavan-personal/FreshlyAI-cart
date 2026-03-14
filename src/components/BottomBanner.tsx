"use client";

export default function BottomBanner() {
  return (
    <section className="container" style={{ margin: "0 auto", padding: "32px 24px 40px" }}>
      <div style={{
        borderRadius: 12, overflow: "hidden", position: "relative",
        display: "flex", alignItems: "center"
      }}>
        {/* Image as full background keeping natural aspect ratio */}
        <img
          src="/namkeen_banner.webp"
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {/* Text overlay */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0,
          display: "flex", alignItems: "center",
          padding: "40px 44px", zIndex: 1
        }}>
          <div style={{ maxWidth: 420 }}>
            <span style={{
              display: "inline-block", background: "#FAEBD7",
              color: "#333", fontSize: 16, fontWeight: 800,
              padding: "6px 16px", borderRadius: 400, marginBottom: 16,
              backdropFilter: "blur(2px)"
            }}>
              Only This Week
            </span>
            <h2 style={{
              fontSize: 34, fontWeight: 700, color: "#1a1a2e",
              lineHeight: 1.2, margin: "0 0 10px"
            }}>
              Provides you the quality<br />that&apos;s you expected
            </h2>
            <p style={{ fontSize: 15, color: "rgba(30,30,50,0.6)", margin: "0 0 22px" }}>
              A different kind of grocery store
            </p>
            <button onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: "#333", border: "none",
              padding: "12px 24px", borderRadius: 800, fontSize: 14,
              fontWeight: 600, cursor: "pointer"
            }}>
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
