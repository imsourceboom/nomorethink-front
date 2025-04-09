'use client';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Telegram WebApp SDK를 위한 커스텀 훅
export const useTelegram = () => {
    const initTelegram = () => {
        // @ts-expect-error: Telegram WebApp API
        const tg = window.Telegram.WebApp;
        tg.ready();

        // 모바일 디바이스이고 텔레그램 웹앱인 경우에만 실행
        if (isMobileDevice() && window.Telegram.WebApp) {
            tg.expand();
            tg.requestFullscreen();
            tg.disableVerticalSwipes();
        }
    };

    const handleMainButtonClick = () => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.MainButton.onClick(() => {
                console.log('Telegram MainButton clicked');
            });
        }
    };

    return {
        initTelegram,
        handleMainButtonClick
    };
}; 