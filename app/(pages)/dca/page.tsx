"use client";

import React from 'react';
import Link from 'next/link';
import TelegramWrapper from '@/app/components/TelegramWrapper';
import ErrorBoundary from '@/app/components/ErrorBoundary';

export default function DcaPage() {
  const dcaData = [
    {
      title: '암호화폐',
      items: [
        { name: '비트코인 (BTC)', details: '1,000,000원씩 • 매일 • 9:00 • Bithumb' },
        { name: '이더리움 (ETH)', details: '5,000원씩 • 매주 • 월 • 17:15 • Coinone' },
        { name: '톤코인 (TON)', details: '5,000원씩 • 매월 • 13일 • 23:45 • Binance' },
        { name: 'BITCOIN (BTC)', details: '$10,000 • Daily • 00:00 • OKX' },
        { name: 'ETHEREUM (ETH)', details: '$500 • Weekly • SUN • 17:15 • Bybit' },
        { name: 'TONCOIN (TON)', details: '$3,000 • Monthly • 13th • 23:45 • Coinbase' }
      ]
    },
    {
      title: '주식',
      items: [
        { name: '테슬라 (TSLA)', details: '10,000원씩 • 매일' },
        { name: 'VOO', details: '1,000,000원씩 • 매주 • 월' },
        { name: '애플 (AAPL)', details: '$10,000 • Monthly • 31th' },
        { name: 'BITCOIN (BTC)', details: '$10,000 • Daily • 00:00 • OKX' },
        { name: 'ETHEREUM (ETH)', details: '$500 • Weekly • SUN • 17:15 • Bybit' },
        { name: 'TONCOIN (TON)', details: '$3,000 • Monthly • 13th • 23:45 • Coinbase' }
      ]
    }
  ];

  // 랜덤 배경색을 위한 색상 배열
  const colors = ['#F87171', '#60A5FA', '#34D399', '#FBBF24', '#A78BFA', '#F472B6'];

  return (
    <ErrorBoundary>
      <TelegramWrapper>
        <main className="flex flex-col mx-auto max-w-md items-center justify-start px-4 pb-24 bg-[var(--bg-color)]">
          <div className="w-full ">
            {/* Header with add button */}
            <div className="flex items-center justify-between mt-4 mb-10">
              <h1 className="text-2xl font-bold text-white">나의 모으기 현황</h1>
              <Link href="/dca/add">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center border-[rgba(59,142,165,0.5)] group hover:bg-[rgba(59,142,165,0.5)]"
                >
                  <svg
                    className="w-6 h-6 text-[rgba(59,142,165,0.5)] group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </Link>
            </div>
            {/* DCA 신청 현황 리스트 */}
            {dcaData.map(section => (
              <div key={section.title} className="pt-4 mb-10">
                <h2 className="text-base font-semibold text-gray-500 mb-4">{section.title}</h2>
                {section.items.map((item, idx) => (
                  <Link href={`/dca/add`} key={idx}>
                    <div className="flex items-center justify-between py-4 rounded-2xl mb-4 cursor-pointer">
                      <div className="flex items-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4"
                          style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
                        >
                          {item.name.match(/\(([^)]+)\)/)?.[1] ?? item.name[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-sm text-gray-400">{item.details}</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </main>
      </TelegramWrapper>
    </ErrorBoundary>
  );
} 