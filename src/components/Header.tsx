import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-xl font-bold text-gradient">慧潮.org</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-foreground hover:text-primary transition-colors">
            首页
          </a>
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            功能
          </a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
            价格
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            联系
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            登录
          </Button>
          <Button variant="hero" size="sm" className="hidden sm:inline-flex">
            开始使用
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;