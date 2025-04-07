'use client';

import { useState, useCallback } from 'react';
import { WalletState } from '../types/wallet';

interface WalletHookState extends WalletState {
    isLoading: boolean;
    error: string | null;
}

export default function useWallet() {
    const [state, setState] = useState<WalletHookState>({
        isConnected: false,
        address: null,
        isLoading: false,
        error: null
    });

    const handleWalletConnect = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));

            // MetaMask가 설치되어 있는지 확인
            if (typeof window !== 'undefined' && window.ethereum) {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                
                if (accounts && accounts[0]) {
                    setState({
                        isConnected: true,
                        address: accounts[0],
                        isLoading: false,
                        error: null
                    });
                }
            } else {
                throw new Error('MetaMask가 설치되어 있지 않습니다.');
            }
        } catch (error) {
            console.error('지갑 연결 에러:', error);
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : '지갑 연결에 실패했습니다.'
            }));
        }
    }, []);

    const resetError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    return {
        ...state,
        handleWalletConnect,
        resetError
    };
} 