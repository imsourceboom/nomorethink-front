'use client';

import TelegramWrapper from './components/TelegramWrapper';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CoinSection from './components/CoinSection';
import TotalAmount from './components/TotalAmount';
import FloatingMenu from './components/FloatingMenu';
import { useWallet } from './hooks/useWallet';
import { useTelegram } from './hooks/useTelegram';
import { DEFAULT_COINS } from './constants/coins';
import { CoinSection as CoinSectionType } from './types/wallet';
import ErrorBoundary from './components/ErrorBoundary';

export default function Home() {
    const { 
        isConnected, 
        address, 
        isLoading, 
        error,
        handleWalletConnect,
        resetError
    } = useWallet();
    const { handleMainButtonClick } = useTelegram();

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

    // 총 코인 수량 계산
    const totalAmount = DEFAULT_COINS.reduce((acc, coin) => acc + coin.amount, 0);

    const handleMenuClick = () => {
        // 메뉴 클릭 시 실행할 로직
        console.log('메뉴 클릭됨');
    };

    return (
        <ErrorBoundary>
            <TelegramWrapper
                mainButtonText="시작하기"
                onMainButtonClick={handleMainButtonClick}
            >
                <main className="flex min-h-screen flex-col items-center justify-start px-4 pt-24 pb-6">
                    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-start">
                        <Header 
                            isConnected={isConnected}
                            address={address}
                            isLoading={isLoading}
                            error={error}
                            onWalletConnect={handleWalletConnect}
                            resetError={resetError}
                        />

                        <Dashboard 
                            title="🧠 NoMoreThink"
                            description="텔레그램 미니앱 연동 테스트 화면입니다."
                        />

                        {/* 코인 섹션들 */}
                        {sections.map((section, index) => (
                            <CoinSection key={`main-${index}`} section={section} />
                        ))}

                        <TotalAmount amount={totalAmount} />

                        {/* 스크롤 테스트용 섹션들 */}
                        {testSections.map((section, index) => (
                            <CoinSection key={`test-${index}`} section={section} />
                        ))}
                    </div>
                </main>
                <FloatingMenu onMenuClick={handleMenuClick} />
            </TelegramWrapper>
        </ErrorBoundary>
    );
}
