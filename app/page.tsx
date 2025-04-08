'use client';

import TelegramWrapper from '@/app/components/TelegramWrapper';
import Header from '@/app/components/Header';
import FloatingMenu from '@/app/components/FloatingMenu';
import { useWallet } from '@/app/hooks/useWallet';
import { useTelegram } from '@/app/hooks/useTelegram';
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

    // TODO: 실제 자산 데이터로 교체
    const totalAssets = {
        totalValue: 15000000,
        change24h: 2.5,
        assets: [
            { symbol: 'BTC', amount: 0.5, value: 30000000, change24h: 1.2 },
            { symbol: 'ETH', amount: 2.0, value: 4000000, change24h: -0.8 },
            { symbol: 'XRP', amount: 1000, value: 800000, change24h: 3.1 }
        ]
    };

    const handleMenuClick = () => {
        // 메뉴 클릭 시 실행할 로직
        console.log('메뉴 클릭됨');
    };

    return (
        <ErrorBoundary>
            <TelegramWrapper
                mainButtonText="자동 매수 설정"
                onMainButtonClick={handleMainButtonClick}
            >
                <main className="flex min-h-screen flex-col items-center justify-start px-4 pt-24 pb-6">
                    <div className="w-full max-w-md mx-auto">
                        <Header 
                            isConnected={isConnected}
                            address={address}
                            isLoading={isLoading}
                            error={error}
                            onWalletConnect={handleWalletConnect}
                            resetError={resetError}
                        />

                        {/* 총 자산 가치 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                            <h2 className="text-lg font-semibold text-gray-600 mb-1">총 자산 가치</h2>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">
                                    ₩{totalAssets.totalValue.toLocaleString()}
                                </span>
                                <span className={`ml-2 text-sm ${totalAssets.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {totalAssets.change24h >= 0 ? '+' : ''}{totalAssets.change24h}%
                                </span>
                            </div>
                        </div>

                        {/* 자산 목록 */}
                        <div className="space-y-4">
                            {totalAssets.assets.map((asset) => (
                                <div key={asset.symbol} className="bg-white p-4 rounded-lg shadow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold">{asset.symbol}</h3>
                                            <p className="text-sm text-gray-600">{asset.amount} {asset.symbol}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">₩{asset.value.toLocaleString()}</p>
                                            <p className={`text-sm ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
                <FloatingMenu onMenuClick={handleMenuClick} />
            </TelegramWrapper>
        </ErrorBoundary>
    );
}
