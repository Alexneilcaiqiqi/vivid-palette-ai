import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Globe, LogOut, Shield, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-[#0F0F0F]" : "bg-transparent"
      )} 
      role="banner"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="relative" aria-label="归巢首页">
            <div className="w-16 h-16 md:w-[120px] md:h-[120px] rounded-xl flex items-center justify-center relative overflow-hidden">
              <img 
                src="/lovable-uploads/5b8e0c01-b116-40df-ace4-3794622b3737.png" 
                alt="归巢 GuiChao - 海外华人回国网络加速服务Logo" 
                className="w-full h-full object-contain" 
                width="120" 
                height="120" 
              />
            </div>
          </Link>
          {/* Vertical separator - hidden on mobile */}
          <div className="hidden md:block h-8 w-px bg-muted-foreground/30 mx-4"></div>
          {/* Tagline - hidden on mobile */}
          <div className="hidden md:flex flex-col">
            <span className="text-sm text-white font-light tracking-[0.2em]">{t('header.tagline')}</span>
            <span className="text-[10px] text-white/70 font-light tracking-[0.1em]">{t('header.taglineEn')}</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 tracking-wider ml-auto mr-8" role="navigation" aria-label="主导航">
          <a href="/#home" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">{t('header.home')}</span>
            <span className="text-[10px] opacity-70">{t('header.homeEn')}</span>
          </a>
          <a href="/#features" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">{t('header.features')}</span>
            <span className="text-[10px] opacity-70">{t('header.featuresEn')}</span>
          </a>
          <a href="/#pricing" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">{t('header.pricing')}</span>
            <span className="text-[10px] opacity-70">{t('header.pricingEn')}</span>
          </a>
          <Link to="/download" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">{t('header.download')}</span>
            <span className="text-[10px] opacity-70">{t('header.downloadEn')}</span>
          </Link>
          <a href="/#contact" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">{t('header.contact')}</span>
            <span className="text-[10px] opacity-70">{t('header.contactEn')}</span>
          </a>
          <Link to="/research" className="px-4 py-2 rounded-xl text-muted-foreground hover:text-white hover:font-bold transition-all duration-300 relative group font-light flex flex-col items-center">
            <span className="text-sm">{t('research.navTitle')}</span>
            <span className="text-[10px] opacity-70">{t('research.navTitleEn')}</span>
          </Link>
        </nav>

        {/* Language Selector & CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Select value={language} onValueChange={(value) => setLanguage(value as 'zh' | 'zh-TW' | 'en')}>
            <SelectTrigger className="w-[120px] bg-card/50 border-primary/30">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/30">
              <SelectItem value="zh">简体中文</SelectItem>
              <SelectItem value="zh-TW">繁體中文</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
          
          {user ? (
            <>
              <Button variant="outline" size="sm" className="hover-float" asChild>
                <Link to="/profile">
                  <UserCircle className="w-4 h-4 mr-2" />
                  {t('header.accountManagement')}
                </Link>
              </Button>
              {isAdmin && (
                <Button variant="outline" size="sm" className="hover-float" asChild>
                  <Link to="/admin">
                    <Shield className="w-4 h-4 mr-2" />
                    后台管理
                  </Link>
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover-float"
                onClick={signOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('header.logout')}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hover-float" asChild>
                <Link to="/auth">{t('header.login')}</Link>
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-gradient-to-r from-[#5DB5FF] via-[#7B8EFF] to-[#9B6FFF] text-white shadow-cyan hover:shadow-purple hover:scale-105 transition-all duration-300" 
                asChild
              >
                <Link to="/auth">{t('header.freeTrial')}</Link>
              </Button>
            </>
          )}
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
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-border/50">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="/#home" className="block py-2 text-foreground hover:text-primary transition-colors">
              {t('header.home')}
            </a>
            <a href="/#features" className="block py-2 text-foreground hover:text-primary transition-colors">
              {t('header.features')}
            </a>
            <a href="/#pricing" className="block py-2 text-foreground hover:text-primary transition-colors">
              {t('header.pricing')}
            </a>
            <Link to="/download" className="block py-2 text-foreground hover:text-primary transition-colors">
              {t('header.download')}
            </Link>
            <a href="/#contact" className="block py-2 text-foreground hover:text-primary transition-colors">
              {t('header.contact')}
            </a>
            <Link to="/research" className="block py-2 text-foreground hover:text-primary transition-colors">
              {t('research.navTitle')}
            </Link>
            
            <div className="flex items-center space-x-2 py-2">
              <Globe className="w-4 h-4" />
              <Select value={language} onValueChange={(value) => setLanguage(value as 'zh' | 'zh-TW' | 'en')}>
                <SelectTrigger className="w-[120px] bg-card/50 border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary/30">
                  <SelectItem value="zh">简体中文</SelectItem>
                  <SelectItem value="zh-TW">繁體中文</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
              {user ? (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/profile">
                      <UserCircle className="w-4 h-4 mr-2" />
                      {t('header.accountManagement')}
                    </Link>
                  </Button>
                  {isAdmin && (
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/admin">
                        <Shield className="w-4 h-4 mr-2" />
                        后台管理
                      </Link>
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={signOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('header.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/auth">{t('header.login')}</Link>
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-gradient-to-r from-[#5DB5FF] via-[#7B8EFF] to-[#9B6FFF] text-white" 
                    asChild
                  >
                    <Link to="/auth">{t('header.freeTrial')}</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
