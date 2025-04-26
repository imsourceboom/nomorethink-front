"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import TelegramWrapper from '@/app/components/TelegramWrapper';
import ErrorBoundary from '@/app/components/ErrorBoundary';
import { dcaData, colors } from '../../data';

interface DetailPageProps {
  params: {
    index: string;
  };
}

export default function DetailPage({ params }: DetailPageProps) {
  const globalIdx = parseInt(params.index, 10);
  const [isPaused, setIsPaused] = useState(false);
  // 전역 인덱스에 해당하는 섹션 및 항목 찾기
  let offset = 0;
  let itemName = '';
  let itemDetails = '';
  let startDate = '';

  for (const section of dcaData) {
    if (globalIdx < offset + section.items.length) {
      const localIdx = globalIdx - offset;
      itemName = section.items[localIdx].name;
      itemDetails = section.items[localIdx].details;
      startDate = section.items[localIdx].startDate || '';
      break;
    }
    offset += section.items.length;
  }

  const segments = itemDetails.split('•').map(s => s.trim());
  // 금액: 숫자만 DB에서 가져온다고 가정하고 파싱 및 포맷팅
  const amountRaw = segments[0];
  const amountValue = Number(amountRaw.replace(/[^0-9]/g, ''));
  const frequency = segments[1] || '';
  // 주기 표시: 일별, 주별, 월별에 따라 필요한 부분만 조합
  let frequencyDisplay = frequency;
  if (frequency === '매일') {
    const time = segments[2] || '';
    if (time) frequencyDisplay = `${frequency} - ${time}`;
  } else {
    const dayPart = segments[2] || '';
    const timePart = segments[3] || '';
    const parts = [frequency];
    if (dayPart) parts.push(dayPart);
    if (timePart) parts.push(timePart);
    frequencyDisplay = parts.join(' - ');
  }
  // 기간 표시: 시작 날짜를 적용하여 보여줍니다
  const periodDisplay = startDate ? `${startDate} ~ 계속 유지` : frequency;
  
  // 자동 매수 내역 예시 데이터
  const purchasesHistory = [
    { date: '4.25', cycle: 338, status: '주문 대기중' },
    { date: '4.24', cycle: 337, amount: '997원', total: '329,398원' },
    { date: '4.23', cycle: 336, amount: '988원', total: '328,401원' },
    { date: '4.22', cycle: 335, amount: '990원', total: '327,413원' },
    { date: '4.21', cycle: 334, amount: '986원', total: '326,423원' },
    { date: '4.24', cycle: 337, amount: '997원', total: '329,398원' },
    { date: '4.23', cycle: 336, amount: '988원', total: '328,401원' },
    { date: '4.22', cycle: 335, amount: '990원', total: '327,413원' },
    { date: '4.21', cycle: 334, amount: '986원', total: '326,423원' },
    { date: '4.24', cycle: 337, amount: '997원', total: '329,398원' },
    { date: '4.23', cycle: 336, amount: '988원', total: '328,401원' },
    { date: '4.22', cycle: 335, amount: '990원', total: '327,413원' },
    { date: '4.21', cycle: 334, amount: '986원', total: '326,423원' },
    { date: '4.24', cycle: 337, amount: '997원', total: '329,398원' },
    { date: '4.23', cycle: 336, amount: '988원', total: '328,401원' },
    { date: '4.22', cycle: 335, amount: '990원', total: '327,413원' },
    { date: '4.21', cycle: 334, amount: '986원', total: '326,423원' },
    { date: '4.24', cycle: 337, amount: '997원', total: '329,398원' },
    { date: '4.23', cycle: 336, amount: '988원', total: '328,401원' },
    { date: '4.22', cycle: 335, amount: '990원', total: '327,413원' },
    { date: '4.21', cycle: 334, amount: '986원', total: '326,423원' },
    { date: '4.24', cycle: 337, amount: '997원', total: '329,398원' },
    { date: '4.23', cycle: 336, amount: '988원', total: '328,401원' },
    { date: '4.22', cycle: 335, amount: '990원', total: '327,413원' },
    { date: '4.21', cycle: 334, amount: '986원', total: '326,423원' },
    { date: '4.24', cycle: 337, amount: '997원', total: '329,398원' },
    { date: '4.23', cycle: 336, amount: '988원', total: '328,401원' },
    { date: '4.22', cycle: 335, amount: '990원', total: '327,413원' },
    { date: '4.21', cycle: 334, amount: '986원', total: '326,423원' },
    { date: '4.20', cycle: 333, amount: '998원', total: '325,437원' }
    // ... 더 많은 항목 추가 가능
  ];
  const [visibleCount, setVisibleCount] = useState(10);
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, purchasesHistory.length));
  };

  // IntersectionObserver로 infinite scroll 구현
  const loaderRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const node = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  return (
    <ErrorBoundary>
      <TelegramWrapper>
        <main className="flex flex-col mx-auto max-w-md items-center px-4 pb-24 bg-[var(--bg-color)]">
          {/* Header */}
          <div className="flex items-center w-full justify-between mt-4 mb-6">
            <Link href="/dca">
              <button className="p-2">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-white">{`${itemName}를 ${frequencyDisplay}`}</h1>
            <div className="w-6" />
          </div>

          {/* 요약 카드 */}
          <div className="w-full bg-[var(--secondary-bg-color)] rounded-2xl py-6 px-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{itemName}를 {periodDisplay}</p>
              <p className="text-4xl font-semibold text-white mt-1">{amountValue.toLocaleString()}원</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${isPaused ? 'bg-[rgba(244,158,76,0.5)]' : 'bg-[rgba(59,142,165,0.5)]'}`}>
              {isPaused ? '일시정지' : '모으는 중'}
            </span>
          </div>

          {/* 설정 목록 */}
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-lg">금액</span>
              <div className="flex items-center">
                <span className="text-white text-lg">{amountValue.toLocaleString()}원</span>
                <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-lg">주기</span>
              <div className="flex items-center">
                <span className="text-white text-lg">{frequencyDisplay}</span>
                <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-lg">기간</span>
              <div className="flex items-center">
                <span className="text-white text-lg">{periodDisplay}</span>
                <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          {/* 일시정지 토글 */}
          <div className="flex justify-between items-center w-full mt-6">
            <span className="text-gray-400 text-lg">일시정지</span>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="relative inline-flex items-center w-11 h-6 focus:outline-none"
            >
              {/* Toggle track */}
              <span
                className={`block w-11 h-6 rounded-full transition-colors ${isPaused ? 'bg-[rgba(244,158,76,0.5)]' : 'bg-gray-600'}`}
              />
              {/* Toggle dot */}
              <span
                className={`absolute left-1 top-1/2 -translate-y-1/2 bg-white w-5 h-5 rounded-full transition-transform ${isPaused ? 'translate-x-[1.25rem]' : ''}`}
              />
            </button>
          </div>
          {/* 그만 모으기 버튼 */}
          <button className="w-full py-3 bg-[var(--secondary-bg-color)] text-white rounded-xl mt-8 text-lg">해지</button>
          {/* 지금까지 이만큼 모았어요 */}
          <div className="mt-20 w-full">
            <h2 className="text-lg font-bold text-white mb-4">지금까지 이만큼 모았어요</h2>
            <div className="grid grid-cols-2 gap-4 bg-[var(--secondary-bg-color)] rounded-2xl p-4 mb-6">
              <div className="text-center">
                <p className="text-base text-gray-400">투자 원금</p>
                <p className="text-2xl font-semibold text-white mt-1">329,398원</p>
                <p className="text-sm text-gray-400">총 333회 성공</p>
              </div>
              <div className="text-center">
                <p className="text-base text-gray-400">누적 평가 금액</p>
                <p className="text-2xl font-semibold text-white mt-1">390,231원</p>
                <p className="text-sm text-red-500">+60,833 (+18.4%)</p>
              </div>
            </div>
            {/* 자동 매수 내역 리스트 */}
            <div className="space-y-2 mt-10">
              {purchasesHistory.slice(0, visibleCount).map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center py-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-white text-lg">{entry.date}</span>
                    <span className="text-gray-400 text-lg">{entry.cycle}회차</span>
                  </div>
                  <div className="flex flex-col items-end">
                    {entry.status && <span className="text-blue-500 text-lg">{entry.status}</span>}
                    {entry.amount && <span className="text-blue-500 text-lg">{entry.amount}</span>}
                    {entry.total && <span className="text-sm text-gray-400 mt-1">{entry.total}</span>}
                  </div>
                </div>
              ))}
              {/* 관찰자 요소: 마지막 항목 감지 */}
              <div ref={loaderRef} className="h-1" />
            </div>
          </div>
        </main>
      </TelegramWrapper>
    </ErrorBoundary>
  );
} 