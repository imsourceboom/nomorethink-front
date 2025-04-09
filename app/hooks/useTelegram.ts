'use client';

import { useEffect, useCallback } from 'react';
import { setThemeParams } from '../utils/theme';

// Telegram WebApp SDK를 위한 커스텀 훅
export const useTelegram = () => {
  const initTelegram = useCallback(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // 기본 초기화
      tg.ready();
      tg.expand();
      tg.requestFullscreen();
      tg.disableVerticalSwipes();

      // 테마 설정
      if (tg.themeParams) {
        setThemeParams(tg.themeParams);
      }

      // 테마 변경 이벤트 리스너
      tg.onEvent('themeChanged', () => {
        if (tg.themeParams) {
          setThemeParams(tg.themeParams);
        }
      });
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