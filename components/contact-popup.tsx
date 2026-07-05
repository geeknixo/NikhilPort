"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  User,
  Mail,
  FileText,
  MessageSquare,
  Terminal,
  Code2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addSubmission } from "@/lib/data-store";

export function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Auto-open popup 3.5 seconds after visiting the website
    const autoOpenTimer = setTimeout(() => {
      setIsOpen(true);
      setSubmitted(false);
    }, 3500);

    const handleOpen = () => {
      setIsOpen(true);
      setSubmitted(false);
    };
    window.addEventListener("open-contact-popup", handleOpen);
    return () => {
      clearTimeout(autoOpenTimer);
      window.removeEventListener("open-contact-popup", handleOpen);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save submission to database store
    addSubmission(formData);

    // Simulate UI-only submission success
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="group relative w-full max-w-md bg-white dark:bg-zinc-900 bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:12px_12px] border-4 border-black dark:border-white rounded-3xl p-5 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] overflow-visible transition-shadow duration-300 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)]"
          >
            {/* Tech Doodles background decoration container */}
            <div className="absolute inset-0 pointer-events-none overflow-visible hidden md:block">
              {/* Doodle 1: Code Brackets */}
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [-15, -12, -15] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -left-12 w-20 h-20 text-pink-500 dark:text-pink-400 opacity-90 group-hover:scale-125 transition-all duration-300"
              >
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <path d="M30 20 L10 50 L30 80 M70 20 L90 50 L70 80" />
                  <path d="M55 15 L45 85" strokeDasharray="4 4" />
                </svg>
              </motion.div>

              {/* Doodle 2: Circuit Trace */}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-10 -left-12 w-24 h-24 text-indigo-500 dark:text-indigo-400 opacity-80 group-hover:text-purple-400 group-hover:-translate-y-2 transition-all duration-300"
              >
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="w-full h-full"
                >
                  <circle cx="20" cy="20" r="4.5" fill="currentColor" />
                  <path d="M20 20 L50 20 L65 45 L90 45" />
                  <circle cx="90" cy="45" r="4.5" fill="currentColor" />
                  <path d="M50 20 L50 70 L30 90" />
                  <circle cx="30" cy="90" r="4.5" fill="currentColor" />
                </svg>
              </motion.div>

              {/* Doodle 3: Sketchy Gear */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute -top-12 -right-12 w-24 h-24 text-yellow-500 dark:text-yellow-400 opacity-90 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300"
              >
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="w-full h-full"
                >
                  <circle cx="50" cy="50" r="20" />
                  <path d="M50 15 L50 30 M50 70 L50 85 M15 50 L30 50 M70 50 L85 50 M25 25 L36 36 M64 64 L75 75 M75 25 L64 36 M36 64 L25 75" />
                </svg>
              </motion.div>

              {/* Doodle 4: Comic Arrow pointing to Submit */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-12 -right-10 w-20 h-20 text-green-500 dark:text-green-400 rotate-[45deg] opacity-95 group-hover:translate-x-2 group-hover:scale-115 transition-all duration-300"
              >
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <path d="M10 50 Q40 20 80 40" />
                  <path d="M60 45 L80 40 L82 20" />
                  <text
                    x="5"
                    y="85"
                    fill="currentColor"
                    fontSize="12"
                    fontWeight="black"
                    className="font-sans rotate-[-45deg] select-none"
                  >
                    SEND IT!
                  </text>
                </svg>
              </motion.div>

              {/* Doodle 5: Cyber Stars / Sparkles */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="absolute top-[40%] -right-8 text-[#FF6B7A] w-10 h-10 opacity-80 group-hover:text-yellow-300 transition-all duration-300"
              >
                <Sparkles className="w-full h-full" />
              </motion.div>

              {/* Doodle 6: Cloud/DB sketch */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[35%] -left-12 text-cyan-500 w-14 h-14 opacity-80 rotate-[-10deg] group-hover:rotate-[5deg] transition-all duration-300"
              >
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="w-full h-full"
                >
                  <ellipse cx="50" cy="30" rx="30" ry="10" />
                  <path d="M20 30 V50 C20 60 80 60 80 50 V30" />
                  <path d="M20 50 V70 C20 80 80 80 80 70 V50" />
                  <line x1="30" y1="28" x2="30" y2="70" strokeDasharray="3 3" />
                  <line x1="70" y1="28" x2="70" y2="70" strokeDasharray="3 3" />
                </svg>
              </motion.div>

              {/* Doodle 7: Plus Sign */}
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute top-[15%] left-[45%] text-purple-400/40 w-5 h-5 opacity-40"
              >
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="w-full h-full"
                >
                  <line x1="50" y1="10" x2="50" y2="90" />
                  <line x1="10" y1="50" x2="90" y2="50" />
                </svg>
              </motion.div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-[110] cursor-pointer p-1.5 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:rotate-90 duration-300 pointer-events-auto"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-4 flex items-center gap-2.5 group-hover:translate-x-1.5 transition-transform duration-300">
              <div className="p-2 bg-[#FFC224] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#FF6B7A] transition-colors duration-300">
                <Terminal className="w-5 h-5 text-black" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-black dark:text-white flex items-center gap-1.5">
                  Send a Ping!{" "}
                  <span className="animate-[bounce_1s_infinite]">📡</span>
                </h2>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Fill details below to reach out.
                </p>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 px-4 bg-green-100 dark:bg-green-950/40 border-4 border-black dark:border-green-400 rounded-2xl"
              >
                <div className="inline-flex p-3 bg-green-400 border-2 border-black rounded-full mb-3">
                  <Code2 className="w-6 h-6 text-black animate-[pulse_1s_infinite]" />
                </div>
                <h3 className="text-xl font-black text-black dark:text-white mb-1">
                  Message Sent!
                </h3>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 max-w-sm mx-auto">
                  Thank you! Message received. I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 bg-[#FF6B7A] text-black border-4 border-black font-black px-5 py-2 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-sm"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name */}
                <div className="relative">
                  <label className="block text-xs font-extrabold text-black dark:text-white mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-500" /> Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(168,85,247,1)] focus:-translate-y-[1px] dark:focus:shadow-[4px_4px_0px_0px_rgba(168,85,247,1)] outline-none hover:border-purple-400 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-xs font-extrabold text-black dark:text-white mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-500" /> Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="name@example.com"
                    className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] focus:-translate-y-[1px] dark:focus:shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] outline-none hover:border-blue-400 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Service Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-extrabold text-black dark:text-white mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-yellow-500" /> Required Service
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full appearance-none bg-white dark:bg-zinc-950 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] focus:-translate-y-[1px] dark:focus:shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] outline-none hover:border-yellow-400 transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select a service...</option>
                      <option value="Web Development Service">Web Development Service</option>
                      <option value="App Development Service">App Development Service</option>
                      <option value="Testing Service">Testing Service</option>
                      <option value="Graphic Design Service">Graphic Design Service</option>
                      <option value="Full Stack Apps Service">Full Stack Apps Service</option>
                      <option value="iOS Service">iOS Service</option>
                      <option value="UI/UX Design Service">UI/UX Design Service</option>
                      <option value="SEO Optimization Service">SEO Optimization Service</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-black dark:text-white">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label className="block text-xs font-extrabold text-black dark:text-white mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-green-500" />{" "}
                    Message
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Write details here..."
                    className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] focus:-translate-y-[1px] dark:focus:shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] outline-none hover:border-green-400 transition-all placeholder:text-gray-400 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glass-btn-shimmer w-full bg-[#10b981]/80 hover:bg-[#10b981]/95 text-black border-2 border-black font-black rounded-lg py-2.5 flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-60 transition-all text-sm mt-2"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Transmitting..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
