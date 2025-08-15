import { Button } from "@/components/ui/button";
import { Upload, Sparkles, Zap, Star } from "lucide-react";
import heroImage from "@/assets/hero-ai-brain.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">AI图像处理革命</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                让<span className="text-gradient">创意</span>
                <br />
                照进现实
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                快速将您的草图转化为逼真的图像或高质量的视频，
                释放无限创意可能
              </p>
            </div>

            {/* 特色亮点 */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-full border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>AI智能增强</span>
              </div>
              <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-full border border-secondary/20">
                <Zap className="w-4 h-4 text-secondary" />
                <span>秒级处理</span>
              </div>
              <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-full border border-accent/20">
                <Upload className="w-4 h-4 text-accent" />
                <span>批量处理</span>
              </div>
            </div>

            {/* CTA按钮 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                <Upload className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                免费试用
              </Button>
              <Button variant="neon" size="xl">
                观看演示
              </Button>
            </div>

            {/* 信任指标 */}
            <div className="pt-8 space-y-2">
              <p className="text-sm text-muted-foreground">已有超过 100,000+ 用户选择我们</p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.9/5 用户评分</span>
              </div>
            </div>
          </div>

          {/* 右侧图片 */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="AI图像处理" 
                className="w-full h-auto rounded-2xl shadow-neon-strong border border-primary/20"
              />
              
              {/* 浮动装饰元素 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-neon rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-card rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
              
              {/* 处理状态模拟 */}
              <div className="absolute bottom-4 left-4 right-4 glass-effect rounded-lg p-4 border border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm">AI正在处理您的图像...</span>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-neon h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;