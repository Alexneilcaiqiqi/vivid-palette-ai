import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2, Search, Calendar, Eye, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const Research = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          profiles:author_id (username, avatar_url)
        `)
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('加载文章失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryNames: Record<string, { zh: string; en: string }> = {
    tech_blog: { zh: '技术博客', en: 'Tech Blog' },
    whitepaper: { zh: '白皮书', en: 'Whitepaper' },
    case_study: { zh: '案例分析', en: 'Case Study' },
    network_optimization: { zh: '网络优化', en: 'Network Optimization' },
    security_research: { zh: '安全研究', en: 'Security Research' },
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* 页头 */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                {language === 'zh' ? '加速器技术研究' : 'Accelerator Technology Research'}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {language === 'zh' 
                  ? '探索网络加速技术的前沿，分享我们的技术洞察和实践经验'
                  : 'Exploring the frontiers of network acceleration technology, sharing our technical insights and practical experience'
                }
              </p>
            </div>

            {/* 搜索栏 */}
            <div className="mb-8">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={language === 'zh' ? '搜索文章...' : 'Search articles...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                />
              </div>
            </div>

            {/* 文章列表 */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  {searchQuery 
                    ? (language === 'zh' ? '未找到相关文章' : 'No articles found')
                    : (language === 'zh' ? '暂无文章发布' : 'No articles published yet')
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden"
                  >
                    {/* 封面图片 */}
                    {article.cover_image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.cover_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                    )}

                    <CardHeader className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {categoryNames[article.category]?.[language] || article.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {article.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {format(new Date(article.published_at), 'yyyy-MM-dd', {
                                locale: language === 'zh' ? zhCN : undefined
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/research/${article.slug}`}
                        className="inline-flex items-center text-sm text-primary hover:underline group/link"
                      >
                        {language === 'zh' ? '阅读全文' : 'Read More'}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Research;
