import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Eye } from 'lucide-react';
import { z } from 'zod';

const articleSchema = z.object({
  title: z.string().trim().min(1, "标题不能为空").max(200, "标题最多200字符"),
  slug: z.string().trim().min(1, "URL别名不能为空").max(100, "URL别名最多100字符"),
  content: z.string().trim().min(1, "内容不能为空").max(50000, "内容最多50000字符"),
  excerpt: z.string().trim().max(500, "摘要最多500字符").optional(),
  category: z.enum(['tech_blog', 'whitepaper', 'case_study', 'network_optimization', 'security_research']),
  cover_image_url: z.string().url("请输入有效的图片URL").optional().or(z.literal('')),
});

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'tech_blog',
    cover_image_url: '',
    published: false,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadArticles();
    }
  }, [isAdmin]);

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      toast({
        title: "加载文章失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handlePublishChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, published: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      // 验证输入
      const validated = articleSchema.parse({
        ...formData,
        cover_image_url: formData.cover_image_url || undefined,
        excerpt: formData.excerpt || undefined,
      });

      const articleData: any = {
        title: validated.title,
        slug: validated.slug,
        content: validated.content,
        excerpt: validated.excerpt || null,
        category: validated.category,
        cover_image_url: validated.cover_image_url || null,
        author_id: user?.id,
        published: formData.published,
        published_at: formData.published ? new Date().toISOString() : null,
      };

      const { error } = await supabase
        .from('articles')
        .insert([articleData]);

      if (error) throw error;

      toast({
        title: "文章创建成功",
        description: formData.published ? "文章已发布" : "文章已保存为草稿",
      });

      // 重置表单
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        category: 'tech_blog',
        cover_image_url: '',
        published: false,
      });

      // 重新加载文章列表
      loadArticles();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "创建失败",
          description: (error as any).message,
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "文章已删除",
      });

      loadArticles();
    } catch (error: any) {
      toast({
        title: "删除失败",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const categoryNames: Record<string, string> = {
    tech_blog: '技术博客',
    whitepaper: '白皮书',
    case_study: '案例分析',
    network_optimization: '网络优化',
    security_research: '安全研究',
  };

  if (loading || loadingArticles) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                管理后台
              </h1>
              <p className="text-muted-foreground">发布和管理技术文章</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧：文章表单 */}
              <div className="lg:col-span-2">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      创建新文章
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">标题 *</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="输入文章标题"
                          required
                        />
                        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="slug">URL别名 *</Label>
                        <Input
                          id="slug"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          placeholder="article-url-slug"
                          required
                        />
                        {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
                        <p className="text-xs text-muted-foreground">
                          文章URL将是: /research/{formData.slug || 'your-slug'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">分类 *</Label>
                        <Select value={formData.category} onValueChange={handleCategoryChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(categoryNames).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt">摘要</Label>
                        <Textarea
                          id="excerpt"
                          name="excerpt"
                          value={formData.excerpt}
                          onChange={handleInputChange}
                          placeholder="文章摘要（可选）"
                          rows={3}
                        />
                        {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">内容 * (支持Markdown)</Label>
                        <Textarea
                          id="content"
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          placeholder="输入文章内容..."
                          rows={15}
                          required
                          className="font-mono text-sm"
                        />
                        {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cover_image_url">封面图片URL</Label>
                        <Input
                          id="cover_image_url"
                          name="cover_image_url"
                          type="url"
                          value={formData.cover_image_url}
                          onChange={handleInputChange}
                          placeholder="https://example.com/image.jpg"
                        />
                        {errors.cover_image_url && <p className="text-sm text-destructive">{errors.cover_image_url}</p>}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={formData.published}
                          onCheckedChange={handlePublishChange}
                        />
                        <Label htmlFor="published" className="cursor-pointer">
                          {formData.published ? '立即发布' : '保存为草稿'}
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-gradient-primary"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            创建中...
                          </>
                        ) : (
                          <>
                            <FileText className="w-4 h-4 mr-2" />
                            创建文章
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* 右侧：文章列表 */}
              <div className="space-y-4">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">已发布文章</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {articles.filter(a => a.published).length === 0 ? (
                      <p className="text-sm text-muted-foreground">暂无已发布文章</p>
                    ) : (
                      articles.filter(a => a.published).map(article => (
                        <div
                          key={article.id}
                          className="p-3 bg-background/50 rounded-lg border border-border/30"
                        >
                          <h4 className="font-medium text-sm mb-1">{article.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {categoryNames[article.category]}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`/research/${article.slug}`, '_blank')}
                              className="text-xs"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              查看
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(article.id)}
                              className="text-xs"
                            >
                              删除
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">草稿</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {articles.filter(a => !a.published).length === 0 ? (
                      <p className="text-sm text-muted-foreground">暂无草稿</p>
                    ) : (
                      articles.filter(a => !a.published).map(article => (
                        <div
                          key={article.id}
                          className="p-3 bg-background/50 rounded-lg border border-border/30"
                        >
                          <h4 className="font-medium text-sm mb-1">{article.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {categoryNames[article.category]}
                          </p>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(article.id)}
                            className="text-xs w-full"
                          >
                            删除
                          </Button>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
