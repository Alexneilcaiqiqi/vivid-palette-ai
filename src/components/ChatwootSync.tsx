import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// 扩展 Window 类型以包含 Chatwoot SDK
declare global {
  interface Window {
    $chatwoot?: {
      setUser: (identifier: string | number, userObject: any) => void;
      setContactCustomAttributes: (attributes: any) => void;
      reset: () => void;
    };
    chatwootSettings?: any;
  }
}

export const ChatwootSync = () => {
  const { user, session } = useAuth();

  useEffect(() => {
    // 只在用户登录时才同步信息，未登录时让 Chatwoot 保持匿名模式
    if (!user || !session) {
      return;
    }

    // 延迟执行，确保 Chatwoot SDK 已完全加载
    const timer = setTimeout(() => {
      if (window.$chatwoot) {
        try {
          // 使用 email 或 phone 作为显示名称
          const displayName = user.email || user.phone || `User ${user.id.slice(0, 8)}`;

          // 设置用户身份
          window.$chatwoot.setUser(user.id, {
            name: displayName,
            email: user.email || '',
            phone_number: user.phone || ''
          });

          console.log('Chatwoot 用户信息已同步:', displayName);
        } catch (error) {
          console.error('同步 Chatwoot 用户信息失败:', error);
        }
      }
    }, 3000); // 等待 3 秒后再同步

    return () => clearTimeout(timer);
  }, [user, session]);

  return null;
};
