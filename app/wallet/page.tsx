'use client';

import TelegramWrapper from '@/app/components/TelegramWrapper';
import Header from '@/app/components/Header';
import FloatingMenu from '@/app/components/FloatingMenu';
import { useWallet } from '@/app/hooks/useWallet';
import ErrorBoundary from '@/app/components/ErrorBoundary';

export default function WalletPage() {
    const { 
        isConnected, 
        address, 
        isLoading, 
        error,
        handleWalletConnect,
        resetError
    } = useWallet();

    const handleMenuClick = () => {
        // 메뉴 클릭 시 실행할 로직
        console.log('메뉴 클릭됨');
    };

    return (
        <ErrorBoundary>
            <TelegramWrapper
                mainButtonText={isConnected ? "지갑 연결 해제" : "지갑 연결"}
                onMainButtonClick={handleWalletConnect}
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

                        <h1 className="text-2xl font-bold mb-6">지갑 정보</h1>

                        {isConnected ? (
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h2 className="text-lg font-semibold mb-2">연결된 지갑</h2>
                                    <p className="text-gray-600 break-all">{address}</p>
                                </div>

                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h2 className="text-lg font-semibold mb-2">자동 매수 설정</h2>
                                    <p className="text-gray-600">현재 설정된 자동 매수: 0개</p>
                                </div>

                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h2 className="text-lg font-semibold mb-2">거래 내역</h2>
                                    <p className="text-gray-600">최근 거래: 없음</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-600 mb-4">지갑을 연결하여 자동 매수 서비스를 이용해보세요.</p>
                                <button
                                    onClick={handleWalletConnect}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    지갑 연결하기
                                </button>
                            </div>
                        )}
                    </div>
                </main>
                <FloatingMenu onMenuClick={handleMenuClick} />
            </TelegramWrapper>
        </ErrorBoundary>
    );
} 