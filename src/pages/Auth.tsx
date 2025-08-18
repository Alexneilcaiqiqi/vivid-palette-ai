import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Zap, Globe } from "lucide-react";

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: 实现登录逻辑
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: 实现注册逻辑
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* 左侧信息 */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-foreground">加入</span>
                <span className="text-gradient ml-3">归巢</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                专为海外华人打造的回国网络加速服务，让您在海外也能无缝享受国内的网络体验。
              </p>
            </div>

            {/* 特色功能 */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">极速连接</h3>
                  <p className="text-muted-foreground text-sm">毫秒级延迟，4K视频无缓冲</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">军用级加密</h3>
                  <p className="text-muted-foreground text-sm">AES-256位加密，保护隐私安全</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">全球节点</h3>
                  <p className="text-muted-foreground text-sm">覆盖50+城市，智能路由优化</p>
                </div>
              </div>
            </div>

            {/* 用户评价 */}
            <div className="p-6 bg-card/30 rounded-2xl border border-border/50">
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">5.0/5.0</span>
              </div>
              <p className="text-foreground mb-2">"归巢真的太好用了！连接速度超快，看国内视频完全没问题。"</p>
              <p className="text-sm text-muted-foreground">- 来自美国的用户 张先生</p>
            </div>
          </div>

          {/* 右侧登录/注册表单 */}
          <div className="w-full max-w-md mx-auto">
            <Card className="bg-card/30 border-border/50 backdrop-blur-xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">归</span>
                </div>
                <CardTitle className="text-2xl">欢迎使用归巢</CardTitle>
                <CardDescription>请登录或注册您的账号</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">登录</TabsTrigger>
                    <TabsTrigger value="register">注册</TabsTrigger>
                  </TabsList>
                  
                  {/* 登录表单 */}
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">邮箱</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder="请输入邮箱地址"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="login-password">密码</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="login-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="请输入密码"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-border" />
                          <span className="text-muted-foreground">记住我</span>
                        </label>
                        <a href="#" className="text-primary hover:underline">忘记密码？</a>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
                        disabled={isLoading}
                      >
                        {isLoading ? "登录中..." : "登录"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  </TabsContent>
                  
                  {/* 注册表单 */}
                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-username">用户名</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="register-username"
                            name="username"
                            type="text"
                            placeholder="请输入用户名"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-email">邮箱</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="register-email"
                            name="email"
                            type="email"
                            placeholder="请输入邮箱地址"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-password">密码</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="register-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="请输入密码（至少8位）"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary"
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">确认密码</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            placeholder="请再次输入密码"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <input type="checkbox" className="rounded border-border mt-1" required />
                        <span className="text-sm text-muted-foreground">
                          我已阅读并同意
                          <a href="#" className="text-primary hover:underline ml-1">《用户协议》</a>
                          和
                          <a href="#" className="text-primary hover:underline ml-1">《隐私政策》</a>
                        </span>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
                        disabled={isLoading}
                      >
                        {isLoading ? "注册中..." : "注册账号"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
                
                {/* 第三方登录 */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-card text-muted-foreground">或</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button variant="outline" className="w-full border-border/50 hover:bg-background/50">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      使用 Google 登录
                    </Button>
                    
                    <Button variant="outline" className="w-full border-border/50 hover:bg-background/50">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.751-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.986C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                      使用微信登录
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;