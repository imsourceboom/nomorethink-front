// 지갑 상태 타입
export interface WalletState {
    isConnected: boolean;
    address: string | null;
}

// 코인 정보 타입
export interface Coin {
    id: string;
    name: string;
    symbol: string;
    amount: number;
    value: number;
}

// 섹션 데이터 타입
export interface CoinSection {
    title: string;
    coins: Coin[];
}

// MetaMask 타입 정의
declare global {
    interface Window {
        ethereum?: {
            request: (args: { method: string; params?: any[] }) => Promise<any>;
            on: (event: string, callback: (params: any) => void) => void;
            removeListener: (event: string, callback: (params: any) => void) => void;
        };
    }
} 