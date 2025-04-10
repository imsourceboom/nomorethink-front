import React, { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import TelegramWrapper from '@/app/components/TelegramWrapper';
import Header from '@/app/components/Header';
import FloatingMenu from '@/app/components/FloatingMenu';
import { useWallet } from '@/app/hooks/useWallet';
import ErrorBoundary from '@/app/components/ErrorBoundary';

registerLocale('ko', ko);

const exchangeOptions = [
    { value: 'upbit', label: '업비트' },
    { value: 'bithumb', label: '빗썸' }
];

const coinOptions = [
    { value: 'BTC', label: '비트코인' },
    { value: 'ETH', label: '이더리움' },
    { value: 'XRP', label: '리플' },
    { value: 'SOL', label: '솔라나' }
];

interface OptionType {
    readonly value: string;
    readonly label: string;
}

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
        exchange: exchangeOptions[0],
        coin: coinOptions[0],
        price: '',
        time: new Date()
    });

    const handleSubmit = () => {
        console.log('코인 모으기 설정:', {
            exchange: formData.exchange.value,
            coin: formData.coin.value,
            price: formData.price,
            time: formData.time
        });
    };

    const handleMenuClick = () => {
        console.log('메뉴 클릭됨');
    };

    const selectStyles: StylesConfig<OptionType, false> = {
        control: (base) => ({
            ...base,
            backgroundColor: '#17171B',
            borderColor: '#2D2D35',
            borderRadius: '12px',
            padding: '4px',
            '&:hover': {
                borderColor: '#3366FF'
            },
            boxShadow: 'none',
            minHeight: '48px'
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#3366FF' : '#17171B',
            color: '#FFFFFF',
            '&:hover': {
                backgroundColor: state.isSelected ? '#3366FF' : '#2D2D35'
            }
        }),
        singleValue: (base) => ({
            ...base,
            color: '#FFFFFF'
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#17171B',
            border: '1px solid #2D2D35',
            borderRadius: '12px'
        })
    };

    useEffect(() => {
        console.log('window.Telegram:', window.Telegram);
    }, []);

    return (
        <ErrorBoundary>
            <TelegramWrapper
                mainButtonText="설정 완료"
                onMainButtonClick={handleSubmit}
            >
                <main className="flex min-h-screen flex-col items-center justify-start px-4 pt-32 pb-6 bg-black">
                    <div className="w-full max-w-md mx-auto">
                        <Header 
                            isConnected={isConnected}
                            address={address}
                            isLoading={isLoading}
                            error={error}
                            onWalletConnect={handleWalletConnect}
                            resetError={resetError}
                        />

                        <h1 className="text-2xl font-bold mb-8">코인 모으기 설정</h1>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    어떤 코인을 모을까요?
                                </label>
                                <Select
                                    value={formData.coin}
                                    onChange={(option: OptionType) => 
                                        setFormData(prev => ({ ...prev, coin: option }))}
                                    options={coinOptions}
                                    styles={selectStyles}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    얼마씩 모을까요?
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                        placeholder="금액을 입력해 주세요"
                                        className="w-full px-4 py-3 bg-[#17171B] border border-[#2D2D35] rounded-xl text-right pr-16 text-white placeholder-gray-500 focus:outline-none focus:border-[#3366FF]"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        KRW
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    언제 모을까요?
                                </label>
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-[#2D2D35] rounded-xl text-white hover:bg-[#3366FF] transition-colors"
                                    >
                                        매일
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-[#2D2D35] rounded-xl text-white hover:bg-[#3366FF] transition-colors"
                                    >
                                        매주
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-[#2D2D35] rounded-xl text-white hover:bg-[#3366FF] transition-colors"
                                    >
                                        매월
                                    </button>
                                </div>
                                <DatePicker
                                    selected={formData.time}
                                    onChange={(date) => setFormData(prev => ({ ...prev, time: date! }))}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="시간"
                                    dateFormat="HH:mm"
                                    locale="ko"
                                    className="w-full px-4 py-3 bg-[#17171B] border border-[#2D2D35] rounded-xl text-white focus:outline-none focus:border-[#3366FF]"
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