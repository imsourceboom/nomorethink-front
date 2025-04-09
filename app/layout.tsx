import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import FloatingMenu from './components/FloatingMenu';
import Template from './components/Template';
import Loading from './components/Loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'NoMoreThink',
    description: 'NoMoreThink',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <Loading />
                <Template>
                    {children}
                </Template>
                <FloatingMenu />
            </body>
        </html>
    );
}
