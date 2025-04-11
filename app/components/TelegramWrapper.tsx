'use client';

import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

/**
 * TelegramWrapper 컴포넌트 props 인터페이스
 * @property {React.ReactNode} children - 래핑할 자식 컴포넌트
 */
interface TelegramWrapperProps {
    children: React.ReactNode;
}

/**
 * 텔레그램 미니앱 래퍼 컴포넌트
 * 텔레그램 미니앱 환경에서 필요한 상단 공간을 확보하고, 메인 버튼 등의 기능을 초기화합니다.
 */
export default function TelegramWrapper({ 
    children
}: TelegramWrapperProps) {
    const { initTelegram, getPlatformInfo } = useTelegram();
    
    // 플랫폼 정보 상태
    const [platformInfo, setPlatformInfo] = useState({
        isAndroid: false,
        isIOS: false,
        isWeb: false,
        isMacOS: false,
        isDesktop: false,
        platform: 'unknown',
        rawPlatform: '',
        hasTelegram: false,
        hasWebApp: false
    });

    // 초기화 이펙트
    useEffect(() => {
        // 플랫폼 정보 가져오기
        const info = getPlatformInfo();
        setPlatformInfo(info);
        
        // 플랫폼 값만 확인하는 alert
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                alert(`platform: "${info.platform}"`);
            }, 1000);
        }
        
        // 텔레그램 API 초기화
        initTelegram();
        
        // 텔레그램 환경인 경우 메인 버튼 숨기기
        if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
            const tg = (window as any).Telegram.WebApp;
            
            // 모든 페이지에서 버튼 숨기기
            tg.MainButton.hide();
        }
        
        return () => {
            if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
                (window as any).Telegram.WebApp.MainButton.hide();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    // 텔레그램 웹앱 환경 확인
    const isTelegramWebApp = typeof window !== 'undefined' && !!(window as any).Telegram?.WebApp;
    
    // platform 값이 android 또는 ios일 때 15vh, 그 외에는 7vh 패딩 적용
    const paddingTopValue = platformInfo.platform === 'android' || platformInfo.platform === 'ios' 
        ? '15vh' 
        : '7vh';

    return (
        <div 
            className="min-h-screen bg-[var(--bg-color)] text-white"
            style={{ 
                paddingTop: isTelegramWebApp ? paddingTopValue : '0'
            }}
        >
            {/* 스크롤 가능한 콘텐츠 영역 */}
            {children}
        </div>
    );
} 