'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  MainButton: {
    text: string;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  onEvent: (eventType: string, callback: () => void) => void;
  offEvent: (eventType: string, callback: () => void) => void;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWrapperProps {
  children: React.ReactNode;
  onMainButtonClick?: () => void;
  mainButtonText?: string;
}

function TelegramWrapper({ 
  children, 
  onMainButtonClick,
  mainButtonText = "시작하기"
}: TelegramWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const initTelegram = () => {
      try {
        if (window.Telegram?.WebApp) {
          const tg = window.Telegram.WebApp;
          tg.ready();
          tg.expand();
          
          if (mainButtonText && onMainButtonClick) {
            tg.MainButton.text = mainButtonText;
            tg.MainButton.onClick(onMainButtonClick);
            tg.MainButton.show();
          }
        }
      } catch (error) {
        console.warn('Telegram WebApp initialization error:', error);
      }
    };

    // Script가 이미 로드되어 있는 경우
    if (window.Telegram?.WebApp) {
      initTelegram();
    }

    // cleanup
    return () => {
      if (window.Telegram?.WebApp && onMainButtonClick) {
        try {
          window.Telegram.WebApp.MainButton.hide();
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
      }
    };
  }, [mainButtonText, onMainButtonClick]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
        onLoad={() => {
          try {
            if (window.Telegram?.WebApp) {
              const tg = window.Telegram.WebApp;
              tg.ready();
              tg.expand();
              
              if (mainButtonText && onMainButtonClick) {
                tg.MainButton.text = mainButtonText;
                tg.MainButton.onClick(onMainButtonClick);
                tg.MainButton.show();
              }
            }
          } catch (error) {
            console.warn('Script onLoad error:', error);
          }
        }}
      />
      {children}
    </>
  );
}

export default TelegramWrapper; 