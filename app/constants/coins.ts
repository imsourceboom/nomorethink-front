import { CoinInfo } from '../types/wallet';

// 기본 코인 데이터
export const DEFAULT_COINS: CoinInfo[] = [
    {
        name: '비트코인',
        symbol: 'BTC',
        amount: 1.25,
        value: 45000
    },
    {
        name: '이더리움',
        symbol: 'ETH',
        amount: 3.45,
        value: 3200
    },
    {
        name: '라이트코인',
        symbol: 'LTC',
        amount: 15,
        value: 200
    }
]; 