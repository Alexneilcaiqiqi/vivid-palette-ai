import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Zap, Smartphone, Router, Monitor, Laptop } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 floating-particles bg-gradient-to-b from-black via-black to-slate-900">
      <div className="container mx-auto px-4 relative z-10">
        {/* 主标题区 - 左右布局 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* 左侧内容 */}
          <div className="text-left">
            <div className="inline-flex items-center px-4 py-2 bg-card/50 rounded-full border border-primary/20 mb-6 glass-effect">
              <span className="text-sm text-primary font-medium">🎯 专为海外华人设计</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight text-white tracking-wider">
              倦鸟归巢 一键回国
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              专业的回国网络加速服务，让海外华人轻松访问国内所有网络服务
              <br className="hidden md:block mb-2" />
              <span className="text-primary font-semibold inline-block px-4 py-2 border border-primary/30 rounded-full bg-primary/10 mt-4">高速稳定 • 安全可靠 • 一键连接</span>
            </p>

            {/* CTA按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 mt-8">
              <Button 
                size="xl" 
                className="bg-gradient-primary hover:shadow-neon-strong hover:scale-105 transition-all duration-300 cyber-glow w-48"
              >
                <a href="/auth">立即免费试用</a>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="border-primary/30 hover:bg-primary/10 hover-float w-48"
              >
                <a href="/download">下载客户端</a>
              </Button>
            </div>

            {/* 信任指标 */}
            <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>企业级安全</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>毫秒级延迟</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span>全球节点</span>
              </div>
            </div>
          </div>

          {/* 右侧网络连接视觉元素 */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-96 glass-effect rounded-2xl border border-primary/20 p-8">
              {/* 中心节点 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-primary rounded-full shadow-neon-strong animate-pulse">
                <div className="absolute inset-2 border-2 border-white/30 rounded-full"></div>
                <div className="absolute inset-4 bg-white/20 rounded-full"></div>
              </div>

              {/* 连接线和节点 */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                const radius = 120;
                const x = Math.cos(angle) * radius + 50;
                const y = Math.sin(angle) * radius + 50;
                
                return (
                  <div key={i}>
                    {/* 连接线 */}
                    <div 
                      className="absolute w-0.5 bg-gradient-to-r from-primary/30 to-transparent origin-center"
                      style={{
                        top: '50%',
                        left: '50%',
                        width: `${radius}px`,
                        height: '1px',
                        transform: `rotate(${i * 45}deg) translateX(0)`,
                        background: `linear-gradient(90deg, hsl(var(--primary) / 0.4) 0%, transparent 100%)`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                    
                    {/* 外围节点 */}
                    <div 
                      className="absolute w-3 h-3 bg-primary/60 rounded-full animate-pulse"
                      style={{
                        top: `${y}%`,
                        left: `${x}%`,
                        transform: 'translate(-50%, -50%)',
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  </div>
                );
              })}

              {/* 数据流动效果 */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/40 rounded-full animate-ping"
                    style={{
                      top: `${20 + i * 10}%`,
                      left: `${15 + i * 12}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>

              {/* 网络状态指示器 */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>实时连接</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>稳定在线</span>
                </div>
              </div>
            </div>

            {/* 悬浮装饰元素 */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-lg animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/30 rounded-full blur-md animate-pulse"></div>
          </div>
        </div>

        {/* 设备展示 */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative rounded-2xl p-6 glass-effect border border-primary/20">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
              {/* 支持的平台 */}
              {[
                { name: "Windows", icon: <Monitor className="w-8 h-8 text-foreground" strokeWidth={1.5} />, desc: "PC客户端" },
                { name: "macOS", icon: <Laptop className="w-8 h-8 text-foreground" strokeWidth={1.5} />, desc: "Mac客户端" },
                { name: "iOS", icon: <img src="/lovable-uploads/245d7d96-4fe5-44ae-8811-373f42859b30.png" alt="iOS" className="w-8 h-8" />, desc: "iPhone/iPad" },
                { name: "Android", icon: <Smartphone className="w-8 h-8 text-foreground" strokeWidth={1.5} />, desc: "安卓手机" },
                { name: "路由器", icon: <Router className="w-8 h-8 text-foreground" strokeWidth={1.5} />, desc: "全家共享" },
                { name: "浏览器", icon: <Globe className="w-8 h-8 text-foreground" strokeWidth={1.5} />, desc: "免装插件" }
              ].map((platform, index) => (
                <div 
                  key={platform.name}
                  className="p-4 bg-card/30 rounded-xl border border-border/50 hover-float hover:border-primary/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl mb-2 flex justify-center">
                    {typeof platform.icon === 'string' ? platform.icon : platform.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{platform.name}</h3>
                  <p className="text-xs text-muted-foreground">{platform.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 悬浮特效元素 */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-8 w-8 h-8 bg-secondary/20 rounded-full blur-lg animate-pulse"></div>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;