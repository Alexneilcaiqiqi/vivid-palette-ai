import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Scenarios from "@/components/Scenarios";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
      <Header />
      <main className="space-y-16 md:space-y-24 lg:space-y-32" role="main">
        <Hero />
        <Features />
        <Scenarios />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
