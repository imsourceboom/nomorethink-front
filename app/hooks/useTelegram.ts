'use client';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Telegram WebApp SDK를 위한 커스텀 훅
export const useTelegram = () => {
    const initTelegram = () => {
        try {
            if (typeof window === 'undefined') return;
            if (!window.Telegram) {
                console.error('window.Telegram이 없습니다.');
                return;
            }
            if (!window.Telegram.WebApp) {
                console.error('window.Telegram.WebApp이 없습니다.');
                return;
            }

            const tg = window.Telegram.WebApp;
            
            // WebApp이 준비되면 실행
            tg.ready();
            console.log('Telegram WebApp이 준비되었습니다.');

            // 모바일 디바이스이고 텔레그램 웹앱인 경우에만 실행
            if (isMobileDevice()) {
                console.log('모바일 디바이스입니다.');
                
                // WebApp이 완전히 로드될 때까지 대기
                const checkWebAppReady = () => {
                    try {
                        // expand와 requestFullscreen 먼저 실행
                        tg.expand();
                        console.log('expand 완료');
                        
                        tg.requestFullscreen();
                        console.log('requestFullscreen 완료');

                        // disableVerticalSwipes 시도
                        if (typeof tg.disableVerticalSwipes === 'function') {
                            tg.disableVerticalSwipes();
                            console.log('disableVerticalSwipes 완료');
                        } else {
                            console.warn('disableVerticalSwipes 함수가 없습니다.');
                            // 1초 후 다시 시도
                            setTimeout(checkWebAppReady, 1000);
                        }
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
                        console.error('오류 발생: ' + errorMessage);
                        // 오류 발생 시 1초 후 다시 시도
                        setTimeout(checkWebAppReady, 1000);
                    }
                };

                // 초기 시도
                setTimeout(checkWebAppReady, 1000);
            } else {
                console.log('모바일 디바이스가 아닙니다.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
            console.error('초기화 오류: ' + errorMessage);
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