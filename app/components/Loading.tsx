'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Loading() {
    const text = "No More Think";
    // 반복 애니메이션을 위해 key 갱신
    const [loopKey, setLoopKey] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setLoopKey(prev => prev + 1), 2000);
        return () => clearInterval(interval);
    }, []);
    
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const item = {
        hidden: { 
            opacity: 0,
            y: 20
        },
        show: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-[#202124] z-[9999]"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={container}
            key={loopKey}
        >
            <div className="flex absolute-center">
                {text.split('').map((char, index) => (
                    <motion.span
                        key={index}
                        variants={item}
                        className={`text-4xl font-bold ${char === ' ' ? 'mx-2' : ''} text-[#FEF58D]`}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
} 