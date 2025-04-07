import { CoinSection as CoinSectionType } from '../types/wallet';

interface CoinSectionProps {
    section: CoinSectionType;
}

export default function CoinSection({ section }: CoinSectionProps) {
    return (
        <section className="w-full max-w-md rounded-2xl bg-slate-800/50 p-6 mb-4" aria-labelledby={`section-${section.title}`}>
            <h2 id={`section-${section.title}`} className="text-xl font-bold mb-4">
                {section.title}
            </h2>
            <div className="space-y-2">
                {section.coins.map((coin, index) => (
                    <div key={`${coin.symbol}-${index}`} className="flex justify-between items-center">
                        <span>{coin.name}</span>
                        <span>{coin.amount} {coin.symbol}</span>
                    </div>
                ))}
            </div>
        </section>
    );
} 