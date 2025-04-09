'use client';

import { useEffect } from 'react';

export default function TelegramConfig() {
    useEffect(() => {
        const configureWebApp = () => {
            if (window.Telegram?.WebApp) {
                // 스와이프 비활성화
                window.Telegram.WebApp.disableVerticalSwipes();
                
                // 배경색 설정 (선택사항)
                window.Telegram.WebApp.setBackgroundColor('#000000');
                
                // 헤더 색상 설정 (선택사항)
                window.Telegram.WebApp.setHeaderColor('#000000');

                // 메인 버튼 숨기기 (선택사항)
                window.Telegram.WebApp.MainButton.hide();
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