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

    return (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
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