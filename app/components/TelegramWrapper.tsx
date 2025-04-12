'use client';

import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

/**
 * TelegramWrapper 컴포넌트 props 인터페이스
 * @property {React.ReactNode} children - 래핑할 자식 컴포넌트
 */
interface TelegramWrapperProps {
    children: React.ReactNode;
}

/* 텔레그램 WebApp 타입 정의 (참고용)
interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    MainButton: {
        hide: () => void;
        show: () => void;
        onClick: (callback: () => void) => void;
    };
    platform?: string;
    requestFullscreen?: () => void;
    disableVerticalSwipes?: () => void;
    enableClosingConfirmation?: () => void;
}
*/

/**
 * 텔레그램 미니앱 래퍼 컴포넌트
 * 텔레그램 미니앱 환경에서 필요한 상단 공간을 확보하고, 메인 버튼 등의 기능을 초기화합니다.
 */
export default function TelegramWrapper({ 
    children
}: TelegramWrapperProps) {
    const { initTelegram } = useTelegram();
    
    // 모바일 감지를 위한 상태
    const [isMobile, setIsMobile] = useState(false);

    // 환경 감지 이펙트
    useEffect(() => {
        // 모바일 기기 감지
        const detectMobile = () => {
            if (typeof navigator === 'undefined') return;
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice);
        };
        
        // 모바일 여부 확인
        detectMobile();
        
        // 텔레그램 API 초기화
        initTelegram();
        
        // 텔레그램 환경인 경우 메인 버튼 숨기기
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const tg = (window as any).Telegram.WebApp;
            
            // 모든 페이지에서 버튼 숨기기
            tg.MainButton.hide();
        }
        
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window as any).Telegram.WebApp.MainButton.hide();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    // 텔레그램 웹앱 환경 확인
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isTelegramWebApp = typeof window !== 'undefined' && !!(window as any).Telegram?.WebApp;
    
    // 모바일에서는 15vh, 데스크톱에서는 7vh 패딩 적용
    const paddingTopValue = isMobile ? '15vh' : '7vh';

    return (
        <div 
            className="min-h-screen bg-[var(--bg-color)] text-white"
            style={{ 
                paddingTop: isTelegramWebApp ? paddingTopValue : '0'
            }}
        >
            {/* 스크롤 가능한 콘텐츠 영역 */}
            {children}
        </div>
    );
} 