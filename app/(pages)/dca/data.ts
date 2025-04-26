export interface DcaItem {
  name: string;
  details: string;
  startDate?: string;
}

export interface DcaSection {
  title: string;
  items: DcaItem[];
}

export const dcaData: DcaSection[] = [
  {
    title: '암호화폐',
    items: [
      { name: '비트코인 (BTC)', details: '1,000,000원씩 • 매일 • 9:00 • Bithumb', startDate: '2023.12.19' },
      { name: '이더리움 (ETH)', details: '5,000원씩 • 매주 • 월 • 17:15 • Coinone', startDate: '2023.12.20' },
      { name: '톤코인 (TON)', details: '5,000원씩 • 매월 • 13일 • 23:45 • Binance', startDate: '2023.12.21' },
      { name: 'BITCOIN (BTC)', details: '$10,000 • Daily • 00:00 • OKX' },
      { name: 'ETHEREUM (ETH)', details: '$500 • Weekly • SUN • 17:15 • Bybit' },
      { name: 'TONCOIN (TON)', details: '$3,000 • Monthly • 13th • 23:45 • Coinbase' }
    ]
  },
  {
    title: '주식',
    items: [
      { name: '테슬라 (TSLA)', details: '10,000원씩 • 매일' },
      { name: 'VOO', details: '1,000,000원씩 • 매주 • 월' },
      { name: '애플 (AAPL)', details: '$10,000 • Monthly • 31th' },
      { name: 'BITCOIN (BTC)', details: '$10,000 • Daily • 00:00 • OKX' },
      { name: 'ETHEREUM (ETH)', details: '$500 • Weekly • SUN • 17:15 • Bybit' },
      { name: 'TONCOIN (TON)', details: '$3,000 • Monthly • 13th • 23:45 • Coinbase' }
    ]
  }
];

export const colors = ['#F87171', '#60A5FA', '#34D399', '#FBBF24', '#A78BFA', '#F472B6']; 