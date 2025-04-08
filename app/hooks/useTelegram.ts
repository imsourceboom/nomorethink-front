'use client';

import { useEffect, useCallback } from 'react';

// Telegram WebApp SDK를 위한 커스텀 훅
export const useTelegram = () => {
  const initTelegram = useCallback(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.requestFullscreen(); // 전체 화면 모드 활성화
      tg.disableVerticalSwipes(); // 수직 스와이프 비활성화
    }
  }, []);

  const handleMainButtonClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.MainButton.onClick(() => {
        console.log('Telegram MainButton clicked');
      });
    }
  }, []);

  useEffect(() => {
    initTelegram();
  }, [initTelegram]);

  return {
    initTelegram,
    handleMainButtonClick
  };
}; 