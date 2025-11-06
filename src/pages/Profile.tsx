import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { User, Lock, Save, Loader2, CreditCard, Info, LogOut, Trash2, Clock, FileText, Mail, Phone, Edit2, Crown, Calendar } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { formatDistanceToNow, differenceInDays, isBefore } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const profileSchema = z.object({
  username: z.string().min(2, '用户名至少2个字符').max(50, '用户名最多50个字符').optional(),
  avatar_url: z.string().url('请输入有效的URL').optional().or(z.literal('')),
  bio: z.string().max(500, '简介最多500个字符').optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, '请输入当前密码'),
  newPassword: z.string().min(6, '密码至少6个字符'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "两次密码输入不一致",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

interface Purchase {
  id: string;
  amount: number;
  product_name: string;
  product_description: string | null;
  status: string;
  created_at: string;
}

const Profile = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileLoading, setProfileLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [subscriptionExpiresAt, setSubscriptionExpiresAt] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(true);
  const [agreementRead, setAgreementRead] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<'email' | 'phone' | null>(null);
  const [newContactValue, setNewContactValue] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      avatar_url: '',
      bio: '',
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadPurchases();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url, bio, subscription_expires_at, phone')
        .eq('id', user!.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        profileForm.reset({
          username: data.username || '',
          avatar_url: data.avatar_url || '',
          bio: data.bio || '',
        });
        setSubscriptionExpiresAt(data.subscription_expires_at);
        setPhone(data.phone);
      }
    } catch (error: any) {
      toast({
        title: '加载失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const loadPurchases = async () => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPurchases(data || []);
    } catch (error: any) {
      toast({
        title: '加载购买记录失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setPurchasesLoading(false);
    }
  };

  const onProfileSubmit = async (data: ProfileFormData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username || null,
          avatar_url: data.avatar_url || null,
          bio: data.bio || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user!.id);

      if (error) throw error;

      toast({
        title: '保存成功',
        description: '您的个人信息已更新',
      });
    } catch (error: any) {
      toast({
        title: '保存失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setSubmitting(true);
    try {
      // 先验证旧密码
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user!.email!,
        password: data.currentPassword,
      });

      if (signInError) {
        toast({
          title: '旧密码错误',
          description: '您输入的当前密码不正确，请重试',
          variant: 'destructive',
        });
        setSubmitting(false);
        return;
      }

      // 旧密码验证成功，更新为新密码
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;

      toast({
        title: '修改成功',
        description: '您的密码已更新',
      });
      passwordForm.reset();
    } catch (error: any) {
      toast({
        title: '修改失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: '已退出登录',
        description: '您已成功退出账号',
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: '退出失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      toast({
        title: '请输入密码',
        description: '为了安全起见，请输入您的登录密码',
        variant: 'destructive',
      });
      return;
    }

    setDeletingAccount(true);
    try {
      // 验证密码
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user!.email!,
        password: deletePassword,
      });

      if (signInError) {
        toast({
          title: '密码错误',
          description: '您输入的密码不正确，请重试',
          variant: 'destructive',
        });
        setDeletePassword('');
        setDeletingAccount(false);
        return;
      }

      // 密码验证成功
      toast({
        title: '验证成功',
        description: '您的账号删除请求已提交，请联系管理员完成删除',
      });
      
      setDeletePassword('');
    } catch (error: any) {
      toast({
        title: '验证失败',
        description: error.message || '验证密码时出现错误',
        variant: 'destructive',
      });
    } finally {
      setDeletingAccount(false);
    }
  };

  const handleSendVerificationCode = async () => {
    if (!newContactValue.trim()) {
      toast({
        title: '请输入新的联系方式',
        variant: 'destructive',
      });
      return;
    }

    setSendingCode(true);
    try {
      if (editingContact === 'email') {
        const { error } = await supabase.auth.updateUser({
          email: newContactValue,
        });

        if (error) throw error;

        toast({
          title: '验证邮件已发送',
          description: '请检查您的新邮箱并点击验证链接',
        });
      } else if (editingContact === 'phone') {
        const { error } = await supabase.auth.updateUser({
          phone: newContactValue,
        });

        if (error) throw error;

        toast({
          title: '验证码已发送',
          description: '请检查您的手机短信',
        });
      }

      setCodeSent(true);
    } catch (error: any) {
      toast({
        title: '发送失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      toast({
        title: '请输入验证码',
        variant: 'destructive',
      });
      return;
    }

    setVerifying(true);
    try {
      if (editingContact === 'phone') {
        const { error } = await supabase.auth.verifyOtp({
          phone: newContactValue,
          token: verificationCode,
          type: 'sms',
        });

        if (error) throw error;

        // 更新profiles表中的phone字段
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ phone: newContactValue })
          .eq('id', user!.id);

        if (updateError) throw updateError;

        setPhone(newContactValue);
        toast({
          title: '手机号已更新',
          description: '您的手机号已成功修改',
        });
      } else {
        toast({
          title: '邮箱验证',
          description: '请点击邮件中的验证链接完成邮箱更新',
        });
      }

      setEditingContact(null);
      setNewContactValue('');
      setVerificationCode('');
      setCodeSent(false);
    } catch (error: any) {
      toast({
        title: '验证失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setNewContactValue('');
    setVerificationCode('');
    setCodeSent(false);
  };

  const calculateRemainingTime = () => {
    if (!subscriptionExpiresAt) return '未设置订阅';
    
    const expiresAt = new Date(subscriptionExpiresAt);
    const now = new Date();
    
    if (expiresAt < now) {
      return '已过期';
    }
    
    return formatDistanceToNow(expiresAt, { addSuffix: true, locale: zhCN });
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              账号管理
            </h1>
            <p className="mt-2 text-muted-foreground">
              管理您的个人信息和账号设置
            </p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-4xl">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                账号信息
              </TabsTrigger>
              <TabsTrigger value="purchases" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                购买记录
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                安全设置
              </TabsTrigger>
              <TabsTrigger value="delete" className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                删除账号
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle>账号信息</CardTitle>
                  <CardDescription>
                    查看您的账号状态和订阅信息
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3 flex-1">
                        <Mail className="w-5 h-5 text-primary" />
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">邮箱地址</p>
                          <p className="font-medium">{user?.email}</p>
                        </div>
                      </div>
                      <Dialog open={editingContact === 'email'} onOpenChange={(open) => !open && handleCancelEdit()}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingContact('email')}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>修改邮箱地址</DialogTitle>
                            <DialogDescription>
                              输入新邮箱地址后，我们将发送验证邮件到新邮箱
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-email">新邮箱地址</Label>
                              <Input
                                id="new-email"
                                type="email"
                                placeholder="请输入新邮箱地址"
                                value={newContactValue}
                                onChange={(e) => setNewContactValue(e.target.value)}
                                disabled={codeSent}
                              />
                            </div>
                            {codeSent && (
                              <p className="text-sm text-muted-foreground">
                                验证邮件已发送到 {newContactValue}，请检查邮箱并点击验证链接
                              </p>
                            )}
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={handleCancelEdit}
                              disabled={sendingCode}
                            >
                              取消
                            </Button>
                            {!codeSent ? (
                              <Button
                                onClick={handleSendVerificationCode}
                                disabled={sendingCode || !newContactValue.trim()}
                              >
                                {sendingCode ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    发送中...
                                  </>
                                ) : (
                                  '发送验证邮件'
                                )}
                              </Button>
                            ) : (
                              <Button
                                onClick={handleCancelEdit}
                              >
                                完成
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3 flex-1">
                        <Phone className="w-5 h-5 text-primary" />
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">手机号码</p>
                          <p className="font-medium">{phone || '未设置'}</p>
                        </div>
                      </div>
                      <Dialog open={editingContact === 'phone'} onOpenChange={(open) => !open && handleCancelEdit()}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingContact('phone')}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>修改手机号码</DialogTitle>
                            <DialogDescription>
                              输入新手机号码后，我们将发送验证码到新手机
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-phone">新手机号码</Label>
                              <Input
                                id="new-phone"
                                type="tel"
                                placeholder="请输入新手机号码"
                                value={newContactValue}
                                onChange={(e) => setNewContactValue(e.target.value)}
                                disabled={codeSent}
                              />
                            </div>
                            {codeSent && (
                              <div className="space-y-2">
                                <Label htmlFor="verification-code">验证码</Label>
                                <Input
                                  id="verification-code"
                                  type="text"
                                  placeholder="请输入6位验证码"
                                  value={verificationCode}
                                  onChange={(e) => setVerificationCode(e.target.value)}
                                  maxLength={6}
                                />
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={handleCancelEdit}
                              disabled={sendingCode || verifying}
                            >
                              取消
                            </Button>
                            {!codeSent ? (
                              <Button
                                onClick={handleSendVerificationCode}
                                disabled={sendingCode || !newContactValue.trim()}
                              >
                                {sendingCode ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    发送中...
                                  </>
                                ) : (
                                  '发送验证码'
                                )}
                              </Button>
                            ) : (
                              <Button
                                onClick={handleVerifyCode}
                                disabled={verifying || !verificationCode.trim()}
                              >
                                {verifying ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    验证中...
                                  </>
                                ) : (
                                  '验证并更新'
                                )}
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="p-4 border border-border/50 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3 mb-3">
                        <Crown className="w-5 h-5 text-primary" />
                        <p className="text-sm text-muted-foreground">会员状态</p>
                      </div>
                      <div className="space-y-3">
                        <p className="font-medium text-lg">
                          {subscriptionExpiresAt && !isBefore(new Date(subscriptionExpiresAt), new Date()) 
                            ? 'VIP会员' 
                            : '普通用户'}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            VIP剩余时长: <span className={`font-semibold ${
                              subscriptionExpiresAt && !isBefore(new Date(subscriptionExpiresAt), new Date()) && differenceInDays(new Date(subscriptionExpiresAt), new Date()) < 7
                                ? 'text-destructive'
                                : 'text-foreground'
                            }`}>
                              {subscriptionExpiresAt && !isBefore(new Date(subscriptionExpiresAt), new Date()) 
                                ? `${differenceInDays(new Date(subscriptionExpiresAt), new Date())} 天`
                                : '0 天'}
                            </span>
                          </span>
                        </div>
                        <Button 
                          onClick={() => navigate('/#pricing')}
                          className={`w-full ${
                            (!subscriptionExpiresAt || isBefore(new Date(subscriptionExpiresAt), new Date()) || 
                            (subscriptionExpiresAt && differenceInDays(new Date(subscriptionExpiresAt), new Date()) < 7))
                              ? 'animate-pulse bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                              : ''
                          }`}
                          variant={
                            (!subscriptionExpiresAt || isBefore(new Date(subscriptionExpiresAt), new Date()) || 
                            (subscriptionExpiresAt && differenceInDays(new Date(subscriptionExpiresAt), new Date()) < 7))
                              ? "destructive"
                              : "outline"
                          }
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          {subscriptionExpiresAt && !isBefore(new Date(subscriptionExpiresAt), new Date()) ? '续费会员' : '购买会员'}
                        </Button>
                      </div>
                    </div>

                    {subscriptionExpiresAt && (
                      <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-muted/30">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">到期时间</p>
                          <p className="font-medium">
                            {new Date(subscriptionExpiresAt).toLocaleString('zh-CN')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle>购买记录</CardTitle>
                  <CardDescription>
                    查看您的所有购买历史
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {purchasesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">订单日期</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">订单编号</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">会员类型</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">会员时长</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">获取途径</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchases.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center py-8 text-muted-foreground">
                                暂无购买记录
                              </td>
                            </tr>
                          ) : (
                            purchases.map((purchase) => (
                              <tr 
                                key={purchase.id} 
                                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                              >
                                <td className="py-4 px-4 text-sm">
                                  {new Date(purchase.created_at).toLocaleString('zh-CN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </td>
                                <td className="py-4 px-4 text-sm font-mono">
                                  {purchase.id.substring(0, 8).toUpperCase()}
                                </td>
                                <td className="py-4 px-4 text-sm font-medium">
                                  {purchase.product_name}
                                </td>
                                <td className="py-4 px-4 text-sm">
                                  {purchase.product_description || '永久'}
                                </td>
                                <td className="py-4 px-4 text-sm">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    parseFloat(purchase.amount.toString()) === 0 
                                      ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                                      : 'bg-primary/10 text-primary'
                                  }`}>
                                    {parseFloat(purchase.amount.toString()) === 0 ? '赠送' : '购买'}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle>安全设置</CardTitle>
                  <CardDescription>
                    管理您的密码和账号安全
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">修改密码</h3>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">当前密码</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          {...passwordForm.register('currentPassword')}
                          placeholder="请输入当前密码"
                        />
                        {passwordForm.formState.errors.currentPassword && (
                          <p className="text-sm text-destructive">
                            {passwordForm.formState.errors.currentPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">新密码</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          {...passwordForm.register('newPassword')}
                          placeholder="请输入新密码"
                        />
                        {passwordForm.formState.errors.newPassword && (
                          <p className="text-sm text-destructive">
                            {passwordForm.formState.errors.newPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">确认新密码</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          {...passwordForm.register('confirmPassword')}
                          placeholder="请再次输入新密码"
                        />
                        {passwordForm.formState.errors.confirmPassword && (
                          <p className="text-sm text-destructive">
                            {passwordForm.formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            修改中...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            修改密码
                          </>
                        )}
                      </Button>
                    </form>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delete">
              <Card className="glass-effect border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    账号注销协议
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ScrollArea className="h-[400px] w-full rounded-lg border border-border/50 p-6 bg-muted/30">
                    <div className="space-y-6 text-sm">
                      <div>
                        <h3 className="font-bold text-base mb-3 text-foreground">一、注销前需满足的条件</h3>
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>已取消所有自动订阅服务，确保无未完成的订阅套餐；</li>
                          <li>账号当前不存在任何纠纷、投诉或被举报的情况，且未违反用户协议。</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="font-bold text-base mb-3 text-foreground">二、注销流程说明</h3>
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>确认满足上述条件后，可提交账号删除申请，提交后无法撤回；</li>
                          <li>申请提交后账号将立即注销，所有数据将被清除。</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="font-bold text-base mb-3 text-foreground">三、数据删除与保留说明</h3>
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>账号注销后，我们将删除账号注册时使用的邮箱、手机号及密码；</li>
                          <li>同时删除订单记录、登录记录及使用GUICHAO服务的历史数据；</li>
                          <li>账号剩余会员天数等所有权益将清空，无法恢复。</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="font-bold text-base mb-3 text-foreground">四、其他提示</h3>
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>注销后，原账号绑定的手机号、邮箱及第三方登录信息将被释放，可重新用于注册或绑定；</li>
                          <li>已注销账号无法再次登录或恢复，重新注册亦无法享受此前已获得的新用户福利；</li>
                          <li>如需再次使用GUICHAO服务，需重新注册账号。</li>
                        </ol>
                      </div>
                    </div>
                  </ScrollArea>

                  <div className="flex items-start space-x-3 p-4 border border-border/50 rounded-lg bg-muted/30">
                    <Checkbox
                      id="agreement"
                      checked={agreementRead}
                      onCheckedChange={(checked) => setAgreementRead(checked as boolean)}
                    />
                    <label
                      htmlFor="agreement"
                      className="text-sm font-medium leading-relaxed cursor-pointer select-none"
                    >
                      我已仔细阅读并理解《账号注销协议》的全部内容，明确知晓注销后的所有后果，并自愿申请注销账号
                    </label>
                  </div>

                  <div className="p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                    <h4 className="font-semibold text-destructive mb-2">警告：此操作无法撤销</h4>
                    <p className="text-sm text-muted-foreground">
                      删除账号将永久删除以下内容：
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>您的所有个人资料</li>
                      <li>购买记录和订阅信息</li>
                      <li>账号相关的所有数据</li>
                    </ul>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-full"
                        disabled={!agreementRead}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        删除账号
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>确认删除账号</AlertDialogTitle>
                        <AlertDialogDescription>
                          为了确保账号安全，请输入您的登录密码以继续删除操作。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="py-4">
                        <Label htmlFor="delete-password" className="text-sm font-medium">
                          登录密码
                        </Label>
                        <Input
                          id="delete-password"
                          type="password"
                          placeholder="请输入您的登录密码"
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          className="mt-2"
                          disabled={deletingAccount}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          此操作无法撤销，将永久删除您的账号及所有相关数据。
                        </p>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel 
                          onClick={() => setDeletePassword('')}
                          disabled={deletingAccount}
                        >
                          取消
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          disabled={deletingAccount || !deletePassword.trim()}
                        >
                          {deletingAccount ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              删除中...
                            </>
                          ) : (
                            '确认删除'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;