interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="w-full p-4 rounded-lg bg-red-500/10 text-red-500 mb-4">
            <p className="text-sm">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-2 text-xs underline hover:no-underline"
                >
                    다시 시도
                </button>
            )}
        </div>
    );
} 