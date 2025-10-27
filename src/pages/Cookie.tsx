import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cookie = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <article className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            {t("cookie.title")}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">{t("cookie.lastUpdated")}</p>

          <section className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <p className="text-lg leading-relaxed text-foreground/90">
              {t("cookie.intro")}
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t("cookie.whatAreCookies.title")}
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {t("cookie.whatAreCookies.content")}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t("cookie.whyWeUseCookies.title")}
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {t("cookie.whyWeUseCookies.content")}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                {t("cookie.typesOfCookies.title")}
              </h2>
              
              <div className="space-y-6">
                <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("cookie.typesOfCookies.essential.title")}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {t("cookie.typesOfCookies.essential.description")}
                  </p>
                </div>

                <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("cookie.typesOfCookies.performance.title")}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {t("cookie.typesOfCookies.performance.description")}
                  </p>
                </div>

                <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("cookie.typesOfCookies.analytics.title")}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {t("cookie.typesOfCookies.analytics.description")}
                  </p>
                </div>

                <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("cookie.typesOfCookies.advertising.title")}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {t("cookie.typesOfCookies.advertising.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t("cookie.howToControl.title")}
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                {t("cookie.howToControl.content")}
              </p>
              <p className="text-foreground/80 leading-relaxed">
                {t("cookie.howToControl.browserSettings")}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t("cookie.specificCookies.title")}
              </h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">{t("cookie.specificCookies.sessionCookies")}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">{t("cookie.specificCookies.persistentCookies")}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">{t("cookie.specificCookies.securityCookies")}</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t("cookie.thirdParty.title")}
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {t("cookie.thirdParty.content")}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t("cookie.updates.title")}
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {t("cookie.updates.content")}
              </p>
            </div>

            <div className="mt-8 bg-primary/10 rounded-lg p-6 border border-primary/30">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t("cookie.contact.title")}
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-2">
                {t("cookie.contact.content")}
              </p>
              <p className="text-primary font-medium">
                {t("cookie.contact.email")}
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Cookie;
