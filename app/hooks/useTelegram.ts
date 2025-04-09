'use client';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Telegram WebApp SDK를 위한 커스텀 훅
export const useTelegram = () => {
    const initTelegram = () => {
        try {
            if (typeof window === 'undefined') return;
            if (!window.Telegram) return;
            if (!window.Telegram.WebApp) return;

            const tg = window.Telegram.WebApp;
            tg.ready();

            // 모바일 디바이스이고 텔레그램 웹앱인 경우에만 실행
            if (isMobileDevice()) {
                tg.expand();
                tg.requestFullscreen();
                tg.disableVerticalSwipes();
            }
        } catch (error) {
            console.error('Telegram WebApp initialization failed:', error);
        }
    };

    const handleMainButtonClick = () => {
        try {
            if (typeof window === 'undefined') return;
            if (!window.Telegram) return;
            if (!window.Telegram.WebApp) return;

            const tg = window.Telegram.WebApp;
            tg.MainButton.onClick(() => {
                console.log('Telegram MainButton clicked');
            });
        } catch (error) {
            console.error('MainButton initialization failed:', error);
        }
    };

    return {
        initTelegram,
        handleMainButtonClick
    };
}; 