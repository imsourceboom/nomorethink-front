'use client';

import { useState } from 'react';
import Template from './components/Template';
import TelegramWrapper from './components/TelegramWrapper';

// 코인 아이콘 컴포넌트
const CoinIcon = ({ symbol }: { symbol: string }) => {
  let iconClass = 'w-8 h-8 rounded-full flex items-center justify-center text-white';
  
  if (symbol === 'BTC') {
    iconClass += ' bg-[#F7931A]';
  } else if (symbol === 'ETH') {
    iconClass += ' bg-[#627EEA]';
  } else if (symbol === 'TON') {
    iconClass += ' bg-[#0088CC]';
  } else {
    iconClass += ' bg-gray-500';
  }
  
  return (
    <div className={iconClass}>
      {symbol.substring(0, 1)}
    </div>
  );
};

interface CoinData {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  changePercent: number;
  holdings: number;
  holdingsValue: number;
  purchaseValue: number;
}

export default function Home() {
  const [formattedTotalAssets] = useState('999,999,999,999');
  
  const [coins] = useState<CoinData[]>([
    {
      symbol: 'BTC',
      name: '비트코인',
      currentPrice: 116323952,
      priceChange: 999999999,
      changePercent: 99.99,
      holdings: 9.9991234234,
      holdingsValue: 9999999,
      purchaseValue: 999999999
    },
    {
      symbol: 'ETH',
      name: '이더리움',
      currentPrice: 116323952,
      priceChange: -999999999,
      changePercent: -99.99,
      holdings: 9.9991234234,
      holdingsValue: 9999999,
      purchaseValue: 999999999
    },
    {
      symbol: 'TON',
      name: '톤코인',
      currentPrice: 116323952,
      priceChange: 999999999,
      changePercent: 99.99,
      holdings: 9.9991234234,
      holdingsValue: 9999999,
      purchaseValue: 999999999
    }
  ]);

  return (
    <Template>
      <TelegramWrapper>
        <div className="w-full h-[85vh] bg-[#202124] text-white overflow-y-auto">
          {/* 메인 콘텐츠 */}
          <div className="max-w-md mx-auto p-4 pb-32">
            {/* 총 보유자산 섹션 */}
            <div className="mb-10">
              <div className="flex items-center text-lg mb-3">
                <h2 className="mr-3">총 보유자산</h2>
                <button className="text-gray-400 flex items-center">
                  <span className="text-sm mr-1">KRW</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="text-4xl font-bold mb-6">{formattedTotalAssets}</div>
            </div>
            
            {/* 코인 리스트 */}
            <div className="space-y-4">
              {coins.map((coin) => (
                <div key={coin.symbol} className="bg-[#292A2D] rounded-[20px] p-6 border border-[#3C4043]">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <CoinIcon symbol={coin.symbol} />
                      <div className="ml-3">
                        <div className="font-semibold">{coin.name} ({coin.symbol})</div>
                      </div>
                    </div>
                    <div className="text-right font-semibold">
                      {coin.currentPrice.toLocaleString()} KRW
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">평가손익</span>
                      <span className={coin.priceChange >= 0 ? "text-red-500" : "text-blue-500"}>
                        {coin.priceChange >= 0 ? '+' : '-'}{Math.abs(coin.priceChange).toLocaleString()} KRW
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">수익률</span>
                      <span className={coin.changePercent >= 0 ? "text-red-500" : "text-blue-500"}>
                        {coin.changePercent >= 0 ? '+' : '-'}{Math.abs(coin.changePercent).toFixed(2)} %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">보유수량</span>
                      <span>{coin.holdings.toFixed(8)} {coin.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">평가금액</span>
                      <span>{coin.holdingsValue.toLocaleString()} KRW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">매수평균가</span>
                      <span>{coin.purchaseValue.toLocaleString()} KRW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">매수금액</span>
                      <span>{(coin.holdings * coin.purchaseValue).toLocaleString()} KRW</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TelegramWrapper>
    </Template>
  );
}
