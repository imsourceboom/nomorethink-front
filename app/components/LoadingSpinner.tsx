interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
    const sizeClass = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    }[size];

    return (
        <div className="flex justify-center items-center">
            <div className={`${sizeClass} animate-spin rounded-full border-4 border-blue-500 border-t-transparent`} role="status">
                <span className="sr-only">로딩 중...</span>
            </div>
        </div>
    );
} 