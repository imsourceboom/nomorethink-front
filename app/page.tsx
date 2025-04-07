'use client';

import { useState, useCallback } from 'react';
import TelegramWrapper from './components/TelegramWrapper';
import CoinSection from './components/CoinSection';
import { DEFAULT_COINS } from './constants/coins';
import { WalletState, CoinSection as CoinSectionType } from './types/wallet';

export default function Home() {
    // 상태 관리
    const [walletState, setWalletState] = useState<WalletState>({
        isConnected: false,
        address: ''
    });

    // 지갑 연결 핸들러
    const handleWalletConnect = useCallback(() => {
        try {
            const walletLink = 'ton://wallet?address=YOUR_WALLET_ADDRESS';
            if (typeof window !== 'undefined') {
                window.open(walletLink, '_blank');
            }
            setWalletState({
                isConnected: true,
                address: 'YOUR_WALLET_ADDRESS'
            });
        } catch (error) {
            console.error('지갑 연결 중 오류 발생:', error);
            // TODO: 에러 처리 UI 추가
        }
    }, []);

    // 메인 버튼 클릭 핸들러
    const handleMainButtonClick = useCallback(() => {
        try {
            console.log("메인 버튼이 클릭되었습니다.");
            // TODO: 메인 버튼 클릭 시 실행할 로직 추가
        } catch (error) {
            console.error('메인 버튼 처리 중 오류 발생:', error);
            // TODO: 에러 처리 UI 추가
        }
    }, []);

    // 코인 섹션 데이터
    const sections: CoinSectionType[] = [
        {
            title: '보유 코인',
            coins: DEFAULT_COINS
        },
        {
            title: '현재 가치',
            coins: DEFAULT_COINS.map(coin => ({
                ...coin,
                amount: coin.value
            }))
        }
    ];

    // 테스트 섹션 데이터 생성
    const testSections: CoinSectionType[] = Array.from({ length: 3 }, (_, i) => ({
        title: `테스트 섹션 ${i + 1}`,
        coins: DEFAULT_COINS.map(coin => ({
            ...coin,
            amount: coin.amount * (i + 1)
        }))
    }));

    return (
        <TelegramWrapper
            mainButtonText="시작하기"
            onMainButtonClick={handleMainButtonClick}
        >
            <main className="flex min-h-screen flex-col items-center justify-start px-4 pt-24 pb-6">
                <div className="w-full max-w-md mx-auto flex flex-col items-center justify-start">
                    {/* 상단 영역 */}
                    <div className="w-full flex items-center justify-between mb-8 mt-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold" aria-label="NoMoreThink 로고">
                                    NT
                                </div>
                            </div>
                            <div>
                                {walletState.isConnected ? (
                                    <div className="text-sm">
                                        <p className="font-semibold">{walletState.address}</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleWalletConnect}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        aria-label="지갑 연결하기"
                                    >
                                        Wallet connect
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 대시보드 영역 */}
                    <div className="w-full text-center space-y-4 mb-8">
                        <h1 className="text-3xl font-bold">🧠 NoMoreThink</h1>
                        <p className="text-lg opacity-90">
                            텔레그램 미니앱 연동 테스트 화면입니다.
                        </p>
                    </div>

                    {/* 코인 섹션들 */}
                    {sections.map((section, index) => (
                        <CoinSection key={`main-${index}`} section={section} />
                    ))}

                    {/* 총 수량 섹션 */}
                    <section className="w-full max-w-md rounded-2xl bg-slate-800/50 p-6 mb-4" aria-labelledby="total-amount">
                        <h2 id="total-amount" className="text-xl font-bold mb-4">총 수량</h2>
                        <div className="text-2xl font-bold">
                            {DEFAULT_COINS.reduce((acc, coin) => acc + coin.amount, 0).toFixed(2)} 코인
                        </div>
                    </section>

                    {/* 스크롤 테스트용 섹션들 */}
                    {testSections.map((section, index) => (
                        <CoinSection key={`test-${index}`} section={section} />
                    ))}
                </div>
            </main>
        </TelegramWrapper>
    );
}
