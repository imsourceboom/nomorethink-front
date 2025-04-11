'use client';

import { useState, useCallback } from 'react';

export const useTelegram = () => {
    const [, setIsReady] = useState(false);

    // 모바일 디바이스인지 확인하는 함수
    const isMobileDevice = useCallback(() => {
        if (typeof navigator === 'undefined') return false;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }, []);

    // 텔레그램 미니앱 환경인지 확인하는 함수
    const isTelegramMiniApp = useCallback(() => {
        if (typeof window === 'undefined') return false;
        if (!(window as any).Telegram || !(window as any).Telegram.WebApp) return false;
        
        return true;
    }, []);

    // Telegram WebApp SDK를 위한 커스텀 훅
    const initTelegram = useCallback(() => {
        if (typeof window === 'undefined') return;
        if (!(window as any).Telegram) return;
        if (!(window as any).Telegram.WebApp) return;

        const tg = (window as any).Telegram.WebApp;
        
        try {
            // Telegram WebApp 초기화
            tg.ready();
            setIsReady(true);
            
            // 모바일 디바이스이고 텔레그램 웹앱인 경우에만 실행
            if (isMobileDevice() && (window as any).Telegram.WebApp) {
                tg.expand();
                
                // 텔레그램 미니앱 환경에서만 requestFullscreen 실행
                if (isTelegramMiniApp() && typeof tg.requestFullscreen === 'function') {
                    try {
                        tg.requestFullscreen();
                    } catch {
                        // 오류 무시
                    }
                }
                
                // 세로 스와이프 비활성화 시도
                try {
                    if (typeof tg.disableVerticalSwipes === 'function') {
                        tg.disableVerticalSwipes();
                    }
                } catch {
                    // 오류 무시
                }
                
                // 종료 확인 활성화 시도
                try {
                    if (typeof tg.enableClosingConfirmation === 'function') {
                        tg.enableClosingConfirmation();
                    }
                } catch {
                    // 오류 무시
                }
            }
        } catch {
            // 오류 무시
        }
    }, [isMobileDevice, isTelegramMiniApp]);

    const handleMainButtonClick = useCallback(() => {
        try {
            if (typeof window === 'undefined') return;
            if (!(window as any).Telegram) return;
            if (!(window as any).Telegram.WebApp) return;

            const tg = (window as any).Telegram.WebApp;
            tg.MainButton.onClick(() => {
                // 클릭 이벤트 처리
            });
        } catch {
            // 오류 무시
        }
    }, []);

    return {
        initTelegram,
        handleMainButtonClick,
        isMobileDevice,
        isTelegramMiniApp
    };
}; 