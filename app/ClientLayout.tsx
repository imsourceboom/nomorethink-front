'use client';

import React, { useEffect, useState } from 'react';
import FloatingMenu from './components/FloatingMenu';
import Template from './components/Template';
import Loading from './components/Loading';
import Prefetch from './components/Prefetch';
import { useTelegram } from './hooks/useTelegram';
import Script from 'next/script';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { initTelegram } = useTelegram();
    // 클라이언트 사이드 렌더링 여부를 확인하기 위한 상태
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        setIsClient(true);
        
        // 텔레그램 WebApp 초기화
        initTelegram();
    }, [initTelegram]);

    // 서버 사이드 렌더링에서는 최소한의 컴포넌트만 반환
    if (!isClient) {
        return (
            <>
                <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
                <div className="min-h-screen bg-[var(--bg-color)]">{children}</div>
            </>
        );
    }

    // 클라이언트 사이드 렌더링에서는 모든 컴포넌트 반환
    return (
        <>
            <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
            <Loading />
            <Prefetch />
            <Template>
                {children}
            </Template>
            <FloatingMenu />
        </>
    );
} 