'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Prefetch() {
    const router = useRouter();

    useEffect(() => {
        // 모든 페이지 prefetch
        router.prefetch('/');
        router.prefetch('/add');
        router.prefetch('/wallet');
        router.prefetch('/settings');
    }, [router]);

    return null;
} 