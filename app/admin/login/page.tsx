"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, ShieldAlert, ArrowLeft } from "lucide-react"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "admin" && password === "password123") {
      localStorage.setItem("is_admin_auth", "true")
      router.push("/admin")
    } else {
      setError("Invalid username or password!")
    }
  }

  return (
    <main className="min-h-screen bg-[#FEF3C7] dark:bg-zinc-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      {/* Return to Portfolio button */}
      <button 
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white text-black border-4 border-black font-extrabold text-sm py-2 px-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Website
      </button>

      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        {/* Decorative corner tag */}
        <div className="absolute -top-5 -right-3 bg-[#FF6B7A] text-black border-2 border-black font-extrabold text-xs px-3 py-1 rounded-md rotate-[12deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          SECURE PORTAL 🔒
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex p-4 bg-[#FFC224] border-4 border-black rounded-full mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Lock className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-black dark:text-white">Admin Headquarters</h1>
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">
            Access credentials to manage blogs & messages.
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border-2 border-red-500 text-red-700 font-extrabold text-xs rounded-xl p-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-black dark:text-white mb-1.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-purple-500" /> Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white border-4 border-black dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-black dark:text-white mb-1.5 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-blue-500" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white border-4 border-black dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#10b981] hover:bg-[#10b981]/95 text-black border-4 border-black font-black rounded-xl py-3 flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-sm uppercase"
            >
              Access Dashboard 🚀
            </button>
          </div>
        </form>

        <div className="mt-6 text-center border-t-2 border-dashed border-gray-200 dark:border-zinc-800 pt-4">
          <p className="text-[10px] font-bold text-gray-400">
            Hint: Use username <code className="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-red-500">admin</code> & password <code className="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-red-500">password123</code>
          </p>
        </div>
      </div>
    </main>
  )
}
