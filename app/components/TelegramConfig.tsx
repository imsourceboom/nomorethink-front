'use client';

import { useEffect } from 'react';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export default function TelegramConfig() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            
            if (isMobileDevice()) {
                tg.ready();
                tg.expand();
                tg.requestFullscreen();
                tg.disableVerticalSwipes();
            }
        }
    }, []);

    return null;
} 