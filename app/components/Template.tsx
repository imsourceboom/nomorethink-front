'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                className="w-full h-full bg-black content-safe-area"
                initial={{ 
                    opacity: 0,
                }}
                animate={{ 
                    opacity: 1,
                }}
                transition={{ 
                    duration: 0.5,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
} 