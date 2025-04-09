'use client';

import { useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';

export default function TelegramConfig() {
    const { initTelegram } = useTelegram();

    useEffect(() => {
        initTelegram();
    }, [initTelegram]);

    return null;
} 