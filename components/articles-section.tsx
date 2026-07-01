"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Github, Monitor, BookOpen, Send, Star, GitFork, ArrowUpRight, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

type TabType = "gecko" | "github" | "setup" | "blog"

export function ArticlesSection() {
  const [activeTab, setActiveTab] = useState<TabType>("gecko")

  // --- GECKO CHAT STATE ---
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "gecko"; text: string }[]>([
    { sender: "gecko", text: "Hi! I am Gecko. Ask me anything about Nikhil by clicking the options below!" }
  ])
  const [chatLoading, setChatLoading] = useState(false)

  const qaOptions = [
    { 
      question: "Are you available for freelance work?", 
      answer: "Yes, Nikhil is open to freelance projects and remote full-time positions. You can connect with him directly on WhatsApp!" 
    },
    { 
      question: "What is your main programming stack?", 
      answer: "Nikhil's primary stack includes Next.js, React, Node.js, TypeScript, and MongoDB for frontend, combined with Laravel, PHP, and MySQL for robust backends." 
    },
    { 
      question: "Tell me about your SIH Hackathon experience?", 
      answer: "Nikhil led student developer teams at the Smart India Hackathon (SIH), building solutions under tight deadlines and coordinating database integrations." 
    },
    { 
      question: "How did you build this 3D model viewer?", 
      answer: "The 3D Bee is rendered using Three.js and TDSLoader in React, with custom glossy metal shaders and OrbitControls damping for smooth user dragging." 
    }
  ]

  const handleAskGecko = (question: string, answer: string) => {
    if (chatLoading) return
    
    // Add user message
    setChatMessages((prev) => [...prev, { sender: "user", text: question }])
    setChatLoading(true)

    // Simulate bot thinking and reply
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "gecko", text: answer }])
      setChatLoading(false)
      
      // Dispatch speak event to make the minibot speak!
      window.dispatchEvent(
        new CustomEvent("minibot-speak", {
          detail: { text: answer }
        })
      )
    }, 800)
  }

  // --- GITHUB REPOS DATA ---
  const githubRepos = [
    {
      name: "MF-SIP-CRM",
      desc: "A client relationship manager for mutual fund data, SIP tracking, and admin dashboard reporting.",
      stars: 14,
      forks: 3,
      lang: "PHP / Laravel",
      color: "bg-[#2F81F7]"
    },
    {
      name: "royal-rentals-platform",
      desc: "Luxury car rental web application with Stripe payments integration, reservation management, and booking panels.",
      stars: 18,
      forks: 6,
      lang: "React / Node.js",
      color: "bg-[#FFC224]"
    },
    {
      name: "3d-bee-interactive",
      desc: "Three.js implementation of 3D object rendering with custom textures, lighting pivots, and spring orbit physics.",
      stars: 12,
      forks: 2,
      lang: "TypeScript / Canvas",
      color: "bg-[#FF6B6B]"
    },
    {
      name: "woodcrafted-ecommerce",
      desc: "Sophisticated wooden furniture showcase website with advanced product catalogs, shopping lists, and checkout layouts.",
      stars: 15,
      forks: 4,
      lang: "Next.js / PostgreSQL",
      color: "bg-[#6366F1]"
    }
  ]

  // --- TECH SETUP DATA ---
  const setupItems = [
    { title: "Operating System", desc: "Windows 11 Home", color: "bg-[#2F81F7]", colSpan: "col-span-1" },
    { title: "Processor / CPU", desc: "AMD Ryzen 5 (High Efficiency)", color: "bg-[#FF6B6B]", colSpan: "col-span-1" },
    { title: "Graphic Card", desc: "NVIDIA GeForce RTX 3050", color: "bg-[#FFC224]", colSpan: "col-span-2" },
    { title: "Code Editor", desc: "VS Code (Tokyo Night / Outfit Font)", color: "bg-[#6366F1]", colSpan: "col-span-2" },
    { title: "Terminal Shell", desc: "Oh My Posh + PowerShell Core", color: "bg-[#c084fc]", colSpan: "col-span-1" },
    { title: "Favorite Libraries", desc: "Framer Motion, Three.js, Tailwind CSS", color: "bg-[#10b981]", colSpan: "col-span-1" }
  ]

  // --- DEV ARTICLES DATA ---
  const articlesList = [
    {
      title: "Optimizing 3D loaders in Next.js using Three.js and TDSLoader",
      excerpt: "Learn how to bypass coordinate rendering lags and configure glossy shaders for 3DS model structures in React web systems.",
      date: "Jun 2026",
      readTime: "5 min read",
      tags: ["Three.js", "Next.js"],
      color: "border-[#FF6B6B]"
    },
    {
      title: "Building scalable CRM architectures with Laravel and MySQL",
      excerpt: "Step-by-step logic building tips for managing mutual fund investments, automated SIP updates, and admin dashboard panels.",
      date: "May 2026",
      readTime: "8 min read",
      tags: ["Laravel", "PHP", "MySQL"],
      color: "border-[#2F81F7]"
    },
    {
      title: "Spring physics and layouts: A guide to Framer Motion dynamic navigation",
      excerpt: "How to design custom bounciness parameters and layoutId capsules that scale instantly with zero browser layout shifts.",
      date: "Apr 2026",
      readTime: "6 min read",
      tags: ["Framer Motion", "React"],
      color: "border-[#FFC224]"
    }
  ]

  return (
    <section id="dev-hub" className="container mx-auto px-4 py-10 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Nikhil's <span className="bg-[#a855f7] text-white px-3 py-1 inline-block">Developer Sandbox</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Interact with my assistant bot, explore my coding setup, review my git repositories, or read my technical writeups.
          </p>
        </div>

        {/* Tab Switcher - Neo-Brutalist Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab("gecko")}
            className={`flex items-center gap-2 border-4 border-black px-5 py-2.5 rounded-full font-bold text-sm md:text-base transition-all ${
              activeTab === "gecko" 
                ? "bg-[#10b981] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1" 
                : "bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Talk with Gecko
          </button>
          <button
            onClick={() => setActiveTab("github")}
            className={`flex items-center gap-2 border-4 border-black px-5 py-2.5 rounded-full font-bold text-sm md:text-base transition-all ${
              activeTab === "github" 
                ? "bg-[#FFC224] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1" 
                : "bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            <Github className="w-4 h-4" />
            Git Repos
          </button>
          <button
            onClick={() => setActiveTab("setup")}
            className={`flex items-center gap-2 border-4 border-black px-5 py-2.5 rounded-full font-bold text-sm md:text-base transition-all ${
              activeTab === "setup" 
                ? "bg-[#FF6B6B] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1" 
                : "bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            <Monitor className="w-4 h-4" />
            Tech Setup
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 border-4 border-black px-5 py-2.5 rounded-full font-bold text-sm md:text-base transition-all ${
              activeTab === "blog" 
                ? "bg-[#6366F1] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1" 
                : "bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Dev Blog
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white border-4 border-black rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl mx-auto min-h-[380px] flex flex-col justify-between">
          
          {/* TAB 1: GECKO CHAT */}
          {activeTab === "gecko" && (
            <div className="flex flex-col gap-6 h-full justify-between flex-grow">
              {/* Chat Log Window */}
              <div className="bg-gray-950 border-4 border-black rounded-2xl p-4 md:p-6 text-white font-mono h-64 overflow-y-auto flex flex-col gap-4 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.8)]">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                    <span className={`text-xs ${msg.sender === "user" ? "text-blue-400" : "text-[#10b981]"}`}>
                      {msg.sender === "user" ? "You" : "Gecko"}
                    </span>
                    <p className={`p-2.5 rounded-xl border-2 border-black max-w-[85%] mt-1 text-sm ${
                      msg.sender === "user" 
                        ? "bg-[#2F81F7] text-white rounded-tr-none" 
                        : "bg-[#1f2937] text-gray-100 rounded-tl-none"
                    }`}>
                      {msg.text}
                    </p>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 animate-pulse">
                    <Terminal className="w-3.5 h-3.5" />
                    Gecko is compiling response...
                  </div>
                )}
              </div>

              {/* Chat Options */}
              <div>
                <span className="block font-bold text-sm text-gray-600 mb-3 uppercase tracking-wider">Select a question for Gecko:</span>
                <div className="grid sm:grid-cols-2 gap-3">
                  {qaOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAskGecko(opt.question, opt.answer)}
                      disabled={chatLoading}
                      className="text-left bg-white border-2 border-black p-3 rounded-xl font-bold text-xs md:text-sm text-black hover:bg-gray-50 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {opt.question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GITHUB REPOS */}
          {activeTab === "github" && (
            <div className="grid md:grid-cols-2 gap-6 flex-grow">
              {githubRepos.map((repo, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border-4 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-gray-400">niksharma / repos</span>
                      <span className={`text-[10px] font-black border-2 border-black px-2 py-0.5 rounded-md ${repo.color} text-black`}>
                        {repo.lang}
                      </span>
                    </div>
                    <h3 className="font-black text-lg md:text-xl text-black flex items-center gap-1.5 mb-2 hover:text-[#FFC224] transition-colors cursor-pointer">
                      <Github className="w-4 h-4" />
                      {repo.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed mb-4">
                      {repo.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t-2 border-black pt-3 mt-auto">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {repo.stars}</span>
                      <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> {repo.forks}</span>
                    </div>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black border-b-2 border-black flex items-center gap-0.5">
                      Code <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: TECH SETUP */}
          {activeTab === "setup" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
              {setupItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between ${item.color} ${item.colSpan}`}
                >
                  <span className="text-[10px] font-mono font-bold text-black/60 uppercase tracking-wider">{item.title}</span>
                  <p className="font-black text-sm md:text-base text-black mt-2 leading-tight">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: DEV BLOG */}
          {activeTab === "blog" && (
            <div className="space-y-6 flex-grow">
              {articlesList.map((art, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white border-4 border-black rounded-2xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-[12px] ${art.color}`}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      {art.tags.map((t, i) => (
                        <span key={i} className="text-[10px] font-black bg-gray-100 border border-black px-2 py-0.5 rounded text-black">
                          {t}
                        </span>
                      ))}
                      <span className="text-xs text-gray-500 font-bold ml-2">{art.date}</span>
                    </div>
                    <h3 className="font-black text-base md:text-lg text-black hover:text-[#6366F1] cursor-pointer transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 border-black/10 pt-3 md:pt-0">
                    <span className="text-[11px] font-mono text-gray-400 font-bold">{art.readTime}</span>
                    <span className="text-xs font-bold text-black border-b-2 border-black flex items-center gap-0.5 cursor-pointer">
                      Read Post <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
