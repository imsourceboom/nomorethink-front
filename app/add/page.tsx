'use client';

import { useState } from 'react';
import TelegramWrapper from '@/app/components/TelegramWrapper';
import Header from '@/app/components/Header';
import FloatingMenu from '@/app/components/FloatingMenu';
import { useWallet } from '@/app/hooks/useWallet';
import ErrorBoundary from '@/app/components/ErrorBoundary';

export default function AddPage() {
    const { 
        isConnected, 
        address, 
        isLoading, 
        error,
        handleWalletConnect,
        resetError
    } = useWallet();

    const [formData, setFormData] = useState({
        exchange: 'bithumb',
        coin: 'BTC',
        price: '',
        time: ''
    });

    const handleSubmit = () => {
        // TODO: 자동 매수 설정 저장 로직 구현
        console.log('자동 매수 설정:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMenuClick = () => {
        // 메뉴 클릭 시 실행할 로직
        console.log('메뉴 클릭됨');
    };

    return (
        <ErrorBoundary>
            <TelegramWrapper
                mainButtonText="설정 저장"
                onMainButtonClick={handleSubmit}
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

                        <h1 className="text-2xl font-bold mb-6">자동 매수 설정</h1>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    거래소
                                </label>
                                <select
                                    name="exchange"
                                    value={formData.exchange}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="bithumb">빗썸</option>
                                    <option value="upbit">업비트</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    코인
                                </label>
                                <select
                                    name="coin"
                                    value={formData.coin}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="BTC">비트코인 (BTC)</option>
                                    <option value="ETH">이더리움 (ETH)</option>
                                    <option value="XRP">리플 (XRP)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    매수가격 (KRW)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="예: 50000000"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    매수시간
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </form>
                    </div>
                </main>
                <FloatingMenu onMenuClick={handleMenuClick} />
            </TelegramWrapper>
        </ErrorBoundary>
    );
} 