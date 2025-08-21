import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Zap, Smartphone, Router, Monitor, Laptop } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 floating-particles bg-gradient-to-b from-black via-black to-slate-900">
      {/* 网络互联背景 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* 网络节点 */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-16 w-4 h-4 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-40 right-20 w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
        
        {/* 连接线 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{opacity: 0.3}}>
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4"/>
            </linearGradient>
          </defs>
          
          {/* 动态连接线 */}
          <path d="M 80 80 Q 300 200 500 160" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.6">
            <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0;0,100" dur="4s" repeatCount="indefinite"/>
          </path>
          <path d="M 200 400 Q 400 300 600 450" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.5">
            <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0;0,100" dur="6s" repeatCount="indefinite"/>
          </path>
          <path d="M 100 600 Q 400 500 700 300" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.4">
            <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0;0,100" dur="5s" repeatCount="indefinite"/>
          </path>
        </svg>
        
        {/* 数据流动粒子 */}
        <div className="absolute top-1/4 left-10 w-1 h-1 bg-primary rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-24 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* 主标题区 */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-card/50 rounded-full border border-primary/20 mb-6 glass-effect">
            <span className="text-sm text-primary font-medium">🎯 专为海外华人设计</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight text-white tracking-wider">
            倦鸟归巢 一键回国
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-[2.5]">
            专业的回国网络加速服务，让海外华人轻松访问国内所有网络服务
            <br className="hidden md:block mb-6" />
            <span className="text-primary font-semibold inline-block px-4 py-2 border border-primary/30 rounded-full bg-primary/10 mt-4">高速稳定 • 安全可靠 • 一键连接</span>
          </p>

          {/* CTA按钮 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 mt-12">
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
          <div className="flex flex-wrap justify-center items-center gap-16 text-sm text-muted-foreground">
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

        {/* 设备展示 */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-8 glass-effect border border-primary/20">
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