interface TotalAmountProps {
    amount: number;
}

export default function TotalAmount({ amount }: TotalAmountProps) {
    return (
        <section className="w-full max-w-md rounded-2xl bg-slate-800/50 p-6 mb-4" aria-labelledby="total-amount">
            <h2 id="total-amount" className="text-xl font-bold mb-4">총 수량</h2>
            <div className="text-2xl font-bold">
                {amount.toFixed(2)} 코인
            </div>
        </section>
    );
} 