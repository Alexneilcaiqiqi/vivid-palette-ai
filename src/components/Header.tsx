import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between bg-black">
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
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-foreground hover:text-primary transition-colors duration-300 relative group">
            首页
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#features" className="text-foreground hover:text-primary transition-colors duration-300 relative group">
            产品特色
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-colors duration-300 relative group">
            套餐价格
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/download" className="text-foreground hover:text-primary transition-colors duration-300 relative group">
            下载客户端
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors duration-300 relative group">
            联系我们
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hover-float">
            <a href="/auth">登录</a>
          </Button>
          <Button variant="default" size="sm" className="bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300">
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