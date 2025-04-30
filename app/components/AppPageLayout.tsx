import ErrorBoundary from '@/app/components/ErrorBoundary';
import TelegramWrapper from '@/app/components/TelegramWrapper';
import React from 'react';

export default function AppPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <TelegramWrapper>
        <main className="flex flex-col mx-auto max-w-md items-center justify-start px-4 pb-24 bg-[var(--bg-color)] min-h-screen">
          {children}
        </main>
      </TelegramWrapper>
    </ErrorBoundary>
  );
}
