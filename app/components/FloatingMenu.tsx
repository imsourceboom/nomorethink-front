'use client';

import { useState } from 'react';

interface FloatingMenuProps {
    onMenuClick: () => void;
}

export default function FloatingMenu({ onMenuClick }: FloatingMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        onMenuClick();
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
                {/* 검색 버튼 */}
                <button 
                    className="absolute w-14 h-14 bg-orange-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(0, 5).x}px, ${calculatePosition(0, 5).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {/* 설정 버튼 */}
                <button 
                    className="absolute w-14 h-14 bg-purple-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(1, 5).x}px, ${calculatePosition(1, 5).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>

                {/* 즐겨찾기 버튼 */}
                <button 
                    className="absolute w-14 h-14 bg-gray-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(2, 5).x}px, ${calculatePosition(2, 5).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </button>

                {/* 홈 버튼 */}
                <button 
                    className="absolute w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(3, 5).x}px, ${calculatePosition(3, 5).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </button>

                {/* 비디오 버튼 */}
                <button 
                    className="absolute w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ 
                        transform: isOpen ? `translate(${calculatePosition(4, 5).x}px, ${calculatePosition(4, 5).y}px)` : 'translate(0, 0)',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
            </div>

            {/* 메인 버튼 */}
            <button
                onClick={handleClick}
                className="w-16 h-16 bg-rose-500 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-rose-600"
                aria-label="메뉴 열기"
            >
                <div className="w-8 h-8 relative">
                    <span className={`absolute left-0 top-1/2 w-8 h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-2'}`} />
                    <span className={`absolute left-0 top-1/2 w-8 h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`absolute left-0 top-1/2 w-8 h-0.5 bg-white transform transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-2'}`} />
                </div>
            </button>
        </div>
    );
} 