"use client"

import React, { useState } from "react"
import { Linkedin, Mail, Phone, Send, User, FileText, MessageSquare, Sparkles, ChevronDown, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { addSubmission } from "@/lib/data-store"
import { motion } from "framer-motion"

export function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Save submission to database store
    addSubmission(formData)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 1200)
  }

  return (
    <footer id="contact" className="w-full bg-[#18181b] text-white py-16 md:py-24 border-t-4 border-black dark:border-white relative overflow-hidden">
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Let's Connect */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-16 h-16 rounded-2xl bg-[#FF6B6B] border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <Mail className="w-8 h-8 text-black" />
              </motion.div>
              <h3 className="text-2xl md:text-4xl font-black text-white leading-tight">
                Let's Build Something Great Together!
              </h3>
            </div>
            
            <p className="text-zinc-450 font-bold text-base leading-relaxed">
              Have a project in mind, looking for a full-stack engineer, or just want to say hi? Drop a message here!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.a
                whileHover={{ y: -5, scale: 1.02, rotate: -1 }}
                href="mailto:nikhil.sharma@example.com"
                className="glass-btn-shimmer flex-1 bg-[#FF6B7A]/80 text-black hover:bg-[#FF6B7A]/95 rounded-[12px] py-3.5 px-4 text-center text-sm font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none transition-all duration-100"
              >
                Email Me
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.02, rotate: 1 }}
                href="tel:+916377414779"
                className="glass-btn-shimmer flex-1 bg-[#FFC224]/80 text-black hover:bg-[#FFC224]/95 rounded-[12px] py-3.5 px-4 text-center text-sm font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none transition-all duration-100"
              >
                Call Me
              </motion.a>
            </div>

            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02, rotate: -0.5 }}
                className="bg-black/45 border-2 border-dashed border-zinc-700 rounded-2xl p-4 flex items-center gap-3 shadow-[3px_3px_0px_rgba(255,255,255,0.05)] cursor-default"
              >
                <span className="text-2xl animate-pulse">⚡</span>
                <div>
                  <h4 className="text-sm font-black text-white">Fast Response Guaranteed</h4>
                  <p className="text-xs text-zinc-400 font-bold">Responses typically sent within 2-4 hours</p>
                </div>
              </motion.div>

              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-zinc-500 tracking-wider">Connect on Socials</h4>
                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ y: -4, scale: 1.03, rotate: -1 }}
                    href="https://github.com/geeknixo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white hover:bg-zinc-150 text-black border-2 border-black font-extrabold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -4, scale: 1.03, rotate: 1 }}
                    href="https://linkedin.com/in/ns5762/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0077b5] hover:bg-[#0077b5]/95 text-white border-2 border-white font-extrabold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,119,181,0.3)] hover:shadow-none transition-all"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inline Contact Form */}
          <div className="lg:col-span-7 bg-black border-4 border-white rounded-[24px] p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] relative overflow-hidden">
            {submitted ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 px-4 bg-zinc-900 border-2 border-white rounded-xl"
              >
                <div className="inline-flex p-3 bg-green-400 border-2 border-black rounded-full mb-3 animate-bounce">
                  <Send className="w-6 h-6 text-black" />
                </div>
                <h4 className="text-xl font-black text-white mb-2">Message Dispatched!</h4>
                <p className="text-zinc-400 text-sm font-medium max-w-sm mx-auto">
                  Thanks for reaching out! Your message was received successfully. I'll response back soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold underline text-[#FF6B7A] hover:text-[#FF6B7A]/80 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="group">
                    <label className="block text-xs font-black text-white mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#FF6B7A] group-hover:scale-110 transition-transform" /> Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-zinc-900 text-white border-2 border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-[#FFC224] focus:ring-1 focus:ring-[#FFC224] outline-none transition-all placeholder:text-zinc-650 hover:border-zinc-500"
                    />
                  </div>
                  {/* Email */}
                  <div className="group">
                    <label className="block text-xs font-black text-white mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#FFC224] group-hover:scale-110 transition-transform" /> Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full bg-zinc-900 text-white border-2 border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-[#FFC224] focus:ring-1 focus:ring-[#FFC224] outline-none transition-all placeholder:text-zinc-650 hover:border-zinc-500"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="group">
                  <label className="block text-xs font-black text-white mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-450 group-hover:scale-110 transition-transform" /> Required Service
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full appearance-none bg-zinc-900 text-white border-2 border-zinc-700 rounded-xl pl-4 pr-10 py-2.5 text-sm font-bold focus:border-[#FFC224] focus:ring-1 focus:ring-[#FFC224] outline-none transition-all cursor-pointer hover:border-zinc-500"
                    >
                      <option value="" disabled className="text-zinc-600">Select a service...</option>
                      <option value="Web Development Service" className="text-white">Web Development Service</option>
                      <option value="App Development Service" className="text-white">App Development Service</option>
                      <option value="Testing Service" className="text-white">Testing Service</option>
                      <option value="Graphic Design Service" className="text-white">Graphic Design Service</option>
                      <option value="Full Stack Apps Service" className="text-white">Full Stack Apps Service</option>
                      <option value="iOS Service" className="text-white">iOS Service</option>
                      <option value="UI/UX Design Service" className="text-white">UI/UX Design Service</option>
                      <option value="SEO Optimization Service" className="text-white">SEO Optimization Service</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label className="block text-xs font-black text-white mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-green-400" /> Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="What's on your mind?..."
                    className="w-full bg-zinc-900 text-white border-2 border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-[#FFC224] focus:ring-1 focus:ring-[#FFC224] outline-none transition-all placeholder:text-zinc-650 hover:border-zinc-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="glass-btn-shimmer w-full bg-[#10b981]/80 hover:bg-[#12a172] text-black font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[1.5px_1.5px_0px_rgba(255,255,255,1)] hover:translate-x-[2.5px] hover:translate-y-[2.5px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-60 transition-all text-sm uppercase"
                >
                  <Send className="w-4 h-4 animate-pulse" />
                  {isSubmitting ? "Transmitting..." : "Send Message"}
                </motion.button>
              </form>
            )}
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl border-t border-zinc-800 pt-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white flex items-center justify-center border-2 border-black">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <span className="text-lg md:text-xl font-bold">Nikhil Sharma</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Full Stack Web Developer & MCA student specializing in Next.js, Laravel, and building high-performance web applications.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">
                  Education
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Availability</h3>
            <p className="text-gray-400 text-sm mb-4">
              Available for full-time roles, freelance tasks, and technical consulting.
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Accepting Projects
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-zinc-800/50 pt-8 text-xs text-zinc-500 font-bold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Nikhil Sharma. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <span className="text-[#FF6B6B]">❤️</span> & React
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes warning-stripes {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
      `}</style>
    </footer>
  )
}
