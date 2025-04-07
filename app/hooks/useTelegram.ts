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
        initTelegram
    };
} 