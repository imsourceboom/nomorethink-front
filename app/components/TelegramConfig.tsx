'use client';

import { useEffect } from 'react';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

interface TelegramType {
    WebApp: {
        ready: () => void;
        expand: () => void;
        requestFullscreen: () => void;
        disableVerticalSwipes: () => void;
    };
}

export default function TelegramConfig() {
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const tg = (window as { Telegram?: TelegramType }).Telegram?.WebApp;
        if (!tg) return;
            
        if (isMobileDevice()) {
            tg.ready();
            tg.expand();
            tg.requestFullscreen();
            tg.disableVerticalSwipes();
        }
    }, []);

    return null;
} 