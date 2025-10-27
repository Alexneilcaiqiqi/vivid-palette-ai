import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background floating-particles">
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
            <span className="text-white font-bold text-4xl">404</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">{t('notFound.title')}</span>
            <span className="text-gradient ml-3">{t('notFound.titleBrand')}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('notFound.subtitle')}
          </p>
        </div>
        
        <div className="space-y-4">
          <a 
            href="/" 
            className="inline-flex items-center px-8 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-neon-strong hover:scale-105 transition-all duration-300 font-medium"
          >
            {t('notFound.backHome')}
          </a>
          <p className="text-sm text-muted-foreground">
            {t('notFound.hint')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
