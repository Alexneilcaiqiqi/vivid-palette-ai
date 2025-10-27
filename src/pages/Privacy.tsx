import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Users, FileText, Bell, Globe, HelpCircle, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24" role="main">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            {t('privacy.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('privacy.subtitle')}
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>{t('privacy.updateDate')}</p>
            <p>{t('privacy.effectiveDate')}</p>
          </div>
        </div>

        {/* 特别提示 */}
        <div className="max-w-4xl mx-auto mb-12 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-primary" />
            {t('privacy.importantTitle')}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('privacy.importantText')}
          </p>
        </div>

        {/* 主要内容 */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* 目录 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-primary" />
              {t('privacy.tocTitle')}
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">{t('privacy.section1')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('privacy.section2')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('privacy.section3')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('privacy.section4')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('privacy.section5')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('privacy.section6')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('privacy.section7')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('privacy.section8')}</li>
            </ul>
          </section>

          {/* 引言 */}
          <section>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.introPara1')}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {t('privacy.introPara2')}
              </p>
            </div>
          </section>

          {/* 第一部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-3 text-primary" />
              {t('privacy.section1')}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s1h1')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s1p1')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s1h2')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s1p2')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s1h3')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s1p3')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s1h4')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s1p4')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s1h5')}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {t('privacy.s1p5')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{t('privacy.s1l1')}</li>
                  <li>{t('privacy.s1l2')}</li>
                  <li>{t('privacy.s1l3')}</li>
                  <li>{t('privacy.s1l4')}</li>
                  <li>{t('privacy.s1l5')}</li>
                  <li>{t('privacy.s1l6')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 第二部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-primary" />
              {t('privacy.section2')}
            </h2>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s2p1')}
              </p>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s2h1')}</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{t('privacy.s2l1')}</li>
                  <li>{t('privacy.s2l2')}</li>
                  <li>{t('privacy.s2l3')}</li>
                </ul>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s2p2')}
              </p>
            </div>
          </section>

          {/* 第三部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-primary" />
              {t('privacy.section3')}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s3h1')}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {t('privacy.s3p1')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{t('privacy.s3l1')}</li>
                  <li>{t('privacy.s3l2')}</li>
                  <li>{t('privacy.s3l3')}</li>
                  <li>{t('privacy.s3l4')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s3h2')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s3p2')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s3h3')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s3p3')}
                </p>
              </div>
            </div>
          </section>

          {/* 第四部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Lock className="w-6 h-6 mr-3 text-primary" />
              {t('privacy.section4')}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s4h1')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s4p1')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s4h2')}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {t('privacy.s4p2')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{t('privacy.s4l1')}</li>
                  <li>{t('privacy.s4l2')}</li>
                  <li>{t('privacy.s4l3')}</li>
                  <li>{t('privacy.s4l4')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s4h3')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s4p3')}
                </p>
              </div>
            </div>
          </section>

          {/* 第五部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-primary" />
              {t('privacy.section5')}
            </h2>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s5p1')}
              </p>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s5h1')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s5p2')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s5h2')}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {t('privacy.s5p3')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{t('privacy.s5l1')}</li>
                  <li>{t('privacy.s5l2')}</li>
                  <li>{t('privacy.s5l3')}</li>
                  <li>{t('privacy.s5l4')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s5h3')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s5p4')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s5h4')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s5p5')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t('privacy.s5h5')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('privacy.s5p6')}
                </p>
              </div>
            </div>
          </section>

          {/* 第六部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-primary" />
              {t('privacy.section6')}
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s6p1')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s6p2')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s6p3')}
              </p>
            </div>
          </section>

          {/* 第七部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-primary" />
              {t('privacy.section7')}
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s7p1')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s7p2')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s7p3')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t('privacy.s7l1')}</li>
                <li>{t('privacy.s7l2')}</li>
                <li>{t('privacy.s7l3')}</li>
                <li>{t('privacy.s7l4')}</li>
              </ul>
            </div>
          </section>

          {/* 第八部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 mr-3 text-primary" />
              {t('privacy.section8')}
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s8p1')}
              </p>
              <div className="p-6 bg-primary/5 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{t('privacy.contactEmail')}</p>
                    <p className="text-muted-foreground">privacy@guichao.win</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{t('privacy.companyName')}</p>
                    <p className="text-muted-foreground">HK Guichao Technology Co., Limited</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.s8p2')}
              </p>
            </div>
          </section>

          {/* 再次提醒 */}
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center">
            <p className="text-foreground font-semibold mb-2">
              {t('privacy.thanksTitle')}
            </p>
            <p className="text-muted-foreground">
              {t('privacy.thanksText')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
