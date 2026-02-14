"use client"

import { motion, Variants } from "motion/react"

const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = i
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 },
            },
        }
    },
}

export default function PathDrawing() {
    return (
        <motion.svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            initial="hidden"
            animate="visible"
            style={image}
        >
          
            <motion.rect
                width="140"
                height="140"
                x="410"
                y="430"
                rx="20"
                stroke="#ff0088"
                variants={draw}
                custom={1}
                style={shape}
            />
        </motion.svg>
    )
}

/**
 * ==============   Styles   ================
 */

const image: React.CSSProperties = {
    maxWidth: "80vw",
}

const shape: React.CSSProperties = {
    strokeWidth: 6,
    strokeLinecap: "round",
    fill: "transparent",
}
