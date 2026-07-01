"use client"

import { useEffect, useState, useRef } from "react"

interface Particle {
  id: number
  x: number
  y: number
  iconIdx: number
  life: number // 1.0 down to 0
  vx: number
  vy: number
  angle: number
}

const ICONS = [
  // JS (Yellow Badge)
  <div key="js" className="w-7 h-7 bg-[#f7df1e] border-2 border-black flex items-center justify-center font-black text-[11px] text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rounded-sm">JS</div>,
  // Next.js (Black/White N)
  <div key="next" className="w-7 h-7 bg-black border-2 border-black flex items-center justify-center font-bold text-[11px] text-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rounded-full">N</div>,
  // TS (Blue TS Badge)
  <div key="ts" className="w-7 h-7 bg-[#3178c6] border-2 border-black flex items-center justify-center font-black text-[11px] text-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rounded-sm">TS</div>,
  // React (Atom)
  <div key="react" className="w-7 h-7 bg-[#20232a] border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rounded-full">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin" style={{ animationDuration: '6s' }}>
      <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(30 12 12)" stroke="#61dafb" strokeWidth="2.5" />
      <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(90 12 12)" stroke="#61dafb" strokeWidth="2.5" />
      <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(150 12 12)" stroke="#61dafb" strokeWidth="2.5" />
    </svg>
  </div>,
  // HTML (Orange Shield)
  <div key="html" className="w-7 h-7 bg-[#e34f26] border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rounded-sm">
    <span className="font-extrabold text-[10px] text-white">H5</span>
  </div>,
  // CSS (Blue Shield)
  <div key="css" className="w-7 h-7 bg-[#1572b6] border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rounded-sm">
    <span className="font-extrabold text-[10px] text-white">C3</span>
  </div>,
  // Three.js (Cube/3D symbol)
  <div key="three" className="w-7 h-7 bg-purple-500 border-2 border-black flex items-center justify-center font-bold text-[10px] text-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rounded-sm">3D</div>,
]

export function NeoCursor() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isVisible, setIsVisible] = useState(false)
  
  const lastPosRef = useRef({ x: -100, y: -100 })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)")
    if (!mediaQuery.matches) return

    setIsVisible(true)

    const updatePosition = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e

      // Calculate distance from last particle spawn
      const dx = x - lastPosRef.current.x
      const dy = y - lastPosRef.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Spawn a new particle if cursor moved more than 20 pixels
      if (dist > 20) {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x,
          y,
          iconIdx: Math.floor(Math.random() * ICONS.length),
          life: 1.0,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 0.8 - 0.2, // Drift upward
          angle: Math.random() * 40 - 20, // Random rotation angle
        }

        particlesRef.current.push(newParticle)
        lastPosRef.current = { x, y }
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Animation frame to update and decay particles
    let animId: number
    const updateParticles = () => {
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.035, // Decay rate (lasts ~450ms)
        }))
        .filter((p) => p.life > 0)

      setParticles([...particlesRef.current])
      animId = requestAnimationFrame(updateParticles)
    }
    animId = requestAnimationFrame(updateParticles)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      cancelAnimationFrame(animId)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Render trailing particles only, preserving the system's default cursor */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: p.life,
            transform: `translate(-50%, -50%) scale(${p.life}) rotate(${p.angle}deg)`,
          }}
        >
          {ICONS[p.iconIdx]}
        </div>
      ))}
    </>
  )
}
