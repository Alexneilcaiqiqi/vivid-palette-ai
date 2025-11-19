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
    // 如果用户未登录，重置 Chatwoot
    if (!user || !session) {
      if (window.$chatwoot) {
        window.$chatwoot.reset();
      }
      return;
    }

    // 设置用户信息到 Chatwoot
    const syncUserToChatwoot = () => {
      if (!window.$chatwoot) {
        // SDK 未加载，等待片刻后重试
        setTimeout(syncUserToChatwoot, 500);
        return;
      }

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
    };

    // 启动同步
    syncUserToChatwoot();
  }, [user, session]);

  return null;
};
