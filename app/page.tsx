'use client';
import { useState } from 'react';
import TelegramWrapper from './components/TelegramWrapper';

export default function Home() {
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
    const [walletAddress, setWalletAddress] = useState<string>('');

    const handleMainButtonClick = () => {
        console.log("메인 버튼이 클릭되었습니다.");
        // 여기에 메인 버튼 클릭 시 실행할 로직을 추가하세요
    };

    const connectWallet = () => {
        const walletLink = 'ton://wallet?address=YOUR_WALLET_ADDRESS';
        if (typeof window !== 'undefined') {
            window.open(walletLink, '_blank');
        }
        setWalletAddress('YOUR_WALLET_ADDRESS');
        setIsWalletConnected(true);
    };

    return (
        <TelegramWrapper
            mainButtonText="시작하기"
            onMainButtonClick={handleMainButtonClick}
        >
            <main className="flex min-h-screen flex-col items-center justify-start p-24">
                <div className="w-full max-w-md mx-auto flex flex-col items-center justify-start py-6 px-4">
                    {/* 상단 영역 */}
                    <div className="w-full flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                                    NT
                                </div>
                            </div>
                            <div>
                                {isWalletConnected ? (
                                    <div className="text-sm">
                                        <p className="font-semibold">{walletAddress}</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={connectWallet}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Wallet connect
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 대시보드 영역 */}
                    <div className="w-full text-center space-y-4">
                        <h1 className="text-3xl font-bold">🧠 NoMoreThink</h1>
                        <p className="text-lg opacity-90">
                            텔레그램 미니앱 연동 테스트 화면입니다.
                        </p>
                    </div>
                </div>
            </main>
        </TelegramWrapper>
    );
}
