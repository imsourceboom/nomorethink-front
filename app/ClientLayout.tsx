'use client';

import React, { useEffect, useState } from 'react';
import FloatingMenu from './components/FloatingMenu';
import Template from './components/Template';
import Loading from './components/Loading';
import Prefetch from './components/Prefetch';
import { useTelegram } from './hooks/useTelegram';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { initTelegram } = useTelegram();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        // 마운트 상태 업데이트
        setMounted(true);
        
        // 텔레그램 WebApp 스크립트 직접 추가
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        script.async = true;
        script.onload = () => {
            console.log('텔레그램 WebApp 스크립트 로드 완료');
            setTimeout(() => {
                // 스크립트 로드 완료 후 WebApp 초기화
                initTelegram();
            }, 100);
        };
        
        // 이미 스크립트가 있는지 확인
        if (!document.querySelector('script[src="https://telegram.org/js/telegram-web-app.js"]')) {
            document.head.appendChild(script);
        } else {
            // 이미 있다면 바로 초기화
            initTelegram();
        }
        
        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거 (필요한 경우)
            // document.head.removeChild(script);
        };
    }, [initTelegram]);

    // 클라이언트 마운트 전에는 Loading 스피너만 표시
    if (!mounted) {
        return <Loading />;
    }

    // 클라이언트 렌더링에서는 전체 UI 반환
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