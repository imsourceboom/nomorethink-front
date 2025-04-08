// Telegram WebApp 타입 정의
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
    onEvent: (eventType: string, callback: () => void) => void;
    offEvent: (eventType: string, callback: () => void) => void;
}

// Window 인터페이스 확장
declare global {
    interface Window {
        Telegram?: {
            WebApp?: TelegramWebApp;
        };
        ethereum?: {
            request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
            on: (event: string, callback: (params: unknown) => void) => void;
            removeListener: (event: string, callback: (params: unknown) => void) => void;
        };
    }
}

export {}; 