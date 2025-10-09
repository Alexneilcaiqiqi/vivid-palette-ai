import { Shield, Zap, Globe, Users, Clock, HeadphonesIcon } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "极速连接",
      description: "采用最新加速技术，连接速度提升300%，观看4K视频无缓冲",
      highlight: "毫秒级延迟",
      gradient: "bg-gradient-feature-1"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "军用级加密",
      description: "AES-256位加密技术，保护您的网络安全和隐私数据",
      highlight: "银行级安全",
      gradient: "bg-gradient-feature-2"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "全球节点",
      description: "覆盖全球50+城市，智能选择最优线路，确保连接稳定",
      highlight: "50+节点",
      gradient: "bg-gradient-feature-3"
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
      gradient: "bg-gradient-feature-5"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "专业客服",
      description: "中文技术支持团队，微信群实时答疑，问题快速解决",
      highlight: "中文支持",
      gradient: "bg-gradient-feature-6"
    }
  ];

  return (
    <section id="features" className="py-32 relative bg-black border-t border-border/20" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        {/* 标题部分 */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-card/50 rounded-full border border-primary/20 mb-6 glass-effect">
            <span className="text-sm text-primary font-medium">⚡ 产品特色</span>
          </div>
          
          <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 px-4">
            <span className="text-foreground">为什么选择</span>
            <span className="text-gradient ml-2 md:ml-3">归巢</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            专为海外华人打造的回国网络解决方案，让您在海外也能无缝享受国内的网络服务
          </p>
        </header>

        {/* 特色功能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-4 sm:p-5 md:p-6 bg-card/30 rounded-2xl border border-border/50 hover-float hover:border-primary/50 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 背景渐变效果 */}
              <div className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* 图标 */}
              <div className={`flex justify-center sm:justify-start mb-6`}>
                <div className={`inline-flex p-3 ${feature.gradient} rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
              </div>

              {/* 标题和描述 */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* 亮点标签 */}
              <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                {feature.highlight}
              </div>

              {/* 悬浮光效 */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 blur transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* 底部统计数据 */}
        <div className="mt-24">
          <div className="relative">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-3xl"></div>
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4">
              {[
                { number: "100万+", label: "用户信赖", icon: "👥", gradient: "bg-gradient-stat-1" },
                { number: "50+", label: "全球节点", icon: "🌍", gradient: "bg-gradient-stat-2" },
                { number: "99.9%", label: "稳定运行", icon: "⚡", gradient: "bg-gradient-stat-3" },
                { number: "24/7", label: "技术支持", icon: "🛡️", gradient: "bg-gradient-stat-4" }
              ].map((stat, index) => (
                <div key={stat.label} className="group relative">
                  {/* 卡片容器 */}
                  <div className="relative p-4 sm:p-6 md:p-8 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                    {/* 背景渐变光效 */}
                    <div className={`absolute inset-0 ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                    
                    {/* 图标 */}
                    <div className="text-3xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {stat.icon}
                    </div>
                    
                    {/* 数字 */}
                    <div className="relative">
                      <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${stat.gradient} bg-clip-text text-transparent mb-2 md:mb-3 group-hover:scale-110 transition-all duration-300`}>
                        {stat.number}
                      </div>
                      {/* 数字下划线装饰 */}
                      <div className={`w-8 sm:w-10 md:w-12 h-1 ${stat.gradient} rounded-full mx-auto mb-3 md:mb-4 opacity-60 group-hover:opacity-100 group-hover:w-12 sm:group-hover:w-14 md:group-hover:w-16 transition-all duration-300`}></div>
                    </div>
                    
                    {/* 标签 */}
                    <div className="text-foreground/80 font-medium text-sm sm:text-base md:text-lg group-hover:text-foreground transition-colors duration-300">
                      {stat.label}
                    </div>
                    
                    {/* 悬浮光效边框 */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-opacity duration-500"></div>
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