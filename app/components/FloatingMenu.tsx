'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FloatingMenuProps {
    onMenuClick: () => void;
}

export default function FloatingMenu({ onMenuClick }: FloatingMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setIsOpen(!isOpen);
        onMenuClick();
    };

    const handleNavigation = (path: string) => {
        setIsOpen(false);
        router.push(path);
    };

    // 서브메뉴 버튼들의 위치를 계산하는 함수 (반원 형태)
    const calculatePosition = (index: number, total: number, radius: number = 80) => {
        // 180도(π 라디안)를 버튼 개수로 나누어 각도 계산
        const angle = (index * (180 / (total - 1)) - 90) * (Math.PI / 180);
        const x = -radius * Math.cos(angle); // 왼쪽으로 배치하기 위해 x 좌표에 마이너스
        const y = radius * Math.sin(angle);
        return { x, y };
    };

    return (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
            {/* 서브메뉴 */}
            <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}>
                {/* 홈 버튼 */}
                <button 
                    onClick={() => handleNavigation('/')}
                    className="absolute w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(0, 3).x}px, ${calculatePosition(0, 3).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </button>

                {/* 추가 버튼 */}
                <button 
                    onClick={() => handleNavigation('/add')}
                    className="absolute w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(1, 3).x}px, ${calculatePosition(1, 3).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                {/* 지갑 버튼 */}
                <button 
                    onClick={() => handleNavigation('/wallet')}
                    className="absolute w-14 h-14 bg-purple-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(2, 3).x}px, ${calculatePosition(2, 3).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </button>
            </div>

            {/* 메인 버튼 */}
            <button
                onClick={handleClick}
                className="w-14 h-14 bg-rose-500 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-rose-600"
            >
                <svg 
                    className={`w-7 h-7 text-white transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} 
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