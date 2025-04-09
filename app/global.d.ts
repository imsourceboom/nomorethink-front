// Telegram WebApp 타입 정의
declare global {
    interface TelegramWebApp {
        ready: () => void;
        expand: () => void;
        requestFullscreen: () => void;
        disableVerticalSwipes: () => void;
        colorScheme: 'light' | 'dark';
        themeParams: {
            bg_color: string;
            text_color: string;
            hint_color: string;
            link_color: string;
            button_color: string;
            button_text_color: string;
            secondary_bg_color: string;
        };
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
        Telegram: {
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