import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import PortfolioScroll from "@/components/PortfolioScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black">
      <Preloader />
      <Navbar />
      <Hero />
      <PortfolioScroll />
      <Footer />
    </main>
  );
}
