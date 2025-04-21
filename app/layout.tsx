// 이 파일은 서버 컴포넌트입니다
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from './components/ClientLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            </body>
        </html>
    );
}
