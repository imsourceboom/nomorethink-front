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

// MetaMask 요청 파라미터 타입
interface RequestArguments {
    method: string;
    params?: unknown[];
}

// MetaMask 이벤트 파라미터 타입
type EthereumEventCallback = (params: unknown) => void;

// MetaMask 타입 정의
declare global {
    interface Window {
        ethereum?: {
            request: (args: RequestArguments) => Promise<unknown>;
            on: (event: string, callback: EthereumEventCallback) => void;
            removeListener: (event: string, callback: EthereumEventCallback) => void;
        };
    }
} 