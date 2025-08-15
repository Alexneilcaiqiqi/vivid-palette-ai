import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  Download, 
  Sparkles, 
  Wand2, 
  Image as ImageIcon,
  Loader2,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageProcessor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProcessed(false);
      
      toast({
        title: "图片已上传",
        description: `已选择文件: ${file.name}`,
      });
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) return;
    
    setProcessing(true);
    
    // 模拟AI处理过程
    setTimeout(() => {
      setProcessing(false);
      setProcessed(true);
      toast({
        title: "处理完成！",
        description: "您的图片已经过AI增强处理",
      });
    }, 3000);
  };

  const processStyles = [
    { id: "enhance", name: "智能增强", icon: Sparkles },
    { id: "artistic", name: "艺术风格", icon: Wand2 },
    { id: "upscale", name: "超分辨率", icon: ImageIcon },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-card/50 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            AI图像<span className="text-gradient">处理工具</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            上传您的图片，体验强大的AI处理能力
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 上传区域 */}
          <Card className="glass-effect border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-primary" />
                <span>上传图片</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file-upload">选择图片文件</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md"
                />
              </div>

              {/* 预览区域 */}
              {previewUrl && (
                <div className="space-y-4">
                  <div className="relative">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-lg border border-border/50"
                    />
                    {processing && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                        <div className="text-center space-y-2">
                          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                          <p className="text-sm">AI正在处理中...</p>
                        </div>
                      </div>
                    )}
                    {processed && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                    )}
                  </div>

                  {/* 处理选项 */}
                  <div className="space-y-4">
                    <Label>选择处理方式</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {processStyles.map((style) => (
                        <Button
                          key={style.id}
                          variant="outline"
                          className="justify-start h-auto p-4 hover:bg-primary/10 hover:border-primary/50"
                        >
                          <style.icon className="w-4 h-4 mr-3 text-primary" />
                          <div className="text-left">
                            <div className="font-medium">{style.name}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* 处理按钮 */}
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    onClick={handleProcess}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        处理中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        开始AI处理
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 处理结果 */}
          <Card className="glass-effect border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                <span>处理结果</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedFile ? (
                <div className="h-64 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2 text-muted-foreground">
                    <Upload className="w-12 h-12 mx-auto opacity-50" />
                    <p>请先上传图片</p>
                  </div>
                </div>
              ) : processed ? (
                <div className="space-y-4">
                  <img 
                    src={previewUrl} 
                    alt="Processed" 
                    className="w-full h-64 object-cover rounded-lg border border-primary/20 shadow-neon"
                  />
                  <Button variant="gradient" size="lg" className="w-full">
                    <Download className="w-5 h-5 mr-2" />
                    下载处理后的图片
                  </Button>
                </div>
              ) : (
                <div className="h-64 border border-border/50 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2 text-muted-foreground">
                    <Sparkles className="w-12 h-12 mx-auto opacity-50" />
                    <p>等待AI处理</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ImageProcessor;