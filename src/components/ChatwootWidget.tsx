import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

declare global {
  interface Window {
    $chatwoot?: {
      setUser: (identifier: string, userInfo: {
        name?: string;
        email?: string;
        phone_number?: string;
      }) => void;
      reset: () => void;
    };
  }
}

export const ChatwootWidget = () => {
  const { user, session } = useAuth();

  useEffect(() => {
    // 等待 Chatwoot SDK 加载
    const checkChatwoot = setInterval(() => {
      if (window.$chatwoot) {
        clearInterval(checkChatwoot);
        
        if (user && session) {
          // 用户已登录，设置用户信息
          const userInfo: {
            name?: string;
            email?: string;
            phone_number?: string;
          } = {};

          // 优先使用邮箱作为 name，如果没有则使用 phone
          if (session.user.email) {
            userInfo.name = session.user.email;
            userInfo.email = session.user.email;
          } else if (session.user.phone) {
            userInfo.name = session.user.phone;
            userInfo.phone_number = session.user.phone;
          }

          // 如果有 username metadata，使用它作为显示名称
          if (session.user.user_metadata?.username) {
            userInfo.name = session.user.user_metadata.username;
          }

          console.log('Setting Chatwoot user:', userInfo);
          window.$chatwoot.setUser(session.user.id, userInfo);
        } else {
          // 用户已登出，重置 Chatwoot
          console.log('Resetting Chatwoot user');
          window.$chatwoot.reset();
        }
      }
    }, 500);

    // 清理定时器
    return () => clearInterval(checkChatwoot);
  }, [user, session]);

  return null; // 这是一个无 UI 组件
};
