import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoSection from "@/components/PromoSection";
import BestSellers from "@/components/BestSellers";
import TrendingProducts from "@/components/TrendingProducts";
import BottomBanner from "@/components/BottomBanner";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column" }}>
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <PromoSection />
      <BestSellers />
      <TrendingProducts />
      <BottomBanner />
      <Footer />
      <ChatBot />
    </div>
  );
}
