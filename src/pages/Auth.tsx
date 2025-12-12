import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Zap, Globe, Phone, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// 国际区号列表
const countryCodes = [
  { code: "+86", country: "中国" },
  { code: "+1", country: "美国/加拿大" },
  { code: "+852", country: "香港" },
  { code: "+853", country: "澳门" },
  { code: "+886", country: "台湾" },
  { code: "+81", country: "日本" },
  { code: "+82", country: "韩国" },
  { code: "+65", country: "新加坡" },
  { code: "+60", country: "马来西亚" },
  { code: "+44", country: "英国" },
  { code: "+49", country: "德国" },
  { code: "+33", country: "法国" },
  { code: "+61", country: "澳大利亚" },
  { code: "+64", country: "新西兰" },
];

// 验证schema
const emailPasswordSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址").max(255),
  password: z.string().min(6, "密码至少6个字符"),
});

const phonePasswordSchema = z.object({
  phone: z.string().regex(/^\d{5,15}$/, "请输入有效的手机号码"),
  password: z.string().min(6, "密码至少6个字符"),
});

const phoneSchema = z.object({
  phone: z.string().regex(/^\d{5,15}$/, "请输入有效的手机号码"),
});

const emailSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址").max(255),
});

const otpSchema = z.object({
  otp: z.string().length(6, "验证码为6位数字"),
});

