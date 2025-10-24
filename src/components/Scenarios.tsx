import { Film, Trophy, Gamepad2, GraduationCap, Users, Radio } from "lucide-react";

const Scenarios = () => {
  const scenarios = [
    {
      icon: Film,
      title: "影音娱乐",
      description: "流畅观看国内视频平台，享受高清流媒体",
      gradientClass: "bg-gradient-feature-4"
    },
    {
      icon: Trophy,
      title: "体育赛事",
      description: "实时观看大陆体育赛事直播，不错过精彩瞬间",
      gradientClass: "bg-gradient-feature-4"
    },
    {
      icon: Gamepad2,
      title: "国服游戏",
      description: "降低游戏延迟，畅玩国服热门游戏",
      gradientClass: "bg-gradient-feature-4"
    },
    {
      icon: GraduationCap,
      title: "远程学习",
      description: "稳定连接大陆教育平台，在线学习无忧",
      gradientClass: "bg-gradient-feature-4"
    },
    {
      icon: Users,
      title: "办公会议",
      description: "高效跨境视频会议，团队协作更流畅",
      gradientClass: "bg-gradient-feature-4"
    },
    {
      icon: Radio,
      title: "达人直播",
      description: "高清流畅直播推流，内容创作更专业",
      gradientClass: "bg-gradient-feature-4"
    }
  ];

  return (
    <section 
      className="py-12 md:py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden mt-[-1000px] pt-32"
      aria-labelledby="scenarios-title"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none" />
      
      {/* 蓝色光晕装饰 */}
      <div className="absolute top-32 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* 标题区域 */}
        <header className="text-center mb-12 md:mb-16">
          <h2 
            id="scenarios-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient"
          >
            支持加速多种场景
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            无论是娱乐、学习还是工作，归巢为您提供全方位的加速支持
          </p>
        </header>

        {/* 场景卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <div
                key={index}
                className="group relative p-6 md:p-8 bg-card/40 rounded-2xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-500 hover:-translate-y-2"
              >
                {/* 背景渐变效果 */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-blue-500/30 rounded-2xl transition-all duration-500"></div>
                {/* 图标容器 - 苹果风格方形 */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-6 z-10">
                  {/* 外层光晕 */}
                  <div className={`absolute inset-0 ${scenario.gradientClass} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500`}></div>
                  {/* 图标主体 */}
                  <div className={`relative w-full h-full ${scenario.gradientClass} rounded-2xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm group-hover:scale-110 group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500`}>
                    {/* 内部高光 */}
                    <div className="absolute inset-0 bg-gradient-feature-4 opacity-20 rounded-2xl"></div>
                    {/* 图标 */}
                    <Icon className="w-full h-full text-white relative z-10" aria-hidden="true" />
                  </div>
                </div>

                {/* 文字内容 */}
                <h3 className="relative z-10 text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300">
                  {scenario.title}
                </h3>
                <p className="relative z-10 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {scenario.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Scenarios;
