// Telegram WebApp 타입 정의
declare global {
    interface TelegramWebApp {
        ready: () => void;
        expand: () => void;
        requestFullscreen: () => void;
        disableVerticalSwipes: () => void;
        MainButton: {
            text: string;
            show: () => void;
            hide: () => void;
            onClick: (callback: () => void) => void;
        };
    }

    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
        ethereum?: {
            request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
            on: (event: string, callback: (params: unknown) => void) => void;
            removeListener: (event: string, callback: (params: unknown) => void) => void;
        };
    }
}

export {}; 