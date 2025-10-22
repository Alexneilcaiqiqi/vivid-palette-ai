import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background floating-particles relative overflow-hidden">
      {/* 蓝色光晕装饰 */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="text-center max-w-lg mx-auto px-4 relative z-10">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-feature-4 rounded-full flex items-center justify-center mx-auto mb-6 animate-float shadow-neon">
            <span className="text-white font-bold text-4xl">404</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">页面</span>
            <span className="text-gradient ml-3">走丢了</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            抱歉，您访问的页面不存在或已被移动
          </p>
        </div>
        
        <div className="space-y-4">
          <a 
            href="/" 
            className="inline-flex items-center px-8 py-3 bg-gradient-to-b from-[#5DB5FF] via-[#7B8EFF] via-50% to-[#9B6FFF] text-white rounded-lg hover:shadow-neon-strong hover:scale-105 transition-all duration-300 font-medium"
          >
            返回首页
          </a>
          <p className="text-sm text-muted-foreground">
            或者您可以尝试使用导航菜单找到您需要的内容
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
