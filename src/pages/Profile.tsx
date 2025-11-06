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
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { User, Lock, Save, Loader2, CreditCard, Info, LogOut, Trash2, Clock, FileText } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const profileSchema = z.object({
  username: z.string().min(2, '用户名至少2个字符').max(50, '用户名最多50个字符').optional(),
  avatar_url: z.string().url('请输入有效的URL').optional().or(z.literal('')),
  bio: z.string().max(500, '简介最多500个字符').optional(),
});

const passwordSchema = z.object({
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
        .select('username, avatar_url, bio, subscription_expires_at')
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

  const handleDeleteAccount = () => {
    toast({
      title: '删除账号',
      description: '请联系管理员删除您的账号',
    });
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
            <TabsList className="grid w-full grid-cols-5 max-w-5xl">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                账号信息
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                个人资料
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
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">邮箱地址</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-muted/30">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">账户状态</p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <p className="font-medium">{calculateRemainingTime()}</p>
                        </div>
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

            <TabsContent value="profile">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle>个人资料</CardTitle>
                  <CardDescription>
                    更新您的个人资料信息
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">邮箱地址</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-muted/50"
                      />
                      <p className="text-xs text-muted-foreground">
                        邮箱地址不可修改
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">用户名</Label>
                      <Input
                        id="username"
                        {...profileForm.register('username')}
                        placeholder="请输入用户名"
                      />
                      {profileForm.formState.errors.username && (
                        <p className="text-sm text-destructive">
                          {profileForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avatar_url">头像URL</Label>
                      <Input
                        id="avatar_url"
                        {...profileForm.register('avatar_url')}
                        placeholder="https://example.com/avatar.jpg"
                      />
                      {profileForm.formState.errors.avatar_url && (
                        <p className="text-sm text-destructive">
                          {profileForm.formState.errors.avatar_url.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">个人简介</Label>
                      <Textarea
                        id="bio"
                        {...profileForm.register('bio')}
                        placeholder="介绍一下自己..."
                        rows={4}
                      />
                      {profileForm.formState.errors.bio && (
                        <p className="text-sm text-destructive">
                          {profileForm.formState.errors.bio.message}
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
                          保存中...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          保存修改
                        </>
                      )}
                    </Button>
                  </form>
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
                  ) : purchases.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      暂无购买记录
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {purchases.map((purchase) => (
                        <div
                          key={purchase.id}
                          className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CreditCard className="w-5 h-5 text-primary" />
                              <h4 className="font-semibold">{purchase.product_name}</h4>
                            </div>
                            {purchase.product_description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {purchase.product_description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>
                                {new Date(purchase.created_at).toLocaleString('zh-CN')}
                              </span>
                              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                                {purchase.status === 'completed' ? '已完成' : purchase.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              ¥{purchase.amount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
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
                  <CardDescription>
                    请仔细阅读以下协议内容，注销账号是不可逆的操作
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <p className="text-sm font-medium text-foreground mb-4">
                      归巢GUICHAO提醒您：注销账号是不可逆的操作，请在提交申请前仔细阅读以下内容：
                    </p>
                  </div>

                  <ScrollArea className="h-[400px] w-full rounded-lg border border-border/50 p-6 bg-muted/30">
                    <div className="space-y-6 text-sm">
                      <div>
                        <h3 className="font-bold text-base mb-3 text-foreground">一、注销前需满足的条件</h3>
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>为保障您的账号安全，请确认是否满足以下条件：</li>
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
                          <li>账号注销后，我们将删除以下信息：</li>
                          <li>账号注册时使用的邮箱、手机号及密码；</li>
                          <li>付款订单记录与订阅信息；</li>
                          <li>账号登录记录及使用GUICHAO服务的历史数据；</li>
                          <li>账号剩余会员天数、金币余额等所有权益将清空，无法恢复。</li>
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
                        <AlertDialogTitle>确认删除账号？</AlertDialogTitle>
                        <AlertDialogDescription>
                          此操作无法撤销。这将永久删除您的账号及所有相关数据。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          确认删除
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