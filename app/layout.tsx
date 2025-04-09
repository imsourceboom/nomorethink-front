'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import FloatingMenu from './components/FloatingMenu';
import Template from './components/Template';
import Loading from './components/Loading';
import Prefetch from './components/Prefetch';
import { useTelegram } from './hooks/useTelegram';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useTelegram(); // 텔레그램 설정 적용

    return (
        <html lang="ko">
            <body className={inter.className}>
                <Loading />
                <Prefetch />
                <Template>
                    {children}
                </Template>
                <FloatingMenu />
            </body>
        </html>
    );
}
