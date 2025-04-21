'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

    // 로딩과 메인 UI에 페이드 애니메이션 적용
    return (
        <AnimatePresence mode="wait">
            {!mounted ? (
                <motion.div
                    key="loading"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                    <Loading />
                </motion.div>
            ) : (
                <motion.div
                    key="main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5 } }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                    <Prefetch />
                    <Template>
                        {children}
                    </Template>
                    <FloatingMenu />
                </motion.div>
            )}
        </AnimatePresence>
    );
} 