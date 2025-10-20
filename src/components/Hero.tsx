import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Zap, Smartphone, Router, Monitor, Laptop } from "lucide-react";
const Hero = () => {
  return <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 floating-particles" style={{ backgroundImage: 'url(/hero-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="首页英雄区">
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* 主标题区 */}
        <div className="max-w-4xl mx-auto mb-20">          
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-6 leading-tight tracking-[0.1em] md:tracking-[0.2em] mt-16 md:mt-[112px] bg-gradient-to-b from-[#F5E6BB] to-[#FFB472] bg-clip-text text-transparent" itemProp="headline">
            倦鸟归巢 一键回国
          </h1>
          
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed md:leading-[2.5] px-4" itemProp="description">专业的回国网络加速服务，让海外华人轻松访问国内网络资源</p>

          <div className="mb-6 md:mb-8 mt-12 md:mt-[200px]">
            <span className="text-sm sm:text-lg md:text-2xl font-semibold inline-block px-3 md:px-4 py-2 border border-primary/30 rounded-full bg-primary/10 text-primary">高速稳定 • 安全可靠 • 一键连接</span>
          </div>

          {/* 信任指标 */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16 text-sm text-muted-foreground mb-12 md:mb-20 mt-4 px-4">
            <div className="flex items-center gap-3 md:gap-4">
              <Shield className="w-4 h-4 text-muted-foreground scale-150 md:scale-[2]" strokeWidth={1} />
              <div className="flex flex-col items-start">
                <span className="text-xs sm:text-sm">企业级安全</span>
                <span className="text-[10px] sm:text-xs opacity-70">Enterprise Security</span>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <Zap className="w-4 h-4 text-muted-foreground scale-150 md:scale-[2]" strokeWidth={1} />
              <div className="flex flex-col items-start">
                <span className="text-xs sm:text-sm">毫秒级延迟</span>
                <span className="text-[10px] sm:text-xs opacity-70">Ultra Low Latency</span>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <Globe className="w-4 h-4 text-muted-foreground scale-150 md:scale-[2]" strokeWidth={1} />
              <div className="flex flex-col items-start">
                <span className="text-xs sm:text-sm">全球节点</span>
                <span className="text-[10px] sm:text-xs opacity-70">Global Network</span>
              </div>
            </div>
          </div>

          {/* CTA按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center scale-100 sm:scale-110 md:scale-[1.3] -mt-6 md:-mt-12 px-4">
            <Button size="lg" className="bg-gradient-to-r from-[#5DB5FF] via-[#7B8EFF] via-50% to-[#9B6FFF] shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:scale-105 active:shadow-[0_0_30px_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 w-full sm:w-48 text-white">
              <a href="/auth">立即免费试用</a>
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <Button variant="outline" size="lg" className="bg-gradient-to-b from-[#F5E6BB] to-[#FFB472] border-0 hover:opacity-90 hover-float hover:shadow-purple w-full sm:w-48 text-gray-900 hover:text-gray-900">
              <a href="/download">下载客户端</a>
            </Button>
          </div>
        </div>

        {/* 设备展示 */}
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="relative rounded-2xl p-4 sm:p-6 md:p-12 bg-black/60 border border-primary/30 mt-12 md:mt-[100px] scale-100 md:scale-110 hover:shadow-cyan transition-all duration-500">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {/* 支持的平台 */}
              {[{
              name: "Windows",
              icon: <Monitor className="w-8 h-8 text-white" strokeWidth={1.5} aria-hidden="true" />,
              desc: "PC客户端",
              downloadUrl: null
            }, {
              name: "macOS",
              icon: <Laptop className="w-8 h-8 text-white" strokeWidth={1.5} aria-hidden="true" />,
              desc: "Mac客户端",
              downloadUrl: null
            }, {
              name: "iOS",
              icon: <Smartphone className="w-8 h-8 text-white" strokeWidth={1.5} />,
              desc: "iPhone/iPad",
              downloadUrl: null
            }, {
              name: "Android",
              icon: <Smartphone className="w-8 h-8 text-white" strokeWidth={1.5} />,
              desc: "安卓手机",
              downloadUrl: "/android-app.apk"
            }, {
              name: "浏览器",
              icon: <Globe className="w-8 h-8 text-white" strokeWidth={1.5} />,
              desc: "Chrome插件",
              downloadUrl: null
            }].map((platform, index) => <div key={platform.name} className={`p-2 sm:p-3 md:p-4 bg-card/40 rounded-xl border border-primary/30 hover-float hover:border-primary/70 hover:shadow-purple transition-all duration-300 ${platform.downloadUrl ? 'cursor-pointer' : ''}`} style={{
              animationDelay: `${index * 0.1}s`
            }} onClick={platform.downloadUrl ? () => window.open(platform.downloadUrl, '_blank') : undefined}>
                  <div className="text-lg sm:text-2xl md:text-3xl mb-1 sm:mb-2 flex justify-center">
                    {typeof platform.icon === 'string' ? platform.icon : platform.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-xs sm:text-sm md:text-base">{platform.name}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{platform.desc}</p>
                  {platform.downloadUrl && <p className="text-[10px] sm:text-xs text-primary mt-1">点击下载</p>}
                </div>)}
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
    </section>;
};
export default Hero;