import { Button } from "@/components/ui/button";
import { Check, Star, Crown, Zap } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "体验版",
      icon: <Zap className="w-6 h-6" />,
      price: "免费",
      period: "3天试用",
      description: "新用户专享，体验归巢服务",
      features: [
        "3天免费试用",
        "2台设备同时在线", 
        "基础线路访问",
        "标准客服支持",
        "1GB/天流量限制"
      ],
      buttonText: "立即试用",
      buttonVariant: "outline" as const,
      popular: false,
      gradient: "from-slate-500 to-gray-500"
    },
    {
      name: "标准版",
      icon: <Star className="w-6 h-6" />,
      price: "¥29",
      period: "/月",
      description: "个人用户推荐，性价比之选",
      features: [
        "5台设备同时在线",
        "高速专线访问",
        "无流量限制",
        "7x24客服支持",
        "全球50+节点",
        "智能路由优化"
      ],
      buttonText: "选择标准版",
      buttonVariant: "default" as const,
      popular: true,
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      name: "旗舰版", 
      icon: <Crown className="w-6 h-6" />,
      price: "¥59",
      period: "/月",
      description: "家庭/企业用户首选",
      features: [
        "10台设备同时在线",
        "VIP专属线路",
        "无限流量使用",
        "优先技术支持",
        "全球节点任选",
        "游戏加速优化",
        "独立IP可选",
        "远程技术支持"
      ],
      buttonText: "选择旗舰版",
      buttonVariant: "default" as const,
      popular: false,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* 标题部分 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-card/50 rounded-full border border-primary/20 mb-6 glass-effect">
            <span className="text-sm text-primary font-medium">💰 套餐价格</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">选择适合您的</span>
            <span className="text-gradient ml-3">套餐</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            灵活的价格方案，满足不同用户需求。支持微信、支付宝、USDT等多种支付方式
          </p>

          {/* 优惠提示 */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-primary/10 rounded-full border border-primary/30">
            <span className="text-primary font-medium">🎉 年付用户享8折优惠，可节省高达¥140</span>
          </div>
        </div>

        {/* 价格卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative group ${
                plan.popular 
                  ? 'scale-105 z-10' 
                  : 'hover:scale-105'
              } transition-all duration-500`}
            >
              {/* 最受欢迎标签 */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-primary px-4 py-1 rounded-full text-white text-sm font-medium">
                    🔥 最受欢迎
                  </div>
                </div>
              )}

              <div 
                className={`relative p-8 bg-card/30 rounded-2xl border transition-all duration-500 ${
                  plan.popular 
                    ? 'border-primary/50 shadow-cyan' 
                    : 'border-border/50 hover:border-primary/30'
                } hover-float`}
              >
                {/* 背景渐变 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>

                {/* 图标和标题 */}
                <div className="text-center mb-6">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${plan.gradient} rounded-xl text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                {/* 价格 */}
                <div className="text-center mb-8">
                  <div className="flex items-end justify-center">
                    <span className="text-4xl md:text-5xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-muted-foreground ml-1 mb-1">{plan.period}</span>
                  </div>
                </div>

                {/* 功能列表 */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* 按钮 */}
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:shadow-strong' 
                      : plan.buttonVariant === 'outline' 
                        ? 'border-primary/30 hover:bg-primary/10' 
                        : 'bg-gradient-to-br ' + plan.gradient + ' hover:shadow-strong'
                  } hover:scale-105 transition-all duration-300`}
                  variant={plan.popular ? "default" : plan.buttonVariant}
                  size="lg"
                >
                  <a href="/auth">{plan.buttonText}</a>
                </Button>

                {/* 悬浮光效 */}
                {plan.popular && (
                  <div className="absolute -inset-0.5 bg-gradient-primary opacity-20 rounded-2xl -z-10 blur"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 底部保障信息 */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-primary/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-primary font-bold text-xl">7</span>
              </div>
              <h4 className="font-semibold text-foreground mb-1">7天无忧退款</h4>
              <p className="text-muted-foreground text-sm">不满意随时退款</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-primary/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-primary font-bold text-xl">24</span>
              </div>
              <h4 className="font-semibold text-foreground mb-1">24小时客服</h4>
              <p className="text-muted-foreground text-sm">随时为您解答问题</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-primary/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-primary font-bold text-xl">∞</span>
              </div>
              <h4 className="font-semibold text-foreground mb-1">无限流量</h4>
              <p className="text-muted-foreground text-sm">畅享高速网络体验</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;