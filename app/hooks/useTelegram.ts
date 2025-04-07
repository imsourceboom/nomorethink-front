'use client';

import { useCallback, useEffect } from 'react';

interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    MainButton: {
        text: string;
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
        setText: (text: string) => void;
    };
    onEvent: (eventType: string, callback: () => void) => void;
    offEvent: (eventType: string, callback: () => void) => void;
}

declare global {
    interface Window {
        Telegram?: {
            WebApp?: TelegramWebApp;
        };
    }
}

export function useTelegram() {
    const initTelegram = useCallback(() => {
        try {
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                const tg = window.Telegram.WebApp;
                tg.ready();
                tg.expand();
            }
        } catch (error) {
            console.warn('Telegram WebApp initialization error:', error);
        }
    }, []);

    const handleMainButtonClick = useCallback(() => {
        try {
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                const tg = window.Telegram.WebApp;
                tg.MainButton.onClick(() => {
                    console.log('Telegram MainButton clicked');
                    // 여기에 메인 버튼 클릭 시 실행할 로직을 추가할 수 있습니다.
                });
            }
        } catch (error) {
            console.warn('Telegram MainButton click error:', error);
        }
    }, []);

    useEffect(() => {
        // Script 로드
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        script.async = true;
        script.onload = initTelegram;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [initTelegram]);

    return {
        initTelegram,
        handleMainButtonClick
    };
} 