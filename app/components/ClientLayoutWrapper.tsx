'use client';

import dynamic from 'next/dynamic';
import Loading from './Loading';

const ClientLayout = dynamic(() => import('../ClientLayout'), {
    ssr: false,
    loading: () => <Loading />, 
});

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    return <ClientLayout>{children}</ClientLayout>;
} 