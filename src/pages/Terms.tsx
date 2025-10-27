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
                  我们提供的网络加速服务旨在优化您的网络连接体验。服务内容包括但不限于：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>网络连接加速和优化</li>
                  <li>多节点服务器支持</li>
                  <li>数据传输加密</li>
                  <li>技术支持和客户服务</li>
                </ul>
                <p>
                  我们保留随时修改、暂停或终止部分或全部服务的权利，恕不另行通知。
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
                <p>作为服务用户，您同意：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>提供真实、准确的注册信息</li>
                  <li>妥善保管账户信息和密码</li>
                  <li>遵守所有适用的法律法规</li>
                  <li>不得将服务用于任何非法或未授权的目的</li>
                  <li>不得干扰或破坏服务的正常运行</li>
                  <li>不得尝试未经授权访问我们的系统或网络</li>
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
                <p>使用我们的服务时，严禁从事以下行为：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>发布、传输任何违法、有害、威胁、辱骂、骚扰、侵权、中伤、粗俗、淫秽或其他令人反感的内容</li>
                  <li>侵犯他人的知识产权或其他合法权益</li>
                  <li>传播病毒、恶意代码或其他可能损害系统的内容</li>
                  <li>进行任何形式的网络攻击或恶意行为</li>
                  <li>滥用服务资源或影响其他用户的正常使用</li>
                  <li>未经授权共享账户或转售服务</li>
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
                  本服务及其所有相关内容（包括但不限于软件、文本、图片、标志、音频、视频）的知识产权归我们或相关权利人所有。
                </p>
                <p>
                  未经明确书面许可，您不得复制、修改、传播、展示或以其他方式使用这些内容。
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
                  我们将尽力提供稳定可靠的服务，但不对以下情况承担责任：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>因不可抗力、网络故障、系统维护等原因导致的服务中断</li>
                  <li>因用户自身原因（如设备故障、网络问题）造成的使用障碍</li>
                  <li>第三方服务或内容的质量、安全性或合法性</li>
                  <li>因用户违反本条款或相关法律法规造成的任何损失</li>
                </ul>
                <p className="font-semibold text-foreground mt-4">
                  服务按"现状"和"可用"基础提供，不提供任何明示或暗示的保证。
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
                  部分服务需要付费使用。具体费用标准以网站公布的价格为准。
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>所有费用均以人民币计价</li>
                  <li>支付后不支持退款，除非法律另有规定</li>
                  <li>我们保留随时调整价格的权利</li>
                  <li>如因您的原因导致支付失败，我们不承担责任</li>
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
                  在以下情况下，我们有权暂停或终止您的账户：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>您违反本服务条款的任何规定</li>
                  <li>您的行为可能给我们或其他用户带来法律风险</li>
                  <li>您长期未使用账户（超过12个月）</li>
                  <li>应司法机关或政府部门的要求</li>
                </ul>
                <p>
                  账户终止后，您将无法访问服务，且我们不对任何数据丢失承担责任。
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
                  我们保留随时修改本服务条款的权利。重大变更将通过网站公告或电子邮件通知您。
                </p>
                <p>
                  继续使用服务即表示您接受修改后的条款。如不同意变更，请停止使用服务。
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
                  本条款受中华人民共和国法律管辖。因本条款引起的任何争议，双方应首先通过友好协商解决。
                </p>
                <p>
                  协商不成的，任何一方均可向我们所在地有管辖权的人民法院提起诉讼。
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
                  如您对本服务条款有任何疑问或建议，请通过以下方式联系我们：
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
