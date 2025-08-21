import { Shield, Zap, Globe, Users, Clock, HeadphonesIcon } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "极速连接",
      description: "采用最新加速技术，连接速度提升300%，观看4K视频无缓冲",
      highlight: "毫秒级延迟",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "军用级加密",
      description: "AES-256位加密技术，保护您的网络安全和隐私数据",
      highlight: "银行级安全",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "全球节点",
      description: "覆盖全球50+城市，智能选择最优线路，确保连接稳定",
      highlight: "50+节点",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "多设备支持",
      description: "一个账户支持10台设备同时使用，全家共享无忧",
      highlight: "10台设备",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "7x24在线",
      description: "99.9%服务可用性，全年无休为您提供稳定的网络服务",
      highlight: "99.9%稳定",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "专业客服",
      description: "中文技术支持团队，微信群实时答疑，问题快速解决",
      highlight: "中文支持",
      color: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-20 relative bg-black">
      <div className="container mx-auto px-4">
        {/* 标题部分 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-card/50 rounded-full border border-primary/20 mb-6 glass-effect">
            <span className="text-sm text-primary font-medium">⚡ 产品特色</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">为什么选择</span>
            <span className="text-gradient ml-3">归巢</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            专为海外华人打造的回国网络解决方案，让您在海外也能无缝享受国内的网络服务
          </p>
        </div>

        {/* 特色功能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 bg-card/30 rounded-2xl border border-border/50 hover-float hover:border-primary/50 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 背景渐变效果 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* 图标 */}
              <div className={`inline-flex p-3 bg-gradient-to-br ${feature.color} rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* 标题和描述 */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
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
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100万+", label: "用户信赖" },
              { number: "50+", label: "全球节点" },
              { number: "99.9%", label: "稳定运行" },
              { number: "24/7", label: "技术支持" }
            ].map((stat, index) => (
              <div key={stat.label} className="group">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;