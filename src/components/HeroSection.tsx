"use client";

export default function HeroSection() {
    return (
        <section className="container" style={{ margin: "0 auto", padding: "24px 24px 0" }}>
            <style>{`
                .hero-grid {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    gap: 16px;
                    min-height: 380px;
                }
                .hero-right-bottom {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }
                .hero-left {
                    min-height: 340px;
                    padding: 40px 44px;
                }
                .hero-title {
                    font-family: var(--font-pacifico);
                    font-size: 52px;
                    color: white;
                    line-height: 1.15;
                    margin: 0 0 4px;
                    font-weight: 400;
                }
                .hero-subtitle { font-size: 22px; }
                .hero-price { font-size: 28px; }
                .hero-helper-img { height: 48px; width: auto; }
                .hero-shop-btn {
                    padding: 11px 26px;
                    font-size: 14px;
                }
                @media (max-width: 1024px) {
                    .hero-title { font-size: 38px; }
                    .hero-subtitle { font-size: 18px; }
                    .hero-price { font-size: 24px; }
                    .hero-left { padding: 28px 28px; }
                }
                @media (max-width: 768px) {
                    .hero-grid {
                        grid-template-columns: 1fr;
                        min-height: auto;
                    }
                    .hero-left {
                        min-height: 260px;
                        padding: 24px 24px;
                    }
                    .hero-title { font-size: 32px; }
                    .hero-subtitle { font-size: 16px; }
                    .hero-price { font-size: 22px; }
                    .hero-helper-img { height: 36px; }
                    .hero-shop-btn {
                        padding: 9px 20px;
                        font-size: 13px;
                    }
                }
                @media (max-width: 480px) {
                    .hero-right-bottom {
                        grid-template-columns: 1fr;
                    }
                    .hero-right-bottom > div {
                        min-height: 160px;
                    }
                    .hero-left {
                        min-height: 220px;
                        padding: 20px 18px;
                    }
                    .hero-title { font-size: 26px; }
                    .hero-subtitle { font-size: 15px; }
                    .hero-price { font-size: 20px; }
                    .hero-helper-img { height: 28px; }
                }
            `}</style>
            <div className="hero-grid">

                {/* LEFT - Big Banner */}
                <div className="hero-left" style={{
                    position: "relative", borderRadius: 14, overflow: "hidden",
                    backgroundImage: "url(/hero/hero_section_b-0.webp)",
                    backgroundSize: "cover", backgroundPosition: "center",
                    display: "flex", alignItems: "center",
                }}>
                    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
                        <img className="hero-helper-img" src='/hero/hero0helper.png' style={{ objectFit: "contain", alignSelf: "flex-start" }} />
                        <h1 className="hero-title">
                            Fresh Organic
                        </h1>
                        <p className="hero-subtitle" style={{ fontWeight: 600, color: "#634C9F", margin: "0 0 2px" }}>
                            Food For All
                        </p>
                        <p className="hero-price" style={{ fontWeight: 800, color: "white", margin: "0 0 12px" }}>
                            $59.00
                        </p>
                        <button onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })} className="hero-shop-btn" style={{
                            background: "#634C9F", color: "#fff", border: "none",
                            borderRadius: 800,
                            fontWeight: 600, cursor: "pointer", width: "fit-content"
                        }}>
                            Shop Now
                        </button>
                    </div>
                </div>

                {/* RIGHT - 3 cards grid */}
                <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 16 }}>

                    {/* Top right - Creamy Fruits */}
                    <div style={{
                        position: "relative", borderRadius: 14, overflow: "hidden",
                        backgroundImage: "url(/hero/hero_section_b-1.jpg)",
                        backgroundSize: "cover", backgroundPosition: "center",
                        padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "center"
                    }}>
                        <h3 style={{
                            fontFamily: "math", fontSize: 22,
                            color: "white", margin: "0 0 2px", fontWeight: 800, textDecoration: "underline"
                        }}>
                            Creamy Fruits
                        </h3>
                        <p style={{ fontFamily: "math", fontSize: 22, fontWeight: 800, color: "white", margin: "0 0 8px", textDecoration: "underline" }}>baby Jem</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "white", margin: "0 0 2px" }}>Only</p>
                        <p style={{ fontSize: 26, fontWeight: 800, color: "white", margin: "0 0 14px" }}>$12.99</p>
                        <button onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })} style={{
                            background: "#fff", color: "#333", border: "none",
                            padding: "9px 22px", borderRadius: 20, fontSize: 13,
                            fontWeight: 600, cursor: "pointer", width: "fit-content"
                        }}>
                            Shop Now
                        </button>
                    </div>

                    {/* Bottom row - 2 cards */}
                    <div className="hero-right-bottom">

                        {/* Baby Diaper */}
                        <div style={{
                            position: "relative", borderRadius: 14, overflow: "hidden",
                            backgroundImage: "url(/hero/hero_section_b-2.jpg)",
                            backgroundSize: "cover", backgroundPosition: "center",
                            padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "center"
                        }}>
                            <div className="absolute self-center top-5">
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>New Baby Diaper</h4>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)", margin: "0 0 12px" }}>Top Quality Product</p>
                            </div>
                            <button onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })} className="self-center absolute bottom-5" style={{
                                background: "#fff", color: "#333", border: "none",
                                padding: "7px 18px", borderRadius: 60, fontSize: 12,
                                fontWeight: 600, cursor: "pointer", width: "fit-content"
                            }}>
                                Shop Now
                            </button>
                        </div>

                        {/* FaceWash */}
                        <div style={{
                            position: "relative", borderRadius: 14, overflow: "hidden",
                            backgroundImage: "url(/hero/hero_section_b-3.jpg)",
                            backgroundSize: "cover", backgroundPosition: "center",
                            padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "center"
                        }}>
                            <div style={{ fontFamily: "ui-rounded" }} className="absolute top-5">
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#333", margin: "0 0 3px" }}>Dark wash FaceWash</h4>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(61, 148, 70, 0.7)", margin: "0 0 4px" }}>All Fixed Size</p>
                            </div>
                            {/* <span style={{
                display: "inline-block", background: "rgba(255,255,255,0.3)",
                color: "#c0392b", fontSize: 14, fontWeight: 800,
                padding: "3px 10px", borderRadius: 4, marginBottom: 10, width: "fit-content"
              }}>
                15% OFF
              </span> */}
                            <button onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })} className="bottom-5 absolute" style={{
                                background: "#fff", color: "#333", border: "none",
                                padding: "7px 18px", borderRadius: 60, fontSize: 12,
                                fontWeight: 600, cursor: "pointer", width: "fit-content"
                            }}>
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
