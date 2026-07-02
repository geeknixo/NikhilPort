"use client"

import { useEffect, useState } from "react"
import { Mail, FolderOpen, Terminal, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThreeModelViewer } from "@/components/three-model-viewer"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

export function HeroSection() {
  const { t, language } = useLanguage()
  const [displayText, setDisplayText] = useState("")
  const fullText = t("subtitle")

  useEffect(() => {
    let index = 0
    setDisplayText("")
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [fullText, language])

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 mt-16 md:mt-20 relative overflow-hidden">
      
      {/* Top Floating Stickers (Left and Right of Navigation Capsule) - Absolute positioned to scroll with page */}
      <div className="absolute inset-x-0 top-0 pointer-events-none select-none z-49 hidden lg:block h-20">
        {/* Left Sticker */}
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.9}
          dragTransition={{ bounceStiffness: 80, bounceDamping: 12 }}
          className="absolute bg-[#F3E8FF] dark:bg-purple-950 border-3 border-black dark:border-white px-4 py-2.5 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)] flex items-center gap-2 text-purple-900 dark:text-purple-200 font-black text-sm pointer-events-auto select-none cursor-grab active:cursor-grabbing"
          style={{ left: "calc(50% - 370px)", top: "10px" }}
          animate={{
            y: [0, -6, 0],
            rotate: [-3, -1, -3],
          }}
          transition={{
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Terminal className="w-4 h-4 text-purple-700 dark:text-purple-300" /> DEV STUDIO
        </motion.div>

        {/* Right Sticker */}
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.9}
          dragTransition={{ bounceStiffness: 80, bounceDamping: 12 }}
          className="absolute bg-[#FEF3C7] dark:bg-amber-950 border-3 border-black dark:border-white px-4 py-2.5 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)] flex items-center gap-2 text-amber-800 dark:text-amber-200 font-black text-sm pointer-events-auto select-none cursor-grab active:cursor-grabbing"
          style={{ right: "calc(50% - 370px)", top: "10px" }}
          animate={{
            y: [0, 6, 0],
            rotate: [3, 1, 3],
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-300 animate-pulse" /> MCA FULL STACK
        </motion.div>
      </div>

      {/* Floating Hero Background Doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-30">
        {/* Large Sparkle Top Left */}
        <motion.div
          className="absolute text-yellow-400 font-bold text-4xl"
          style={{ left: "8%", top: "10%" }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.div>

        {/* Medium Sparkle Middle Right */}
        <motion.div
          className="absolute text-purple-400 font-bold text-3xl"
          style={{ right: "45%", top: "15%" }}
          animate={{
            y: [0, 15, 0],
            rotate: [360, 270, 180, 90, 0],
            scale: [1, 0.7, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.div>

        {/* Code Tag Symbol Left Center */}
        <motion.div
          className="absolute text-blue-500 font-mono text-xl font-black bg-[#E0F2FE] border-2 border-black p-2 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          style={{ left: "5%", top: "45%" }}
          animate={{
            y: [0, -10, 0],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          &lt;/&gt;
        </motion.div>

        {/* Curly Braces Bottom Left */}
        <motion.div
          className="absolute text-green-500 font-mono text-2xl font-black bg-[#DCFCE7] border-2 border-black p-2.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          style={{ left: "15%", bottom: "10%" }}
          animate={{
            x: [0, 10, 0],
            y: [0, -12, 0],
            rotate: [15, -15, 15],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          &#123; &#125;
        </motion.div>

        {/* Plus Symbol Top Right (behind 3D model) */}
        <motion.div
          className="absolute text-[#FF6B6B] text-4xl font-extrabold"
          style={{ right: "12%", top: "8%" }}
          animate={{
            rotate: [0, 360],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          +
        </motion.div>

        {/* Small Dot Grid Decorative Pattern Bottom Right */}
        <div className="absolute right-[5%] bottom-[15%] opacity-40">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-black">
            <circle cx="10" cy="10" r="2" fill="currentColor" />
            <circle cx="30" cy="10" r="2" fill="currentColor" />
            <circle cx="50" cy="10" r="2" fill="currentColor" />
            <circle cx="10" cy="30" r="2" fill="currentColor" />
            <circle cx="30" cy="30" r="2" fill="currentColor" />
            <circle cx="50" cy="30" r="2" fill="currentColor" />
            <circle cx="10" cy="50" r="2" fill="currentColor" />
            <circle cx="30" cy="50" r="2" fill="currentColor" />
            <circle cx="50" cy="50" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.3fr_0.7fr] lg:grid-cols-[1.4fr_0.6fr] gap-8 md:gap-12 items-center relative z-10">
        <div className="space-y-6">
          <h1 className="text-[32px] leading-[42px] sm:text-[45px] sm:leading-[55px] md:text-[54px] lg:text-[72px] font-bold md:leading-[65px] lg:leading-[85px] tracking-tight">
            {t("im")} <span className="bg-[#FF6B7A] text-white px-2.5 py-0.5 inline-block rounded-lg md:rounded-none">{t("nikhil")}</span>
            <span className="inline-block md:whitespace-nowrap">
              , {t("a")}{" "}
              <span className="bg-[#2F81F7] text-white px-2.5 py-0.5 inline-block rounded-lg md:rounded-none">{t("dev")}</span>
            </span>
          </h1>

          <div className="min-h-[40px] flex items-center">
            <h2 className="text-lg md:text-2xl font-bold text-gray-700 tracking-wide font-mono">
              {displayText}
              <span className="animate-[pulse_1s_infinite] ml-1">|</span>
            </h2>
          </div>

          <p className="text-[#393939] text-[15px] md:text-[18px] font-medium leading-[25px] md:leading-[30px] max-w-xl">
            {t("desc")}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 pt-2">
            <a href="#portfolio" className="w-full sm:w-auto">
              <Button className="glass-btn-shimmer bg-[#2F81F7]/80 text-black border-4 border-black hover:bg-[#2F81F7]/95 rounded-xl py-4 px-6 md:py-[22px] md:px-[62px] text-base md:text-lg font-black h-auto w-full sm:w-auto sm:min-w-[220px] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all duration-150">
                <FolderOpen className="w-5 h-5 mr-2" />
                {t("viewProjects")}
              </Button>
            </a>
            <a href="/cv/NikhilCV (1).pdf" download className="w-full sm:w-auto">
              <Button
                className="glass-btn-shimmer bg-[#FFC224]/80 text-black border-4 border-black hover:bg-[#FFC224]/95 rounded-xl py-4 px-6 md:py-[22px] md:px-[62px] text-base md:text-lg font-black h-auto w-full sm:w-auto sm:min-w-[220px] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all duration-150"
              >
                <Mail className="w-5 h-5 mr-2" />
                {t("downloadCV")}
              </Button>
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
          <div className="relative w-full max-w-[320px] sm:max-w-md aspect-square bg-[#FDB927] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <ThreeModelViewer />
          </div>
        </div>
      </div>
    </section>
  )
}
