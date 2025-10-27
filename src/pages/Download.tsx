import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Smartphone, Monitor, Tablet, Router, Globe, CheckCircle, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const DownloadPage = () => {
  const { t } = useLanguage();
  const platforms = [
    {
      name: "Windows",
      icon: <Monitor className="w-8 h-8" />,
      version: "v2.1.5",
      size: "15.2 MB",
      requirements: "Windows 10/11 (64-bit)",
      downloadUrl: "#",
      features: [t('download.oneClickConnect'), t('download.smartRouting'), t('download.autoStart')],
      gradient: "bg-gradient-feature-4"
    },
    {
      name: "macOS",
      icon: <Monitor className="w-8 h-8" />,
      version: "v2.1.5",
      size: "18.7 MB", 
      requirements: "macOS 11.0 或更高版本",
      downloadUrl: "#",
      features: [t('download.nativeSupport'), t('download.menubarControl'), t('download.systemIntegration')],
      gradient: "bg-gradient-feature-4"
    },
    {
      name: "iOS",
      icon: <Smartphone className="w-8 h-8" />,
      version: "v1.8.3",
      size: "23.1 MB",
      requirements: "iOS 13.0 或更高版本",
      downloadUrl: "#",
      features: [t('download.appStore'), t('download.shortcuts'), t('download.siriSupport')],
      gradient: "bg-gradient-feature-4"
    },
    {
      name: "Android",
      icon: <Smartphone className="w-8 h-8" />,
      version: "v1.8.3", 
      size: "12.8 MB",
      requirements: "Android 7.0 或更高版本",
      downloadUrl: "#",
      features: [t('download.googlePlay'), t('download.oneClickShare'), t('download.powerSaving')],
      gradient: "bg-gradient-feature-4"
    },
    {
      name: t('download.routerFirmware'),
      icon: <Router className="w-8 h-8" />,
      version: "v1.2.1",
      size: "8.5 MB",
      requirements: "支持OpenWrt的路由器",
      downloadUrl: "#",
      features: [t('download.familyShare'), t('download.deviceControl'), t('download.timedSwitch')],
      gradient: "bg-gradient-feature-4"
    },
    {
      name: t('download.browserExtension'),
      icon: <Globe className="w-8 h-8" />,
      version: "v1.5.2",
      size: "2.1 MB",
      requirements: "Chrome/Firefox/Safari",
      downloadUrl: "#",
      features: [t('download.freeUse'), t('download.webProxy'), t('download.smartSplit')],
      gradient: "bg-gradient-feature-4"
    }
  ];

  const tutorials = [
    {
      platform: "Windows",
      steps: [
        t('download.windowsStep1'),
        t('download.windowsStep2'),
        t('download.windowsStep3'),
        t('download.windowsStep4')
      ]
    },
    {
      platform: t('download.mobileTutorial'),
      steps: [
        t('download.mobileStep1'),
        t('download.mobileStep2'),
        t('download.mobileStep3'),
        t('download.mobileStep4')
      ]
    },
    {
      platform: t('download.routerTutorial'),
      steps: [
        t('download.routerStep1'),
        t('download.routerStep2'),
        t('download.routerStep3'),
        t('download.routerStep4')
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="py-20 pt-32 relative floating-particles">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-card/50 rounded-full border border-primary/20 mb-6 glass-effect">
            <span className="text-sm text-primary font-medium">{t('download.badge')}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">{t('download.title')}</span>
            <span className="text-gradient ml-3">{t('download.titleBrand')}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            {t('download.subtitle')}
          </p>

          {/* 快速下载按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="xl" className="bg-gradient-to-b from-[#5DB5FF] via-[#7B8EFF] via-50% to-[#9B6FFF] text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Download className="mr-2 w-5 h-5" />
              {t('download.smartDownload')}
            </Button>
            <Button variant="outline" size="xl" className="border-blue-400/20 hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-300">
              {t('download.viewTutorial')}
            </Button>
          </div>
        </div>
      </section>

      {/* 客户端下载区 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <Card key={platform.name} className="group relative bg-card/40 border-blue-400/20 hover:border-blue-400/40 hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-6">
                  {/* 背景渐变效果 */}
                  <div className="absolute inset-0 bg-blue-950/30 group-hover:bg-blue-500/30 rounded-2xl transition-all duration-500"></div>
                  
                  {/* 图标和名称 */}
                  <div className="relative z-10 flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-b from-[#5DB5FF] via-[#7B8EFF] via-50% to-[#9B6FFF] rounded-xl text-white mr-4 group-hover:scale-110 transition-transform duration-300">
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{platform.name}</h3>
                      <p className="text-sm text-muted-foreground">{platform.version} • {platform.size}</p>
                    </div>
                  </div>

                  {/* 系统要求 */}
                  <p className="relative z-10 text-sm text-muted-foreground mb-4">{platform.requirements}</p>

                  {/* 特色功能 */}
                  <div className="relative z-10 space-y-2 mb-6">
                    {platform.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* 下载按钮 */}
                  <Button className="relative z-10 w-full bg-gradient-to-b from-[#F5E6BB] to-[#FFB472] text-gray-900 hover:text-gray-900 hover:opacity-90 hover:scale-105 transition-all duration-300">
                    <Download className="mr-2 w-4 h-4" />
                    {t('download.downloadBtn')} {platform.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 使用教程 */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-foreground">{t('download.tutorialTitle')}</span>
              <span className="text-gradient ml-3">{t('download.tutorialBrand')}</span>
            </h2>
            <p className="text-xl text-muted-foreground">{t('download.tutorialSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <Card key={tutorial.platform} className="group relative bg-card/40 border-blue-400/20 hover:border-blue-400/40 hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-6">
                  {/* 背景渐变效果 */}
                  <div className="absolute inset-0 bg-blue-950/30 group-hover:bg-blue-500/30 rounded-2xl transition-all duration-500"></div>
                  
                  <h3 className="relative z-10 text-xl font-bold text-foreground group-hover:text-primary mb-6 text-center transition-colors duration-300">{tutorial.platform}</h3>
                  <div className="relative z-10 space-y-4">
                    {tutorial.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-b from-[#5DB5FF] via-[#7B8EFF] via-50% to-[#9B6FFF] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                          {stepIndex + 1}
                        </div>
                        <p className="text-foreground">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 技术支持 */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-foreground">{t('download.helpTitle')}</span>
              <span className="text-gradient ml-3">{t('download.helpBrand')}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('download.helpSubtitle')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{t('download.downloadIssues')}</h4>
                <p className="text-muted-foreground text-sm">{t('download.downloadIssuesDesc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{t('download.tutorialGuide')}</h4>
                <p className="text-muted-foreground text-sm">{t('download.tutorialGuideDesc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{t('download.support247')}</h4>
                <p className="text-muted-foreground text-sm">{t('download.support247Desc')}</p>
              </div>
            </div>

            <Button size="xl" className="bg-gradient-to-b from-[#5DB5FF] via-[#7B8EFF] via-50% to-[#9B6FFF] text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
              {t('download.contactSupport')}
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DownloadPage;