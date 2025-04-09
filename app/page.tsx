'use client';

import FloatingMenu from './components/FloatingMenu';
import Template from './components/Template';
import { useWallet } from './hooks/useWallet';

export default function Home() {
    const { totalAssets } = useWallet();

    return (
        <Template>
            <div className="w-full h-full min-h-screen bg-black text-white overflow-y-auto safe-area-top">
                <div className="max-w-md mx-auto pt-12 p-4 pb-24 space-y-6">
                    {/* 기존 섹션들 */}
                    <section className="bg-gray-900 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">자산 현황</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>총 자산</span>
                                <span className="font-bold">₩{totalAssets.totalValue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>24시간 변동</span>
                                <span className={`text-${totalAssets.change24h >= 0 ? 'green-500' : 'red-500'}`}>
                                    {totalAssets.change24h >= 0 ? '+' : ''}₩{Math.abs(totalAssets.change24h).toLocaleString()} ({Math.abs(totalAssets.change24h).toFixed(2)}%)
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-900 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">보유 자산</h2>
                        <div className="space-y-4">
                            {totalAssets.assets.map((asset) => (
                                <div key={asset.symbol} className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <span className={`w-8 h-8 ${asset.change24h >= 0 ? 'bg-green-500' : 'bg-red-500'} rounded-full flex items-center justify-center`}>
                                            {asset.symbol.toUpperCase()}
                                        </span>
                                        <div>
                                            <div>{asset.symbol}</div>
                                            <div className="text-sm text-gray-400">{asset.amount} {asset.symbol}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold">₩{asset.value.toLocaleString()}</div>
                                        <div className={`text-sm ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 추가 섹션들 */}
                    <section className="bg-gray-900 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">최근 거래</h2>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <span className={`w-8 h-8 ${i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} rounded-full flex items-center justify-center`}>
                                            {i % 2 === 0 ? '매수' : '매도'}
                                        </span>
                                        <div>
                                            <div>비트코인</div>
                                            <div className="text-sm text-gray-400">2024-03-{String(i + 1).padStart(2, '0')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold">₩{(1000000 + i * 100000).toLocaleString()}</div>
                                        <div className="text-sm text-gray-400">0.0{i + 1} BTC</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gray-900 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">시장 동향</h2>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                            {String.fromCharCode(65 + i)}
                                        </span>
                                        <div>
                                            <div>코인 {String.fromCharCode(65 + i)}</div>
                                            <div className="text-sm text-gray-400">24시간 거래량: ₩{(1000000000 + i * 100000000).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold">₩{(100000 + i * 10000).toLocaleString()}</div>
                                        <div className={`text-sm ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {i % 2 === 0 ? '+' : '-'}{(1 + i * 0.5).toFixed(2)}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gray-900 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">뉴스</h2>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="font-semibold">암호화폐 시장 {i + 1}월 동향 분석</div>
                                    <div className="text-sm text-gray-400">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </div>
                                    <div className="text-sm text-blue-400">자세히 보기 →</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <FloatingMenu />
        </Template>
    );
}
