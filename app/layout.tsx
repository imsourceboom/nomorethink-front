// 이 파일은 서버 컴포넌트입니다
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import Loading from './components/Loading';

const inter = Inter({ subsets: ['latin'] });

// ClientLayout을 동적으로 가져와서 SSR을 비활성화하고 로딩 상태를 표시합니다
const ClientLayout = dynamic(() => import('./ClientLayout'), {
    ssr: false,
    loading: () => <Loading />,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
