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
                alert('window.Telegram이 없습니다.');
                return;
            }
            if (!window.Telegram.WebApp) {
                alert('window.Telegram.WebApp이 없습니다.');
                return;
            }

            const tg = window.Telegram.WebApp;
            tg.ready();
            alert('Telegram WebApp이 준비되었습니다.');

            // 모바일 디바이스이고 텔레그램 웹앱인 경우에만 실행
            if (isMobileDevice()) {
                alert('모바일 디바이스입니다.');
                // WebApp이 완전히 로드된 후 실행
                setTimeout(() => {
                    try {
                        tg.expand();
                        alert('expand 완료');
                        
                        tg.requestFullscreen();
                        alert('requestFullscreen 완료');

                        if (typeof tg.disableVerticalSwipes === 'function') {
                            tg.disableVerticalSwipes();
                            alert('disableVerticalSwipes 완료');
                        } else {
                            alert('disableVerticalSwipes 함수가 없습니다.');
                        }
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
                        alert('오류 발생: ' + errorMessage);
                    }
                }, 1000); // 1초로 늘림
            } else {
                alert('모바일 디바이스가 아닙니다.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
            alert('초기화 오류: ' + errorMessage);
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