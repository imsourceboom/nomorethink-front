'use client';

import { useEffect, useState } from 'react';

// Telegram WebApp SDK를 위한 커스텀 훅
export const useTelegram = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      setWebApp(window.Telegram.WebApp);
    }
  }, []);

  return webApp;
}; 