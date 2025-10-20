import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="fixed top-0 left-0 right-0 z-50" role="banner">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="relative" aria-label="归巢首页">
            <div className="w-16 h-16 md:w-[120px] md:h-[120px] rounded-xl flex items-center justify-center relative overflow-hidden">
              <img src="/lovable-uploads/5b8e0c01-b116-40df-ace4-3794622b3737.png" alt="归巢 GuiChao - 海外华人回国网络加速服务Logo" className="w-full h-full object-contain" width="120" height="120" />
            </div>
          </Link>
          {/* Vertical separator - hidden on mobile */}
          <div className="hidden md:block h-8 w-px bg-muted-foreground/30 mx-4"></div>
          {/* Tagline - hidden on mobile */}
          <div className="hidden md:flex flex-col">
            <span className="text-sm text-white font-light tracking-[0.2em]">专为海外华人设计</span>
            <span className="text-[10px] text-white/70 font-light tracking-[0.1em]">Built for Chinese Abroad</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 tracking-wider ml-auto mr-8" role="navigation" aria-label="主导航">
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
          <Link to="/download" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">下载客户端</span>
            <span className="text-[10px] opacity-70">Download</span>
          </Link>
          <a href="#contact" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">联系我们</span>
            <span className="text-[10px] opacity-70">Contact</span>
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hover-float" asChild>
            <Link to="/auth">登录</Link>
          </Button>
          <Button variant="default" size="sm" className="bg-gradient-to-b from-[#5DB5FF] via-[#7B8EFF] via-75% to-[#9B6FFF] text-white shadow-cyan hover:shadow-purple hover:scale-105 transition-all duration-300" asChild>
            <Link to="/auth">免费试用</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden glass-effect border-t border-border/50">
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
            <Link to="/download" className="block py-2 text-foreground hover:text-primary transition-colors">
              下载客户端
            </Link>
            <a href="#contact" className="block py-2 text-foreground hover:text-primary transition-colors">
              联系我们
            </a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">登录</Link>
              </Button>
              <Button variant="default" size="sm" className="bg-gradient-to-b from-[#5DB5FF] via-[#7B8EFF] via-75% to-[#9B6FFF] text-white" asChild>
                <Link to="/auth">免费试用</Link>
              </Button>
            </div>
          </nav>
        </div>}
    </header>;
};
export default Header;