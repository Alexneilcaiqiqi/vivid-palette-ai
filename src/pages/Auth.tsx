import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Zap, Globe, Phone, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// 验证schema
const emailPasswordSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址").max(255),
  password: z.string().min(6, "密码至少6个字符"),
});

const phoneSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{6,14}$/, "请输入有效的手机号码"),
});

const emailOtpSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址").max(255),
});

const otpSchema = z.object({
  otp: z.string().length(6, "验证码为6位数字"),
});

const registerSchema = z.object({
  username: z.string().trim().min(2, "用户名至少2个字符").max(50),
});

type LoginMethod = 'email-password' | 'phone-otp' | 'email-otp';
type RegisterMethod = 'phone' | 'email';

const AuthPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 登录相关状态
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email-password');
  const [loginStep, setLoginStep] = useState<'input' | 'otp'>('input');
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    phone: "",
    otp: ""
  });
  
  // 注册相关状态
  const [registerMethod, setRegisterMethod] = useState<RegisterMethod>('phone');
  const [registerStep, setRegisterStep] = useState<'input' | 'otp'>('input');
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    phone: "",
    otp: ""
  });
  
  // 验证码倒计时
  const [countdown, setCountdown] = useState(0);

  // 如果用户已登录，重定向到首页
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // 倒计时
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  // 发送登录验证码
  const sendLoginOtp = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      if (loginMethod === 'phone-otp') {
        phoneSchema.parse({ phone: loginData.phone });
        const { error } = await supabase.auth.signInWithOtp({
          phone: loginData.phone,
        });
        if (error) throw error;
        toast({ title: "验证码已发送", description: "请查看手机短信" });
      } else if (loginMethod === 'email-otp') {
        emailOtpSchema.parse({ email: loginData.email });
        const { error } = await supabase.auth.signInWithOtp({
          email: loginData.email,
        });
        if (error) throw error;
        toast({ title: "验证码已发送", description: "请查看邮箱" });
      }
      setLoginStep('otp');
      setCountdown(60);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast({ title: "发送失败", description: error.message, variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 验证登录OTP
  const verifyLoginOtp = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      otpSchema.parse({ otp: loginData.otp });
      
      let result;
      if (loginMethod === 'phone-otp') {
        result = await supabase.auth.verifyOtp({
          phone: loginData.phone,
          token: loginData.otp,
          type: 'sms',
        });
      } else {
        result = await supabase.auth.verifyOtp({
          email: loginData.email,
          token: loginData.otp,
          type: 'email',
        });
      }
      
      if (result.error) throw result.error;
      toast({ title: "登录成功" });
      navigate('/');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast({ title: "验证失败", description: error.message, variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 邮箱密码登录
  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validated = emailPasswordSchema.parse({
        email: loginData.email,
        password: loginData.password,
      });

      const { error } = await supabase.auth.signInWithPassword({
        email: validated.email,
        password: validated.password,
      });
      
      if (error) throw error;
      toast({ title: "登录成功" });
      navigate('/');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast({ title: "登录失败", description: error.message, variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 发送注册验证码
  const sendRegisterOtp = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      registerSchema.parse({ username: registerData.username });
      
      if (registerMethod === 'phone') {
        phoneSchema.parse({ phone: registerData.phone });
        const { error } = await supabase.auth.signInWithOtp({
          phone: registerData.phone,
          options: {
            data: { username: registerData.username },
          },
        });
        if (error) throw error;
        toast({ title: "验证码已发送", description: "请查看手机短信" });
      } else {
        emailOtpSchema.parse({ email: registerData.email });
        const { error } = await supabase.auth.signInWithOtp({
          email: registerData.email,
          options: {
            data: { username: registerData.username },
          },
        });
        if (error) throw error;
        toast({ title: "验证码已发送", description: "请查看邮箱" });
      }
      setRegisterStep('otp');
      setCountdown(60);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast({ title: "发送失败", description: error.message, variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 验证注册OTP
  const verifyRegisterOtp = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      otpSchema.parse({ otp: registerData.otp });
      
      let result;
      if (registerMethod === 'phone') {
        result = await supabase.auth.verifyOtp({
          phone: registerData.phone,
          token: registerData.otp,
          type: 'sms',
        });
      } else {
        result = await supabase.auth.verifyOtp({
          email: registerData.email,
          token: registerData.otp,
          type: 'email',
        });
      }
      
      if (result.error) throw result.error;
      toast({ title: "注册成功" });
      navigate('/');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast({ title: "验证失败", description: error.message, variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 重置登录流程
  const resetLoginFlow = () => {
    setLoginStep('input');
    setLoginData({ email: "", password: "", phone: "", otp: "" });
    setErrors({});
  };

  // 重置注册流程
  const resetRegisterFlow = () => {
    setRegisterStep('input');
    setRegisterData({ username: "", email: "", phone: "", otp: "" });
    setErrors({});
  };

  // 渲染登录方式选择
  const renderLoginMethodTabs = () => (
    <div className="flex gap-2 mb-4">
      <Button
        type="button"
        variant={loginMethod === 'email-password' ? 'default' : 'outline'}
        size="sm"
        onClick={() => { setLoginMethod('email-password'); resetLoginFlow(); }}
        className={loginMethod === 'email-password' ? 'bg-gradient-primary' : ''}
      >
        <Lock className="w-4 h-4 mr-1" />
        密码登录
      </Button>
      <Button
        type="button"
        variant={loginMethod === 'phone-otp' ? 'default' : 'outline'}
        size="sm"
        onClick={() => { setLoginMethod('phone-otp'); resetLoginFlow(); }}
        className={loginMethod === 'phone-otp' ? 'bg-gradient-primary' : ''}
      >
        <Phone className="w-4 h-4 mr-1" />
        手机登录
      </Button>
      <Button
        type="button"
        variant={loginMethod === 'email-otp' ? 'default' : 'outline'}
        size="sm"
        onClick={() => { setLoginMethod('email-otp'); resetLoginFlow(); }}
        className={loginMethod === 'email-otp' ? 'bg-gradient-primary' : ''}
      >
        <MessageSquare className="w-4 h-4 mr-1" />
        验证码登录
      </Button>
    </div>
  );

  // 渲染登录表单
  const renderLoginForm = () => {
    if (loginMethod === 'email-password') {
      return (
        <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">邮箱</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="login-email"
                name="email"
                type="email"
                placeholder="请输入邮箱地址"
                value={loginData.email}
                onChange={handleLoginInputChange}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
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
                value={loginData.password}
                onChange={handleLoginInputChange}
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
      );
    }

    // 手机或邮箱验证码登录
    if (loginStep === 'input') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{loginMethod === 'phone-otp' ? '手机号' : '邮箱'}</Label>
            <div className="relative">
              {loginMethod === 'phone-otp' ? (
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              ) : (
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              )}
              <Input
                name={loginMethod === 'phone-otp' ? 'phone' : 'email'}
                type={loginMethod === 'phone-otp' ? 'tel' : 'email'}
                placeholder={loginMethod === 'phone-otp' ? '请输入手机号（含国际区号，如+86）' : '请输入邮箱地址'}
                value={loginMethod === 'phone-otp' ? loginData.phone : loginData.email}
                onChange={handleLoginInputChange}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
          
          <Button 
            type="button"
            onClick={sendLoginOtp}
            className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "发送中..." : "获取验证码"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      );
    }

    // OTP验证步骤
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground text-center mb-4">
          验证码已发送至 {loginMethod === 'phone-otp' ? loginData.phone : loginData.email}
        </div>
        
        <div className="space-y-2">
          <Label>验证码</Label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              name="otp"
              type="text"
              placeholder="请输入6位验证码"
              value={loginData.otp}
              onChange={handleLoginInputChange}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary"
              maxLength={6}
              required
            />
          </div>
          {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
        </div>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setLoginStep('input')}
            className="flex-1"
          >
            返回
          </Button>
          <Button
            type="button"
            onClick={countdown > 0 ? undefined : sendLoginOtp}
            variant="outline"
            className="flex-1"
            disabled={countdown > 0}
          >
            {countdown > 0 ? `${countdown}s后重发` : '重新发送'}
          </Button>
        </div>
        
        <Button 
          type="button"
          onClick={verifyLoginOtp}
          className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "验证中..." : "登录"}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    );
  };

  // 渲染注册方式选择
  const renderRegisterMethodTabs = () => (
    <div className="flex gap-2 mb-4">
      <Button
        type="button"
        variant={registerMethod === 'phone' ? 'default' : 'outline'}
        size="sm"
        onClick={() => { setRegisterMethod('phone'); resetRegisterFlow(); }}
        className={registerMethod === 'phone' ? 'bg-gradient-primary' : ''}
      >
        <Phone className="w-4 h-4 mr-1" />
        手机注册
      </Button>
      <Button
        type="button"
        variant={registerMethod === 'email' ? 'default' : 'outline'}
        size="sm"
        onClick={() => { setRegisterMethod('email'); resetRegisterFlow(); }}
        className={registerMethod === 'email' ? 'bg-gradient-primary' : ''}
      >
        <Mail className="w-4 h-4 mr-1" />
        邮箱注册
      </Button>
    </div>
  );

  // 渲染注册表单
  const renderRegisterForm = () => {
    if (registerStep === 'input') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-username">用户名</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="register-username"
                name="username"
                type="text"
                placeholder="请输入用户名"
                value={registerData.username}
                onChange={handleRegisterInputChange}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
          </div>
          
          <div className="space-y-2">
            <Label>{registerMethod === 'phone' ? '手机号' : '邮箱'}</Label>
            <div className="relative">
              {registerMethod === 'phone' ? (
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              ) : (
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              )}
              <Input
                name={registerMethod === 'phone' ? 'phone' : 'email'}
                type={registerMethod === 'phone' ? 'tel' : 'email'}
                placeholder={registerMethod === 'phone' ? '请输入手机号（含国际区号，如+86）' : '请输入邮箱地址'}
                value={registerMethod === 'phone' ? registerData.phone : registerData.email}
                onChange={handleRegisterInputChange}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
          
          <div className="flex items-start space-x-2">
            <input type="checkbox" className="rounded border-border mt-1" required />
            <span className="text-sm text-muted-foreground">
              我已阅读并同意
              <Link to="/terms" className="text-primary hover:underline ml-1">《服务条款》</Link>
              和
              <Link to="/privacy" className="text-primary hover:underline ml-1">《隐私协议》</Link>
            </span>
          </div>
          
          <Button 
            type="button"
            onClick={sendRegisterOtp}
            className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "发送中..." : "获取验证码"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      );
    }

    // OTP验证步骤
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground text-center mb-4">
          验证码已发送至 {registerMethod === 'phone' ? registerData.phone : registerData.email}
        </div>
        
        <div className="space-y-2">
          <Label>验证码</Label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              name="otp"
              type="text"
              placeholder="请输入6位验证码"
              value={registerData.otp}
              onChange={handleRegisterInputChange}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary"
              maxLength={6}
              required
            />
          </div>
          {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
        </div>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setRegisterStep('input')}
            className="flex-1"
          >
            返回
          </Button>
          <Button
            type="button"
            onClick={countdown > 0 ? undefined : sendRegisterOtp}
            variant="outline"
            className="flex-1"
            disabled={countdown > 0}
          >
            {countdown > 0 ? `${countdown}s后重发` : '重新发送'}
          </Button>
        </div>
        
        <Button 
          type="button"
          onClick={verifyRegisterOtp}
          className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "验证中..." : "注册"}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    );
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
                      {renderLoginMethodTabs()}
                      {renderLoginForm()}
                      
                      <p className="text-xs text-center text-muted-foreground mt-4">
                        登录即表示您同意我们的
                        <Link to="/terms" className="text-primary hover:underline ml-1">服务条款</Link>
                        和
                        <Link to="/privacy" className="text-primary hover:underline ml-1">隐私协议</Link>
                      </p>
                    </TabsContent>
                    
                    {/* 注册表单 */}
                    <TabsContent value="register">
                      {renderRegisterMethodTabs()}
                      {renderRegisterForm()}
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
