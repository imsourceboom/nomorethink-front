import { useState, useCallback } from 'react';
import { WalletState } from '../types/wallet';

export function useWallet() {
    const [walletState, setWalletState] = useState<WalletState>({
        isConnected: false,
        address: ''
    });

    const handleWalletConnect = useCallback(() => {
        try {
            const walletLink = 'ton://wallet?address=YOUR_WALLET_ADDRESS';
            if (typeof window !== 'undefined') {
                window.open(walletLink, '_blank');
            }
            setWalletState({
                isConnected: true,
                address: 'YOUR_WALLET_ADDRESS'
            });
        } catch (error) {
            console.error('지갑 연결 중 오류 발생:', error);
            // TODO: 에러 처리 UI 추가
        }
    }, []);

    return {
        walletState,
        handleWalletConnect
    };
} 