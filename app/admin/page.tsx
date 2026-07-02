"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Users, Eye, Mail, BookOpen, LogOut, FileText, Send, Trash2, Code2, PlusCircle, ArrowLeft, Edit
} from "lucide-react"
import { 
  getBlogs, addBlog, deleteBlog, 
  getSubmissions, deleteSubmission, 
  getVisitorStats, Blog, Submission,
  syncBlogsGlobal, syncSubmissionsGlobal, fetchLiveUsersGlobal,
  updateBlog
} from "@/lib/data-store"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<"messages" | "create-blog" | "manage-blogs">("messages")

  // Database States
  const [blogsList, setBlogsList] = useState<Blog[]>([])
  const [submissionsList, setSubmissionsList] = useState<Submission[]>([])
  const [stats, setStats] = useState({ totalVisitors: 124, liveUsers: 3 })

  // New Blog Form States
  const [blogTitle, setBlogTitle] = useState("")
  const [blogExcerpt, setBlogExcerpt] = useState("")
  const [blogContent, setBlogContent] = useState("")
  const [blogTags, setBlogTags] = useState("")
  const [blogImage, setBlogImage] = useState("")
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setBlogImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Form submission feedback
  const [feedbackMsg, setFeedbackMsg] = useState("")

  // Verify auth on mount
  useEffect(() => {
    const auth = localStorage.getItem("is_admin_auth")
    if (auth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      refreshData()
    }
  }, [router])

  // Poll stats and submissions every 5 seconds to show live changes!
  useEffect(() => {
    if (!isAuthenticated) return
    
    // Query immediately on load
    syncLiveUsers()
    syncSubmissionsGlobal((subs) => setSubmissionsList(subs))

    function syncLiveUsers() {
      fetchLiveUsersGlobal((liveCount) => {
        setStats((prev) => ({ ...prev, liveUsers: liveCount }))
      })
    }

    const interval = setInterval(() => {
      // Read local base stats
      setStats(getVisitorStats())
      // Sync actual live heartbeats
      syncLiveUsers()
      // Sync new submissions globally
      syncSubmissionsGlobal((subs) => setSubmissionsList(subs))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAuthenticated])

  const refreshData = () => {
    setBlogsList(getBlogs())
    setSubmissionsList(getSubmissions())
    setStats(getVisitorStats())

    // Real-time synchronization from KVDB global store
    syncBlogsGlobal((blogs) => setBlogsList(blogs))
    syncSubmissionsGlobal((subs) => setSubmissionsList(subs))
  }

  const handleLogout = () => {
    localStorage.removeItem("is_admin_auth")
    router.push("/admin/login")
  }

  const handleDeleteSubmission = (id: string) => {
    deleteSubmission(id)
    refreshData()
  }

  const handleDeleteBlog = (id: string) => {
    deleteBlog(id)
    refreshData()
  }

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Parse tags from comma separated string
    const tagsArray = blogTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    // Fallback default image if empty
    const imgUrl = blogImage.trim() || "/images/article-design-tools.png"

    if (editingBlogId) {
      updateBlog(editingBlogId, {
        title: blogTitle,
        excerpt: blogExcerpt,
        content: blogContent,
        tags: tagsArray,
        image: imgUrl,
      })
      setFeedbackMsg("Blog post updated successfully! 🚀")
      setEditingBlogId(null)
    } else {
      addBlog({
        title: blogTitle,
        excerpt: blogExcerpt,
        content: blogContent,
        tags: tagsArray,
        image: imgUrl,
      })
      setFeedbackMsg("Blog post published successfully! 🎉")
    }

    setBlogTitle("")
    setBlogExcerpt("")
    setBlogContent("")
    setBlogTags("")
    setBlogImage("")
    
    refreshData()

    setTimeout(() => {
      setFeedbackMsg("")
      setActiveTab("manage-blogs")
    }, 2000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center font-bold">
        Loading admin environment...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-8 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push("/")}
              className="p-2 border-2 border-black rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-black dark:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black">Nikhil's Admin Control Deck</h1>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Manage site statistics, submissions and articles.</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="bg-[#FF6B7A] text-black hover:bg-[#FF6B7A]/90 border-4 border-black font-extrabold text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Lifetime Visitors */}
          <div className="bg-[#FEF3C7] text-black border-4 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
            <div className="p-3 bg-white border-2 border-black rounded-xl">
              <Eye className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-wider text-gray-500">Lifetime Visitors</p>
              <p className="text-2xl font-black">{stats.totalVisitors}</p>
            </div>
          </div>

          {/* Simulated Live Users */}
          <div className="bg-[#E0F2FE] text-black border-4 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
            <div className="p-3 bg-white border-2 border-black rounded-xl relative">
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-wider text-gray-500">Live Active Users</p>
              <p className="text-2xl font-black">{stats.liveUsers} Online</p>
            </div>
          </div>

          {/* Form Submissions */}
          <div className="bg-[#F3E8FF] text-black border-4 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
            <div className="p-3 bg-white border-2 border-black rounded-xl">
              <Mail className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-wider text-gray-500">Total Inbox Messages</p>
              <p className="text-2xl font-black">{submissionsList.length}</p>
            </div>
          </div>

          {/* Published Blogs */}
          <div className="bg-[#D1FAE5] text-black border-4 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
            <div className="p-3 bg-white border-2 border-black rounded-xl">
              <BookOpen className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-wider text-gray-500">Published Articles</p>
              <p className="text-2xl font-black">{blogsList.length}</p>
            </div>
          </div>
        </div>

        {/* Tab Controls / Navigation */}
        <div className="flex flex-wrap border-b-4 border-black dark:border-white gap-2">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-6 py-3 font-extrabold text-sm rounded-t-2xl border-t-4 border-x-4 border-black dark:border-white transition-all -mb-[4px] z-10 ${
              activeTab === "messages"
                ? "bg-white dark:bg-zinc-900 text-black dark:text-white border-b-4 border-b-white dark:border-b-zinc-900"
                : "bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-100"
            }`}
          >
            Form Submissions ({submissionsList.length})
          </button>
          <button
            onClick={() => setActiveTab("create-blog")}
            className={`px-6 py-3 font-extrabold text-sm rounded-t-2xl border-t-4 border-x-4 border-black dark:border-white transition-all -mb-[4px] z-10 ${
              activeTab === "create-blog"
                ? "bg-white dark:bg-zinc-900 text-black dark:text-white border-b-4 border-b-white dark:border-b-zinc-900"
                : "bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-100"
            }`}
          >
            Create New Blog 📝
          </button>
          <button
            onClick={() => setActiveTab("manage-blogs")}
            className={`px-6 py-3 font-extrabold text-sm rounded-t-2xl border-t-4 border-x-4 border-black dark:border-white transition-all -mb-[4px] z-10 ${
              activeTab === "manage-blogs"
                ? "bg-white dark:bg-zinc-900 text-black dark:text-white border-b-4 border-b-white dark:border-b-zinc-900"
                : "bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-100"
            }`}
          >
            Manage Blogs ({blogsList.length})
          </button>
        </div>

        {/* Tab Panel Display */}
        <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-b-3xl rounded-tr-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] min-h-[400px]">
          
          {/* TAB 1: FORM MESSAGES */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              <h2 className="text-lg font-black mb-4">User Contact Logs Inbox 📨</h2>
              
              {submissionsList.length === 0 ? (
                <div className="text-center py-12 border-4 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
                  <p className="font-extrabold text-gray-400 text-sm">Your inbox is empty. No messages received yet.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {submissionsList.map((sub) => (
                    <div 
                      key={sub.id} 
                      className="border-4 border-black dark:border-white rounded-2xl p-5 bg-white dark:bg-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="space-y-2 flex-grow">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-[#FFC224] text-black font-extrabold text-[10px] px-2 py-0.5 rounded border border-black uppercase">
                            {sub.subject}
                          </span>
                          <span className="text-[10px] font-black text-gray-400">
                            {new Date(sub.date).toLocaleString()}
                          </span>
                        </div>
                        <h3 className="font-black text-base text-black dark:text-white flex items-center gap-1.5">
                          {sub.name} <span className="text-xs font-bold text-gray-500">(&lt;{sub.email}&gt;)</span>
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 font-medium text-sm leading-relaxed whitespace-pre-line border-t border-gray-100 dark:border-zinc-800 pt-2">
                          {sub.message}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteSubmission(sub.id)}
                        className="bg-red-500 hover:bg-red-600 text-white border-2 border-black p-2.5 rounded-xl self-end md:self-start shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
                        title="Delete log entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WRITE BLOG POST */}
          {activeTab === "create-blog" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Form Block (Left side) */}
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-lg font-black mb-2">Compose Dynamic Article Studio ✍️</h2>
                
                {feedbackMsg && (
                  <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-800 font-extrabold text-sm rounded-xl p-4 mb-4">
                    {feedbackMsg}
                  </div>
                )}

                <form onSubmit={handleCreateBlog} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Blog Title */}
                    <div>
                      <label className="block text-xs font-extrabold mb-1.5 uppercase">Article Title</label>
                      <input
                        type="text"
                        required
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="e.g. Understanding Next.js Middleware"
                        className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-[#FFC224] outline-none"
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-xs font-extrabold mb-1.5 uppercase">Short Summary (Excerpt)</label>
                      <input
                        type="text"
                        required
                        value={blogExcerpt}
                        onChange={(e) => setBlogExcerpt(e.target.value)}
                        placeholder="Brief one-line summary..."
                        className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-[#FFC224] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tags */}
                    <div>
                      <label className="block text-xs font-extrabold mb-1.5 uppercase">Tags (comma separated)</label>
                      <input
                        type="text"
                        required
                        value={blogTags}
                        onChange={(e) => setBlogTags(e.target.value)}
                        placeholder="e.g. Next.js, API, Coding"
                        className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-[#FFC224] outline-none"
                      />
                    </div>

                    {/* Image Upload + Path */}
                    <div className="space-y-1">
                      <label className="block text-xs font-extrabold mb-1 uppercase">Article Photo / Image</label>
                      <div className="space-y-2 border-2 border-dashed border-gray-300 dark:border-zinc-700 p-2.5 rounded-xl bg-gray-55 dark:bg-zinc-950">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="w-full text-xs font-bold text-gray-500 file:mr-2.5 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-black file:text-[10px] file:font-black file:bg-[#FFC224] file:text-black hover:file:bg-yellow-300 cursor-pointer"
                        />
                        <span className="block text-[9px] text-gray-400 font-bold text-center uppercase">Or Paste Image URL Below</span>
                        <input
                          type="text"
                          value={blogImage}
                          onChange={(e) => setBlogImage(e.target.value)}
                          placeholder="https://example.com/photo.png"
                          className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-xl px-3 py-1.5 text-xs font-bold focus:border-[#FFC224] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div>
                    <label className="block text-xs font-extrabold mb-1.5 uppercase">Full Article Content (Markdown compatible)</label>
                    <textarea
                      rows={8}
                      required
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="Write article details here..."
                      className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#FFC224] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#10b981] hover:bg-[#10b981]/95 text-black border-4 border-black font-black rounded-xl py-3 px-6 inline-flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase text-sm"
                  >
                    <PlusCircle className="w-5 h-5" /> Publish Blog Post
                  </button>
                </form>
              </div>

              {/* Live Preview Block (Right side) */}
              <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-6">
                <h2 className="text-lg font-black mb-2 flex items-center gap-1.5">
                  <span className="bg-[#a855f7] text-white font-extrabold text-[10px] px-2.5 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider">
                    Studio Live Preview 🔮
                  </span>
                </h2>

                <div className="border-4 border-black dark:border-white rounded-3xl p-6 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] space-y-5">
                  {/* Photo Render */}
                  <div className="w-full h-64 bg-gray-100 dark:bg-zinc-800 rounded-2xl overflow-hidden border-2 border-black relative flex items-center justify-center">
                    {blogImage ? (
                      <img 
                        src={blogImage} 
                        alt="Article preview" 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-center p-4 space-y-1 text-gray-400">
                        <p className="text-sm font-black">No photo uploaded</p>
                        <p className="text-xs font-bold">Select a photo or paste a URL to preview</p>
                      </div>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-3">
                    <p className="text-xs font-black text-gray-400">TODAY • JUST NOW READ</p>
                    <h3 className="font-black text-xl md:text-2xl text-black dark:text-white leading-snug break-words">
                      {blogTitle || "Your Awesome Article Title"}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold leading-relaxed line-clamp-3 break-words">
                      {blogExcerpt || "Write a brief excerpt to preview the card summary card layout here..."}
                    </p>
                  </div>

                  {/* Tags footer preview */}
                  <div className="pt-4 border-t border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex flex-wrap gap-15">
                      {blogTags ? (
                        blogTags.split(",").map((t) => t.trim()).filter((t) => t.length > 0).slice(0, 2).map((tag) => (
                          <span key={tag} className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-350 px-2.5 py-1 rounded text-xs font-extrabold uppercase">
                            #{tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400 font-bold">#tags</span>
                      )}
                    </div>
                    <span className="bg-black text-white dark:bg-white dark:text-black font-black text-xs px-3 py-1.5 rounded uppercase">
                      READ POST
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: MANAGE EXISTING BLOGS */}
          {activeTab === "manage-blogs" && (
            <div className="space-y-4">
              <h2 className="text-lg font-black mb-4">Active Articles Ledger 📂</h2>
              
              {blogsList.length === 0 ? (
                <div className="text-center py-12 border-4 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
                  <p className="font-extrabold text-gray-400 text-sm">No blogs published. Write one above!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {blogsList.map((blog) => (
                    <div 
                      key={blog.id} 
                      className="border-4 border-black dark:border-white rounded-2xl p-4 bg-white dark:bg-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-between gap-4"
                    >
                      <div>
                        <h3 className="font-black text-base">{blog.title}</h3>
                        <p className="text-xs font-bold text-gray-400">{blog.date} • {blog.readTime}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {blog.tags.map((t) => (
                            <span key={t} className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 px-2 py-0.5 rounded text-[10px] font-bold">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingBlogId(blog.id)
                            setBlogTitle(blog.title)
                            setBlogExcerpt(blog.excerpt)
                            setBlogContent(blog.content)
                            setBlogTags(blog.tags.join(", "))
                            setBlogImage(blog.image)
                            setActiveTab("create-blog")
                          }}
                          className="bg-[#FFC224] hover:bg-yellow-300 text-black border-2 border-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
                          title="Edit blog post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="bg-red-500 hover:bg-red-600 text-white border-2 border-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
                          title="Delete blog post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </main>
  )
}
