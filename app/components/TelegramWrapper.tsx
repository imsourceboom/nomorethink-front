'use client';

import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

interface TelegramWrapperProps {
    children: React.ReactNode;
    mainButtonText?: string;
    onMainButtonClick?: () => void;
}

export default function TelegramWrapper({ 
    children, 
    mainButtonText = '시작하기', 
    onMainButtonClick 
}: TelegramWrapperProps) {
    const { initTelegram } = useTelegram();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // 모바일 환경 감지
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    useEffect(() => {
        // 텔레그램 WebApp 초기화
        initTelegram();
        
        // 메인 버튼 설정
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.MainButton.text = mainButtonText;
            tg.MainButton.show();
            
            if (onMainButtonClick) {
                tg.MainButton.onClick(onMainButtonClick);
            }
        } else {
            console.warn('Telegram WebApp이 로드되지 않았습니다. 개발 환경에서는 일부 기능이 제한될 수 있습니다.');
        }
        
        return () => {
            // 컴포넌트 언마운트 시 메인 버튼 숨기기
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                window.Telegram.WebApp.MainButton.hide();
            }
        };
    }, [initTelegram, mainButtonText, onMainButtonClick]);

    // 텔레그램 환경인지 확인
    const isTelegramWebApp = typeof window !== 'undefined' && !!window.Telegram?.WebApp;
    
    // 모바일이면 15%, 아니면 7% 여백 적용
    const headerHeight = isMobile ? '15vh' : '7vh';
    const contentHeight = isMobile ? '85vh' : '93vh';

    return (
        <div className="relative min-h-screen bg-[var(--bg-color)] text-white">
            {/* 텔레그램 미니앱 환경에서만 상단 여백 표시 - 고정 위치 */}
            {isTelegramWebApp && (
                <div className="w-full fixed top-0 left-0 z-10" style={{height: headerHeight, backgroundColor: 'var(--bg-color)'}}></div>
            )}
            
            {/* 스크롤 가능한 콘텐츠 영역 */}
            <div className="h-screen overflow-y-auto">
                {/* 상단 여백 공간 (스크롤과 함께 움직이지 않음) */}
                {isTelegramWebApp && (
                    <div className="w-full" style={{height: headerHeight}}></div>
                )}
                
                {/* 실제 콘텐츠 - 스크롤 가능 */}
                {children}
            </div>
        </div>
    );
} 