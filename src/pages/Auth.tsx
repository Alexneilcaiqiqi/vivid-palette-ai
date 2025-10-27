import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Zap, Globe } from "lucide-react";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

// 验证schema
const loginSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址").max(255),
  password: z.string().min(6, "密码至少6个字符"),
});

const registerSchema = z.object({
  username: z.string().trim().min(2, "用户名至少2个字符").max(50),
  email: z.string().email("请输入有效的邮箱地址").max(255),
  password: z.string().min(8, "密码至少8个字符").max(100),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "两次密码不一致",
  path: ["confirmPassword"],
});

const AuthPage = () => {
  const { t } = useLanguage();
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  });

  // 如果用户已登录，重定向到首页
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // 清除该字段的错误
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // 验证输入
      const validated = loginSchema.parse({
        email: formData.email,
        password: formData.password,
      });

      const { error } = await signIn(validated.email, validated.password);
      
      if (!error) {
        navigate('/');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // 验证输入
      const validated = registerSchema.parse(formData);

      const { error } = await signUp(
        validated.email,
        validated.password,
        validated.username
      );
      
      if (!error) {
        // 注册成功，清空表单
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          username: ""
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* 左侧信息 */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-foreground">{t('auth.joinTitle')}</span>
                  <span className="text-gradient ml-3">{t('auth.joinBrand')}</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('auth.subtitle')}
                </p>
              </div>

              {/* 特色功能 */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-feature-1 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t('auth.fastConnection')}</h3>
                    <p className="text-muted-foreground text-sm">{t('auth.fastDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-feature-2 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t('auth.militaryEncryption')}</h3>
                    <p className="text-muted-foreground text-sm">{t('auth.encryptionDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-feature-3 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t('auth.globalNodes')}</h3>
                    <p className="text-muted-foreground text-sm">{t('auth.nodesDesc')}</p>
                  </div>
                </div>
              </div>

              {/* 用户评价 */}
              <div className="space-y-4">
                <div className="p-6 bg-card/30 rounded-2xl border border-border/50">
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">5.0/5.0</span>
                  </div>
                  <p className="text-foreground mb-2">{t('auth.review1')}</p>
                  <p className="text-sm text-muted-foreground">{t('auth.reviewer1')}</p>
                </div>

                <div className="p-6 bg-card/30 rounded-2xl border border-border/50">
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">5.0/5.0</span>
                  </div>
                  <p className="text-foreground mb-2">{t('auth.review2')}</p>
                  <p className="text-sm text-muted-foreground">{t('auth.reviewer2')}</p>
                </div>
              </div>
            </div>

            {/* 右侧登录/注册表单 */}
            <div className="w-full max-w-md mx-auto">
              <Card className="bg-card/30 border-border/50 backdrop-blur-xl">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mx-auto mb-4">
                    <img src="/lovable-uploads/5b8e0c01-b116-40df-ace4-3794622b3737.png" alt="归巢" className="h-16" />
                  </div>
                  <CardTitle className="text-2xl">{t('auth.welcomeTitle')}</CardTitle>
                  <CardDescription>{t('auth.welcomeDesc')}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
                      <TabsTrigger value="register">{t('auth.register')}</TabsTrigger>
                    </TabsList>
                    
                    {/* 登录表单 */}
                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">{t('auth.email')}</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="login-email"
                              name="email"
                              type="email"
                              placeholder={t('auth.emailPlaceholder')}
                              value={formData.email}
                              onChange={handleInputChange}
                              className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                              required
                            />
                          </div>
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="login-password">{t('auth.password')}</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="login-password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder={t('auth.passwordPlaceholder')}
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
                          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-border" />
                            <span className="text-muted-foreground">{t('auth.rememberMe')}</span>
                          </label>
                          <a href="#" className="text-primary hover:underline">{t('auth.forgotPassword')}</a>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
                          disabled={isLoading}
                        >
                          {isLoading ? t('auth.loggingIn') : t('auth.loginButton')}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        
                        <p className="text-xs text-center text-muted-foreground mt-4">
                          {t('auth.agreeTerms1')}
                          <Link to="/terms" className="text-primary hover:underline ml-1">{t('auth.agreeTerms2')}</Link>
                          {t('auth.agreeTerms3')}
                          <Link to="/privacy" className="text-primary hover:underline ml-1">{t('auth.agreeTerms4')}</Link>
                        </p>
                      </form>
                    </TabsContent>
                    
                    {/* 注册表单 */}
                    <TabsContent value="register">
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-username">{t('auth.username')}</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="register-username"
                              name="username"
                              type="text"
                              placeholder={t('auth.usernamePlaceholder')}
                              value={formData.username}
                              onChange={handleInputChange}
                              className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                              required
                            />
                          </div>
                          {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="register-email">{t('auth.email')}</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="register-email"
                              name="email"
                              type="email"
                              placeholder={t('auth.emailPlaceholder')}
                              value={formData.email}
                              onChange={handleInputChange}
                              className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                              required
                            />
                          </div>
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="register-password">{t('auth.password')}</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="register-password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder={t('auth.passwordPlaceholder8')}
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
                          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">{t('auth.confirmPassword')}</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="confirm-password"
                              name="confirmPassword"
                              type="password"
                              placeholder={t('auth.confirmPasswordPlaceholder')}
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                              required
                            />
                          </div>
                          {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <input type="checkbox" className="rounded border-border mt-1" required />
                          <span className="text-sm text-muted-foreground">
                            {t('auth.readAgree')}
                            <Link to="/terms" className="text-primary hover:underline ml-1">{`《${t('auth.termsLink')}》`}</Link>
                            {t('auth.agreeTerms3')}
                            <Link to="/privacy" className="text-primary hover:underline ml-1">{`《${t('auth.privacyLink')}》`}</Link>
                          </span>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
                          disabled={isLoading}
                        >
                          {isLoading ? t('auth.registering') : t('auth.registerButton')}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
