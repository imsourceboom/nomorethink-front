'use client';

import { useEffect } from 'react';
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

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-white">
            {/* 텔레그램 미니앱 환경에서만 상단 여백 표시 */}
            {isTelegramWebApp && (
                <div className="w-full h-[15vh] bg-[var(--bg-color)]"></div>
            )}
            
            {/* 텔레그램 환경여부에 따라 다른 높이 적용 */}
            <div className={`${isTelegramWebApp ? 'h-[85vh]' : 'h-screen'} overflow-y-auto`}>
                {children}
            </div>
        </div>
    );
} 