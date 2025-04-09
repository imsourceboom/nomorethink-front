'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ 
                    opacity: 0,
                    y: 20
                }}
                animate={{ 
                    opacity: 1,
                    y: 0
                }}
                exit={{ 
                    opacity: 0,
                    y: -20
                }}
                transition={{ 
                    duration: 0.2,
                    ease: [0.43, 0.13, 0.23, 0.96] // 커스텀 easing
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
} 