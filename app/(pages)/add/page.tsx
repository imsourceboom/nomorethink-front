'use client';

import React, { useState } from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import TelegramWrapper from '@/app/components/TelegramWrapper';
import ErrorBoundary from '@/app/components/ErrorBoundary';

registerLocale('ko', ko);

const exchangeOptions = [
    { value: 'bithumb', label: '빗썸' },
    { value: 'upbit', label: '업비트' }
];

const coinOptions = [
    { value: 'BTC', label: '비트코인' },
    { value: 'ETH', label: '이더리움' },
    { value: 'XRP', label: '리플' },
    { value: 'SOL', label: '솔라나' }
];

// 주간 옵션 (요일)
const weeklyOptions: OptionType[] = [
    { value: 'SUN', label: '일요일' },
    { value: 'MON', label: '월요일' },
    { value: 'TUE', label: '화요일' },
    { value: 'WED', label: '수요일' },
    { value: 'THU', label: '목요일' },
    { value: 'FRI', label: '금요일' },
    { value: 'SAT', label: '토요일' }
];

interface OptionType {
    readonly value: string;
    readonly label: string;
}

export default function AddPage() {
    const [formData, setFormData] = useState({
        exchange: exchangeOptions[0],
        coin: coinOptions[0],
        price: '',
        time: new Date(),
        frequency: 'daily' as 'daily' | 'weekly' | 'monthly',
        dayOfWeek: null as OptionType | null,
        dayOfMonth: ''
    });

    const handleSubmit = () => {
        console.log('코인 모으기 설정:', {
            exchange: formData.exchange.value,
            coin: formData.coin.value,
            price: formData.price,
            time: formData.time
        });
    };

    const selectStyles: StylesConfig<OptionType, false> = {
        control: (base) => ({
            ...base,
            backgroundColor: 'var(--secondary-bg-color)',
            borderColor: 'var(--input-border-color)',
            borderRadius: '12px',
            padding: '4px',
            '&:hover': {
                borderColor: 'var(--accent-color)'
            },
            boxShadow: 'none',
            minHeight: '48px'
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? 'var(--accent-color)' : 'var(--secondary-bg-color)',
            color: 'var(--text-color)',
            '&:hover': {
                backgroundColor: state.isSelected ? 'var(--accent-color)' : '#2D3748'
            }
        }),
        singleValue: (base) => ({
            ...base,
            color: 'var(--text-color)'
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: 'var(--secondary-bg-color)',
            border: '1px solid var(--input-border-color)',
            borderRadius: '12px'
        })
    };

    return (
        <ErrorBoundary>
            <TelegramWrapper>
                <main className="flex flex-col items-center justify-start px-4 pb-24 bg-[var(--bg-color)]">
                    <div className="w-full max-w-md mx-auto">
                        <h1 className="text-2xl font-bold mb-8 mt-4">코인 모으기</h1>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    어느 거래소에서 모을까요?
                                </label>
                                <Select
                                    value={formData.exchange}
                                    onChange={(option: SingleValue<OptionType>) => 
                                        option && setFormData(prev => ({ ...prev, exchange: option }))}
                                    options={exchangeOptions}
                                    styles={selectStyles}
                                    isSearchable={false}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    어떤 코인을 모을까요?
                                </label>
                                <Select
                                    value={formData.coin}
                                    onChange={(option: SingleValue<OptionType>) => 
                                        option && setFormData(prev => ({ ...prev, coin: option }))}
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
                                        className="w-full px-4 py-3 bg-[var(--secondary-bg-color)] border border-[var(--input-border-color)] rounded-xl text-right pr-16 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-color)]"
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
                                        className={`px-4 py-2 rounded-xl text-white transition-colors ${formData.frequency==='daily'? 'bg-[var(--accent-color)]':'bg-[var(--secondary-bg-color)]'}`}
                                        onClick={() => setFormData(prev => ({ ...prev, frequency: 'daily', dayOfWeek: null, dayOfMonth: '' }))}
                                    >
                                        매일
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-4 py-2 rounded-xl text-white transition-colors ${formData.frequency==='weekly'? 'bg-[var(--accent-color)]':'bg-[var(--secondary-bg-color)]'}`}
                                        onClick={() => setFormData(prev => ({ ...prev, frequency: 'weekly', dayOfWeek: null, dayOfMonth: '' }))}
                                    >
                                        매주
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-4 py-2 rounded-xl text-white transition-colors ${formData.frequency==='monthly'? 'bg-[var(--accent-color)]':'bg-[var(--secondary-bg-color)]'}`}
                                        onClick={() => setFormData(prev => ({ ...prev, frequency: 'monthly', dayOfWeek: null, dayOfMonth: '' }))}
                                    >
                                        매월
                                    </button>
                                </div>
                                {/* 주간/월간 추가 선택 UI */}
                                {formData.frequency === 'weekly' && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">요일 선택</label>
                                        <Select
                                            value={formData.dayOfWeek}
                                            onChange={(opt) => opt && setFormData(prev => ({ ...prev, dayOfWeek: opt }))}
                                            options={weeklyOptions}
                                            styles={selectStyles}
                                            isSearchable={false}
                                        />
                                    </div>
                                )}
                                {formData.frequency === 'monthly' && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">일자 선택</label>
                                        <input
                                            type="number"
                                            min={1}
                                            max={31}
                                            value={formData.dayOfMonth}
                                            onChange={(e) => setFormData(prev => ({ ...prev, dayOfMonth: e.target.value }))}
                                            placeholder="1~31"
                                            className="w-full px-4 py-3 bg-[var(--secondary-bg-color)] border border-[var(--input-border-color)] rounded-xl text-right pr-16 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-color)]"
                                        />
                                    </div>
                                )}
                                <DatePicker
                                    selected={formData.time}
                                    onChange={(date) => setFormData(prev => ({ ...prev, time: date! }))}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="시간"
                                    dateFormat="HH:mm"
                                    locale="ko"
                                    className="w-full px-4 py-3 bg-[var(--secondary-bg-color)] border border-[var(--input-border-color)] rounded-xl text-white focus:outline-none focus:border-[var(--accent-color)]"
                                />
                            </div>
                        </form>
                    </div>
                </main>
            </TelegramWrapper>
        </ErrorBoundary>
    );
} 