import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Users, FileText, Bell, Globe, HelpCircle, Mail } from "lucide-react";

const Privacy = () => {
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
            隐私政策
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            归巢 GuiChao 深知个人信息对您的重要性，我们将按照法律法规的要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>更新日期：2024年12月30日</p>
            <p>生效日期：2024年12月30日</p>
          </div>
        </div>

        {/* 特别提示 */}
        <div className="max-w-4xl mx-auto mb-12 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-primary" />
            特别提示
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            请您仔细阅读本《归巢隐私政策》（尤其是<strong className="text-foreground">加粗</strong>的内容）并确定了解我们对您个人信息的处理规则。
            在阅读过程中，如您有任何疑问，可通过本政策中约定的联系方式与我们联系。
            <strong className="text-foreground">如您不同意本协议中的任何条款，您应立即停止访问和使用归巢服务。</strong>
          </p>
        </div>

        {/* 主要内容 */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* 目录 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-primary" />
              目录
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">一、我们如何收集和使用您的个人信息</li>
              <li className="hover:text-primary transition-colors cursor-pointer">二、我们如何使用 Cookie 和同类技术</li>
              <li className="hover:text-primary transition-colors cursor-pointer">三、我们如何共享、转让、公开披露您的个人信息</li>
              <li className="hover:text-primary transition-colors cursor-pointer">四、我们如何存储和保护您的个人信息</li>
              <li className="hover:text-primary transition-colors cursor-pointer">五、您管理个人信息的权利</li>
              <li className="hover:text-primary transition-colors cursor-pointer">六、未成年人个人信息的保护</li>
              <li className="hover:text-primary transition-colors cursor-pointer">七、隐私政策的变更和修订</li>
              <li className="hover:text-primary transition-colors cursor-pointer">八、如何联系我们</li>
            </ul>
          </section>

          {/* 引言 */}
          <section>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                归巢（GuiChao）由 HK Guichao Technology Co., Limited 开发和运营。我们尊重并保护所有使用服务用户的个人信息，
                并将按照法律法规的规定保护用户信息及隐私安全。我们致力于维持您对我们的信任，恪守以下原则保护您的个人信息：
                <strong className="text-foreground">权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则</strong>等。
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                请您在使用我们的产品和服务前，仔细阅读并了解本隐私政策。一旦您开始使用归巢服务，即表示您已充分理解并同意本政策。
              </p>
            </div>
          </section>

          {/* 第一部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-3 text-primary" />
              一、我们如何收集和使用您的个人信息
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">1.1 账号注册与登录</h3>
                <p className="text-muted-foreground leading-relaxed">
                  当您注册归巢账号时，我们会收集您的<strong className="text-foreground">手机号码、邮箱地址、密码</strong>等信息，
                  用于创建账号和验证您的身份。您可以选择通过第三方账号（如微信、Apple ID）登录，
                  我们将在获得您授权后收集您的<strong className="text-foreground">昵称、头像</strong>等公开信息。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">1.2 网络加速服务</h3>
                <p className="text-muted-foreground leading-relaxed">
                  为了向您提供网络加速服务，我们需要收集您的<strong className="text-foreground">设备信息（设备型号、操作系统版本、设备标识符）、
                  网络信息（IP地址、网络类型、网络状态）、连接日志</strong>等。这些信息用于优化服务质量、诊断网络问题和保障服务安全。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">1.3 支付功能</h3>
                <p className="text-muted-foreground leading-relaxed">
                  当您购买我们的付费服务时，我们可能会收集您的<strong className="text-foreground">支付信息</strong>，
                  包括第三方支付账号（支付宝、微信支付、Apple Pay等）。支付信息由第三方支付机构收集和处理，我们仅保存必要的订单信息。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">1.4 客户服务</h3>
                <p className="text-muted-foreground leading-relaxed">
                  当您联系我们的客户服务时，我们可能会收集您的<strong className="text-foreground">联系方式、问题描述、聊天记录</strong>等，
                  以便为您提供支持和解决问题。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">1.5 征得授权同意的例外</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  根据相关法律法规规定，以下情形中收集您的个人信息无需征得您的授权同意：
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>与国家安全、国防安全直接相关的</li>
                  <li>与公共安全、公共卫生、重大公共利益直接相关的</li>
                  <li>与犯罪侦查、起诉、审判和判决执行等直接相关的</li>
                  <li>出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的</li>
                  <li>您自行向社会公众公开的个人信息</li>
                  <li>从合法公开披露的信息中收集的个人信息</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 第二部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-primary" />
              二、我们如何使用 Cookie 和同类技术
            </h2>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                为确保网站正常运转、为您获得更轻松的访问体验、向您推荐您可能感兴趣的内容，
                我们会在您的设备上存储名为 Cookie 的小数据文件。Cookie 通常包含标识符、站点名称以及一些号码和字符。
              </p>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Cookie 的主要用途：</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong className="text-foreground">保障产品与服务的安全、高效运转：</strong>我们可能会设置认证与保障安全性的 Cookie，使您避免重复登录</li>
                  <li><strong className="text-foreground">帮助您获得更轻松的访问体验：</strong>使用 Cookie 可以帮助您省去重复填写信息、输入搜索内容的步骤</li>
                  <li><strong className="text-foreground">为您推荐、展示个性化内容：</strong>我们可能会利用 Cookie 了解您的偏好和使用习惯，进行数据分析，以改善产品服务、推荐个性化内容</li>
                </ul>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                您可以通过浏览器设置管理或删除 Cookie。但如果您这么做，可能需要在每次访问时亲自更改用户设置，
                并且您之前所记录的相应信息也均会被删除，可能会对您使用的服务的安全性有一定影响。
              </p>
            </div>
          </section>

          {/* 第三部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-primary" />
              三、我们如何共享、转让、公开披露您的个人信息
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">3.1 共享</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  <strong className="text-foreground">我们不会与任何公司、组织和个人共享您的个人信息</strong>，但以下情况除外：
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息</li>
                  <li>在法定情形下的共享：根据法律法规、诉讼、争议解决需要，或按行政、司法机关依法提出的要求，我们可能会共享您的个人信息</li>
                  <li>与关联公司共享：为便于我们向您提供服务，您的个人信息可能会与我们的关联公司共享</li>
                  <li>与授权合作伙伴共享：仅为实现本政策中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">3.2 转让</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">我们不会将您的个人信息转让给任何公司、组织和个人</strong>，但以下情况除外：
                  在获取明确同意的情况下转让；在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">3.3 公开披露</h3>
                <p className="text-muted-foreground leading-relaxed">
                  我们仅会在以下情况下，公开披露您的个人信息：获得您明确同意后；基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。
                </p>
              </div>
            </div>
          </section>

          {/* 第四部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Lock className="w-6 h-6 mr-3 text-primary" />
              四、我们如何存储和保护您的个人信息
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">4.1 信息存储</h3>
                <p className="text-muted-foreground leading-relaxed">
                  您的个人信息将存储于<strong className="text-foreground">中华人民共和国境内</strong>。
                  如需跨境传输，我们将会单独征得您的授权同意，并确保数据接收方有充足的数据保护能力来保护您的个人信息。
                  我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非法律有强制的存留要求。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">4.2 信息安全</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  我们努力为用户的信息安全提供保障，以防止信息的丢失、不当使用、未经授权访问或披露。我们采取的安全措施包括：
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>我们使用各种安全技术以保障信息的安全。例如，我们会使用加密技术（如 SSL）来保护您的个人信息</li>
                  <li>我们建立专门的管理制度、流程和组织以保障信息的安全</li>
                  <li>我们对可能接触到您的信息的员工采取严格管理，包括采取不同的权限控制</li>
                  <li>我们会采取适当的符合业界标准的安全措施和技术手段存储和保护您的个人信息，以防止其丢失、被误用、受到未授权访问或泄漏、被篡改或毁坏</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">4.3 安全事件处置</h3>
                <p className="text-muted-foreground leading-relaxed">
                  在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、
                  我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。
                  我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您。
                </p>
              </div>
            </div>
          </section>

          {/* 第五部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-primary" />
              五、您管理个人信息的权利
            </h2>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：
              </p>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">5.1 访问和更新您的个人信息</h3>
                <p className="text-muted-foreground leading-relaxed">
                  您有权访问和更新您的个人信息，法律法规规定的例外情况除外。您可以通过以下方式自行访问和更新您的个人信息：
                  登录账号后，在"个人中心"查看和修改您的账号信息、个人资料等。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">5.2 删除您的个人信息</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  在以下情形中，您可以向我们提出删除个人信息的请求：
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>如果我们处理个人信息的行为违反法律法规</li>
                  <li>如果我们收集、使用您的个人信息，却未征得您的同意</li>
                  <li>如果我们处理个人信息的行为违反了与您的约定</li>
                  <li>如果您注销了账号</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">5.3 注销账号</h3>
                <p className="text-muted-foreground leading-relaxed">
                  您可以通过联系客服的方式申请注销您的账号。在您注销账号后，我们将停止为您提供产品或服务，
                  并根据您的要求删除您的个人信息，法律法规另有规定的除外。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">5.4 撤回同意</h3>
                <p className="text-muted-foreground leading-relaxed">
                  您可以通过删除信息、关闭设备功能、在网站或软件中进行隐私设置等方式改变您授权我们继续收集个人信息的范围或撤回您的授权。
                  您也可以通过注销账号的方式，撤回我们继续收集您个人信息的全部授权。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">5.5 响应您的请求</h3>
                <p className="text-muted-foreground leading-relaxed">
                  为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。
                  我们将在15个工作日内做出答复。如您不满意，还可以通过本政策中的联系方式投诉。
                </p>
              </div>
            </div>
          </section>

          {/* 第六部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-primary" />
              六、未成年人个人信息的保护
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                我们非常重视对未成年人个人信息的保护。若您是18周岁以下的未成年人，在使用我们的产品和/或服务前，
                <strong className="text-foreground">应事先取得您家长或法定监护人的书面同意</strong>。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                我们根据国家相关法律法规的规定保护未成年人的个人信息。对于经父母或法定监护人同意而收集未成年人个人信息的情况，
                我们只会在受到法律允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用或公开披露此信息。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                如果我们发现自己在未事先获得可证实的父母或法定监护人同意的情况下收集了未成年人的个人信息，
                则会设法尽快删除相关数据。
              </p>
            </div>
          </section>

          {/* 第七部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-primary" />
              七、隐私政策的变更和修订
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                为了给您提供更好的服务，我们可能会根据产品或服务的更新情况及法律法规的相关要求适时修改本政策的条款，
                该等修改构成本隐私政策的一部分。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                如该等更新造成您在本隐私政策下权利的实质减少或重大变更，我们将在本政策生效前通过网站公告、推送通知、
                弹窗提示或其他方式来通知您，<strong className="text-foreground">您如果不同意该等变更，可以选择停止使用我们的产品和服务</strong>；
                如您仍然继续使用我们的产品和服务，即表示您已充分阅读、理解并同意受经修订的本隐私政策的约束。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                本政策所指的重大变更包括但不限于：
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>我们的服务模式发生重大变化</li>
                <li>个人信息共享、转让或公开披露的主要对象发生变化</li>
                <li>您参与个人信息处理方面的权利及其行使方式发生重大变化</li>
                <li>我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化</li>
              </ul>
            </div>
          </section>

          {/* 第八部分 */}
          <section className="p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 mr-3 text-primary" />
              八、如何联系我们
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                如果您对本隐私政策有任何疑问、意见或建议，或您在使用我们的服务时遇到任何与个人信息保护相关的问题，
                您可以通过以下方式与我们联系：
              </p>
              <div className="p-6 bg-primary/5 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">电子邮件</p>
                    <p className="text-muted-foreground">privacy@guichao.win</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">公司名称</p>
                    <p className="text-muted-foreground">HK Guichao Technology Co., Limited</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                一般情况下，我们将在<strong className="text-foreground">15个工作日</strong>内回复。
                如果您对我们的回复不满意，特别是您认为我们的个人信息处理行为损害了您的合法权益，
                您还可以通过向被告住所地有管辖权的法院提起诉讼来寻求解决方案。
              </p>
            </div>
          </section>

          {/* 再次提醒 */}
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center">
            <p className="text-foreground font-semibold mb-2">
              再次感谢您对归巢的信任！
            </p>
            <p className="text-muted-foreground">
              我们将竭诚为您提供安全、可靠的网络加速服务，并持续保护您的个人信息安全。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
