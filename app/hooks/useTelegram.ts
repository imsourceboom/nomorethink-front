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

// Window 인터페이스 확장 - global.d.ts 파일과 충돌하지 않도록 수정
// 기존 Window 인터페이스에 Telegram 속성이 있는지 확인 후 추가
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