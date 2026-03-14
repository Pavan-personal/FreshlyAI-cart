import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Freshly - Grocery Store",
  description: "Fresh grocery delivered to your door",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pacifico.variable} antialiased`}>
        <CartProvider>
          {children}
          <Toaster position="bottom-right" toastOptions={{ duration: 2000, style: { borderRadius: 8, fontSize: 14 } }} />
        </CartProvider>
      </body>
    </html>
  );
}
