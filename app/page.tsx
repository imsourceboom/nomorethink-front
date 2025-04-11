'use client';

import { useEffect, useState } from 'react';
import Template from './components/Template';
import { useWallet } from './hooks/useWallet';

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
  const [showDropdown, setShowDropdown] = useState(false);
  const [formattedTotalAssets, setFormattedTotalAssets] = useState('999,999,999,999');
  
  const [coins, setCoins] = useState<CoinData[]>([
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
      priceChange: 999999999,
      changePercent: 99.99,
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
      <div className="w-full h-full min-h-screen bg-[#202124] text-white overflow-y-auto">
        {/* 상단 네비게이션 바 */}
        <div className="sticky top-0 bg-[#202124] z-10 p-4 flex items-center justify-between">
          <button className="bg-[#3C4043] text-white px-4 py-2 rounded-full flex items-center">
            <span className="mr-1">✕</span>
            <span>닫기</span>
          </button>
          <div className="flex items-center">
            <button className="bg-[#3C4043] text-white p-2 rounded-full mr-2">
              <span>✓</span>
            </button>
            <button className="bg-[#3C4043] text-white p-2 rounded-full" onClick={() => setShowDropdown(!showDropdown)}>
              <span>⋯</span>
            </button>
            {showDropdown && (
              <div className="absolute top-16 right-4 bg-[#3C4043] rounded-lg shadow-lg p-2">
                <div className="p-2 hover:bg-[#4E5256] rounded">새로고침</div>
                <div className="p-2 hover:bg-[#4E5256] rounded">설정</div>
              </div>
            )}
          </div>
        </div>
        
        {/* 메인 콘텐츠 */}
        <div className="max-w-md mx-auto p-4 pb-24">
          {/* 총 보유자산 섹션 */}
          <div className="mb-6">
            <div className="flex items-center text-lg mb-2">
              <h2 className="mr-2">총 보유자산</h2>
              <button className="text-gray-400">
                <span>▼ KRW</span>
              </button>
            </div>
            <div className="text-5xl font-bold mb-6">{formattedTotalAssets}</div>
          </div>
          
          {/* 코인 리스트 */}
          <div className="space-y-4">
            {coins.map((coin) => (
              <div key={coin.symbol} className="bg-[#292A2D] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
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
                
                <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">평가손익</span>
                    <span className="text-red-500">+{coin.priceChange.toLocaleString()} KRW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">수익률</span>
                    <span className="text-red-500">{coin.changePercent.toFixed(2)} %</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">보유수량</span>
                    <span>{coin.holdings.toFixed(8)} BTC</span>
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
    </Template>
  );
}
