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
        console.log(`Navigating to: ${path}`);
        router.push(path);
        setIsOpen(false);
    };

    // 서브메뉴 버튼들의 위치를 계산하는 함수 (왼쪽 반원 배치)
    const calculatePosition = (index: number, total: number) => {
        const radius = 100; // 반원의 반지름 (120에서 100으로 감소)
        // -90도에서 90도까지의 각도를 total-1 등분하여 계산 (왼쪽으로 반원)
        const angle = (-Math.PI/2) + (Math.PI * (index / (total - 1)));
        return {
            x: -radius * Math.cos(angle), // 왼쪽으로 펼쳐지는 반원
            y: radius * Math.sin(angle)   // 위아래로 펼쳐지는 반원
        };
    };

    return (
        <div className="fixed right-4 top-[60%] -translate-y-1/2 z-50">
            {/* 서브메뉴 */}
            <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}>
                {/* 홈 버튼 */}
                <button
                    onClick={() => handleNavigation('/')}
                    className="absolute w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(0, 4).x}px, ${calculatePosition(0, 4).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out',
                        backgroundColor: '#F5EE9E80' // 50% 투명도
                    }}
                >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </button>

                {/* 자동매수 버튼 */}
                <button
                    onClick={() => handleNavigation('/add')}
                    className="absolute w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(1, 4).x}px, ${calculatePosition(1, 4).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out',
                        backgroundColor: '#3B8EA580' // 50% 투명도
                    }}
                >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                {/* 지갑 버튼 */}
                <button
                    onClick={() => handleNavigation('/wallet')}
                    className="absolute w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(2, 4).x}px, ${calculatePosition(2, 4).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out',
                        backgroundColor: '#1465A280' // 50% 투명도
                    }}
                >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </button>

                {/* 설정 버튼 */}
                <button 
                    onClick={() => handleNavigation('/settings')}
                    className="absolute w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(3, 4).x}px, ${calculatePosition(3, 4).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out',
                        backgroundColor: '#F49E4C80' // 50% 투명도
                    }}
                >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>

            {/* 메인 토글 버튼 */}
            <button
                onClick={handleClick}
                className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                    backgroundColor: '#AB342880' // 50% 투명도
                }}
            >
                <div className="w-8 h-8 relative flex items-center justify-center">
                    <span className={`absolute h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'w-8 rotate-45' : 'w-8 -translate-y-2'}`} />
                    <span className={`absolute h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'opacity-0 w-0' : 'opacity-100 w-8'}`} />
                    <span className={`absolute h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'w-8 -rotate-45' : 'w-8 translate-y-2'}`} />
                </div>
            </button>
        </div>
    );
} 