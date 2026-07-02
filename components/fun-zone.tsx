import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Map, Sparkles, Smile, Bomb, RefreshCw, Star } from "lucide-react"

export function FunZone() {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const markersGroupRef = useRef<any>(null)
  
  const [userPinned, setUserPinned] = useState(false)
  const [totalVisitors, setTotalVisitors] = useState(3065)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  
  // Easter Eggs State
  const [botClickCount, setBotClickCount] = useState(0)
  const [isPartyMode, setIsPartyMode] = useState(false)
  const [isSelfDestruct, setIsSelfDestruct] = useState(false)
  const [destructCountdown, setDestructCountdown] = useState(5)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; char: string }[]>([])

  // Geolocation Pinned Location
  const handlePinUserLocation = () => {
    if (userPinned) return
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          
          const L = (window as any).L
          if (L && leafletMapRef.current && markersGroupRef.current) {
            const map = leafletMapRef.current
            
            // Custom green pulsing indicator for actual user coordinate
            const userIcon = L.divIcon({
              className: "custom-leaflet-user-marker",
              html: `<span class="relative flex h-6 w-6">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-6 w-6 bg-green-500 border-2 border-white"></span>
                    </span>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            })

            L.marker([lat, lon], { icon: userIcon })
              .addTo(markersGroupRef.current)
              .bindPopup("<b>You are here! 📍</b><br/>Location pinned dynamically.")
              .openPopup()

            // Centering zoom view to client location
            map.flyTo([lat, lon], 7, { duration: 2.5 })
          }

          setUserPinned(true)
          setTotalVisitors(prev => prev + 1)
        },
        () => {
          alert("Could not access your location. Please check browser permissions.")
        }
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
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
      document.body.style.filter = "invert(100%)"
      setTimeout(() => {
        document.body.style.filter = "none"
        setIsSelfDestruct(false)
        setDestructCountdown(5)
      }, 2000)
    }
  }, [isSelfDestruct, destructCountdown])
  // Inject Leaflet CDN Assets dynamically
  useEffect(() => {
    if (typeof window === "undefined") return

    // Inject CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(link)

    // Inject JS
    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      setLeafletLoaded(true)
    }

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link)
      if (document.body.contains(script)) document.body.removeChild(script)
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  // Initialize Leaflet Map
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || leafletMapRef.current) return

    const L = (window as any).L
    if (!L) return

    // Initialize Map Instance
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 1.8,
      maxZoom: 18,
      scrollWheelZoom: false,
    })

    leafletMapRef.current = map

    // Choose dark/light theme tiles based on document classes
    const isDark = document.documentElement.classList.contains("dark")
    const tileUrl = isDark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"

    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    
    L.tileLayer(tileUrl, { attribution }).addTo(map)

    // Add Markers Layer Group
    const markersGroup = L.layerGroup().addTo(map)
    markersGroupRef.current = markersGroup

    // Default pins
    const defaultPins = [
      { lat: 28.6139, lon: 77.2090, city: "New Delhi, India", count: 1840 },
      { lat: 40.7128, lon: -74.0060, city: "New York, USA", count: 420 },
      { lat: 51.5074, lon: -0.1278, city: "London, UK", count: 310 },
      { lat: 35.6762, lon: 139.6503, city: "Tokyo, Japan", count: 185 },
      { lat: -33.8688, lon: 151.2093, city: "Sydney, Australia", count: 95 },
      { lat: 52.5200, lon: 13.4050, city: "Berlin, Germany", count: 215 },
    ]

    const customIcon = L.divIcon({
      className: "custom-leaflet-marker",
      html: `<span class="relative flex h-5 w-5">
              <span class="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]"></span>
            </span>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })

    defaultPins.forEach((pin) => {
      L.marker([pin.lat, pin.lon], { icon: customIcon })
        .addTo(markersGroup)
        .bindPopup(`<b>${pin.city}</b><br/>${pin.count} visits`)
    })
  }, [leafletLoaded])

  return (
    <section className="w-full py-16 md:py-24 border-t-4 border-black bg-[#FFFBEB] overflow-hidden">
      
      {/* Centered Heading */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-black flex items-center gap-2">
            <Map className="w-8 h-8 text-blue-500" />
            World Map of Visitors
          </h3>
          <div className="bg-[#E0E7FF] border-2 border-black px-4 py-1.5 rounded-full font-black text-sm text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            🌍 Global Visitors: {totalVisitors}
          </div>
        </div>
      </div>

      {/* Dynamic Leaflet Map Boxed inside Container */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative w-full h-[400px] md:h-[500px] border-4 border-black dark:border-white rounded-3xl bg-zinc-100 dark:bg-zinc-900 z-0 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>
        
        {/* Custom style overrides for Leaflet markers */}
        <style>{`
          .custom-leaflet-marker, .custom-leaflet-user-marker {
            background: transparent !important;
            border: none !important;
          }
          .leaflet-container {
            font-family: inherit;
          }
          .leaflet-popup-content-wrapper {
            border: 3px solid black !important;
            border-radius: 12px !important;
            box-shadow: 3px 3px 0px 0px rgba(0,0,0,1) !important;
            font-weight: 800;
          }
          .leaflet-popup-tip {
            border: 2px solid black !important;
          }
        `}</style>

      {/* Bottom CTA container */}
      <div className="container mx-auto px-4 max-w-7xl mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-4 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-sm font-bold text-gray-600 text-center sm:text-left">
            Click the button to fetch your location and mark yourself on Nikhil's global guest map!
          </p>
          <button
            onClick={handlePinUserLocation}
            disabled={userPinned}
            className={`font-black text-sm px-6 py-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0 ${
              userPinned
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-yellow-400 text-black hover:bg-yellow-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            }`}
          >
            {userPinned ? "📍 You Are Pinned!" : "Pin My Location! 📌"}
          </button>
        </div>
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
