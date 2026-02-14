'use client'

import { useEffect, useRef } from 'react'

interface Skill {
  name: string
  color?: string
}

const allSkills: Skill[] = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Next.js', color: '#000000' },
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Python', color: '#3776AB' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'MongoDB', color: '#13AA52' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Git', color: '#F1502F' },
  { name: 'Figma', color: '#F24E1E' },
]

export function SkillsMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="w-full bg-gradient-to-b from-background via-muted/20 to-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <p className="text-base text-muted-foreground">
            Constantly learning and working with modern technologies
          </p>
        </div>

        {/* Half-Moon Marquee Container */}
        <div
          ref={containerRef}
          className="relative mx-auto flex h-80 w-full items-center justify-center"
          style={{
            perspective: '1000px',
          }}
        >
          {/* SVG Arc Path Guide */}
          <svg
            className="absolute inset-0 opacity-5"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M 100 450 A 400 400 0 0 1 900 450"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Rotating Container with Skills */}
          <div className="relative h-full w-full">
            {/* Skills arranged in arc */}
            {allSkills.map((skill, index) => {
              const totalSkills = allSkills.length
              // Calculate angle for each skill (0 to 180 degrees for half moon)
              const angle = (index / totalSkills) * 180 - 90
              const radius = 280
              
              // Convert polar to cartesian coordinates
              const radian = (angle * Math.PI) / 240
              const x = Math.cos(radian) * radius
              const y = Math.sin(radian) * radius
              
              return (
                <div
                  key={`${skill.name}-${index}`}
                  className="group absolute flex items-center justify-center"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                    animation: `float-arc 8s ease-in-out infinite`,
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    <div
                      style={{
                        transform: `rotate(${-angle - 90}deg)`,
                      }}
                      className="flex items-center justify-center rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 px-5 py-2.5 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                    >
                      <span className="whitespace-nowrap font-medium text-sm text-foreground transition-colors group-hover:text-primary">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Decorative Wave Lines */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            height="40"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            style={{ opacity: 0.1 }}
          >
            <path
              d="M 0 20 Q 150 5, 300 20 T 600 20 T 900 20 T 1200 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-arc {
          0%, 100% {
            filter: drop-shadow(0 0 0px rgba(var(--color-primary), 0));
            opacity: 0.7;
          }
          50% {
            filter: drop-shadow(0 8px 16px rgba(var(--color-primary), 0.2));
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
