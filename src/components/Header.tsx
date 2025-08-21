import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">

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