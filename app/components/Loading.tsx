'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Loading() {
    const [isVisible, setIsVisible] = useState(true);
    const text = "No More Think";
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
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

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-50"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={container}
        >
            <div className="flex">
                {text.split('').map((char, index) => (
                    <motion.span
                        key={index}
                        variants={item}
                        className={`text-4xl font-bold ${char === ' ' ? 'mx-2' : ''} ${
                            index < 2 ? 'text-[#2481cc]' : // No
                            index === 2 ? 'mr-2 text-[#2481cc]' : // space after No
                            index < 7 ? 'text-[#1465A2]' : // More
                            index === 7 ? 'mr-2 text-[#1465A2]' : // space after More
                            'text-[#0C4870]' // Think
                        }`}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
} 