'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FloatingMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (path: string) => {
        router.push(path);
        setIsOpen(false);
    };

    // 서브메뉴 버튼들의 위치를 계산하는 함수 (왼쪽으로 펼쳐지는 형태)
    const calculatePosition = (index: number) => {
        const gap = 60; // 버튼 사이의 간격
        return {
            x: -(index + 1) * gap, // 왼쪽으로 일정 간격씩 이동
            y: 0 // y축 위치는 메인 버튼과 동일하게 유지
        };
    };

    return (
        <div className="fixed right-4 top-[60%] -translate-y-1/2 z-50">
            {/* 서브메뉴 */}
            <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}>
                {/* 홈 버튼 */}
                <button 
                    onClick={() => handleNavigation('/')}
                    className="absolute w-12 h-12 bg-[#2481cc] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(0).x}px, ${calculatePosition(0).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </button>

                {/* 추가 버튼 */}
                <button 
                    onClick={() => handleNavigation('/add')}
                    className="absolute w-12 h-12 bg-[#2481cc] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(1).x}px, ${calculatePosition(1).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                {/* 지갑 버튼 */}
                <button 
                    onClick={() => handleNavigation('/wallet')}
                    className="absolute w-12 h-12 bg-[#2481cc] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(2).x}px, ${calculatePosition(2).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </button>
            </div>

            {/* 메인 토글 버튼 */}
            <button
                onClick={handleClick}
                className="w-12 h-12 bg-[#2481cc] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <svg 
                    className={`w-6 h-6 text-white transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
} 