'use client';

import TelegramWrapper from '@/app/components/TelegramWrapper';
import Header from '@/app/components/Header';
import Dashboard from '@/app/components/Dashboard';
import CoinSection from '@/app/components/CoinSection';
import TotalAmount from '@/app/components/TotalAmount';
import FloatingMenu from '@/app/components/FloatingMenu';
import { useWallet } from '@/app/hooks/useWallet';
import { useTelegram } from '@/app/hooks/useTelegram';
import { DEFAULT_COINS } from '@/app/constants/coins';
import { CoinSection as CoinSectionType, CoinInfo } from '@/app/types/wallet';
import ErrorBoundary from '@/app/components/ErrorBoundary';

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
            coins: DEFAULT_COINS.map((coin: CoinInfo) => ({
                ...coin,
                amount: coin.value
            }))
        }
    ];

    // 테스트 섹션 데이터 생성
    const testSections: CoinSectionType[] = Array.from({ length: 3 }, (_, i) => ({
        title: `테스트 섹션 ${i + 1}`,
        coins: DEFAULT_COINS.map((coin: CoinInfo) => ({
            ...coin,
            amount: coin.amount * (i + 1)
        }))
    }));

    // 총 코인 수량 계산
    const totalAmount = DEFAULT_COINS.reduce((acc: number, coin: CoinInfo) => acc + coin.amount, 0);

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
