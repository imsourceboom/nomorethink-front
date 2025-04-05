'use client';
import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

export default function Home() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        if (WebApp) {
            WebApp.ready();
            WebApp.requestFullscreen(); // 풀스크린으로 확장
        }
    }, []);

    const connectWallet = () => {
        const walletLink = 'ton://wallet?address=YOUR_WALLET_ADDRESS';
        window.open(walletLink, '_blank');
        setWalletAddress('YOUR_WALLET_ADDRESS'); // 예시 주소
        setIsWalletConnected(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white flex flex-col items-center justify-center p-6">
            {/* 상단 영역 */}
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <img
                        src="https://via.placeholder.com/150" // 텔레그램 프로필 이미지로 교체
                        alt="Profile"
                        className="w-full h-full rounded-full"
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
                            지갑 연결하기
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
