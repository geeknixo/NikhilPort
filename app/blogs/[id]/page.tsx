"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Calendar, BookOpen, ArrowLeft, Tag, Share2, MessageSquare } from "lucide-react"
import { getBlogs, Blog } from "@/lib/data-store"

export default function BlogReader() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const blogs = getBlogs()
    const found = blogs.find((b) => b.id === id)
    setBlog(found || null)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center font-bold">
        Accessing database logs...
      </div>
    )
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white border-4 border-black p-8 rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-2xl font-black">404: Article Not Found 🚫</h1>
          <p className="text-sm font-semibold text-gray-500">The blog post identifier does not match any entry in our registry.</p>
          <button
            onClick={() => router.push("/blogs")}
            className="bg-[#FFC224] text-black border-2 border-black font-extrabold text-sm py-2 px-5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px]"
          >
            Return to Listing
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-8 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation row */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push("/blogs")}
            className="flex items-center gap-2 bg-white dark:bg-zinc-900 text-black dark:text-white border-4 border-black dark:border-white font-extrabold text-sm py-2 px-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> All Blogs
          </button>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: blog.title,
                  url: window.location.href
                }).catch(() => {})
              } else {
                navigator.clipboard.writeText(window.location.href)
                alert("Article URL copied to clipboard! 📋")
              }
            }}
            className="p-2 border-2 border-black dark:border-white rounded-xl bg-white dark:bg-zinc-900 text-black dark:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-[1px]"
            title="Share article link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Article Cover Box */}
        <div className="relative w-full h-[220px] md:h-[350px] bg-zinc-100 dark:bg-zinc-900 rounded-[32px] overflow-hidden border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src = "/images/article-design-tools.png"
            }}
          />
        </div>

        {/* Content Box */}
        <article className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-black text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5 bg-[#FEF3C7] text-black border border-black px-2.5 py-1 rounded-md uppercase">
              <Calendar className="w-3.5 h-3.5" /> {blog.date}
            </span>
            <span className="flex items-center gap-1.5 bg-[#E0F2FE] text-black border border-black px-2.5 py-1 rounded-md uppercase">
              <BookOpen className="w-3.5 h-3.5" /> {blog.readTime}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-4xl font-black text-black dark:text-white leading-tight">
            {blog.title}
          </h1>

          {/* Tag Badges */}
          <div className="flex flex-wrap gap-2 pb-4 border-b-2 border-dashed border-gray-200 dark:border-zinc-800">
            {blog.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 bg-[#D1FAE5] text-black border border-black px-2.5 py-1 rounded-full text-xs font-extrabold">
                <Tag className="w-3 h-3 text-emerald-600" /> #{tag}
              </span>
            ))}
          </div>

          {/* Content Body */}
          <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 font-medium text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-wrap">
            {blog.content}
          </div>

          {/* Bottom CTA Block */}
          <div className="mt-12 bg-[#FFECEF] dark:bg-zinc-950/60 border-4 border-black dark:border-zinc-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-black text-black dark:text-white text-base">Have feedback or a project idea?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs font-semibold">Ping me or write directly using the footer contact form!</p>
            </div>
            <button
              onClick={() => router.push("/#contact")}
              className="bg-[#FF6B7A] text-black hover:bg-[#FF6B7A]/95 border-2 border-black font-black text-xs py-2.5 px-4 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] active:translate-y-[2px]"
            >
              Get in Touch ✉️
            </button>
          </div>
        </article>

      </div>
    </main>
  )
}
