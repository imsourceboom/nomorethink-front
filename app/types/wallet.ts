// 지갑 상태 타입
export interface WalletState {
    isConnected: boolean;
    address: string;
}

// 코인 정보 타입
export interface CoinInfo {
    name: string;
    symbol: string;
    amount: number;
    value: number;
}

// 섹션 데이터 타입
export interface CoinSection {
    title: string;
    coins: CoinInfo[];
} 