/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare global {
  interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    disableVerticalSwipes?: () => void;
    MainButton: {
      text: string;
      show: () => void;
      hide: () => void;
      onClick: (callback: () => void) => void;
    };
    onEvent: (eventType: string, callback: () => void) => void;
    offEvent: (eventType: string, callback: () => void) => void;
  }

  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export {}; 