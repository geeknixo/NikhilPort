"use client"

import { useState, useEffect } from "react"
import { Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

function MinibotFace({ isExpanded, isLogoHovered, isLogoClicked, isSpeaking }: { isExpanded: boolean; isLogoHovered: boolean; isLogoClicked: boolean; isSpeaking: boolean }) {
  const [idleState, setIdleState] = useState<"neutral" | "blink" | "look-left" | "look-right">("neutral")

  useEffect(() => {
    // Idle animation loop that triggers every 2.5 seconds
    const interval = setInterval(() => {
      const rand = Math.random()
      if (rand < 0.6) {
        setIdleState("neutral")
      } else if (rand < 0.75) {
        setIdleState("blink")
        setTimeout(() => setIdleState("neutral"), 150) // Quick blink
      } else if (rand < 0.88) {
        setIdleState("look-left")
      } else {
        setIdleState("look-right")
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  let mood: "neutral" | "happy" | "excited" | "love" | "blink" | "look-left" | "look-right" | "speaking" = "neutral"

  if (isLogoClicked) {
    mood = "love"
  } else if (isSpeaking) {
    mood = "speaking"
  } else if (isLogoHovered) {
    mood = "excited"
  } else if (isExpanded) {
    mood = "happy"
  } else {
    mood = idleState
  }

  return (
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 flex-shrink-0">
      <defs>
        <linearGradient id="botCasing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
      
      {/* Bot Ears / Side Bolts */}
      <rect x="2" y="13" width="3" height="6" fill="#64748b" stroke="black" strokeWidth="1.5" rx="1" />
      <rect x="27" y="13" width="3" height="6" fill="#64748b" stroke="black" strokeWidth="1.5" rx="1" />
      
      {/* Top Antenna */}
      <rect x="15" y="1" width="2" height="4" fill="#000000" />
      <circle cx="16" cy="1" r="2.5" fill="#a855f7" className="animate-[pulse_1s_infinite]" />

      {/* Bot Head Casing (Glossy White/Gray Gradient) */}
      <circle cx="16" cy="16" r="12" fill="url(#botCasing)" stroke="black" strokeWidth="2.5" />
      
      {/* Inner Screen Display */}
      <rect x="8" y="9" width="16" height="12" rx="3.5" fill="#0f172a" stroke="black" strokeWidth="1.5" />

      {/* Mood Elements on Screen */}
      {mood === "neutral" && (
        <>
          {/* Cyan eyes */}
          <circle cx="12" cy="13" r="1.5" fill="#22d3ee" />
          <circle cx="20" cy="13" r="1.5" fill="#22d3ee" />
          {/* Neutral mouth */}
          <rect x="13" y="17.5" width="6" height="1.5" rx="0.75" fill="#22d3ee" />
        </>
      )}

      {mood === "blink" && (
        <>
          {/* Closed blinking eyes */}
          <line x1="10.5" y1="13" x2="13.5" y2="13" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18.5" y1="13" x2="21.5" y2="13" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
          {/* Neutral mouth */}
          <rect x="13" y="17.5" width="6" height="1.5" rx="0.75" fill="#22d3ee" />
        </>
      )}

      {mood === "look-left" && (
        <>
          {/* Eyes looking left */}
          <circle cx="10.5" cy="13" r="1.5" fill="#22d3ee" />
          <circle cx="18.5" cy="13" r="1.5" fill="#22d3ee" />
          {/* Neutral mouth shifted left */}
          <rect x="12" y="17.5" width="6" height="1.5" rx="0.75" fill="#22d3ee" />
        </>
      )}

      {mood === "look-right" && (
        <>
          {/* Eyes looking right */}
          <circle cx="13.5" cy="13" r="1.5" fill="#22d3ee" />
          <circle cx="21.5" cy="13" r="1.5" fill="#22d3ee" />
          {/* Neutral mouth shifted right */}
          <rect x="14" y="17.5" width="6" height="1.5" rx="0.75" fill="#22d3ee" />
        </>
      )}

      {mood === "happy" && (
        <>
          {/* Yellow smile eyes ^ ^ */}
          <path d="M10 14 Q12 11 14 14" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 14 Q20 11 22 14" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
          {/* Smile mouth */}
          <path d="M13 17.5 Q16 20 19 17.5" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}

      {mood === "excited" && (
        <>
          {/* Purple excited eyes */}
          <circle cx="12" cy="13" r="2" fill="#c084fc" />
          <circle cx="20" cy="13" r="2" fill="#c084fc" />
          <circle cx="12" cy="12" r="0.5" fill="white" />
          <circle cx="20" cy="12" r="0.5" fill="white" />
          {/* Happy open mouth */}
          <path d="M13 17 Q16 19.5 19 17 Z" fill="#c084fc" />
        </>
      )}

      {mood === "love" && (
        <>
          {/* Heart eyes */}
          <path d="M10 11.5 C10 10 12 10 12 11.5 C12 10 14 10 14 11.5 C14 13 12 14 12 14 C12 14 10 13 10 11.5 Z" fill="#ec4899" />
          <path d="M18 11.5 C18 10 20 10 20 11.5 C20 10 22 10 22 11.5 C22 13 20 14 20 14 C20 14 18 13 18 11.5 Z" fill="#ec4899" />
          {/* Kiss mouth */}
          <circle cx="16" cy="18" r="1.5" fill="#ec4899" />
        </>
      )}

      {mood === "speaking" && (
        <>
          {/* Cyan eyes */}
          <circle cx="12" cy="13" r="1.5" fill="#22d3ee" />
          <circle cx="20" cy="13" r="1.5" fill="#22d3ee" />
          {/* Speaking mouth: pulsing/growing circle */}
          <circle cx="16" cy="18" r="2.5" fill="#22d3ee" className="animate-[ping_0.8s_infinite] origin-center" style={{ transformOrigin: '16px 18px' }} />
          <circle cx="16" cy="18" r="2.0" fill="#22d3ee" />
        </>
      )}
    </svg>
  )
}

export function Navigation() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [isLogoClicked, setIsLogoClicked] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Speech helper function
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return

    window.speechSynthesis.cancel() // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text)

    // Select a cute female/assistant voice
    const voices = window.speechSynthesis.getVoices()
    const femaleVoice = voices.find(
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("google us english") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("hazel") ||
        v.lang.startsWith("en")
    )

    if (femaleVoice) {
      utterance.voice = femaleVoice
    }

    // Set pitch & speed for cute tiny bot/chotu voice
    utterance.pitch = 1.95 
    utterance.rate = 1.1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  // Welcome greeting & event listener setup
  useEffect(() => {
    // Speak custom requested text
    const handleSpeakEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ text: string }>
      if (customEvent.detail && customEvent.detail.text) {
        speakText(customEvent.detail.text)
      }
    }

    window.addEventListener("minibot-speak", handleSpeakEvent)

    // Trigger greeting on first user interaction anywhere
    let hasGreeted = false
    const triggerGreeting = () => {
      if (hasGreeted) return
      hasGreeted = true
      // Speak the welcome greeting
      speakText("Hi! I am Nikhil's personal assistant Gecko. How can I help you?")
      // Remove listeners so it only triggers once
      window.removeEventListener("click", triggerGreeting)
      window.removeEventListener("scroll", triggerGreeting)
      window.removeEventListener("mousemove", triggerGreeting)
    }

    window.addEventListener("click", triggerGreeting)
    window.addEventListener("scroll", triggerGreeting)
    window.addEventListener("mousemove", triggerGreeting)

    return () => {
      window.removeEventListener("minibot-speak", handleSpeakEvent)
      window.removeEventListener("click", triggerGreeting)
      window.removeEventListener("scroll", triggerGreeting)
      window.removeEventListener("mousemove", triggerGreeting)
    }
  }, [])

  useEffect(() => {
    if (isLogoClicked) {
      // Speak on direct bot click!
      speakText("Hello! Nice to meet you. I am Gecko, Nikhil's micro assistant bot!")
      const timer = setTimeout(() => {
        setIsLogoClicked(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isLogoClicked])

  const { t } = useLanguage()

  const links = [
    { label: t("about"), href: "#about" },
    { label: t("skills"), href: "#skills" },
    { label: t("projects"), href: "#portfolio" },
    { label: t("education"), href: "#education" },
  ]

  const springTransition = {
    type: "spring",
    stiffness: 350,
    damping: 26,
  }

  // Calculate animation class for playful bot movements
  let botAnimationClass = ""
  if (isLogoClicked) {
    botAnimationClass = "animate-shake"
  } else if (isSpeaking) {
    botAnimationClass = "animate-jump" // Bounce while speaking!
  } else if (isLogoHovered) {
    botAnimationClass = "animate-wiggle"
  } else if (isExpanded) {
    botAnimationClass = "animate-jump"
  }

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl flex justify-center pointer-events-none">
      <motion.nav
        layout
        onMouseEnter={() => {
          if (typeof window !== "undefined" && window.innerWidth >= 768) {
            setIsExpanded(true)
          }
        }}
        onMouseLeave={() => {
          if (typeof window !== "undefined" && window.innerWidth >= 768) {
            setIsExpanded(false)
          }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        transition={springTransition}
        className="pointer-events-auto flex flex-col md:flex-row md:items-center justify-between bg-white border-4 border-black rounded-[28px] md:rounded-[32px] px-4 py-2.5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden"
        style={{
          width: isExpanded ? "100%" : "255px",
        }}
      >
        {/* Top Row for mobile, standard flex child for desktop */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo and Permanent Name */}
          <div 
            className="flex items-center gap-2 flex-shrink-0 group"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onClick={(e) => {
              e.stopPropagation() // Don't collapse capsule on logo click
              setIsLogoClicked(true)
            }}
          >
            <motion.div
              layout
              className={`flex-shrink-0 ${botAnimationClass}`}
            >
              <MinibotFace 
                isExpanded={isExpanded} 
                isLogoHovered={isLogoHovered} 
                isLogoClicked={isLogoClicked} 
                isSpeaking={isSpeaking}
              />
            </motion.div>
            <motion.span 
              layout
              className="font-bold text-[14px] md:text-[15px] tracking-tight text-black whitespace-nowrap block pr-4 md:pr-6"
            >
              NIKHIL SHARMA
            </motion.span>
          </div>

          {/* Mobile indicator & Action items */}
          <div className="flex md:hidden items-center gap-2">
            {/* Animated Expand Indicator Arrow */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-7 h-7 flex items-center justify-center border-2 border-black rounded-full bg-yellow-400 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            >
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Links: Rendered with slide/fade animation only when expanded */}
        <div className="flex items-center justify-center flex-grow w-full md:w-auto">
          <AnimatePresence>
            {isExpanded && (
              <>
                {/* Desktop Menu */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="hidden md:flex items-center gap-2 relative"
                >
                  {links.map((link, idx) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="relative px-3 py-1 text-[14px] font-bold text-black transition-colors duration-200 z-10 hover:text-red-500 whitespace-nowrap"
                    >
                      <span className="relative z-10">{link.label}</span>
                      {hoveredIndex === idx && (
                        <motion.span
                          layoutId="nav-hover-pill-island"
                          className="absolute inset-0 bg-gray-100 border-2 border-black rounded-full -z-0"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  ))}
                </motion.div>

                {/* Mobile Menu */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex md:hidden flex-col items-stretch gap-2.5 w-full mt-3 pt-3 border-t-2 border-dashed border-black/20"
                >
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsExpanded(false)
                      }}
                      className="w-full text-center py-2.5 text-[15px] font-extrabold text-black bg-yellow-50 hover:bg-yellow-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Contact CTA - Desktop only */}
        <motion.div layout className="hidden md:flex flex-shrink-0">
          <a href="#contact">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="bg-black text-white hover:bg-black/90 border-2 border-black rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Mail className="w-4 h-4" />
            </motion.div>
          </a>
        </motion.div>
      </motion.nav>
    </div>
  )
}
