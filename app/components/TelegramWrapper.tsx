'use client';

import { useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';

interface TelegramWrapperProps {
    children: React.ReactNode;
}

export default function TelegramWrapper({ children }: TelegramWrapperProps) {
    const { initTelegram } = useTelegram();

    useEffect(() => {
        // 텔레그램 WebApp 초기화
        initTelegram();
    }, [initTelegram]);

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {children}
        </div>
    );
} 