'use client';

import { useEffect } from 'react';

export default function TelegramConfig() {
    useEffect(() => {
        const configureWebApp = () => {
            // 개발 환경이나 Telegram WebApp이 없는 경우 처리
            if (typeof window === 'undefined' || !window.Telegram?.WebApp) {
                console.log('Telegram WebApp is not available');
                return;
            }

            try {
                const tg = window.Telegram.WebApp;
                
                // 메서드 존재 여부 확인 후 실행
                if (typeof tg.disableVerticalSwipes === 'function') {
                    tg.disableVerticalSwipes();
                }

                if (tg.MainButton && typeof tg.MainButton.hide === 'function') {
                    tg.MainButton.hide();
                }
            } catch (error) {
                console.error('Error configuring Telegram WebApp:', error);
            }
        };

        // 초기 설정
        configureWebApp();

        // 페이지 가시성 변경시 재설정
        document.addEventListener('visibilitychange', configureWebApp);
        
        // 클린업
        return () => {
            document.removeEventListener('visibilitychange', configureWebApp);
        };
    }, []);

    return null;
} 