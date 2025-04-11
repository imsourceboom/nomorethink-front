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

    return (
        <>
            {/* 상단 여백 고정 영역 */}
            {isTelegramWebApp && (
                <div className="fixed top-0 left-0 w-full z-10" style={{height: headerHeight, backgroundColor: 'var(--bg-color)'}} />
            )}
            
            {/* 상단 여백 더미 영역 - 스크롤 시작점 확보용 */}
            <div className="flex flex-col min-h-screen bg-[var(--bg-color)] text-white">
                {isTelegramWebApp && (
                    <div style={{height: headerHeight}} />
                )}
                
                {/* 실제 콘텐츠 */}
                {children}
            </div>
        </>
    );
} 