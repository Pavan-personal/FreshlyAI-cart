"use client";

export default function Footer() {
  return (
    <footer style={{ background: "#6B4C8A" }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr 1.2fr;
          gap: 32px;
        }
        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 64px;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px 24px;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>

      {/* Main footer */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 36px" }}>
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <span style={{ fontFamily: "var(--font-pacifico)", fontSize: 30, color: "#fff", display: "block", marginBottom: 22 }}>
              Freshly
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13L2 4" />
                </svg>
                info@freshily
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +1(564) 345-0987
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Follow us on social media:</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", color: '#1877F2' },
              { path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z", color: 'skyblue' },
              { path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01", color: 'red' },
              { path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z", color: '#0077B5' }
              ].map((d, i) => (
                <a key={i} href="#" style={{
                  width: 32, height: 32, borderRadius: "15%",
                  background: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", textDecoration: "none"
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" stroke={i == 2 ? 'red' : 'none'} strokeWidth={i == 2 ? '2.5' : 'none'} fill={i == 2 ? 'none' : d.color} strokeLinecap="round" strokeLinejoin="round">
                    <path d={d.path} />
                    {i === 2 && <rect x="2" y="2" width="20" height="20" rx="5" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 16, marginTop: 0 }}>About</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["About us", "Recipe", "Download", "Contact"].map((item) => (
                <li key={item}><a href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 16, marginTop: 0 }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Out Recipe", "Subscribe Us", "FAQ"].map((item) => (
                <li key={item}><a href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 16, marginTop: 0 }}>Support</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Account", "Support centre", "Feedback", "Accebility"].map((item) => (
                <li key={item}><a href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 16, marginTop: 0 }}>Get in Touch</h4>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              4517 Washington Ave.<br />
              Manchester,<br />
              Kentucky 39495
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", padding: "18px 0" }}>
        <div className="footer-bottom-bar" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: 0 }}>
            copyright. &#169; 2025 All right reserved
          </p>
          <img
            src="/payments-footer.webp"
            alt="Payment methods"
            style={{ height: 24, width: "auto", objectFit: "contain" }}
          />
        </div>
      </div>
    </footer>
  );
}
