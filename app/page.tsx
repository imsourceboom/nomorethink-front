'use client';

import { useWallet } from './hooks/useWallet';

export default function Home() {
    const { 
        isConnected, 
        address
    } = useWallet();

    // TODO: 실제 자산 데이터로 교체
    const totalAssets = {
        totalValue: 15000000,
        change24h: 2.5,
        assets: [
            { symbol: 'BTC', amount: 0.5, value: 30000000, change24h: 1.2 },
            { symbol: 'ETH', amount: 2.0, value: 4000000, change24h: -0.8 },
            { symbol: 'XRP', amount: 1000, value: 800000, change24h: 3.1 }
        ]
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-start px-4 pt-32 pb-6 bg-black">
            <div className="w-full max-w-md mx-auto">
                {/* 총 자산 가치 */}
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg mb-6 border border-zinc-800">
                    <h2 className="text-lg font-semibold text-zinc-400 mb-1">총 자산 가치</h2>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">
                            ₩{totalAssets.totalValue.toLocaleString()}
                        </span>
                        <span className={`ml-2 text-sm ${totalAssets.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {totalAssets.change24h >= 0 ? '+' : ''}{totalAssets.change24h}%
                        </span>
                    </div>
                </div>

                {/* 자산 목록 */}
                <div className="space-y-4">
                    {totalAssets.assets.map((asset) => (
                        <div key={asset.symbol} className="bg-zinc-900 p-4 rounded-lg shadow border border-zinc-800">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-white">{asset.symbol}</h3>
                                    <p className="text-sm text-zinc-400">{asset.amount} {asset.symbol}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-white">₩{asset.value.toLocaleString()}</p>
                                    <p className={`text-sm ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 지갑 연결 상태 */}
                <div className="mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">지갑 상태</span>
                        <span className="text-sm">
                            {isConnected ? (
                                <span className="text-green-500">연결됨</span>
                            ) : (
                                <span className="text-red-500">연결 안됨</span>
                            )}
                        </span>
                    </div>
                    {isConnected && (
                        <div className="mt-2 text-sm text-zinc-500 break-all">
                            {address}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
