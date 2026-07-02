"use client"

import { Calendar, Download, Send, CheckCircle2, Zap, Clock, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HireMeSection() {
  const qualities = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500 group-hover:animate-bounce" />,
      title: "Fast & Performance Focused",
      description: "I build websites using Next.js and Laravel that load instantly, score high on lighthouse, and offer unmatched user experience.",
      hoverBg: "hover:bg-[#FFFBEB] dark:hover:bg-amber-950/20",
      accent: "group-hover:border-yellow-400"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500 group-hover:animate-spin" />,
      title: "Clean & Maintainable Code",
      description: "My code follows industry standards (OOP, design patterns) making it clean, self-documenting, and easy to scale in the future.",
      hoverBg: "hover:bg-[#EFF6FF] dark:hover:bg-blue-950/20",
      accent: "group-hover:border-blue-400"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-green-500 group-hover:rotate-12 transition-transform" />,
      title: "Problem Solver & Tech Savvy",
      description: "As an MCA postgrad student, I possess strong database (DBMS) and data structure skills to solve complex backend problems easily.",
      hoverBg: "hover:bg-[#ECFDF5] dark:hover:bg-emerald-950/20",
      accent: "group-hover:border-green-400"
    },
  ]

  const differences = [
    {
      label: "Full-Stack Control",
      detail: "From pixel-perfect frontends to robust databases and secure APIs - I handle everything under one roof.",
      bg: "bg-[#E0E7FF]",
      hoverBg: "hover:bg-[#C7D2FE]",
      shadow: "shadow-[4px_4px_0px_0px_rgba(99,102,241,1)]"
    },
    {
      label: "Modern Tech Stack",
      detail: "I don't build legacy code. I use modern frameworks like Next.js 15, React 19, Tailwind v4, and Laravel.",
      bg: "bg-[#FEF3C7]",
      hoverBg: "hover:bg-[#FDE68A]",
      shadow: "shadow-[4px_4px_0px_0px_rgba(245,158,11,1)]"
    },
  ]

  return (
    <section id="hire-me" className="w-full py-16 md:py-24 border-t-4 border-black dark:border-white bg-white dark:bg-zinc-950 relative overflow-hidden">
      
      {/* Decorative Shifting Background elements */}
      <div className="absolute top-10 left-10 w-44 h-44 bg-[#E0E7FF]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#FFECEF]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <motion.div 
            whileHover={{ scale: 1.08, rotate: -2 }}
            className="bg-[#4ADE80] text-black border-2 border-black font-extrabold text-sm px-4.5 py-2 rounded-full uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-5 inline-flex items-center gap-2.5 cursor-default hover:bg-green-300 transition-colors"
          >
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-600"></span>
            </span>
            Availability: Ready to Work
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white leading-tight max-w-3xl">
            Why Work With Me & <span className="bg-[#6366F1] text-white px-4 py-2 inline-block rotate-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-2xl relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
              What Makes Me Different
            </span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Why Hire Me & Difference */}
          <div className="lg:col-span-7 space-y-10 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white flex items-center gap-2">
                <Star className="w-7 h-7 text-[#FFC224] animate-spin-slow" /> Why Hire Me?
              </h3>
              <div className="grid gap-6">
                {qualities.map((item, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                    className={`flex gap-4 p-5 bg-gray-50 dark:bg-zinc-900 border-4 border-black dark:border-white rounded-2xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:border-black dark:hover:border-yellow-400 transition-all cursor-default group ${item.hoverBg}`}
                  >
                    <div className="flex-shrink-0 bg-white dark:bg-zinc-950 border-2 border-black dark:border-white rounded-xl p-2.5 h-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-black dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-350 text-sm md:text-base font-semibold leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-purple-500 animate-pulse" /> What Makes Me Different?
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {differences.map((diff, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ y: -8, scale: 1.03, rotate: index % 2 === 0 ? -1 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`p-6 border-4 border-black dark:border-white rounded-2xl transition-all cursor-default ${diff.bg} ${diff.hoverBg} text-black ${diff.shadow}`}
                  >
                    <h4 className="font-black text-xl mb-2">{diff.label}</h4>
                    <p className="text-gray-800 text-sm font-extrabold leading-relaxed">{diff.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Let's Work Together & Action CTAs */}
          <motion.div 
            whileHover={{ scale: 1.008 }}
            className="lg:col-span-5 flex flex-col justify-between p-8 bg-[#FFECEF] dark:bg-zinc-900 border-4 border-black dark:border-white rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden"
          >
            <div className="space-y-6 pt-0">
              <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white leading-tight">
                Let's Build Something Great Together! 🚀
              </h3>
              <p className="text-gray-800 dark:text-gray-350 text-base font-extrabold leading-relaxed">
                Whether you need a custom web application, an e-commerce platform, or a developer to join your engineering team, I am ready to jump in and bring value.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 group">
                  <motion.div whileHover={{ scale: 1.2, rotate: 360 }} className="w-6.5 h-6.5 rounded-md bg-[#4ADE80] border-2 border-black flex items-center justify-center font-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] text-black select-none cursor-pointer">✓</motion.div>
                  <span className="text-black dark:text-white font-extrabold text-sm group-hover:translate-x-1 transition-transform">Full-time opportunities</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <motion.div whileHover={{ scale: 1.2, rotate: 360 }} className="w-6.5 h-6.5 rounded-md bg-[#4ADE80] border-2 border-black flex items-center justify-center font-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] text-black select-none cursor-pointer">✓</motion.div>
                  <span className="text-black dark:text-white font-extrabold text-sm group-hover:translate-x-1 transition-transform">Freelance & Contract projects</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <motion.div whileHover={{ scale: 1.2, rotate: 360 }} className="w-6.5 h-6.5 rounded-md bg-[#4ADE80] border-2 border-black flex items-center justify-center font-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] text-black select-none cursor-pointer">✓</motion.div>
                  <span className="text-black dark:text-white font-extrabold text-sm group-hover:translate-x-1 transition-transform">Remote & Hybrid models</span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-8 space-y-4">
              {/* Hire Me CTA (WhatsApp/Direct Mail) */}
              <a href="https://wa.me/916377414779" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="glass-btn-shimmer w-full bg-[#10b981]/80 hover:bg-[#12a172] text-black border-4 border-black font-black rounded-2xl py-6 text-lg h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:translate-x-[2.5px] hover:translate-y-[2.5px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 uppercase">
                  <Send className="w-5 h-5 mr-2 animate-[pulse_1s_infinite]" />
                  Hire Me / Let's Talk
                </Button>
              </a>

              {/* Schedule a Call (Form / Calendly fallback) */}
              <a href="#contact" className="block w-full">
                <Button className="glass-btn-shimmer w-full bg-[#2F81F7]/80 hover:bg-[#206cd2] text-white border-4 border-black font-black rounded-2xl py-6 text-lg h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:translate-x-[2.5px] hover:translate-y-[2.5px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 uppercase">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Button>
              </a>

              {/* Download Resume */}
              <a href="/cv/NikhilCV (1).pdf" download className="block w-full">
                <Button className="glass-btn-shimmer w-full bg-[#FFC224]/80 hover:bg-[#eab308] text-black border-4 border-black font-black rounded-2xl py-6 text-lg h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:translate-x-[2.5px] hover:translate-y-[2.5px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 uppercase">
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume / CV
                </Button>
              </a>
            </div>

          </motion.div>

        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes warning-stripes {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </section>
  )
}
