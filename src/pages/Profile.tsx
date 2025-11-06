import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
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
import { User, Lock, Save, Loader2, CreditCard, Info, LogOut, Trash2, Clock, FileText, Mail, Phone, Edit2, Crown, Calendar, Check, Zap, Star } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { formatDistanceToNow, differenceInDays, isBefore } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';

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
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Create schemas dynamically based on language
  const profileSchema = z.object({
    username: z.string().min(2, t('profile.usernameMin')).max(50, t('profile.usernameMax')).optional(),
    avatar_url: z.string().url(t('profile.invalidURL')).optional().or(z.literal('')),
    bio: z.string().max(500, t('profile.bioMax')).optional(),
  });

  const passwordSchema = z.object({
    currentPassword: z.string().min(1, t('profile.enterCurrentPassword')),
    newPassword: z.string().min(6, t('profile.passwordMin')),
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: t('profile.passwordMismatch'),
    path: ["confirmPassword"],
  });

  type ProfileFormData = z.infer<typeof profileSchema>;
  type PasswordFormData = z.infer<typeof passwordSchema>;
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
        title: t('profile.loadFailed'),
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
        title: t('profile.loadPurchasesFailed'),
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
        title: t('profile.saveSuccess'),
        description: t('profile.profileUpdated'),
      });
    } catch (error: any) {
      toast({
        title: t('profile.saveFailed'),
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
          title: t('profile.oldPasswordError'),
          description: t('profile.oldPasswordErrorDesc'),
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
        title: t('profile.changeSuccess'),
        description: t('profile.passwordUpdated'),
      });
      passwordForm.reset();
    } catch (error: any) {
      toast({
        title: t('profile.changeFailed'),
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
        title: t('profile.loggedOut'),
        description: t('profile.logoutSuccess'),
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: t('profile.logoutFailed'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      toast({
        title: t('profile.enterPassword'),
        description: t('profile.enterPasswordDesc'),
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
          title: t('profile.passwordError'),
          description: t('profile.passwordErrorDesc'),
          variant: 'destructive',
        });
        setDeletePassword('');
        setDeletingAccount(false);
        return;
      }

      // 密码验证成功
      toast({
        title: t('profile.verificationSuccess'),
        description: t('profile.deleteRequestSubmitted'),
      });
      
      setDeletePassword('');
    } catch (error: any) {
      toast({
        title: t('profile.verificationFailed'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDeletingAccount(false);
    }
  };

  const handleSendVerificationCode = async () => {
    if (!newContactValue.trim()) {
      toast({
        title: t('profile.enterContact'),
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
          title: t('profile.emailVerificationSent'),
          description: t('profile.checkNewEmail'),
        });
      } else if (editingContact === 'phone') {
        const { error } = await supabase.auth.updateUser({
          phone: newContactValue,
        });

        if (error) throw error;

        toast({
          title: t('profile.codeVerificationSent'),
          description: t('profile.checkSMS'),
        });
      }

      setCodeSent(true);
    } catch (error: any) {
      toast({
        title: t('profile.sendFailed'),
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
        title: t('profile.enterCode'),
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
          title: t('profile.phoneUpdated'),
          description: t('profile.phoneUpdateSuccess'),
        });
      } else {
        toast({
          title: t('profile.emailVerification'),
          description: t('profile.clickEmailLink'),
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
    if (!subscriptionExpiresAt) return t('profile.noSubscription');
    
    const expiresAt = new Date(subscriptionExpiresAt);
    const now = new Date();
    
    if (expiresAt < now) {
      return t('profile.expired');
    }
    
    return formatDistanceToNow(expiresAt, { addSuffix: true, locale: language === 'zh' ? zhCN : enUS });
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
              {t('profile.title')}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t('profile.subtitle')}
            </p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-4xl">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                {t('profile.accountInfo')}
              </TabsTrigger>
              <TabsTrigger value="purchases" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                {t('profile.purchases')}
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                {t('profile.security')}
              </TabsTrigger>
              <TabsTrigger value="delete" className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                {t('profile.deleteAccount')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle>{t('profile.accountInfoTitle')}</CardTitle>
                  <CardDescription>
                    {t('profile.accountInfoDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3 flex-1">
                        <Mail className="w-5 h-5 text-primary" />
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{t('profile.emailAddress')}</p>
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
                            <DialogTitle>{t('profile.editEmail')}</DialogTitle>
                            <DialogDescription>
                              {t('profile.editEmailDesc')}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-email">{t('profile.newEmail')}</Label>
                              <Input
                                id="new-email"
                                type="email"
                                placeholder={t('profile.newEmailPlaceholder')}
                                value={newContactValue}
                                onChange={(e) => setNewContactValue(e.target.value)}
                                disabled={codeSent}
                              />
                            </div>
                            {codeSent && (
                              <p className="text-sm text-muted-foreground">
                                {t('profile.verificationSent')} {newContactValue}{t('profile.checkEmail')}
                              </p>
                            )}
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={handleCancelEdit}
                              disabled={sendingCode}
                            >
                              {t('profile.cancel')}
                            </Button>
                            {!codeSent ? (
                              <Button
                                onClick={handleSendVerificationCode}
                                disabled={sendingCode || !newContactValue.trim()}
                              >
                                {sendingCode ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    {t('profile.sending')}
                                  </>
                                ) : (
                                  t('profile.sendVerificationEmail')
                                )}
                              </Button>
                            ) : (
                              <Button
                                onClick={handleCancelEdit}
                              >
                                {t('profile.done')}
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
                          <p className="text-sm text-muted-foreground">{t('profile.phoneNumber')}</p>
                          <p className="font-medium">{phone || t('profile.notSet')}</p>
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
                            <DialogTitle>{t('profile.editPhone')}</DialogTitle>
                            <DialogDescription>
                              {t('profile.editPhoneDesc')}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-phone">{t('profile.newPhone')}</Label>
                              <Input
                                id="new-phone"
                                type="tel"
                                placeholder={t('profile.newPhonePlaceholder')}
                                value={newContactValue}
                                onChange={(e) => setNewContactValue(e.target.value)}
                                disabled={codeSent}
                              />
                            </div>
                            {codeSent && (
                              <div className="space-y-2">
                                <Label htmlFor="verification-code">{t('profile.verificationCode')}</Label>
                                <Input
                                  id="verification-code"
                                  type="text"
                                  placeholder={t('profile.verificationCodePlaceholder')}
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
                              {t('profile.cancel')}
                            </Button>
                            {!codeSent ? (
                              <Button
                                onClick={handleSendVerificationCode}
                                disabled={sendingCode || !newContactValue.trim()}
                              >
                                {sendingCode ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    {t('profile.sending')}
                                  </>
                                ) : (
                                  t('profile.sendCode')
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
                                    {t('profile.verifying')}
                                  </>
                                ) : (
                                  t('profile.verifyAndUpdate')
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
                        <p className="text-sm text-muted-foreground">{t('profile.memberStatus')}</p>
                      </div>
                      <div className="space-y-3">
                        <p className="font-medium text-lg">
                          {subscriptionExpiresAt && !isBefore(new Date(subscriptionExpiresAt), new Date()) 
                            ? t('profile.vipMember')
                            : t('profile.regularUser')}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {t('profile.vipRemaining')}: <span className={`font-semibold ${
                                subscriptionExpiresAt && !isBefore(new Date(subscriptionExpiresAt), new Date()) && differenceInDays(new Date(subscriptionExpiresAt), new Date()) < 7
                                  ? 'text-destructive'
                                  : 'text-foreground'
                              }`}>
                                {subscriptionExpiresAt && !isBefore(new Date(subscriptionExpiresAt), new Date()) 
                                  ? `${differenceInDays(new Date(subscriptionExpiresAt), new Date())} ${t('profile.days')}`
                                  : `0 ${t('profile.days')}`}
                              </span>
                            </span>
                          </div>
                          <Button 
                            onClick={() => navigate('/#pricing')}
                            size="sm"
                            variant={
                              (!subscriptionExpiresAt || isBefore(new Date(subscriptionExpiresAt), new Date()) || 
                              (subscriptionExpiresAt && differenceInDays(new Date(subscriptionExpiresAt), new Date()) < 7))
                                ? "destructive"
                                : "outline"
                            }
                          >
                            <CreditCard className="w-4 h-4 mr-1" />
                            {subscriptionExpiresAt && !isBefore(new Date(subscriptionExpiresAt), new Date()) ? t('profile.renew') : t('profile.purchase')}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {subscriptionExpiresAt && (
                      <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-muted/30">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{t('profile.expiryTime')}</p>
                          <p className="font-medium">
                            {new Date(subscriptionExpiresAt).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US')}
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
                  <CardTitle>{t('profile.purchasesTitle')}</CardTitle>
                  <CardDescription>
                    {t('profile.purchasesDesc')}
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
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">{t('profile.orderDate')}</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">{t('profile.orderNumber')}</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">{t('profile.memberType')}</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">{t('profile.memberDuration')}</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">{t('profile.acquisitionMethod')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchases.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center py-8 text-muted-foreground">
                                {t('profile.noPurchases')}
                              </td>
                            </tr>
                          ) : (
                            purchases.map((purchase) => (
                              <tr 
                                key={purchase.id} 
                                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                              >
                                <td className="py-4 px-4 text-sm">
                                  {new Date(purchase.created_at).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US', {
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
                                  {purchase.product_description || t('profile.permanent')}
                                </td>
                                <td className="py-4 px-4 text-sm">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    parseFloat(purchase.amount.toString()) === 0 
                                      ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                                      : 'bg-primary/10 text-primary'
                                  }`}>
                                    {parseFloat(purchase.amount.toString()) === 0 ? t('profile.gifted') : t('profile.purchased')}
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
                  <CardTitle>{t('profile.securityTitle')}</CardTitle>
                  <CardDescription>
                    {t('profile.securityDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t('profile.changePassword')}</h3>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">{t('profile.currentPassword')}</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          {...passwordForm.register('currentPassword')}
                          placeholder={t('profile.currentPasswordPlaceholder')}
                        />
                        {passwordForm.formState.errors.currentPassword && (
                          <p className="text-sm text-destructive">
                            {passwordForm.formState.errors.currentPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">{t('profile.newPassword')}</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          {...passwordForm.register('newPassword')}
                          placeholder={t('profile.newPasswordPlaceholder')}
                        />
                        {passwordForm.formState.errors.newPassword && (
                          <p className="text-sm text-destructive">
                            {passwordForm.formState.errors.newPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">{t('profile.confirmNewPassword')}</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          {...passwordForm.register('confirmPassword')}
                          placeholder={t('profile.confirmNewPasswordPlaceholder')}
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
                            {t('profile.changing')}
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            {t('profile.changePassword')}
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
                    {t('profile.deleteAccountAgreement')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ScrollArea className="h-[400px] w-full rounded-lg border border-border/50 p-6 bg-muted/30">
                    <div className="space-y-6 text-sm">
                      <div>
                        <h3 className="font-bold text-base mb-3 text-foreground">{t('profile.agreementSection1')}</h3>
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>{t('profile.agreementSection1Item1')}</li>
                          <li>{t('profile.agreementSection1Item2')}</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="font-bold text-base mb-3 text-foreground">{t('profile.agreementSection2')}</h3>
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>{t('profile.agreementSection2Item1')}</li>
                          <li>{t('profile.agreementSection2Item2')}</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="font-bold text-base mb-3 text-foreground">{t('profile.agreementSection3')}</h3>
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>{t('profile.agreementSection3Item1')}</li>
                          <li>{t('profile.agreementSection3Item2')}</li>
                          <li>{t('profile.agreementSection3Item3')}</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="font-bold text-base mb-3 text-foreground">{t('profile.agreementSection4')}</h3>
                        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                          <li>{t('profile.agreementSection4Item1')}</li>
                          <li>{t('profile.agreementSection4Item2')}</li>
                          <li>{t('profile.agreementSection4Item3')}</li>
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
                      {t('profile.agreementCheckbox')}
                    </label>
                  </div>

                  <div className="p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                    <h4 className="font-semibold text-destructive mb-2">{t('profile.deleteWarning')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('profile.deleteWarningDesc')}
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>{t('profile.deleteWarningItem1')}</li>
                      <li>{t('profile.deleteWarningItem2')}</li>
                      <li>{t('profile.deleteWarningItem3')}</li>
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
                        {t('profile.deleteAccount')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('profile.confirmDelete')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('profile.confirmDeleteDesc')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="py-4">
                        <Label htmlFor="delete-password" className="text-sm font-medium">
                          {t('profile.loginPassword')}
                        </Label>
                        <Input
                          id="delete-password"
                          type="password"
                          placeholder={t('profile.loginPasswordPlaceholder')}
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          className="mt-2"
                          disabled={deletingAccount}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          {t('profile.deleteNote')}
                        </p>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel 
                          onClick={() => setDeletePassword('')}
                          disabled={deletingAccount}
                        >
                          {t('profile.cancel')}
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          disabled={deletingAccount || !deletePassword.trim()}
                        >
                          {deletingAccount ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              {t('profile.deleting')}
                            </>
                          ) : (
                            t('profile.confirmDeleteBtn')
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