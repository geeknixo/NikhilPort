"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Globe, Check } from "lucide-react"
import { useLanguage, type Language } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeLangControls() {
  const { language, setLanguage } = useLanguage()
  const [isLangOpen, setIsLangOpen] = useState(false)

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-3 pointer-events-auto">
      {/* Language Selector Button & Dropdown */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="w-12 h-12 flex items-center justify-center bg-blue-400 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          aria-label="Select language"
        >
          <Globe className="w-5 h-5 text-black" />
        </motion.button>

        <AnimatePresence>
          {isLangOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -8 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-zinc-900 border-4 border-black rounded-2xl p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-3 py-1 border-b-2 border-dashed border-black/10 dark:border-white/10 mb-1">
                Choose Language
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsLangOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-black rounded-xl text-left transition-colors cursor-pointer ${
                    language === lang.code
                      ? "bg-yellow-100 dark:bg-yellow-950 text-black dark:text-yellow-200 border-2 border-black"
                      : "hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-2 border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {language === lang.code && <Check className="w-4 h-4 text-black dark:text-yellow-200" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
