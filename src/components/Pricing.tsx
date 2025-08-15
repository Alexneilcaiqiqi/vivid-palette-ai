import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  CreditCard,
  Smartphone,
  DollarSign
} from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "免费体验",
      price: "¥0",
      period: "/月",
      description: "适合初次体验的用户",
      features: [
        "每月10张图片处理",
        "基础AI增强功能",
        "720p输出分辨率",
        "社区支持",
        "基础风格转换"
      ],
      buttonText: "开始免费试用",
      variant: "outline" as const,
      popular: false
    },
    {
      name: "专业版",
      price: "¥99",
      period: "/月",
      description: "适合专业设计师和创作者",
      features: [
        "每月500张图片处理",
        "全部AI功能",
        "4K高清输出",
        "优先处理队列",
        "50+艺术风格",
        "批量处理",
        "专业技术支持",
        "无水印输出"
      ],
      buttonText: "选择专业版",
      variant: "hero" as const,
      popular: true
    },
    {
      name: "企业版",
      price: "¥299",
      period: "/月",
      description: "适合团队和企业用户",
      features: [
        "无限图片处理",
        "全部高级功能",
        "8K超高清输出",
        "API接口访问",
        "自定义模型训练",
        "团队协作功能",
        "24/7专属客服",
        "数据私有部署"
      ],
      buttonText: "联系销售",
      variant: "gradient" as const,
      popular: false
    }
  ];

  const paymentMethods = [
    { name: "支付宝", icon: Smartphone, color: "text-blue-500" },
    { name: "微信支付", icon: Smartphone, color: "text-green-500" },
    { name: "PayPal", icon: CreditCard, color: "text-blue-600" },
    { name: "Stripe", icon: DollarSign, color: "text-purple-500" }
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* 标题部分 */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            选择适合您的<span className="text-gradient">价格方案</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            灵活的定价选项，满足个人到企业的各种需求
          </p>
        </div>

        {/* 价格卡片 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative glass-effect border-border/50 hover:border-primary/30 transition-all duration-300 ${
                plan.popular ? 'border-primary/50 shadow-neon scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-neon text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  最受欢迎
                </Badge>
              )}
              
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.variant} 
                  size="lg" 
                  className="w-full"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 支付方式 */}
        <div className="text-center space-y-8">
          <h3 className="text-2xl font-bold">支持多种支付方式</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {paymentMethods.map((method, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 glass-effect px-6 py-3 rounded-full border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <method.icon className={`w-5 h-5 ${method.color}`} />
                <span className="font-medium">{method.name}</span>
              </div>
            ))}
          </div>

          <div className="glass-effect rounded-2xl p-8 border border-border/50 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h4 className="text-xl font-bold">企业级安全保障</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>SSL加密传输</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>PCI DSS认证</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>7天无理由退款</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <Button variant="floating" size="xl" className="group">
                  <Crown className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  立即升级账户
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;