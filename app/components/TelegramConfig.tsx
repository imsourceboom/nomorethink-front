'use client';

import { useEffect } from 'react';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export default function TelegramConfig() {
    useEffect(() => {
        // @ts-expect-error: Telegram WebApp API
        const tg = window.Telegram.WebApp;
            
        if (isMobileDevice()) {
            tg.ready();
            tg.expand();
            tg.requestFullscreen();
            tg.disableVerticalSwipes();
        }
    }, []);

    return null;
} 