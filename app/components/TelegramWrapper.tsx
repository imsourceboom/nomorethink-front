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
    const { initTelegram } = useTelegram();
    
    // 초기 마운트 시에는 window 객체에 접근할 수 없으므로 기본값 false 사용
    const [isMobile, setIsMobile] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);

    // 모바일 환경 감지 이펙트
    useEffect(() => {
        // 화면 크기 기반으로 모바일 여부 판단
        const checkMobile = () => {
            const width = window.innerWidth;
            setScreenWidth(width);
            setIsMobile(width <= 768);
            
            // 디버깅용 로그
            console.log('현재 화면 너비:', width, '모바일 여부:', width <= 768);
        };
        
        // 초기 체크 및 리사이징 이벤트 리스너 등록
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // 클린업 함수: 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // 텔레그램 WebApp 초기화 이펙트
    useEffect(() => {
        // 텔레그램 API 초기화
        initTelegram();
        
        // 텔레그램 환경인 경우 메인 버튼 숨기기
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            
            // 모든 페이지에서 버튼 숨기기
            tg.MainButton.hide();
        } else {
            console.warn('Telegram WebApp이 로드되지 않았습니다. 개발 환경에서는 일부 기능이 제한될 수 있습니다.');
        }
        
        // 클린업 함수: 메인 버튼 숨기기
        return () => {
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                window.Telegram.WebApp.MainButton.hide();
            }
        };
    }, [initTelegram]);

    // 텔레그램 환경인지 확인
    const isTelegramWebApp = typeof window !== 'undefined' && !!window.Telegram?.WebApp;
    
    // 모바일과 데스크톱에 따른 상단 패딩 값 결정
    // screenWidth 값도 사용하여 조건 강화
    const isMobileDevice = isMobile || (screenWidth > 0 && screenWidth <= 768);
    const paddingTopValue = isMobileDevice ? '15vh' : '7vh';
    
    // 디버깅용 로그
    console.log('최종 모바일 상태:', isMobileDevice, '적용될 패딩값:', paddingTopValue, '화면 너비:', screenWidth);

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