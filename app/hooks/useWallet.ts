'use client';

import { useState, useCallback } from 'react';
import { WalletState } from '../types/wallet';

interface Asset {
    symbol: string;
    amount: number;
    value: number;
    change24h: number;
}

interface TotalAssets {
    totalValue: number;
    change24h: number;
    assets: Asset[];
}

interface WalletHookState extends WalletState {
    isLoading: boolean;
    error: string | null;
    totalAssets: TotalAssets;
}

export function useWallet() {
    const [state, setState] = useState<WalletHookState>({
        isConnected: false,
        address: null,
        isLoading: false,
        error: null,
        totalAssets: {
            totalValue: 15000000,
            change24h: 2.5,
            assets: [
                { symbol: 'BTC', amount: 0.5, value: 30000000, change24h: 1.2 },
                { symbol: 'ETH', amount: 2.0, value: 4000000, change24h: -0.8 },
                { symbol: 'XRP', amount: 1000, value: 800000, change24h: 3.1 }
            ]
        }
    });

    const handleWalletConnect = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));

            // MetaMask가 설치되어 있는지 확인
            if (typeof window !== 'undefined' && window.ethereum) {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                }) as string[];
                
                if (accounts && accounts[0]) {
                    setState({
                        isConnected: true,
                        address: accounts[0],
                        isLoading: false,
                        error: null,
                        totalAssets: {
                            totalValue: 15000000,
                            change24h: 2.5,
                            assets: [
                                { symbol: 'BTC', amount: 0.5, value: 30000000, change24h: 1.2 },
                                { symbol: 'ETH', amount: 2.0, value: 4000000, change24h: -0.8 },
                                { symbol: 'XRP', amount: 1000, value: 800000, change24h: 3.1 }
                            ]
                        }
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