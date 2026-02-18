'use client'
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

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

interface SkillPillProps {
  skillIndex: number;
  onHalfway: () => void;
  onDone: () => void;
}

interface Pill {
  id: number;
  skillIndex: number;
}


const W = 860, H = 400;
const START_X = 160, END_X = 700, NODE_Y = 310;
const NODE_W = 130, NODE_H = 54;
const BOX_W = 140, BOX_H = 46;
const ARC_CTRL_Y = 60;
const DURATION = 5000;

function bezierPoint(t: number) {
  const x0 = START_X, y0 = NODE_Y - NODE_H / 2;
  const x1 = (START_X + END_X) / 2, y1 = ARC_CTRL_Y;
  const x2 = END_X, y2 = NODE_Y - NODE_H / 2;
  const mt = 1 - t;
  return {
    x: mt * mt * x0 + 2 * mt * t * x1 + t * t * x2,
    y: mt * mt * y0 + 2 * mt * t * y1 + t * t * y2,
  };
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ── Single moving pill ────────────────────────────────────────────────────────
function SkillPill({ skillIndex, onHalfway, onDone }: SkillPillProps) {
  const rafRef = useRef<number | null>(null);
  const [pos, setPos] = useState(bezierPoint(0));
  const [visible, setVisible] = useState(true);
  const halfwayFired = useRef(false);

  useEffect(() => {
    const startTime = performance.now();
    halfwayFired.current = false;

    const tick = (now: number) => {
      const raw = Math.min((now - startTime) / DURATION, 1);
      const t = easeInOutCubic(raw);
      setPos(bezierPoint(t));

      if (!halfwayFired.current && raw >= 0.5) {
        halfwayFired.current = true;
        onHalfway();
      }

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setVisible(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const skill = skills[skillIndex % skills.length];

  return (
    <foreignObject
      x={pos.x - BOX_W / 2}
      y={pos.y - BOX_H / 2}
      width={BOX_W}
      height={BOX_H}
      style={{ overflow: "visible" }}
    >
      <AnimatePresence onExitComplete={onDone}>
        {visible && (
          <motion.div
            key="pill"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.55, y: 8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{
              width: BOX_W,
              height: BOX_H,
              background: "#c94f4f",
              borderRadius: 8,
              border: "1px solid #e06060",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: 13,
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.5px",
              userSelect: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 0 18px rgba(201,79,79,0.55)",
            }}
          >
            {skill.name}
          </motion.div>
        )}
      </AnimatePresence>
    </foreignObject>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SkillsArcAnimation() {
  const [pills, setPills] = useState<Pill[]>([]);
  const counterRef = useRef(0);
  const currentSkillRef = useRef(0);

  const spawnPill = useCallback(() => {
    const id = counterRef.current++;
    const skillIndex = currentSkillRef.current;
    currentSkillRef.current = (currentSkillRef.current + 1) % skills.length;
    setPills((prev) => [...prev, { id, skillIndex }]);
  }, []);

  const removePill = useCallback((id: number) => {
    setPills((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // First pill on mount
  useEffect(() => {
    const t = setTimeout(() => spawnPill(), 300);
    return () => clearTimeout(t);
  }, [spawnPill]);

  return (
    <div
      style={{
        background: "#0d0d0d",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace",
      }}
    >
      {/* Progress dots */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {skills.map((s, i) => {
          const active = pills.some((p) => p.skillIndex % skills.length === i);
          return (
            <motion.div
              key={s.label}
              animate={{
                background: active ? "#c94f4f" : "rgba(255,255,255,0.15)",
                scale: active ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{ width: 8, height: 8, borderRadius: "50%" }}
            />
          );
        })}
      </div>

      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ overflow: "visible" }}
      >
        {/* Arc */}
        <path
          d={`M ${START_X} ${NODE_Y - NODE_H / 2}
              Q ${(START_X + END_X) / 2} ${ARC_CTRL_Y}
                ${END_X} ${NODE_Y - NODE_H / 2}`}
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="6 4"
        />

        {/* Start node */}
        <rect
          x={START_X - NODE_W / 2} y={NODE_Y - NODE_H / 2}
          width={NODE_W} height={NODE_H} rx="10"
          fill="#111" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"
        />
        <text x={START_X} y={NODE_Y + 6}
          textAnchor="middle" fill="rgba(255,255,255,0.85)"
          fontSize="14" fontFamily="'Courier New', monospace">
          Start
        </text>

        {/* End node */}
        <rect
          x={END_X - NODE_W / 2} y={NODE_Y - NODE_H / 2}
          width={NODE_W} height={NODE_H} rx="10"
          fill="#111" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"
        />
        <text x={END_X} y={NODE_Y + 6}
          textAnchor="middle" fill="rgba(255,255,255,0.85)"
          fontSize="14" fontFamily="'Courier New', monospace">
          end
        </text>

        {/* Pills */}
        {pills.map((pill) => (
          <SkillPill
            key={pill.id}
            skillIndex={pill.skillIndex}
            onHalfway={spawnPill}
            onDone={() => removePill(pill.id)}
          />
        ))}
      </svg>

      {/* Active labels */}
      <AnimatePresence>
        <div style={{ display: "flex", gap: 16, marginTop: 20, minHeight: 20 }}>
          {pills.map((pill) => (
            <motion.span
              key={pill.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.4, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "'Courier New', monospace",
              }}
            >
              {skills[pill.skillIndex % skills.length].label}a
            </motion.span>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}