import { WalletState } from '../types/wallet';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface HeaderProps extends WalletState {
    onWalletConnect: () => void;
    isLoading: boolean;
    error: string | null;
    resetError: () => void;
}

export default function Header({ 
    isConnected, 
    address, 
    onWalletConnect, 
    isLoading,
    error,
    resetError
}: HeaderProps) {
    return (
        <>
            <div className="w-full flex items-center justify-between mb-4 mt-4">
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
                        {isConnected ? (
                            <div className="text-sm">
                                <p className="font-semibold">{address}</p>
                            </div>
                        ) : (
                            <button
                                onClick={onWalletConnect}
                                disabled={isLoading}
                                className="bg-[var(--accent-color)] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                aria-label="지갑 연결하기"
                            >
                                {isLoading && <LoadingSpinner size="sm" />}
                                <span>Wallet connect</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {error && (
                <ErrorMessage 
                    message={error}
                    onRetry={() => {
                        resetError();
                        onWalletConnect();
                    }}
                />
            )}
        </>
    );
} 