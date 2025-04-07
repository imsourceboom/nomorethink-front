/// <reference types="next" />
/// <reference types="next/image-types/global" />

// global.d.ts
declare global {
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

    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
    }
}

export {};
