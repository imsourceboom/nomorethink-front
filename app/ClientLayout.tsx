'use client';

import React, { useEffect } from 'react';
import FloatingMenu from './components/FloatingMenu';
import Template from './components/Template';
import Loading from './components/Loading';
import Prefetch from './components/Prefetch';
import { useTelegram } from './hooks/useTelegram';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { initTelegram } = useTelegram();
    
    useEffect(() => {
        // 텔레그램 WebApp 초기화
        initTelegram();
    }, [initTelegram]);

    return (
        <>
            <Loading />
            <Prefetch />
            <Template>
                {children}
            </Template>
            <FloatingMenu />
        </>
    );
} 