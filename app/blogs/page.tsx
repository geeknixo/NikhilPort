"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar, BookOpen, ArrowLeft, ArrowUpRight } from "lucide-react"
import { getBlogs, Blog } from "@/lib/data-store"

export default function BlogsList() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setBlogs(getBlogs())
  }, [])

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-8 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 bg-white dark:bg-zinc-900 text-black dark:text-white border-4 border-black dark:border-white font-extrabold text-sm py-2 px-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </button>
          
          <button 
            onClick={() => router.push("/admin")}
            className="text-xs font-black underline hover:text-[#a855f7] transition-colors"
          >
            Admin Panel 🔑
          </button>
        </div>

        {/* Title */}
        <div className="text-center py-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 leading-tight">
            Nikhil's <span className="bg-[#6366F1] text-white px-3 py-1 inline-block rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-xl">Developer Blog</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-sm md:text-base max-w-xl mx-auto mt-3">
            Articles and thoughts on Next.js, Three.js, Laravel, design guidelines, database systems, and MCA studies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs by title, summary or tag..."
            className="w-full bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-2xl pl-12 pr-4 py-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-3xl max-w-lg mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-extrabold text-gray-400 text-sm">No blogs matched your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredBlogs.map((blog) => (
              <div 
                key={blog.id}
                className={`flex flex-col justify-between bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] transition-all duration-300`}
              >
                <div className="space-y-4">
                  {/* Photo / Image placeholder layout */}
                  <div className="w-full h-40 bg-zinc-100 dark:bg-zinc-850 rounded-xl overflow-hidden border-2 border-black relative">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback image if user url fails
                        e.currentTarget.src = "/images/article-design-tools.png"
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-black text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6B6B]" /> {blog.date}
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <BookOpen className="w-3.5 h-3.5 text-[#2F81F7]" /> {blog.readTime}
                  </div>

                  <h2 className="text-lg font-black text-black dark:text-white leading-snug">
                    {blog.title}
                  </h2>

                  <p className="text-zinc-600 dark:text-zinc-400 text-xs font-semibold leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-gray-150 dark:border-zinc-800 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 2).map((t) => (
                      <span key={t} className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-350 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => router.push(`/blogs/${blog.id}`)}
                    className="bg-black dark:bg-white text-white dark:text-black border-2 border-black font-black text-xs py-1.5 px-3 rounded-lg flex items-center gap-1 hover:bg-[#FFC224] dark:hover:bg-[#FFC224] hover:text-black transition-colors"
                  >
                    Read <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}
