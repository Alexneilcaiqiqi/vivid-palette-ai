import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="relative">
            <div className="w-[120px] h-[120px] rounded-xl flex items-center justify-center relative overflow-hidden">
              <img 
                src="/lovable-uploads/5b8e0c01-b116-40df-ace4-3794622b3737.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          {/* Vertical separator */}
          <div className="h-8 w-px bg-muted-foreground/30 mx-4"></div>
          {/* Tagline */}
          <div className="flex flex-col">
            <span className="text-sm text-white font-light tracking-[0.2em]">专为海外华人设计</span>
            <span className="text-[10px] text-white/70 font-light tracking-[0.1em]">Built for Chinese Abroad</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 tracking-wider ml-auto mr-8">
          <a href="#home" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">首页</span>
            <span className="text-[10px] opacity-70">Home</span>
          </a>
          <a href="#features" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">产品特色</span>
            <span className="text-[10px] opacity-70">Features</span>
          </a>
          <a href="#pricing" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">套餐价格</span>
            <span className="text-[10px] opacity-70">Pricing</span>
          </a>
          <a href="/download" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">下载客户端</span>
            <span className="text-[10px] opacity-70">Download</span>
          </a>
          <a href="#contact" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">联系我们</span>
            <span className="text-[10px] opacity-70">Contact</span>
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hover-float">
            <a href="/auth">登录</a>
          </Button>
          <Button variant="default" size="sm" className="bg-gradient-primary text-white shadow-neon hover:shadow-neon-strong hover:scale-105 transition-all duration-300">
            <a href="/auth">免费试用</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-border/50">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="#home" className="block py-2 text-foreground hover:text-primary transition-colors">
              首页
            </a>
            <a href="#features" className="block py-2 text-foreground hover:text-primary transition-colors">
              产品特色
            </a>
            <a href="#pricing" className="block py-2 text-foreground hover:text-primary transition-colors">
              套餐价格
            </a>
            <a href="/download" className="block py-2 text-foreground hover:text-primary transition-colors">
              下载客户端
            </a>
            <a href="#contact" className="block py-2 text-foreground hover:text-primary transition-colors">
              联系我们
            </a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
              <Button variant="ghost" size="sm">
                <a href="/auth">登录</a>
              </Button>
              <Button variant="default" size="sm" className="bg-gradient-primary">
                <a href="/auth">免费试用</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;