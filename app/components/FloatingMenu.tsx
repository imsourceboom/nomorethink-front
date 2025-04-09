'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

    const calculatePosition = (index: number) => {
        return {
            transform: isOpen
                ? `translateX(-${60 * (index + 1)}px)`
                : 'translateX(0)',
            opacity: isOpen ? 1 : 0,
            transition: 'all 0.3s ease',
        };
    };

    return (
        <div className="fixed right-[5%] top-[60%] z-50">
            <div className="relative">
                <button
                    onClick={handleClick}
                    className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#2481cc]"
                >
                    <div className="flex h-6 w-6 flex-col items-center justify-center">
                        <span
                            className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
                                isOpen ? 'top-[11px] rotate-45' : 'top-[6px]'
                            }`}
                        />
                        <span
                            className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
                                isOpen ? 'opacity-0' : 'top-[11px]'
                            }`}
                        />
                        <span
                            className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
                                isOpen ? 'top-[11px] -rotate-45' : 'top-[16px]'
                            }`}
                        />
                    </div>
                </button>

                <button
                    onClick={() => handleNavigation('/add')}
                    className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#2481cc]"
                    style={calculatePosition(0)}
                >
                    <div className="flex h-6 w-6 items-center justify-center">
                        <Image src="/plus.svg" alt="plus" width={6} height={6} />
                    </div>
                </button>

                <button
                    onClick={() => handleNavigation('/wallet')}
                    className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#2481cc]"
                    style={calculatePosition(1)}
                >
                    <div className="flex h-6 w-6 items-center justify-center">
                        <Image src="/wallet.svg" alt="wallet" width={6} height={6} />
                    </div>
                </button>
            </div>
        </div>
    );
} 