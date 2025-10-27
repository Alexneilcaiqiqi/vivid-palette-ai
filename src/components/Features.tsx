import { Shield, Zap, Globe, Users, Clock, HeadphonesIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('features.speed'),
      description: t('features.speedDesc'),
      highlight: t('features.speedHighlight'),
      gradient: "bg-gradient-feature-4"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('features.encryption'),
      description: t('features.encryptionDesc'),
      highlight: t('features.encryptionHighlight'),
      gradient: "bg-gradient-feature-4"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('features.nodes'),
      description: t('features.nodesDesc'),
      highlight: t('features.nodesHighlight'),
      gradient: "bg-gradient-feature-4"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('features.devices'),
      description: t('features.devicesDesc'),
      highlight: t('features.devicesHighlight'),
      gradient: "bg-gradient-feature-4"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('features.uptime'),
      description: t('features.uptimeDesc'),
      highlight: t('features.uptimeHighlight'),
      gradient: "bg-gradient-feature-4"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: t('features.support'),
      description: t('features.supportDesc'),
      highlight: t('features.supportHighlight'),
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
      
      <div className="container mx-auto px-4 relative z-20 mt-[-100px]">
        {/* 标题部分 */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#5DB5FF] via-[#7B8EFF] via-50% to-[#9B6FFF] rounded-full border border-white/30 mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <span className="text-sm text-white font-medium">{t('features.badge')}</span>
          </div>
          
          <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 px-4">
            <span className="text-gradient">{t('features.title')}</span>
            <span className="text-gradient ml-2 md:ml-3">{t('features.titleBrand')}</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto px-4">
            {t('features.subtitle')}
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
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 md:gap-16 px-4 font-inter">
              {[
                { number: t('features.stat1'), label: t('features.stat1Label'), labelEn: t('features.stat1En'), gradient: "bg-gradient-stat-1" },
                { number: t('features.stat2'), label: t('features.stat2Label'), labelEn: t('features.stat2En'), gradient: "bg-gradient-stat-2" },
                { number: t('features.stat3'), label: t('features.stat3Label'), labelEn: t('features.stat3En'), gradient: "bg-gradient-stat-3" },
                { number: t('features.stat4'), label: t('features.stat4Label'), labelEn: t('features.stat4En'), gradient: "bg-gradient-stat-4" }
              ].map((stat, index) => (
                <div key={stat.label} className="group relative text-center border-r border-foreground/10 last:border-r-0 px-4 md:px-6">
                  {/* 数字 */}
                  <div className="relative mb-3">
                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light bg-clip-text text-transparent group-hover:scale-105 transition-all duration-500 tracking-tight ${stat.gradient} group-hover:bg-gradient-feature-4`}>
                      {stat.number}
                    </div>
                  </div>
                  
                  {/* 标签 */}
                  <div className="space-y-1">
                    <div className="text-foreground/80 font-medium text-sm sm:text-base md:text-lg group-hover:text-foreground transition-colors duration-300">
                      {stat.label}
                    </div>
                    <div className="text-foreground/60 font-normal text-xs tracking-wide uppercase">
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
