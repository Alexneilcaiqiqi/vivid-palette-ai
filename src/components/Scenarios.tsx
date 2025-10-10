import { Film, Trophy, Gamepad2, GraduationCap, Users, Radio } from "lucide-react";

const Scenarios = () => {
  const scenarios = [
    {
      icon: Film,
      title: "影音娱乐",
      description: "流畅观看海外视频平台，享受高清流媒体体验",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Trophy,
      title: "体育赛事",
      description: "实时观看全球体育赛事直播，不错过精彩瞬间",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Gamepad2,
      title: "国服游戏",
      description: "降低游戏延迟，畅玩国服热门游戏",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: GraduationCap,
      title: "远程学习",
      description: "稳定连接全球教育平台，在线学习无忧",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: Users,
      title: "办公会议",
      description: "高效跨境视频会议，团队协作更流畅",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Radio,
      title: "达人直播",
      description: "高清流畅直播推流，内容创作更专业",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section 
      className="py-12 md:py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      aria-labelledby="scenarios-title"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* 标题区域 */}
        <header className="text-center mb-12 md:mb-16">
          <h2 
            id="scenarios-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
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
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                {/* 图标容器 - 苹果风格 */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-6">
                  {/* 外层光晕 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${scenario.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500`}></div>
                  {/* 图标主体 */}
                  <div className={`relative w-full h-full bg-gradient-to-br ${scenario.gradient} rounded-full p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm group-hover:scale-110 group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500`}>
                    {/* 内部高光 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
                    {/* 图标 */}
                    <Icon className="w-full h-full text-white relative z-10" aria-hidden="true" />
                  </div>
                </div>

                {/* 文字内容 */}
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
                  {scenario.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {scenario.description}
                </p>

                {/* 悬停效果光晕 */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${scenario.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Scenarios;
