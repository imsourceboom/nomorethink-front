import { WalletState } from '../types/wallet';

interface HeaderProps {
    walletState: WalletState;
    onWalletConnect: () => void;
}

export default function Header({ walletState, onWalletConnect }: HeaderProps) {
    return (
        <div className="w-full flex items-center justify-between mb-8 mt-4">
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <div 
                        className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold" 
                        aria-label="NoMoreThink 로고"
                    >
                        NT
                    </div>
                </div>
                <div>
                    {walletState.isConnected ? (
                        <div className="text-sm">
                            <p className="font-semibold">{walletState.address}</p>
                        </div>
                    ) : (
                        <button
                            onClick={onWalletConnect}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            aria-label="지갑 연결하기"
                        >
                            Wallet connect
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 