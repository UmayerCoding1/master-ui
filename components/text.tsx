import React from 'react'

const skills = [
    { name: "Javascript", label: "javascript" },
    { name: "HTML", label: "html" },
    { name: "CSS", label: "css" },
    { name: "Tailwind CSS", label: "tailwindcss" },
    { name: "React", label: "react" },
    { name: "Next.js", label: "nextjs" },
    { name: "TypeScript", label: "typescript" },
    { name: "Redux", label: "redux" },
    { name: "Shadcn UI", label: "shadcnui" },
];


const W = 860, H = 400;
const START_X = 160, END_X = 700, NODE_Y = 310;
const NODE_W = 130, NODE_H = 54;
const BOX_W = 140, BOX_H = 46;
const ARC_CTRL_Y = 60;
const DURATION = 5000;


export const Text = () => {
    return (
        <div className='h-screen  flex items-center justify-center'>Text</div>
    )
}
