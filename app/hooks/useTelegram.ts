'use client';

import { useState, useCallback } from 'react';

export const useTelegram = () => {
    const [, setIsReady] = useState(false);

    // 모바일 디바이스인지 확인하는 함수
    const isMobileDevice = useCallback(() => {
        if (typeof navigator === 'undefined') return false;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }, []);
    
    // 텔레그램 플랫폼 정보 확인
    const getPlatformInfo = useCallback(() => {
        if (typeof window === 'undefined' || !window.Telegram?.WebApp?.platform) {
            return {
                isAndroid: false,
                isIOS: false,
                isWeb: false,
                isMacOS: false,
                isDesktop: false,
                platform: 'unknown'
            };
        }
        
        // platform 정보 가져오기 (android, ios, web, macos 등)
        const platform = window.Telegram.WebApp.platform || '';
        
        return {
            isAndroid: platform.includes('android'),
            isIOS: platform.includes('ios'),
            isWeb: platform.includes('web'),
            isMacOS: platform.includes('macos'),
            // 데스크톱 환경 (웹, 맥, 윈도우, 리눅스 등)
            isDesktop: platform.includes('web') || platform.includes('macos') || 
                       platform.includes('windows') || platform.includes('linux'),
            platform
        };
    }, []);

    // 텔레그램 미니앱 환경인지 확인하는 함수
    const isTelegramMiniApp = useCallback(() => {
        if (typeof window === 'undefined') return false;
        if (!window.Telegram || !window.Telegram.WebApp) return false;
        
        // 텔레그램 WebApp 플랫폼 확인 (platform 속성이 있으면 실제 텔레그램 환경)
        return !!window.Telegram.WebApp.platform;
    }, []);

    // Telegram WebApp SDK를 위한 커스텀 훅
    const initTelegram = useCallback(() => {
        if (typeof window === 'undefined') return;
        if (!window.Telegram) return;
        if (!window.Telegram.WebApp) return;

        const tg = window.Telegram.WebApp;
        
        try {
            // Telegram WebApp 초기화
            tg.ready();
            setIsReady(true);
            
            // 플랫폼 정보 가져오기
            const platformInfo = getPlatformInfo();
            
            // 모바일 디바이스이고 텔레그램 웹앱인 경우에만 실행
            if ((platformInfo.isAndroid || platformInfo.isIOS) && window.Telegram.WebApp) {
                tg.expand();
                
                // 텔레그램 미니앱 환경에서만 requestFullscreen 실행
                if (isTelegramMiniApp() && typeof tg.requestFullscreen === 'function') {
                    try {
                        tg.requestFullscreen();
                    } catch (error) {
                        // 오류 무시
                    }
                }
                
                // 세로 스와이프 비활성화 시도
                try {
                    if (typeof tg.disableVerticalSwipes === 'function') {
                        tg.disableVerticalSwipes();
                    }
                } catch (error) {
                    // 오류 무시
                }
                
                // 종료 확인 활성화 시도
                try {
                    if (typeof tg.enableClosingConfirmation === 'function') {
                        tg.enableClosingConfirmation();
                    }
                } catch (error) {
                    // 오류 무시
                }
            }
        } catch (error) {
            // 오류 무시
        }
    }, [getPlatformInfo, isTelegramMiniApp]);

    const handleMainButtonClick = useCallback(() => {
        try {
            if (typeof window === 'undefined') return;
            if (!window.Telegram) return;
            if (!window.Telegram.WebApp) return;

            const tg = window.Telegram.WebApp;
            tg.MainButton.onClick(() => {
                // 클릭 이벤트 처리
            });
        } catch (error) {
            // 오류 무시
        }
    }, []);

    return {
        initTelegram,
        handleMainButtonClick,
        isMobileDevice,
        isTelegramMiniApp,
        getPlatformInfo
    };
}; 