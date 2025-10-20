import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Zap, Smartphone, Router, Monitor, Laptop } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
const Hero = () => {
  return <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <img src={heroBackground} alt="Global Network" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/50"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* 主标题区 */}
        <div className="max-w-4xl mx-auto mb-20">          
          
          <h1 className="text-5xl md:text-7xl font-sans-sc font-light mb-6 leading-tight tracking-[0.2em] mt-[112px] bg-[linear-gradient(180deg,hsl(40_40%_85%),hsl(35_60%_60%))] bg-clip-text text-transparent">
            倦鸟归巢 一键回国
          </h1>
          
          <p className="text-base md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-[2.5]">
            专业的回国网络加速服务，让海外华人轻松访问国内所有网络服务
          </p>

          {/* 信任指标 */}
          <div className="flex flex-wrap justify-center items-center gap-16 text-sm text-muted-foreground mb-20 mt-4">
            <div className="flex items-center gap-4">
              <Shield className="w-4 h-4 text-muted-foreground scale-[2]" strokeWidth={1} />
              <div className="flex flex-col items-start">
                <span>企业级安全</span>
                <span className="text-xs opacity-70">Enterprise Security</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Zap className="w-4 h-4 text-muted-foreground scale-[2]" strokeWidth={1} />
              <div className="flex flex-col items-start">
                <span>毫秒级延迟</span>
                <span className="text-xs opacity-70">Ultra Low Latency</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="w-4 h-4 text-muted-foreground scale-[2]" strokeWidth={1} />
              <div className="flex flex-col items-start">
                <span>全球节点</span>
                <span className="text-xs opacity-70">Global Network</span>
              </div>
            </div>
          </div>

          <div className="mb-8 mt-[120px] my-[109px]">
            <span className="text-2xl inline-block border border-primary/30 rounded-full bg-primary/10 text-primary py-0 mx-[32px] px-[18px] my-[8px] font-medium">高速稳定 • 安全可靠 • 一键连接</span>
          </div>

          {/* CTA按钮 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center scale-[1.3] -mt-12">
            <Button size="xl" className="bg-gradient-primary hover:shadow-neon-strong hover:scale-105 transition-all duration-300 cyber-glow w-48">
              <a href="/auth">立即免费试用</a>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl" className="border-primary/30 hover:bg-primary/10 hover-float w-48">
              <a href="/download">下载客户端</a>
            </Button>
          </div>
        </div>

        {/* 设备展示 */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-12 glass-effect border border-primary/20 mt-[100px] scale-110">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
              {/* 支持的平台 */}
              {[{
              name: "Windows",
              icon: <Monitor className="w-8 h-8 text-foreground" strokeWidth={1.5} />,
              desc: "PC客户端",
              downloadUrl: null
            }, {
              name: "macOS",
              icon: <Laptop className="w-8 h-8 text-foreground" strokeWidth={1.5} />,
              desc: "Mac客户端",
              downloadUrl: null
            }, {
              name: "iOS",
              icon: <Smartphone className="w-8 h-8 text-foreground" strokeWidth={1.5} />,
              desc: "iPhone/iPad",
              downloadUrl: null
            }, {
              name: "Android",
              icon: <Smartphone className="w-8 h-8 text-foreground" strokeWidth={1.5} />,
              desc: "安卓手机",
              downloadUrl: "/android-app.apk"
            }, {
              name: "路由器",
              icon: <Router className="w-8 h-8 text-foreground" strokeWidth={1.5} />,
              desc: "全家共享",
              downloadUrl: null
            }, {
              name: "浏览器",
              icon: <Globe className="w-8 h-8 text-foreground" strokeWidth={1.5} />,
              desc: "免装插件",
              downloadUrl: null
            }].map((platform, index) => <div key={platform.name} className={`p-4 bg-card/30 rounded-xl border border-border/50 hover-float hover:border-primary/50 transition-all duration-300 ${platform.downloadUrl ? 'cursor-pointer' : ''}`} style={{
              animationDelay: `${index * 0.1}s`
            }} onClick={platform.downloadUrl ? () => window.open(platform.downloadUrl, '_blank') : undefined}>
                  <div className="text-3xl mb-2 flex justify-center">
                    {typeof platform.icon === 'string' ? platform.icon : platform.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{platform.name}</h3>
                  <p className="text-xs text-muted-foreground">{platform.desc}</p>
                  {platform.downloadUrl && <p className="text-xs text-primary mt-1">点击下载</p>}
                </div>)}
            </div>
          </div>

          {/* 悬浮特效元素 */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-8 w-8 h-8 bg-secondary/20 rounded-full blur-lg animate-pulse"></div>
        </div>

      </div>
    </section>;
};
export default Hero;