type LoginMethod = 'email' | 'phone' | 'otp';
type OtpType = 'phone' | 'email';
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
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
  const [loginOtpType, setLoginOtpType] = useState<OtpType>('phone');
  const [loginAgreed, setLoginAgreed] = useState(false);
  const [loginCountryCode, setLoginCountryCode] = useState("+86");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    phone: "",
    otp: ""
  });
  
  // 注册相关状态
  const [registerMethod, setRegisterMethod] = useState<RegisterMethod>('phone');
  const [registerAgreed, setRegisterAgreed] = useState(false);
  const [registerCountryCode, setRegisterCountryCode] = useState("+86");
  const [registerData, setRegisterData] = useState({
    email: "",
    phone: "",
    otp: ""
  });
  
  // 验证码倒计时
  const [loginCountdown, setLoginCountdown] = useState(0);
  const [registerCountdown, setRegisterCountdown] = useState(0);

  // 如果用户已登录，重定向到首页
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // 登录倒计时
  useEffect(() => {
    if (loginCountdown > 0) {
      const timer = setTimeout(() => setLoginCountdown(loginCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [loginCountdown]);

  // 注册倒计时
  useEffect(() => {
    if (registerCountdown > 0) {
      const timer = setTimeout(() => setRegisterCountdown(registerCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [registerCountdown]);

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

  // 邮箱密码登录
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginAgreed) {
      toast({ title: "请先同意服务条款", variant: "destructive" });
      return;
    }
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

  // 手机密码登录
  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginAgreed) {
      toast({ title: "请先同意服务条款", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setErrors({});

    try {
      const validated = phonePasswordSchema.parse({
        phone: loginData.phone,
        password: loginData.password,
      });

      const fullPhone = loginCountryCode + validated.phone;
      const { error } = await supabase.auth.signInWithPassword({
        phone: fullPhone,
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

  // 发送登录验证码
  const sendLoginOtp = async () => {
    if (!loginAgreed) {
      toast({ title: "请先同意服务条款", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setErrors({});
    
    try {
      if (loginOtpType === 'phone') {
        phoneSchema.parse({ phone: loginData.phone });
        const fullPhone = loginCountryCode + loginData.phone;
        const { error } = await supabase.auth.signInWithOtp({
          phone: fullPhone,
        });
        if (error) throw error;
        toast({ title: "验证码已发送", description: "请查看手机短信" });
      } else {
        emailSchema.parse({ email: loginData.email });
        const { error } = await supabase.auth.signInWithOtp({
          email: loginData.email,
        });
        if (error) throw error;
        toast({ title: "验证码已发送", description: "请查看邮箱" });
      }
      setLoginCountdown(60);
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
    if (!loginAgreed) {
      toast({ title: "请先同意服务条款", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setErrors({});
    
    try {
      otpSchema.parse({ otp: loginData.otp });
      
      let result;
      if (loginOtpType === 'phone') {
        const fullPhone = loginCountryCode + loginData.phone;
        result = await supabase.auth.verifyOtp({
          phone: fullPhone,
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

  // 发送注册验证码
  const sendRegisterOtp = async () => {
    if (!registerAgreed) {
      toast({ title: "请先同意服务条款", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setErrors({});
    
    try {
      if (registerMethod === 'phone') {
        phoneSchema.parse({ phone: registerData.phone });
        const fullPhone = registerCountryCode + registerData.phone;
        const { error } = await supabase.auth.signInWithOtp({
          phone: fullPhone,
        });
        if (error) throw error;
        toast({ title: "验证码已发送", description: "请查看手机短信" });
      } else {
        emailSchema.parse({ email: registerData.email });
        const { error } = await supabase.auth.signInWithOtp({
          email: registerData.email,
        });
        if (error) throw error;
        toast({ title: "验证码已发送", description: "请查看邮箱" });
      }
      setRegisterCountdown(60);
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
    if (!registerAgreed) {
      toast({ title: "请先同意服务条款", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setErrors({});
    
    try {
      otpSchema.parse({ otp: registerData.otp });
      
      let result;
      if (registerMethod === 'phone') {
        const fullPhone = registerCountryCode + registerData.phone;
        result = await supabase.auth.verifyOtp({
          phone: fullPhone,
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

  // 渲染登录方式选择
  const renderLoginMethodTabs = () => (
    <div className="flex gap-2 mb-4">
      <Button
        type="button"
        variant={loginMethod === 'email' ? 'default' : 'outline'}
        size="sm"
        onClick={() => { setLoginMethod('email'); setErrors({}); }}
        className={loginMethod === 'email' ? 'bg-gradient-primary' : ''}
      >
        <Mail className="w-4 h-4 mr-1" />
        邮箱登录
      </Button>
      <Button
        type="button"
        variant={loginMethod === 'phone' ? 'default' : 'outline'}
        size="sm"
        onClick={() => { setLoginMethod('phone'); setErrors({}); }}
        className={loginMethod === 'phone' ? 'bg-gradient-primary' : ''}
      >
        <Phone className="w-4 h-4 mr-1" />
        手机登录
      </Button>
      <Button
        type="button"
        variant={loginMethod === 'otp' ? 'default' : 'outline'}
        size="sm"
        onClick={() => { setLoginMethod('otp'); setErrors({}); }}
        className={loginMethod === 'otp' ? 'bg-gradient-primary' : ''}
      >
        <MessageSquare className="w-4 h-4 mr-1" />
        验证码登录
      </Button>
    </div>
  );

  // 渲染登录表单
  const renderLoginForm = () => {
    if (loginMethod === 'email') {
      return (
        <form onSubmit={handleEmailLogin} className="space-y-4">
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
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="login-agree" 
              checked={loginAgreed} 
              onCheckedChange={(checked) => setLoginAgreed(checked === true)}
            />
            <label htmlFor="login-agree" className="text-sm text-muted-foreground leading-tight cursor-pointer">
              我已阅读并同意
              <Link to="/terms" className="text-primary hover:underline ml-1">《服务条款》</Link>
              和
              <Link to="/privacy" className="text-primary hover:underline ml-1">《隐私协议》</Link>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
            disabled={isLoading || !loginAgreed}
          >
            {isLoading ? "登录中..." : "登录"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>
      );
    }

    if (loginMethod === 'phone') {
      return (
        <form onSubmit={handlePhoneLogin} className="space-y-4">
          <div className="space-y-2">
            <Label>手机号</Label>
            <div className="flex gap-2">
              <Select value={loginCountryCode} onValueChange={setLoginCountryCode}>
                <SelectTrigger className="w-32 bg-background/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} {c.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Input
                  name="phone"
                  type="tel"
                  placeholder="请输入手机号"
                  value={loginData.phone}
                  onChange={handleLoginInputChange}
                  className="bg-background/50 border-border/50 focus:border-primary"
                  required
                />
              </div>
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="login-phone-password">密码</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="login-phone-password"
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
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="login-phone-agree" 
              checked={loginAgreed} 
              onCheckedChange={(checked) => setLoginAgreed(checked === true)}
            />
            <label htmlFor="login-phone-agree" className="text-sm text-muted-foreground leading-tight cursor-pointer">
              我已阅读并同意
              <Link to="/terms" className="text-primary hover:underline ml-1">《服务条款》</Link>
              和
              <Link to="/privacy" className="text-primary hover:underline ml-1">《隐私协议》</Link>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
            disabled={isLoading || !loginAgreed}
          >
            {isLoading ? "登录中..." : "登录"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>
      );
    }

    // 验证码登录
    return (
      <div className="space-y-4">
        {/* OTP类型选择 */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={loginOtpType === 'phone' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setLoginOtpType('phone')}
          >
            手机验证码
          </Button>
          <Button
            type="button"
            variant={loginOtpType === 'email' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setLoginOtpType('email')}
          >
            邮箱验证码
          </Button>
        </div>

        {loginOtpType === 'phone' ? (
          <div className="space-y-2">
            <Label>手机号</Label>
            <div className="flex gap-2">
              <Select value={loginCountryCode} onValueChange={setLoginCountryCode}>
                <SelectTrigger className="w-32 bg-background/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} {c.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                name="phone"
                type="tel"
                placeholder="请输入手机号"
                value={loginData.phone}
                onChange={handleLoginInputChange}
                className="flex-1 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>
        ) : (
          <div className="space-y-2">
            <Label>邮箱</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                name="email"
                type="email"
                placeholder="请输入邮箱地址"
                value={loginData.email}
                onChange={handleLoginInputChange}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
        )}

        {/* 验证码输入 */}
        <div className="space-y-2">
          <Label>验证码</Label>
          <div className="flex gap-2">
            <Input
              name="otp"
              type="text"
              placeholder="请输入6位验证码"
              value={loginData.otp}
              onChange={handleLoginInputChange}
              className="flex-1 bg-background/50 border-border/50 focus:border-primary"
              maxLength={6}
            />
            <Button
              type="button"
              variant="outline"
              onClick={sendLoginOtp}
              disabled={isLoading || loginCountdown > 0 || !loginAgreed}
              className="whitespace-nowrap"
            >
              {loginCountdown > 0 ? `${loginCountdown}s` : '获取验证码'}
            </Button>
          </div>
          {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox 
            id="login-otp-agree" 
            checked={loginAgreed} 
            onCheckedChange={(checked) => setLoginAgreed(checked === true)}
          />
          <label htmlFor="login-otp-agree" className="text-sm text-muted-foreground leading-tight cursor-pointer">
            我已阅读并同意
            <Link to="/terms" className="text-primary hover:underline ml-1">《服务条款》</Link>
            和
            <Link to="/privacy" className="text-primary hover:underline ml-1">《隐私协议》</Link>
          </label>
        </div>
        
        <Button 
          type="button"
          onClick={verifyLoginOtp}
          className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
          disabled={isLoading || !loginAgreed || !loginData.otp}
        >
          {isLoading ? "登录中..." : "登录"}
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
        onClick={() => { setRegisterMethod('phone'); setErrors({}); }}
        className={registerMethod === 'phone' ? 'bg-gradient-primary' : ''}
      >
        <Phone className="w-4 h-4 mr-1" />
        手机注册
      </Button>
      <Button
        type="button"
        variant={registerMethod === 'email' ? 'default' : 'outline'}
        size="sm"
        onClick={() => { setRegisterMethod('email'); setErrors({}); }}
        className={registerMethod === 'email' ? 'bg-gradient-primary' : ''}
      >
        <Mail className="w-4 h-4 mr-1" />
        邮箱注册
      </Button>
    </div>
  );

  // 渲染注册表单
  const renderRegisterForm = () => {
    return (
      <div className="space-y-4">
        {registerMethod === 'phone' ? (
          <div className="space-y-2">
            <Label>手机号</Label>
            <div className="flex gap-2">
              <Select value={registerCountryCode} onValueChange={setRegisterCountryCode}>
                <SelectTrigger className="w-32 bg-background/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} {c.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                name="phone"
                type="tel"
                placeholder="请输入手机号"
                value={registerData.phone}
                onChange={handleRegisterInputChange}
                className="flex-1 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>
        ) : (
          <div className="space-y-2">
            <Label>邮箱</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                name="email"
                type="email"
                placeholder="请输入邮箱地址"
                value={registerData.email}
                onChange={handleRegisterInputChange}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
        )}

        {/* 验证码输入 */}
        <div className="space-y-2">
          <Label>验证码</Label>
          <div className="flex gap-2">
            <Input
              name="otp"
              type="text"
              placeholder="请输入6位验证码"
              value={registerData.otp}
              onChange={handleRegisterInputChange}
              className="flex-1 bg-background/50 border-border/50 focus:border-primary"
              maxLength={6}
            />
            <Button
              type="button"
              variant="outline"
              onClick={sendRegisterOtp}
              disabled={isLoading || registerCountdown > 0 || !registerAgreed}
              className="whitespace-nowrap"
            >
              {registerCountdown > 0 ? `${registerCountdown}s` : '获取验证码'}
            </Button>
          </div>
          {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox 
            id="register-agree" 
            checked={registerAgreed} 
            onCheckedChange={(checked) => setRegisterAgreed(checked === true)}
          />
          <label htmlFor="register-agree" className="text-sm text-muted-foreground leading-tight cursor-pointer">
            我已阅读并同意
            <Link to="/terms" className="text-primary hover:underline ml-1">《服务条款》</Link>
            和
            <Link to="/privacy" className="text-primary hover:underline ml-1">《隐私协议》</Link>
          </label>
        </div>
        
        <Button 
          type="button"
          onClick={verifyRegisterOtp}
          className="w-full bg-gradient-primary hover:shadow-strong hover:scale-105 transition-all duration-300"
          disabled={isLoading || !registerAgreed || !registerData.otp}
        >
          {isLoading ? "注册中..." : "注册"}
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
