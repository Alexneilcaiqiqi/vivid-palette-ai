import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Mail, MessageCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
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
              专为海外华人打造的回国网络加速服务，让您在海外也能无缝享受国内的网络体验。
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="hover-float">
                <MessageCircle className="w-4 h-4 mr-2" />
                微信群
              </Button>
              <Button variant="outline" size="sm" className="hover-float">
                <Mail className="w-4 h-4 mr-2" />
                邮箱
              </Button>
            </div>
          </div>

          {/* 产品服务 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">产品服务</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">产品特色</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">套餐价格</a></li>
              <li><Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">免费试用</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">节点状态</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">速度测试</a></li>
            </ul>
          </div>

          {/* 客户端下载 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">客户端下载</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Windows 客户端
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  macOS 客户端
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  iOS 应用
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Android 应用
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  网页版
                </Link>
              </li>
            </ul>
          </div>

          {/* 帮助支持 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">帮助支持</h4>
            <ul className="space-y-3 mb-6">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">使用教程</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">常见问题</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">联系客服</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">意见反馈</a></li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  服务条款
                </Link>
              </li>
            </ul>
            
            {/* 邮件订阅 */}
            <div>
              <h5 className="font-medium text-foreground mb-3">最新动态</h5>
              <div className="flex gap-2">
                <Input 
                  placeholder="输入邮箱地址" 
                  className="bg-card/50 border-border/50 focus:border-primary"
                />
                <Button size="sm" className="bg-gradient-primary hover:shadow-strong">
                  订阅
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © 2024 归巢 GuiChao.win. 保留所有权利。
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link 
                to="/privacy" 
                className="hover:text-primary transition-colors"
                onClick={() => window.scrollTo(0, 0)}
              >
                隐私政策
              </Link>
              <Link 
                to="/terms" 
                className="hover:text-primary transition-colors"
                onClick={() => window.scrollTo(0, 0)}
              >
                服务条款
              </Link>
              <a href="#" className="hover:text-primary transition-colors">Cookie政策</a>
            </div>
          </div>
          
          {/* 备案信息 */}
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>专业的海外华人回国网络服务提供商 | 让距离不再是障碍</p>
            <p className="mt-2">本网页是属于 HK Guichao Technology Co., Limited所拥有和全权使用</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;