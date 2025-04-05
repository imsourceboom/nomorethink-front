'use client';
import Image from 'next/image'; // Image 컴포넌트 추가
import { useState, useEffect } from 'react';

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                ready: () => void;
                expand: () => void;
                requestFullscreen: () => void;
            };
        };
    }
}

export default function Home() {
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [isClient, setIsClient] = useState<boolean>(false); // 클라이언트 상태 확인

    useEffect(() => {
        setIsClient(true); // Ensure client-side rendering

        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready(); // WebApp 초기화
            window.Telegram.WebApp.expand(); // WebApp 초기화
            window.Telegram.WebApp.requestFullscreen(); // 풀스크린 요청
        }
    }, []);

    const connectWallet = () => {
        const walletLink = 'ton://wallet?address=YOUR_WALLET_ADDRESS';
        if (typeof window !== 'undefined') {
            window.open(walletLink, '_blank');
        }
        setWalletAddress('YOUR_WALLET_ADDRESS'); // 예시 주소
        setIsWalletConnected(true);
    };

    if (!isClient) {
        return null; // 클라이언트 렌더링 전에 아무것도 렌더링하지 않도록
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white flex flex-col items-center justify-center p-6">
            {/* 상단 영역 */}
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <Image
                        src="https://via.placeholder.com/150" // 텔레그램 프로필 이미지로 교체
                        alt="Profile"
                        width={150} // width와 height 속성 추가
                        height={150}
                        className="rounded-full"
                    />
                </div>
                <div>
                    {isWalletConnected ? (
                        <div className="text-sm">
                            <p className="font-semibold">{walletAddress}</p>
                        </div>
                    ) : (
                        <button
                            onClick={connectWallet}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Wallet connect
                        </button>
                    )}
                </div>
            </div>

            {/* 대시보드 영역 */}
            <h1 className="text-2xl font-semibold mb-6">🧠 NoMoreThink</h1>
            <p className="text-lg text-center">
                텔레그램 미니앱 연동 테스트 화면입니다.
            </p>
        </div>
    );
}
