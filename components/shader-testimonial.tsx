'use client'
import React from 'react';;
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
const DiagonalStripes = () => {
    return <div className="absolute right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div
            initial={{ rotate: -37, y: 0, x: 700 }}
            animate={{ y: [350, 0], x: [800, 0] }}
            transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
            }}
            className="absolute inset-x-0 bottom-[30%] h-[150%] flex flex-col gap-0 origin-bottom-right"
        >
            {/* Stripe layers based on image colors */}
            {[
                'bg-linear-to-r from-blue-400 to-blue-600 h-20 opacity-90',
                'bg-blue-500 h-12 opacity-95',
                'bg-blue-400 h-10 opacity-80',
                'bg-blue-300 h-6 opacity-50',
                'bg-blue-200 h-4 opacity-30',
                'bg-blue-100 h-2 opacity-20',
            ].map((style, i) => (
                <motion.div
                    key={i}
                    initial={{ scaleX: 0, y: 50, opacity: 0 }}
                    animate={{ scaleX: 1, y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.5 + i * 0.1,
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                    className={cn("w-full relative origin-left", style)}
                >
                    {/* Shimmer Effect */}
                    <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear", delay: i * 0.5 }}
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent w-full"
                    />
                </motion.div>
            ))}
        </motion.div>
    </div>
}

export const ShaderTestimonial = () => {
    return (
        <div className='w-full h-screen bg-white relative'>
            <DiagonalStripes />
        </div>
    )
}
