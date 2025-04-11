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
    
    // 모바일이면 15%, 아니면 7% 패딩 적용
    const paddingTopValue = isMobile ? '15%' : '7%';

    return (
        <div 
            className="min-h-screen bg-[var(--bg-color)] text-white" 
            style={{ paddingTop: isTelegramWebApp ? paddingTopValue : '0' }}
        >
            {/* 텔레그램 미니앱 헤더 공간 확보 (화면의 약 15%) */}
            {/* <div className="w-full h-[15vh] bg-[var(--bg-color)]"></div> */}
            
            {children}
        </div>
    );
} 