import { Shield, Zap, Globe, Users, Clock, HeadphonesIcon } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "极速连接",
      description: "采用最新加速技术，连接速度提升300%，观看4K视频无缓冲",
      highlight: "毫秒级延迟",
      gradient: "bg-gradient-feature-4"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "军用级加密",
      description: "AES-256位加密技术，保护您的网络安全和隐私数据",
      highlight: "银行级安全",
      gradient: "bg-gradient-feature-4"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "全球节点",
      description: "覆盖全球50+城市，智能选择最优线路，确保连接稳定",
      highlight: "50+节点",
      gradient: "bg-gradient-feature-4"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "多设备支持",
      description: "一个账户支持10台设备同时使用，全家共享无忧",
      highlight: "10台设备",
      gradient: "bg-gradient-feature-4"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "7x24在线",
      description: "99.9%服务可用性，全年无休为您提供稳定的网络服务",
      highlight: "99.9%稳定",
      gradient: "bg-gradient-feature-4"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "专业客服",
      description: "中文技术支持团队，微信群实时答疑，问题快速解决",
      highlight: "中文支持",
      gradient: "bg-gradient-feature-4"
    }
  ];

  return (
    <section id="features" className="py-32 relative overflow-hidden" aria-labelledby="features-heading">
      {/* 顶部渐变蒙版 - 与首页自然衔接 */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#0F0F0F]/40 via-[#0F0F0F]/20 to-transparent pointer-events-none z-0"></div>
      
      {/* 蓝色光晕装饰 */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-20">
        {/* 标题部分 */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#5DB5FF] via-[#7B8EFF] via-50% to-[#9B6FFF] rounded-full border border-white/30 mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <span className="text-sm text-white font-medium">⚡ 产品特色</span>
          </div>
          
          <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 px-4">
            <span className="text-gradient">为什么选择</span>
            <span className="text-gradient ml-2 md:ml-3">归巢</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto px-4">
            专为海外华人打造的回国网络解决方案，让您在海外也能无缝享受国内的网络服务
          </p>
        </header>

        {/* 特色功能网格 */}
        <div className="relative z-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-4 sm:p-5 md:p-6 bg-card/40 rounded-2xl border border-blue-400/20 hover:-translate-y-2 hover:border-blue-400/40 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 背景渐变效果增强 */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-blue-500/30 rounded-2xl transition-all duration-500"></div>
              
              {/* 图标 - 苹果风格方形增强版 */}
              <div className={`flex justify-center sm:justify-start mb-6`}>
                <div className="relative">
                  {/* 图标容器 - 更大圆角 */}
                  <div className={`relative inline-flex p-5 ${feature.gradient} rounded-[20px] text-white backdrop-blur-sm group-hover:scale-110 group-hover:rotate-2 transition-all duration-500`}>
                    <div className="absolute inset-0 bg-white/20 rounded-[20px]"></div>
                    <div className="relative drop-shadow-lg">
                      {feature.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* 标题和描述 */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-sm sm:text-base text-foreground/70 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* 亮点标签 */}
              <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                {feature.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* 底部统计数据 */}
        <div className="mt-32">
          <div className="relative">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-3xl"></div>
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-16 md:gap-20 px-4 font-inter">
              {[
                { number: "1M+", label: "用户信赖", labelEn: "Active Users", gradient: "bg-gradient-stat-1" },
                { number: "50+", label: "全球节点", labelEn: "Global Nodes", gradient: "bg-gradient-stat-2" },
                { number: "99.9%", label: "稳定运行", labelEn: "Uptime SLA", gradient: "bg-gradient-stat-3" },
                { number: "24/7", label: "技术支持", labelEn: "Support", gradient: "bg-gradient-stat-4" }
              ].map((stat, index) => (
                <div key={stat.label} className="group relative text-center">
                  {/* 数字 */}
                  <div className="relative mb-4">
                    <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light bg-clip-text text-transparent group-hover:scale-105 transition-all duration-500 tracking-tight ${stat.gradient} group-hover:bg-gradient-feature-4`}>
                      {stat.number}
                    </div>
                  </div>
                  
                  {/* 标签 */}
                  <div className="space-y-1">
                    <div className="text-foreground/80 font-medium text-base sm:text-lg md:text-xl group-hover:text-foreground transition-colors duration-300">
                      {stat.label}
                    </div>
                    <div className="text-foreground/60 font-normal text-xs sm:text-sm tracking-wide uppercase">
                      {stat.labelEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;