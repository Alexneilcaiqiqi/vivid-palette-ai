import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'zh' || saved === 'en') ? saved : 'zh';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  zh: {
    header: {
      tagline: '专为海外华人设计',
      taglineEn: 'Built for Chinese Abroad',
      home: '首页',
      homeEn: 'Home',
      features: '产品特色',
      featuresEn: 'Features',
      pricing: '套餐价格',
      pricingEn: 'Pricing',
      download: '下载客户端',
      downloadEn: 'Download',
      contact: '联系我们',
      contactEn: 'Contact',
      login: '登录',
      freeTrial: '免费试用'
    },
    hero: {
      title: '倦鸟归巢 一键回国',
      subtitle: '专业的回国网络加速服务，让海外华人轻松访问国内网络资源',
      badge: '高速稳定 • 安全可靠 • 一键连接',
      security: '企业级安全',
      securityEn: 'Enterprise Security',
      latency: '毫秒级延迟',
      latencyEn: 'Ultra Low Latency',
      network: '全球节点',
      networkEn: 'Global Network',
      startTrial: '立即免费试用',
      downloadClient: '下载客户端',
      windows: 'Windows',
      windowsDesc: 'PC客户端',
      macos: 'macOS',
      macosDesc: 'Mac客户端',
      ios: 'iOS',
      iosDesc: 'iPhone/iPad',
      android: 'Android',
      androidDesc: '安卓手机',
      browser: '浏览器',
      browserDesc: 'Chrome插件',
      clickDownload: '点击下载'
    },
    features: {
      badge: '⚡ 产品特色',
      title: '为什么选择',
      titleBrand: '归巢',
      subtitle: '专为海外华人打造的回国网络解决方案，让您在海外也能无缝享受国内的网络服务',
      speed: '极速连接',
      speedDesc: '采用最新加速技术，连接速度提升300%，观看4K视频无缓冲',
      speedHighlight: '毫秒级延迟',
      encryption: '军用级加密',
      encryptionDesc: 'AES-256位加密技术，保护您的网络安全和隐私数据',
      encryptionHighlight: '银行级安全',
      nodes: '全球节点',
      nodesDesc: '覆盖全球50+城市，智能选择最优线路，确保连接稳定',
      nodesHighlight: '50+节点',
      devices: '多设备支持',
      devicesDesc: '一个账户支持10台设备同时使用，全家共享无忧',
      devicesHighlight: '10台设备',
      uptime: '7x24在线',
      uptimeDesc: '99.9%服务可用性，全年无休为您提供稳定的网络服务',
      uptimeHighlight: '99.9%稳定',
      support: '专业客服',
      supportDesc: '中文技术支持团队，微信群实时答疑，问题快速解决',
      supportHighlight: '中文支持',
      stat1: '1M+',
      stat1Label: '用户信赖',
      stat1En: 'Active Users',
      stat2: '50+',
      stat2Label: '全球节点',
      stat2En: 'Global Nodes',
      stat3: '99.9%',
      stat3Label: '稳定运行',
      stat3En: 'Uptime SLA',
      stat4: '24/7',
      stat4Label: '技术支持',
      stat4En: 'Support'
    },
    scenarios: {
      title: '支持加速多种场景',
      subtitle: '无论是娱乐、学习还是工作，归巢为您提供全方位的加速支持',
      video: '影音娱乐',
      videoDesc: '流畅观看国内视频平台，享受高清流媒体',
      sports: '体育赛事',
      sportsDesc: '实时观看大陆体育赛事直播，不错过精彩瞬间',
      gaming: '国服游戏',
      gamingDesc: '降低游戏延迟，畅玩国服热门游戏',
      education: '远程学习',
      educationDesc: '稳定连接大陆教育平台，在线学习无忧',
      meeting: '办公会议',
      meetingDesc: '高效跨境视频会议，团队协作更流畅',
      streaming: '达人直播',
      streamingDesc: '高清流畅直播推流，内容创作更专业'
    },
    pricing: {
      badge: '💰 套餐价格',
      title: '选择适合您的',
      titleBrand: '套餐',
      subtitle: '灵活的价格方案，满足不同用户需求。支持微信、支付宝、USDT等多种支付方式',
      discount: '🎉 年付用户享8折优惠，可节省高达HK$140',
      popular: '🔥 最受欢迎',
      trial: '体验版',
      trialDesc: '新用户专享，体验归巢服务',
      trialPrice: '免费',
      trialPeriod: '3天试用',
      trialButton: '立即试用',
      standard: '标准版',
      standardDesc: '个人用户推荐，性价比之选',
      standardButton: '选择标准版',
      premium: '旗舰版',
      premiumDesc: '家庭/企业用户首选',
      premiumButton: '选择旗舰版',
      selectPlan: '点击选择',
      guarantee1: '7天无忧退款',
      guarantee1Desc: '不满意随时退款',
      guarantee2: '24小时客服',
      guarantee2Desc: '随时为您解答问题',
      guarantee3: '无限流量',
      guarantee3Desc: '畅享高速网络体验',
      paymentTitle: '选择支付方式',
      paymentSecurity: '支付过程安全加密，支持7天无忧退款',
      cancel: '取消',
      wechat: '微信支付',
      wechatDesc: '使用微信快速支付',
      alipayHK: '香港支付宝',
      alipayHKDesc: '支付宝(香港)便捷支付',
      paypal: 'PayPal',
      paypalDesc: '全球通用在线支付',
      googlePay: 'Google Pay',
      googlePayDesc: 'Google 快速支付',
      applePay: 'Apple Pay',
      applePayDesc: 'Apple 设备专用支付',
      stripe: 'Stripe',
      stripeDesc: '信用卡/借记卡支付'
    }
  },
  en: {
    header: {
      tagline: 'Built for Chinese Abroad',
      taglineEn: '专为海外华人设计',
      home: 'Home',
      homeEn: '首页',
      features: 'Features',
      featuresEn: '产品特色',
      pricing: 'Pricing',
      pricingEn: '套餐价格',
      download: 'Download',
      downloadEn: '下载客户端',
      contact: 'Contact',
      contactEn: '联系我们',
      login: 'Login',
      freeTrial: 'Free Trial'
    },
    hero: {
      title: 'Home Network Access Simplified',
      subtitle: 'Professional network acceleration service for Chinese living abroad to easily access domestic network resources',
      badge: 'Fast & Stable • Secure & Reliable • One-Click Connect',
      security: 'Enterprise Security',
      securityEn: '企业级安全',
      latency: 'Ultra Low Latency',
      latencyEn: '毫秒级延迟',
      network: 'Global Network',
      networkEn: '全球节点',
      startTrial: 'Start Free Trial',
      downloadClient: 'Download Client',
      windows: 'Windows',
      windowsDesc: 'PC Client',
      macos: 'macOS',
      macosDesc: 'Mac Client',
      ios: 'iOS',
      iosDesc: 'iPhone/iPad',
      android: 'Android',
      androidDesc: 'Android Phone',
      browser: 'Browser',
      browserDesc: 'Chrome Extension',
      clickDownload: 'Click to Download'
    },
    features: {
      badge: '⚡ Features',
      title: 'Why Choose',
      titleBrand: 'GuiChao',
      subtitle: 'Network solution designed for overseas Chinese, enabling seamless access to domestic network services',
      speed: 'Lightning Fast',
      speedDesc: 'Latest acceleration technology, 300% speed boost, buffer-free 4K streaming',
      speedHighlight: 'Ultra Low Latency',
      encryption: 'Military Grade Encryption',
      encryptionDesc: 'AES-256 encryption protects your network security and privacy',
      encryptionHighlight: 'Bank Level Security',
      nodes: 'Global Network',
      nodesDesc: '50+ cities worldwide, intelligent routing for stable connections',
      nodesHighlight: '50+ Nodes',
      devices: 'Multi-Device Support',
      devicesDesc: 'One account supports 10 devices simultaneously, family sharing made easy',
      devicesHighlight: '10 Devices',
      uptime: '7x24 Online',
      uptimeDesc: '99.9% service availability, year-round stable network service',
      uptimeHighlight: '99.9% Uptime',
      support: 'Professional Support',
      supportDesc: 'Chinese technical support team, WeChat group real-time assistance',
      supportHighlight: 'Chinese Support',
      stat1: '1M+',
      stat1Label: 'Active Users',
      stat1En: '用户信赖',
      stat2: '50+',
      stat2Label: 'Global Nodes',
      stat2En: '全球节点',
      stat3: '99.9%',
      stat3Label: 'Uptime SLA',
      stat3En: '稳定运行',
      stat4: '24/7',
      stat4Label: 'Support',
      stat4En: '技术支持'
    },
    scenarios: {
      title: 'Multiple Acceleration Scenarios',
      subtitle: 'Whether entertainment, learning or work, GuiChao provides comprehensive acceleration support',
      video: 'Video Entertainment',
      videoDesc: 'Smooth streaming from domestic video platforms, enjoy HD content',
      sports: 'Sports Events',
      sportsDesc: 'Watch mainland sports broadcasts in real-time, never miss exciting moments',
      gaming: 'Domestic Gaming',
      gamingDesc: 'Reduce game latency, enjoy popular domestic games smoothly',
      education: 'Remote Learning',
      educationDesc: 'Stable connection to mainland education platforms, worry-free online learning',
      meeting: 'Business Meetings',
      meetingDesc: 'Efficient cross-border video conferences, smoother team collaboration',
      streaming: 'Live Streaming',
      streamingDesc: 'HD smooth streaming, more professional content creation'
    },
    pricing: {
      badge: '💰 Pricing',
      title: 'Choose Your',
      titleBrand: 'Plan',
      subtitle: 'Flexible pricing plans to meet different user needs. Supports WeChat Pay, Alipay, USDT and more',
      discount: '🎉 Annual plan users enjoy 20% off, save up to HK$140',
      popular: '🔥 Most Popular',
      trial: 'Trial',
      trialDesc: 'New user exclusive, experience GuiChao service',
      trialPrice: 'Free',
      trialPeriod: '3-day trial',
      trialButton: 'Start Trial',
      standard: 'Standard',
      standardDesc: 'Recommended for individual users, best value',
      standardButton: 'Choose Standard',
      premium: 'Premium',
      premiumDesc: 'Best choice for families/enterprises',
      premiumButton: 'Choose Premium',
      selectPlan: 'Click to Select',
      guarantee1: '7-Day Money Back',
      guarantee1Desc: 'Refund anytime if unsatisfied',
      guarantee2: '24-Hour Support',
      guarantee2Desc: 'Answer your questions anytime',
      guarantee3: 'Unlimited Data',
      guarantee3Desc: 'Enjoy high-speed network experience',
      paymentTitle: 'Select Payment Method',
      paymentSecurity: 'Secure encrypted payment, supports 7-day money-back guarantee',
      cancel: 'Cancel',
      wechat: 'WeChat Pay',
      wechatDesc: 'Quick payment with WeChat',
      alipayHK: 'Alipay HK',
      alipayHKDesc: 'Convenient payment with Alipay (Hong Kong)',
      paypal: 'PayPal',
      paypalDesc: 'Global online payment',
      googlePay: 'Google Pay',
      googlePayDesc: 'Quick payment with Google',
      applePay: 'Apple Pay',
      applePayDesc: 'Payment for Apple devices',
      stripe: 'Stripe',
      stripeDesc: 'Credit/Debit card payment'
    }
  }
};
