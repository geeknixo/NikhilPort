"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, ArrowRight } from "lucide-react"

export function WelcomeToast() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcomeToast")
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem("hasSeenWelcomeToast", "true")
  }

  const handleExplore = () => {
    handleDismiss()
    const portfolioSection = document.getElementById("portfolio")
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-[100] w-[90%] max-w-sm pointer-events-auto"
        >
          <div className="bg-[#FFFBEB] border-4 border-black rounded-2xl p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute -top-1 -left-1 bg-purple-500 text-white border-2 border-black font-extrabold text-[10px] px-2 py-0.5 uppercase tracking-wider rounded-tl-xl rounded-br-xl flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Sparkles className="w-3 h-3" />
              Welcome
            </div>

            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 bg-white border-2 border-black rounded-full p-1 hover:bg-red-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              aria-label="Dismiss welcome message"
            >
              <X className="w-4 h-4 text-black" />
            </button>

            <div className="mt-2 flex items-start gap-4">
              <div className="flex-shrink-0 bg-yellow-400 border-2 border-black rounded-full p-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="9" width="16" height="12" rx="3.5" fill="#0f172a" stroke="black" strokeWidth="1.5" />
                  <path d="M10 14 Q12 11 14 14" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M18 14 Q20 11 22 14" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M13 17.5 Q16 20 19 17.5" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-lg text-black leading-tight">
                  Welcome!
                </h4>
                <p className="text-sm font-bold text-gray-800 leading-snug">
                  Welcome to my portfolio! I am Nikhil Sharma, a Full Stack Developer. Let us build something awesome together!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 pt-2 border-t-2 border-dashed border-black/10">
              <button
                onClick={handleExplore}
                className="flex-grow flex items-center justify-center gap-2 bg-[#2F81F7] text-white font-extrabold text-sm py-2 px-4 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleDismiss}
                className="bg-white text-black font-extrabold text-sm py-2 px-4 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                Skip
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
