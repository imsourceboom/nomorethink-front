// global.d.ts
declare global {
    interface Window {
        Telegram: {
            WebApp: {
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
            };
        };
    }
}

export {};
