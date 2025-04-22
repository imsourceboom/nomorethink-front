"use client";

import React from 'react';
import Link from 'next/link';
import TelegramWrapper from '@/app/components/TelegramWrapper';
import ErrorBoundary from '@/app/components/ErrorBoundary';

export default function DcaPage() {
  return (
    <ErrorBoundary>
      <TelegramWrapper>
        <main className="flex flex-col items-center justify-start px-4 pb-24 bg-[var(--bg-color)]">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-8 mt-4">코인 모으기 현황</h1>
            <button
              type="button"
              className="px-4 py-2 rounded-xl text-white bg-[var(--accent-color)] mb-4"
            >
              <Link href="/dca/add">코인 모으기 신청</Link>
            </button>
            {/* TODO: 신청 현황 리스트 */}
          </div>
        </main>
      </TelegramWrapper>
    </ErrorBoundary>
  );
} 