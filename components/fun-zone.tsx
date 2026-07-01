"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Map, Sparkles, Smile, Bomb, RefreshCw, Star } from "lucide-react"

interface Pin {
  x: number; // percentage
  y: number; // percentage
  city: string;
  count: number;
}

export function FunZone() {
  // Visitors Map State
  const [pins, setPins] = useState<Pin[]>([
    { x: 72, y: 48, city: "New Delhi, India", count: 1840 },
    { x: 25, y: 35, city: "New York, USA", count: 420 },
    { x: 48, y: 30, city: "London, UK", count: 310 },
    { x: 82, y: 38, city: "Tokyo, Japan", count: 185 },
    { x: 88, y: 78, city: "Sydney, Australia", count: 95 },
    { x: 54, y: 34, city: "Berlin, Germany", count: 215 },
  ])
  const [userPinned, setUserPinned] = useState(false)
  const [totalVisitors, setTotalVisitors] = useState(3065)
  const [hoveredPin, setHoveredPin] = useState<Pin | null>(null)
  
  // Easter Eggs State
  const [botClickCount, setBotClickCount] = useState(0)
  const [isPartyMode, setIsPartyMode] = useState(false)
  const [isSelfDestruct, setIsSelfDestruct] = useState(false)
  const [destructCountdown, setDestructCountdown] = useState(5)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; char: string }[]>([])

  // Geolocation Pinned Location
  const handlePinUserLocation = () => {
    if (userPinned) return
    
    // Default fallback coordinates for user pin (near central India)
    const newPin: Pin = { x: 70, y: 52, city: "You (Local Visitor)", count: 1 }
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success: simulate a slight offset based on coordinates
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          // Simple mapping from lat/lon to map % (very rough but fun)
          const x = Math.min(Math.max(((lon + 180) / 360) * 100, 5), 95)
          const y = Math.min(Math.max(((90 - lat) / 180) * 100, 5), 95)
          
          const geoPin = { x, y, city: "Your Location 📍", count: 1 }
          setPins(prev => [...prev, geoPin])
        },
        () => {
          // Fallback
          setPins(prev => [...prev, newPin])
        }
      )
    } else {
      setPins(prev => [...prev, newPin])
    }

    // Fire emoji particles
    spawnParticles(50, 50, "🎉")
    setUserPinned(true)
    setTotalVisitors(prev => prev + 1)
  }

  // Particle Emitter for Easter Eggs
  const spawnParticles = (clientX: number, clientY: number, emoji = "⭐") => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: clientX + (Math.random() - 0.5) * 200,
      y: clientY + (Math.random() - 0.5) * 200,
      char: emoji,
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
    }, 1000)
  }

  // Easter Egg 1: Do a barrel roll
  const handleBarrelRoll = () => {
    const body = document.body
    body.style.transition = "transform 1s ease-in-out"
    body.style.transform = "rotate(360deg)"
    setTimeout(() => {
      body.style.transform = "none"
    }, 1000)
    spawnParticles(window.innerWidth / 2, window.innerHeight / 2, "🌀")
  }

  // Easter Egg 2: Party Mode
  useEffect(() => {
    if (isPartyMode) {
      const interval = setInterval(() => {
        const colors = ["#FFECEF", "#E0F2FE", "#FCE7F3", "#E0E7FF", "#FEF3C7", "#DCFCE7"]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        document.body.style.backgroundColor = randomColor
      }, 500)
      return () => {
        clearInterval(interval)
        document.body.style.backgroundColor = "#FFFFFF"
      }
    }
  }, [isPartyMode])

  // Easter Egg 3: Self Destruct Simulation
  useEffect(() => {
    if (isSelfDestruct && destructCountdown > 0) {
      const timer = setTimeout(() => {
        setDestructCountdown(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isSelfDestruct && destructCountdown === 0) {
      // "Explosion" effects
      document.body.style.filter = "invert(100%)"
      setTimeout(() => {
        document.body.style.filter = "none"
        setIsSelfDestruct(false)
        setDestructCountdown(5)
      }, 2000)
    }
  }, [isSelfDestruct, destructCountdown])

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 border-t-4 border-black bg-[#FFFBEB]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Card: World Map of Visitors */}
        <div className="lg:col-span-12 bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl md:text-3xl font-black text-black flex items-center gap-2">
                <Map className="w-8 h-8 text-blue-500" />
                World Map of Visitors
              </h3>
              <div className="bg-[#E0E7FF] border-2 border-black px-4 py-1.5 rounded-full font-black text-sm text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                🌍 Global Visitors: {totalVisitors}
              </div>
            </div>

            {/* Interactive World Map SVG Background */}
            <div className="relative w-full aspect-[2/1] bg-[#F1F5F9] border-4 border-black rounded-2xl overflow-hidden mt-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {/* Simplified dotted/abstract world representation */}
              <div className="absolute inset-0 opacity-20 bg-[url('/map/worldmap.png')] bg-cover bg-center"></div>
              
              {/* Map Outline Lines */}
              <svg className="w-full h-full text-gray-300 stroke-gray-300 fill-none" viewBox="0 0 100 50">
                {/* Americas */}
                <path d="M10,10 C15,8 20,15 25,25 C30,35 25,45 20,48" strokeWidth="0.5" strokeDasharray="1,1" />
                {/* Eurasia & Africa */}
                <path d="M45,8 C55,5 75,10 80,18 C85,25 78,40 70,45" strokeWidth="0.5" strokeDasharray="1,1" />
                <path d="M42,20 C48,22 55,30 52,42 C50,48 45,45 42,40" strokeWidth="0.5" strokeDasharray="1,1" />
                {/* Australia */}
                <path d="M82,38 C88,40 92,45 88,48 C85,45 80,40 82,38" strokeWidth="0.5" strokeDasharray="1,1" />
              </svg>

              {/* Pulsing Pin Markers */}
              {pins.map((pin, index) => (
                <div
                  key={index}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  onMouseEnter={() => setHoveredPin(pin)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-black"></span>
                  </span>

                  {/* Tooltip */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-[11px] font-black py-1 px-2.5 rounded border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                    {pin.city} ({pin.count} visits)
                  </div>
                </div>
              ))}

              {/* Float Active Location Info Overlay */}
              {hoveredPin && (
                <div className="absolute bottom-4 left-4 bg-white border-2 border-black rounded-lg p-2 font-bold text-xs text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  📍 {hoveredPin.city}: <span className="text-red-500">{hoveredPin.count} views</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-bold text-gray-600 text-center sm:text-left">
              Click the button to fetch your location and mark yourself on Nikhil's global guest map!
            </p>
            <button
              onClick={handlePinUserLocation}
              disabled={userPinned}
              className={`font-black text-sm px-6 py-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                userPinned
                  ? "bg-gray-150 text-gray-500 cursor-not-allowed shadow-none translate-x-[2px] translate-y-[2px]"
                  : "bg-yellow-400 text-black hover:bg-yellow-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              }`}
            >
              {userPinned ? "📍 You Are Pinned!" : "Pin My Location! 📌"}
            </button>
          </div>
        </div>

        {/* Right Card: Fun Easter Eggs Zone (Commented out)
        <div className="lg:col-span-4 bg-[#FFECEF] border-4 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-black mb-4 flex items-center gap-2">
              <Smile className="w-8 h-8 text-pink-500" />
              Easter Eggs! 🥚
            </h3>
            <p className="text-sm font-bold text-gray-700 leading-relaxed mb-6">
              Interactive mini-features built purely for fun. Try clicking these toggles to trigger site-wide effects!
            </p>

            <div className="space-y-4">
              <button
                onClick={handleBarrelRoll}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-black rounded-xl hover:bg-sky-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all font-black text-sm text-black"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-sky-500" />
                  Do a Barrel Roll!
                </span>
                <span className="bg-sky-100 text-sky-800 text-[10px] px-2 py-0.5 rounded border border-black">360°</span>
              </button>

              <button
                onClick={(e) => {
                  setIsPartyMode(!isPartyMode)
                  spawnParticles(e.clientX, e.clientY, "⚡")
                }}
                className={`w-full flex items-center justify-between p-4 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all font-black text-sm text-black ${
                  isPartyMode ? "bg-purple-300" : "bg-white hover:bg-purple-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-500 animate-spin" />
                  Party Mode
                </span>
                <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded border border-black">
                  {isPartyMode ? "ON" : "OFF"}
                </span>
              </button>

              <button
                onClick={(e) => {
                  setIsSelfDestruct(true)
                  spawnParticles(e.clientX, e.clientY, "💥")
                }}
                disabled={isSelfDestruct}
                className={`w-full flex items-center justify-between p-4 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all font-black text-sm text-black ${
                  isSelfDestruct ? "bg-red-300 text-black cursor-not-allowed shadow-none" : "bg-white hover:bg-red-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Bomb className="w-5 h-5 text-red-500" />
                  Self-Destruct
                </span>
                <span className="bg-red-100 text-red-800 text-[10px] px-2 py-0.5 rounded border border-black">
                  {isSelfDestruct ? `${destructCountdown}s` : "ACTIVATE"}
                </span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs font-black text-gray-500 uppercase tracking-widest">
            Made with React & Framer Motion
          </div>
        </div>
        */}

      </div>

      {/* Floating particles renderer */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: p.x - 50, y: p.y - 50 }}
            animate={{ opacity: 0, scale: 1.5, y: p.y - 150 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed pointer-events-none text-3xl z-[9999]"
            style={{ left: p.x, top: p.y }}
          >
            {p.char}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Self Destruct Overlay Screen */}
      <AnimatePresence>
        {isSelfDestruct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-950/90 z-[99999] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-white font-black text-6xl md:text-9xl mb-4"
            >
              {destructCountdown > 0 ? destructCountdown : "BOOM! 💥"}
            </motion.div>
            <div className="text-red-500 font-extrabold text-lg uppercase tracking-widest animate-pulse">
              SYSTEM SELF DESTRUCT SEQUENCE ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
