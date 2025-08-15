import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  Zap, 
  Palette, 
  Upload, 
  Download, 
  Shield, 
  Clock, 
  Users,
  Brush,
  Image,
  Video,
  Layers
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI智能增强",
      description: "使用最先进的AI算法，自动优化图像细节和质量",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Zap,
      title: "极速处理",
      description: "云端GPU加速，秒级完成图像处理任务",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Palette,
      title: "风格转换",
      description: "一键将照片转换为油画、水彩、卡通等多种艺术风格",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Brush,
      title: "智能修复",
      description: "自动去除瑕疵、修复老照片、增强细节",
      color: "text-neon-yellow",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: Image,
      title: "超分辨率",
      description: "AI放大技术，将小图无损放大至4K分辨率",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Video,
      title: "视频处理",
      description: "支持视频风格化、稳定、去噪等高级功能",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  const stats = [
    { icon: Users, value: "100K+", label: "活跃用户" },
    { icon: Clock, value: "99.9%", label: "服务可用性" },
    { icon: Upload, value: "50M+", label: "处理图片" },
    { icon: Shield, value: "企业级", label: "数据安全" }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* 标题部分 */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            强大的<span className="text-gradient">AI功能</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            集成多种前沿AI技术，为您提供专业级的图像处理体验
          </p>
        </div>

        {/* 功能网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass-effect border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-neon group animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 统计数据 */}
        <div className="glass-effect rounded-2xl p-8 border border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA部分 */}
        <div className="text-center mt-16">
          <Button variant="hero" size="xl" className="group">
            <Layers className="w-5 h-5 mr-2 group-hover:animate-spin" />
            立即体验所有功能
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;