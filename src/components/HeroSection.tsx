"use client";

export default function HeroSection() {
    return (
        <section className="container" style={{ margin: "0 auto", padding: "24px 24px 0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, minHeight: 380 }}>

                {/* LEFT - Big Banner */}
                <div style={{
                    position: "relative", borderRadius: 14, overflow: "hidden",
                    backgroundImage: "url(/hero/hero_section_b-0.webp)",
                    backgroundSize: "cover", backgroundPosition: "center",
                    display: "flex", alignItems: "center", padding: "40px 44px"
                }}>
                    <div style={{ position: "relative", zIndex: 1, display: "flex", flexFlow: "column", width: "100%" }}>
                        <div className="flex flex-col gap-2 -bottom-16 absolute">
                            <img className="h-12 w-fit" src='/hero/hero0helper.png' />
                            <h1 style={{
                                fontFamily: "var(--font-pacifico)", fontSize: 52, width: "100%",
                                color: "white", lineHeight: 1.15, margin: "0 0 4px", fontWeight: 400
                            }}>
                                Fresh Organic
                            </h1>
                            <p style={{ fontSize: 22, fontWeight: 600, color: "#634C9F", margin: "0 0 6px" }}>
                                Food For All
                            </p>
                            <p style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", margin: "0 0 20px" }}>
                                $59.00
                            </p>
                        </div>

                        <button onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })} className="absolute top-24 w-fit" style={{
                            background: "#634C9F", color: "#fff", border: "none",
                            padding: "11px 26px", borderRadius: 800, fontSize: 14,
                            fontWeight: 600, cursor: "pointer"
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
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

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
