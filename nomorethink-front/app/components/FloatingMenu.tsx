'use client';

import { useState, useRef, useEffect } from 'react';

interface FloatingMenuProps {
    onMenuClick: () => void;
}

interface Position {
    x: number;
    y: number;
}

export default function FloatingMenu({ onMenuClick }: FloatingMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    // 초기 위치 설정
    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            setPosition({
                x: window.innerWidth - rect.width - 16, // right-4 (16px)
                y: window.innerHeight / 2 - rect.height / 2
            });
        }
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return; // 좌클릭만 허용
        
        setIsDragging(true);
        const rect = menuRef.current?.getBoundingClientRect();
        if (rect) {
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        // 화면 경계 체크
        const maxX = window.innerWidth - (menuRef.current?.offsetWidth || 0);
        const maxY = window.innerHeight - (menuRef.current?.offsetHeight || 0);

        setPosition({
            x: Math.min(Math.max(0, newX), maxX),
            y: Math.min(Math.max(0, newY), maxY)
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    const handleClick = (e: React.MouseEvent) => {
        if (!isDragging) {
            setIsOpen(!isOpen);
            onMenuClick();
        }
    };

    return (
        <div
            ref={menuRef}
            className="fixed z-50 cursor-move"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                touchAction: 'none'
            }}
            onMouseDown={handleMouseDown}
        >
            <button
                onClick={handleClick}
                className="w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110"
                aria-label="메뉴 열기"
            >
                <div className={`w-6 h-6 relative transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <span className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'rotate-90' : '-translate-y-2'}`} />
                    <span className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ${isOpen ? '-rotate-90' : 'translate-y-2'}`} />
                </div>
            </button>
        </div>
    );
} 