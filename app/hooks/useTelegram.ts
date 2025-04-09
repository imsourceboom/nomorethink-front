'use client';

import { useEffect } from 'react';
import { setThemeParams } from '../utils/theme';

// Telegram WebApp SDK를 위한 커스텀 훅
export const useTelegram = () => {
  useEffect(() => {
    const initTelegram = () => {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // 초기 설정
        tg.ready();
        tg.expand();

        // 항상 유지되어야 하는 설정
        const maintainSettings = () => {
          tg.requestFullscreen();
          tg.disableVerticalSwipes();
        };

        // 초기 적용
        maintainSettings();

        // 페이지 가시성 변경 시 재적용
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible') {
            maintainSettings();
          }
        };

        // 포커스 변경 시 재적용
        const handleFocus = () => {
          maintainSettings();
        };

        // 이벤트 리스너 등록
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);

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

        // 클린업
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          window.removeEventListener('focus', handleFocus);
        };
      }
    };

    initTelegram();
  }, []);

  const handleMainButtonClick = () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.MainButton.onClick(() => {
        console.log('Telegram MainButton clicked');
      });
    }
  };

  return {
    handleMainButtonClick
  };
}; 