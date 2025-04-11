'use client';

import { useEffect, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

/**
 * TelegramWrapper 컴포넌트 props 인터페이스
 * @property {React.ReactNode} children - 래핑할 자식 컴포넌트
 * @property {string} mainButtonText - 텔레그램 웹앱 메인 버튼의 텍스트
 * @property {Function} onMainButtonClick - 메인 버튼 클릭 시 호출할 함수
 */
interface TelegramWrapperProps {
    children: React.ReactNode;
    mainButtonText?: string;
    onMainButtonClick?: () => void;
}

/**
 * 텔레그램 미니앱 래퍼 컴포넌트
 * 텔레그램 미니앱 환경에서 필요한 상단 공간을 확보하고, 메인 버튼 등의 기능을 초기화합니다.
 */
export default function TelegramWrapper({ 
    children, 
    mainButtonText = '시작하기', 
    onMainButtonClick 
}: TelegramWrapperProps) {
    const { initTelegram } = useTelegram();
    const [isMobile, setIsMobile] = useState(false);

    // 모바일 환경 감지 이펙트
    useEffect(() => {
        // 화면 크기 기반으로 모바일 여부 판단
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
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
        
        // 텔레그램 환경인 경우 메인 버튼 설정
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.MainButton.text = mainButtonText;
            tg.MainButton.show();
            
            // 메인 버튼 클릭 핸들러 등록
            if (onMainButtonClick) {
                tg.MainButton.onClick(onMainButtonClick);
            }
        } else {
            console.warn('Telegram WebApp이 로드되지 않았습니다. 개발 환경에서는 일부 기능이 제한될 수 있습니다.');
        }
        
        // 클린업 함수: 메인 버튼 숨기기
        return () => {
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                window.Telegram.WebApp.MainButton.hide();
            }
        };
    }, [initTelegram, mainButtonText, onMainButtonClick]);

    // 텔레그램 환경인지 확인
    const isTelegramWebApp = typeof window !== 'undefined' && !!window.Telegram?.WebApp;
    
    // 모바일과 데스크톱에 따른 상단 패딩 값 결정
    // vh 대신 픽셀 값을 사용하여 더 일관된 결과 제공
    const paddingTopValue = isMobile ? '70px' : '35px';

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-white relative">
            {/* 텔레그램 미니앱 환경일 경우에만 상단 공간 확보를 위한 고정 헤더 */}
            {isTelegramWebApp && (
                <div 
                    className="w-full fixed top-0 left-0 z-10"
                    style={{ height: paddingTopValue, backgroundColor: 'var(--bg-color)' }}
                />
            )}
            
            {/* 스크롤 가능한 콘텐츠 영역 */}
            <div 
                className="w-full overflow-auto"
                style={{ paddingTop: isTelegramWebApp ? paddingTopValue : '0' }}
            >
                {children}
            </div>
        </div>
    );
} 