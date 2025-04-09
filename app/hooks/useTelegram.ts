'use client';

import { useCallback } from 'react';
import { setThemeParams } from '../utils/theme';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Telegram WebApp SDK를 위한 커스텀 훅
export const useTelegram = () => {
    const initTelegram = useCallback(() => {
        if (typeof window === 'undefined') return;

        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        // 기본 초기화
        tg.ready();

        // 모바일 기기인 경우 추가 설정
        if (isMobileDevice()) {
            tg.expand();
            tg.requestFullscreen();
            tg.disableVerticalSwipes();
        }

        // 테마 설정
        if (tg.themeParams) {
            setThemeParams(tg.themeParams);
        }

        // 테마 변경 이벤트 리스너
        tg.onEvent('themeChanged', () => {
            if (tg.themeParams) {
                setThemeParams(tg.themeParams);
            }
        });
    }, []);

    const handleMainButtonClick = useCallback(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.MainButton.onClick(() => {
                console.log('Telegram MainButton clicked');
            });
        }
    }, []);

    return {
        initTelegram,
        handleMainButtonClick
    };
}; 