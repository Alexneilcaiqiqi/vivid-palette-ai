import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin,
  Heart
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: "功能特性", href: "#features" },
      { name: "价格方案", href: "#pricing" },
      { name: "API文档", href: "#" },
      { name: "更新日志", href: "#" }
    ],
    company: [
      { name: "关于我们", href: "#" },
      { name: "加入我们", href: "#" },
      { name: "新闻资讯", href: "#" },
      { name: "合作伙伴", href: "#" }
    ],
    support: [
      { name: "帮助中心", href: "#" },
      { name: "联系客服", href: "#" },
      { name: "社区论坛", href: "#" },
      { name: "状态页面", href: "#" }
    ],
    legal: [
      { name: "服务条款", href: "#" },
      { name: "隐私政策", href: "#" },
      { name: "Cookie政策", href: "#" },
      { name: "免责声明", href: "#" }
    ]
  };

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 主要内容区域 */}
        <div className="py-16 grid lg:grid-cols-5 gap-8">
          {/* 品牌信息 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-gradient">慧潮.org</span>
            </div>
            
            <p className="text-muted-foreground max-w-md">
              专业的AI图像处理平台，致力于为用户提供最先进的人工智能图像增强和创作工具。
            </p>

            {/* 联系信息 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@huichao.org</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>400-888-8888</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>北京市朝阳区科技园区</span>
              </div>
            </div>

            {/* 社交媒体 */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 链接部分 */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">产品</h3>
              <ul className="space-y-2">
                {links.product.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">公司</h3>
              <ul className="space-y-2">
                {links.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">支持</h3>
              <ul className="space-y-2">
                {links.support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">法律</h3>
              <ul className="space-y-2">
                {links.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 邮件订阅 */}
        <div className="py-8 border-t border-border/50">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">订阅我们的动态</h3>
              <p className="text-sm text-muted-foreground">
                获取最新功能更新和AI技术资讯
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Input 
                placeholder="输入您的邮箱地址" 
                className="flex-1"
              />
              <Button variant="gradient">
                订阅
              </Button>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} 慧潮.org. 保留所有权利.
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by 慧潮团队</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;