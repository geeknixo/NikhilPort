"use client"

import { Calendar, Download, Send, CheckCircle2, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HireMeSection() {
  const qualities = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Fast & Performance Focused",
      description: "I build websites using Next.js and Laravel that load instantly, score high on lighthouse, and offer unmatched user experience.",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Clean & Maintainable Code",
      description: "My code follows industry standards (OOP, design patterns) making it clean, self-documenting, and easy to scale in the future.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
      title: "Problem Solver & Tech Savvy",
      description: "As an MCA postgrad student, I possess strong database (DBMS) and data structure skills to solve complex backend problems easily.",
    },
  ]

  const differences = [
    {
      label: "Full-Stack Control",
      detail: "From pixel-perfect frontends to robust databases and secure APIs - I handle everything under one roof.",
    },
    {
      label: "Modern Tech Stack",
      detail: "I don't build legacy code. I use modern frameworks like Next.js 15, React 19, Tailwind v4, and Laravel.",
    },
  ]

  return (
    <section id="hire-me" className="container mx-auto px-4 py-16 md:py-24 border-t-4 border-black bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="bg-[#4ADE80] text-black border-2 border-black font-extrabold text-sm px-4 py-1 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4 inline-flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Availability: Ready to Work
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-black leading-tight max-w-3xl">
            Why Work With Me & <span className="bg-[#6366F1] text-white px-3 py-1 inline-block rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-xl">What Makes Me Different</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Why Hire Me & Difference */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-black">Why Hire Me?</h3>
              <div className="grid gap-6">
                {qualities.map((item, index) => (
                  <div key={index} className="flex gap-4 p-5 bg-gray-50 border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex-shrink-0 bg-white border-2 border-black rounded-xl p-2.5 h-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg text-black mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm md:text-base font-medium">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-2xl font-black text-black">What Makes Me Different?</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {differences.map((diff, index) => (
                  <div key={index} className="p-5 bg-[#FEF3C7] border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h4 className="font-black text-lg text-black mb-1">{diff.label}</h4>
                    <p className="text-gray-700 text-sm font-bold">{diff.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Let's Work Together & Action CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-[#FFECEF] border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B6B]/10 rounded-full translate-x-8 -translate-y-8 pointer-events-none"></div>
            
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
                Let's Build Something Great Together! 🚀
              </h3>
              <p className="text-gray-800 text-base font-bold leading-relaxed">
                Whether you need a custom web application, an e-commerce platform, or a developer to join your engineering team, I am ready to jump in and bring value.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-400 border-2 border-black rounded-full flex items-center justify-center font-extrabold text-xs">✓</div>
                  <span className="text-black font-bold text-sm">Full-time opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-400 border-2 border-black rounded-full flex items-center justify-center font-extrabold text-xs">✓</div>
                  <span className="text-black font-bold text-sm">Freelance & Contract projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-400 border-2 border-black rounded-full flex items-center justify-center font-extrabold text-xs">✓</div>
                  <span className="text-black font-bold text-sm">Remote & Hybrid models</span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-8 space-y-4">
              {/* Hire Me CTA (WhatsApp/Direct Mail) */}
              <a href="https://wa.me/916377414779" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="w-full bg-[#10b981] text-black border-4 border-black hover:bg-[#10b981]/95 rounded-2xl py-6 text-lg font-black h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                  <Send className="w-5 h-5 mr-2" />
                  Hire Me / Let's Talk
                </Button>
              </a>

              {/* Schedule a Call (Form / Calendly fallback) */}
              <a href="#contact" className="block w-full">
                <Button className="w-full bg-[#2F81F7] text-white border-4 border-black hover:bg-[#2F81F7]/95 rounded-2xl py-6 text-lg font-black h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Button>
              </a>

              {/* Download Resume */}
              <a href="/cv/NikhilCV (1).pdf" download className="block w-full">
                <Button className="w-full bg-[#FFC224] text-black border-4 border-black hover:bg-[#FFC224]/95 rounded-2xl py-6 text-lg font-black h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume / CV
                </Button>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
