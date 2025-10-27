import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, FileText, AlertCircle, Scale, UserCheck, Ban } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('terms.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('terms.lastUpdate')}
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{t('terms.importantTitle')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('terms.importantText')}
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('terms.section1Title')}</h2>
              </div>
              <div className="space-y-3 text-muted-foreground pl-9">
                <p>
                  {t('terms.s1p1')}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('terms.s1l1')}</li>
                  <li>{t('terms.s1l2')}</li>
                  <li>{t('terms.s1l3')}</li>
                  <li>{t('terms.s1l4')}</li>
                </ul>
                <p>
                  {t('terms.s1p2')}
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('terms.section2Title')}</h2>
              </div>
              <div className="space-y-3 text-muted-foreground pl-9">
                <p>{t('terms.s2p1')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('terms.s2l1')}</li>
                  <li>{t('terms.s2l2')}</li>
                  <li>{t('terms.s2l3')}</li>
                  <li>{t('terms.s2l4')}</li>
                  <li>{t('terms.s2l5')}</li>
                  <li>{t('terms.s2l6')}</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Ban className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('terms.section3Title')}</h2>
              </div>
              <div className="space-y-3 text-muted-foreground pl-9">
                <p>{t('terms.s3p1')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('terms.s3l1')}</li>
                  <li>{t('terms.s3l2')}</li>
                  <li>{t('terms.s3l3')}</li>
                  <li>{t('terms.s3l4')}</li>
                  <li>{t('terms.s3l5')}</li>
                  <li>{t('terms.s3l6')}</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Scale className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('terms.section4Title')}</h2>
              </div>
              <div className="space-y-3 text-muted-foreground pl-9">
                <p>
                  {t('terms.s4p1')}
                </p>
                <p>
                  {t('terms.s4p2')}
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('terms.section5Title')}</h2>
              </div>
              <div className="space-y-3 text-muted-foreground pl-9">
                <p>
                  {t('terms.s5p1')}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('terms.s5l1')}</li>
                  <li>{t('terms.s5l2')}</li>
                  <li>{t('terms.s5l3')}</li>
                  <li>{t('terms.s5l4')}</li>
                </ul>
                <p className="font-semibold text-foreground mt-4">
                  {t('terms.s5p2')}
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('terms.section6Title')}</h2>
              </div>
              <div className="space-y-3 text-muted-foreground pl-9">
                <p>
                  {t('terms.s6p1')}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('terms.s6l1')}</li>
                  <li>{t('terms.s6l2')}</li>
                  <li>{t('terms.s6l3')}</li>
                  <li>{t('terms.s6l4')}</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('terms.section7Title')}</h2>
              </div>
              <div className="space-y-3 text-muted-foreground pl-9">
                <p>
                  {t('terms.s7p1')}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('terms.s7l1')}</li>
                  <li>{t('terms.s7l2')}</li>
                  <li>{t('terms.s7l3')}</li>
                  <li>{t('terms.s7l4')}</li>
                </ul>
                <p>
                  {t('terms.s7p2')}
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('terms.section8Title')}</h2>
              </div>
              <div className="space-y-3 text-muted-foreground pl-9">
                <p>
                  {t('terms.s8p1')}
                </p>
                <p>
                  {t('terms.s8p2')}
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Scale className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('terms.section9Title')}</h2>
              </div>
              <div className="space-y-3 text-muted-foreground pl-9">
                <p>
                  {t('terms.s9p1')}
                </p>
                <p>
                  {t('terms.s9p2')}
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('terms.section10Title')}</h2>
              </div>
              <div className="space-y-3 text-muted-foreground pl-9">
                <p>
                  {t('terms.s10p1')}
                </p>
                <ul className="list-none space-y-2">
                  <li>📧 {t('terms.contactEmail')}</li>
                  <li>💬 {t('terms.contactService')}</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Agreement Notice */}
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 mt-8">
            <p className="text-sm text-muted-foreground text-center">
              {t('terms.agreementText')}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
