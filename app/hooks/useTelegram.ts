'use client';

import { useEffect, useState } from 'react';
import { TelegramWebApp } from '../types/telegram';

// Telegram WebApp SDK를 위한 커스텀 훅
export const useTelegram = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);

  useEffect(() => {
    // @ts-ignore - Telegram WebApp SDK는 window 객체에 자동으로 주입됩니다
    const tg = window.Telegram?.WebApp;
    if (tg) {
      setWebApp(tg);
    }
  }, []);

  return webApp;
}; 