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
        }
        
        return () => {
            // 컴포넌트 언마운트 시 메인 버튼 숨기기
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                window.Telegram.WebApp.MainButton.hide();
            }
        };
    }, [initTelegram, mainButtonText, onMainButtonClick]);

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {children}
        </div>
    );
} 