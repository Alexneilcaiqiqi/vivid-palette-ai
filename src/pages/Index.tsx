import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ImageProcessor from "@/components/ImageProcessor";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <ImageProcessor />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
