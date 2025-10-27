import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Mail, MessageCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="relative py-32 border-t border-border/50 bg-gradient-to-b from-transparent to-card/5 overflow-hidden" id="contact" role="contentinfo">
      {/* 蓝色光晕装饰 */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* 主要内容 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* 品牌信息 */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Link to="/" aria-label="归巢首页">
                <img 
                  src="/lovable-uploads/5b8e0c01-b116-40df-ace4-3794622b3737.png" 
                  alt="归巢 GuiChao - 海外华人回国网络加速服务Logo" 
                  className="w-32 h-32 object-contain"
                  width="120" 
                  height="120" 
                />
              </Link>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('footer.brand')}
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="border-blue-400/20 hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-300">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('footer.wechatGroup')}
              </Button>
              <Button variant="outline" size="sm" className="border-blue-400/20 hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-300">
                <Mail className="w-4 h-4 mr-2" />
                {t('footer.email')}
              </Button>
            </div>
          </div>

          {/* 产品服务 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.products')}</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.features')}</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.pricing')}</a></li>
              <li><Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.freeTrial')}</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.nodeStatus')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.speedTest')}</a></li>
            </ul>
          </div>

          {/* 客户端下载 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.download')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  {t('footer.windowsClient')}
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  {t('footer.macosClient')}
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  {t('footer.iosApp')}
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  {t('footer.androidApp')}
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {t('footer.webVersion')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 帮助支持 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.support')}</h4>
            <ul className="space-y-3 mb-6">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.tutorial')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.faq')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.contactSupport')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.feedback')}</a></li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
            
            {/* 邮件订阅 */}
            <div>
              <h5 className="font-medium text-foreground mb-3">{t('footer.newsletter')}</h5>
              <div className="flex gap-2">
                <Input 
                  placeholder={t('footer.emailPlaceholder')} 
                  className="bg-card/50 border-blue-400/20 focus:border-blue-400/40 transition-colors duration-300"
                />
                <Button size="sm" className="bg-gradient-feature-4 text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                  {t('footer.subscribe')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              {t('footer.copyright')}
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link 
                to="/privacy" 
                className="hover:text-primary transition-colors"
                onClick={() => window.scrollTo(0, 0)}
              >
                {t('footer.privacy')}
              </Link>
              <Link 
                to="/terms" 
                className="hover:text-primary transition-colors"
                onClick={() => window.scrollTo(0, 0)}
              >
                {t('footer.terms')}
              </Link>
              <Link 
                to="/cookie" 
                className="hover:text-primary transition-colors"
                onClick={() => window.scrollTo(0, 0)}
              >
                {t('footer.cookie')}
              </Link>
            </div>
          </div>
          
          {/* 备案信息 */}
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>{t('footer.tagline')}</p>
            <p className="mt-2">{t('footer.ownership')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;