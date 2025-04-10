'use client';

export const useTelegram = () => {
    // 미사용 상태 제거

    // 모바일 디바이스인지 확인하는 함수
    function isMobileDevice() {
        if (typeof navigator === 'undefined') return false;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Telegram WebApp SDK를 위한 커스텀 훅
    const initTelegram = () => {
        if (typeof window === 'undefined') {
            console.log('window 객체가 없습니다. 서버 사이드 렌더링 중입니다.');
            return;
        }

        // window.Telegram이 없는 경우 초기화 생략
        if (!window.Telegram) {
            console.log('window.Telegram이 없습니다. 텔레그램 환경이 아닌 것 같습니다.');
            return;
        }

        // window.Telegram.WebApp이 없는 경우 초기화 생략
        if (!window.Telegram.WebApp) {
            console.log('window.Telegram.WebApp이 없습니다. 스크립트가 아직 로드되지 않았을 수 있습니다.');
            return;
        }

        const tg = window.Telegram.WebApp;
        
        try {
            // Telegram WebApp 초기화
            if (typeof tg.ready === 'function') {
                tg.ready();
                console.log('Telegram WebApp이 준비되었습니다.');
            }
            
            // 모바일 디바이스이고 텔레그램 웹앱인 경우에만 실행
            if (isMobileDevice()) {
                console.log('모바일 디바이스에서 텔레그램 웹앱 기능을 활성화합니다.');
                
                // expand 시도
                if (typeof tg.expand === 'function') {
                    try {
                        tg.expand();
                        console.log('화면 확장 완료');
                    } catch (error) {
                        console.error('화면 확장 실패:', error);
                    }
                }
                
                // 세로 스와이프 비활성화 시도
                if (typeof tg.disableVerticalSwipes === 'function') {
                    try {
                        tg.disableVerticalSwipes();
                        console.log('세로 스와이프 비활성화됨');
                    } catch (error) {
                        console.error('세로 스와이프 비활성화 실패:', error);
                    }
                }
                
                // 종료 확인 활성화 시도
                if (typeof tg.enableClosingConfirmation === 'function') {
                    try {
                        tg.enableClosingConfirmation();
                        console.log('종료 확인 활성화됨');
                    } catch (error) {
                        console.error('종료 확인 활성화 실패:', error);
                    }
                }
            } else {
                console.log('모바일 디바이스가 아니거나 텔레그램 환경이 아닙니다.');
            }
        } catch (error) {
            console.error('Telegram WebApp 초기화 중 오류 발생:', error);
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