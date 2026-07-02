export interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  image: string
  color: string
}

export interface Submission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
}

const DEFAULT_BLOGS: Blog[] = [
  {
    id: "1",
    title: "Optimizing 3D loaders in Next.js using Three.js and TDSLoader",
    excerpt: "Learn how to bypass coordinate rendering lags and configure glossy shaders for 3DS model structures in React web systems.",
    content: "Rendering 3D models in a web application can quickly become a performance bottleneck. In this article, we will look at how to optimize 3D loaders using Three.js and TDSLoader in Next.js. We will cover dynamic imports to avoid SSR loading failures, damping controls to smooth orbits, and custom glossy metal shaders.",
    date: "Jun 2026",
    readTime: "5 min read",
    tags: ["Three.js", "Next.js", "3D"],
    image: "/images/article-design-tools.png",
    color: "border-[#FF6B6B]"
  },
  {
    id: "2",
    title: "Building scalable CRM architectures with Laravel and MySQL",
    excerpt: "Step-by-step logic building tips for managing mutual fund investments, automated SIP updates, and admin dashboard panels.",
    content: "When building database-heavy customer relationship managers (CRMs), database indexing and efficient queueing systems are key. Learn to optimize queries and use Laravel queues to offload heavy calculations.",
    date: "May 2026",
    readTime: "8 min read",
    tags: ["Laravel", "PHP", "MySQL"],
    image: "/images/article-exercises.png",
    color: "border-[#2F81F7]"
  },
  {
    id: "3",
    title: "Spring physics and layouts: A guide to Framer Motion dynamic navigation",
    excerpt: "How to design custom bounciness parameters and layoutId capsules that scale instantly with zero browser layout shifts.",
    content: "Animated navigation bars create an engaging feel. Framer Motion provides the layoutId property to transition active background capsules seamlessly between elements. This guide walks you through stiffness and damping controls.",
    date: "Apr 2026",
    readTime: "6 min read",
    tags: ["Framer Motion", "React", "CSS"],
    image: "/images/article-font-sizes.png",
    color: "border-[#FFC224]"
  },
  {
    id: "4",
    title: "Deep dive into React 19 Server Actions & Form Handling",
    excerpt: "A complete analysis of formAction, useActionState, and useFormStatus for zero-boilerplate asynchronous state bindings.",
    content: "React 19 introduces native support for async actions inside form tags. In this post, we explain how Server Actions communicate with database queries directly from your client-side form elements.",
    date: "Mar 2026",
    readTime: "7 min read",
    tags: ["React 19", "Next.js", "Web Dev"],
    image: "/images/article-design-tools.png",
    color: "border-[#6366F1]"
  },
  {
    id: "5",
    title: "Mastering Database Indexing: B-Trees and Composite Keys",
    excerpt: "Why indexing single columns is sometimes not enough. Learn to design composite indexes for high-speed multi-column queries.",
    content: "When writing SQL queries with multiple WHERE filters, single-column indexes fail to deliver optimum performance. Learn how composite keys and range queries utilize B-Tree nodes.",
    date: "Mar 2026",
    readTime: "10 min read",
    tags: ["Databases", "SQL", "MySQL"],
    image: "/images/article-exercises.png",
    color: "border-[#10b981]"
  },
  {
    id: "6",
    title: "How to structure an MCA Capstone project using Next.js & Laravel",
    excerpt: "Insights from structuring my postgrad project: folder architectures, API contracts, JWT auth, and database schemas.",
    content: "Building an MCA capstone requires clean code structure and robust documentation. Learn how to divide your frontend and backend repositories and write robust API specs.",
    date: "Feb 2026",
    readTime: "9 min read",
    tags: ["MCA", "Laravel", "Next.js"],
    image: "/images/article-font-sizes.png",
    color: "border-[#FF6B6B]"
  },
  {
    id: "7",
    title: "Tailwind CSS v4.0: Alpha features and compilation speed improvements",
    excerpt: "An overview of the new CSS-first configuration and lightning-fast Rust compiler integration in Tailwind v4.",
    content: "Tailwind CSS v4 introduces a complete rewrite of the compilation engine in Rust. We explore CSS-first configuration directives and utility performance gains.",
    date: "Jan 2026",
    readTime: "5 min read",
    tags: ["Tailwind", "CSS", "Frontend"],
    image: "/images/article-design-tools.png",
    color: "border-[#2F81F7]"
  },
  {
    id: "8",
    title: "Understanding PHP 8.x Attributes: Metadata for modern Laravel developers",
    excerpt: "How PHP attributes replace docblock comments to define routes, validation rules, and custom middleware bindings.",
    content: "PHP 8 introduced attributes to provide structured metadata for classes and methods. Learn how Laravel uses these attributes under the hood for cleaner controller configurations.",
    date: "Dec 2025",
    readTime: "7 min read",
    tags: ["PHP", "Laravel", "Backend"],
    image: "/images/article-exercises.png",
    color: "border-[#FFC224]"
  },
  {
    id: "9",
    title: "Dockerizing Full-Stack applications: A multi-container docker-compose setup",
    excerpt: "Step-by-step setup to dockerize Next.js, Laravel API, and MySQL for unified local development environments.",
    content: "Docker makes deployment consistent across environments. This guide sets up multi-container routing, network configurations, and database volumes for developers.",
    date: "Nov 2025",
    readTime: "11 min read",
    tags: ["Docker", "DevOps", "Backend"],
    image: "/images/article-font-sizes.png",
    color: "border-[#6366F1]"
  },
  {
    id: "10",
    title: "Designing Custom hooks in React: State encapsulation best practices",
    excerpt: "Stop duplicating fetch calls and event listeners. Encapsulate complex logical workflows into clean, reusable hooks.",
    content: "React custom hooks are the ultimate way to share logic between components. Learn to manage state, leverage refs, and handle window event bindings efficiently.",
    date: "Oct 2025",
    readTime: "6 min read",
    tags: ["React", "JavaScript", "Frontend"],
    image: "/images/article-design-tools.png",
    color: "border-[#10b981]"
  },
  {
    id: "11",
    title: "Understanding Big-O Notation: Algorithmic complexity simplified",
    excerpt: "Master time and space complexity evaluations for DSA interviews. Learn to identify O(N), O(log N), and O(N^2) loops.",
    content: "Algorithmic efficiency determines scalable system capabilities. Learn to evaluate complexity loops, recursive functions, and optimize nested data operations.",
    date: "Sep 2025",
    readTime: "8 min read",
    tags: ["DSA", "Computer Science", "MCA"],
    image: "/images/article-exercises.png",
    color: "border-[#FF6B6B]"
  },
  {
    id: "12",
    title: "Securing APIs: Implementing robust JWT Authentication and Refresh tokens",
    excerpt: "How to safely store auth tokens in httpOnly cookies and configure automated silent refresh cycles.",
    content: "Security is non-negotiable in production apps. Learn to implement JSON Web Tokens with access expiration and httpOnly cookies to prevent XSS attacks.",
    date: "Aug 2025",
    readTime: "10 min read",
    tags: ["Security", "API", "Backend"],
    image: "/images/article-font-sizes.png",
    color: "border-[#2F81F7]"
  },
  {
    id: "13",
    title: "Building real-time features with WebSockets and Pusher in Laravel",
    excerpt: "Implement live notification counters, typing indicators, and instant chat panels without polling endpoints.",
    content: "WebSockets enable instant data transfers. Learn how to bind client events and broadcast model updates instantly using Laravel Reverb or Pusher.",
    date: "Jul 2025",
    readTime: "7 min read",
    tags: ["WebSockets", "Laravel", "Real-Time"],
    image: "/images/article-design-tools.png",
    color: "border-[#FFC224]"
  },
  {
    id: "14",
    title: "Next.js App Router vs Pages Router: A comparative architectural review",
    excerpt: "Should you migrate? A detailed analysis of layout nesting, routing conventions, and middleware configurations.",
    content: "Next.js App Router introduces server component paradigm and nested routing layouts. Learn when to choose App Router and how it impacts server execution overheads.",
    date: "Jun 2025",
    readTime: "8 min read",
    tags: ["Next.js", "Frontend", "Architecture"],
    image: "/images/article-exercises.png",
    color: "border-[#6366F1]"
  },
  {
    id: "15",
    title: "Optimizing MySQL Queries: How to read and interpret EXPLAIN statements",
    excerpt: "Stop guessing database performance bottlenecks. Use EXPLAIN statements to identify index misses and full table scans.",
    content: "When database queries slow down, EXPLAIN commands reveal index allocations, row inspections, and join performance issues. Learn query optimization workflows.",
    date: "May 2025",
    readTime: "9 min read",
    tags: ["MySQL", "Databases", "SQL"],
    image: "/images/article-font-sizes.png",
    color: "border-[#10b981]"
  },
  {
    id: "16",
    title: "BCA to MCA: My academic journey and transition roadmap",
    excerpt: "Tips for juniors planning their postgrad: shifting from basic scripts to advanced software engineering methodologies.",
    content: "MCA postgrad studies go beyond basic language scripts to explore compiler design, operating systems, and computer architecture. This is my transition guide.",
    date: "Apr 2025",
    readTime: "6 min read",
    tags: ["MCA", "Education", "My Story"],
    image: "/images/article-design-tools.png",
    color: "border-[#FF6B6B]"
  },
  {
    id: "17",
    title: "CSS Grid vs Flexbox: The definitive guide to modern page layouts",
    excerpt: "Master 1D versus 2D layout rules. Learn when to align components with flex rows and when to structure multi-row grids.",
    content: "Modern CSS layout structures are powerful. Master CSS grid setups, fr variables, flex-grow rules, and responsive media query breakpoints.",
    date: "Mar 2025",
    readTime: "5 min read",
    tags: ["CSS", "Frontend", "Web Design"],
    image: "/images/article-exercises.png",
    color: "border-[#2F81F7]"
  },
  {
    id: "18",
    title: "Deploying Next.js applications to Vercel and VPS servers",
    excerpt: "Compare Vercel's zero-config serverless deployments against manual PM2, Nginx, and SSL setups on Ubuntu VPS.",
    content: "Learn VPS setup procedures: installing Node, configuring Nginx reverse proxy routes, obtaining SSL certificates, and setting up PM2 monitors.",
    date: "Feb 2025",
    readTime: "11 min read",
    tags: ["Deployment", "VPS", "DevOps"],
    image: "/images/article-font-sizes.png",
    color: "border-[#FFC224]"
  },
  {
    id: "19",
    title: "Clean Code principles in JavaScript: Writing self-documenting code",
    excerpt: "Stop writing complex comments. Refactor variables, optimize function scopes, and use descriptive names instead.",
    content: "Clean code reduces maintenance overhead. Learn single-responsibility guidelines, array mutations, and arrow function simplification rules.",
    date: "Jan 2025",
    readTime: "7 min read",
    tags: ["JavaScript", "Clean Code", "Web Dev"],
    image: "/images/article-design-tools.png",
    color: "border-[#6366F1]"
  },
  {
    id: "20",
    title: "Introduction to REST API Design: Constraints and best practices",
    excerpt: "Learn how to structure resource endpoints, utilize HTTP verbs, design query parameters, and handle HTTP status codes.",
    content: "REST API design defines unified API communications. Master stateless routing systems, resource plural mappings, status codes, and JSON response models.",
    date: "Dec 2024",
    readTime: "8 min read",
    tags: ["API", "Backend", "Web Dev"],
    image: "/images/article-exercises.png",
    color: "border-[#10b981]"
  }
]

const DEFAULT_SUBMISSIONS: Submission[] = []

const BUCKET_URL = "https://kvdb.io/nikhil_port_final_192837"

export function getBlogs(): Blog[] {
  if (typeof window === "undefined") return DEFAULT_BLOGS
  
  // Dynamic cache reset to synchronize new databases
  if (!localStorage.getItem("nikhil_db_migrated_v2")) {
    localStorage.removeItem("nikhil_blogs")
    localStorage.removeItem("nikhil_submissions")
    localStorage.removeItem("nikhil_total_visitors")
    localStorage.setItem("nikhil_db_migrated_v2", "true")
  }

  const stored = localStorage.getItem("nikhil_blogs")
  if (!stored) {
    localStorage.setItem("nikhil_blogs", JSON.stringify(DEFAULT_BLOGS))
    return DEFAULT_BLOGS
  }
  return JSON.parse(stored)
}

export function syncBlogsGlobal(callback: (blogs: Blog[]) => void): void {
  if (typeof window === "undefined") return
  fetch(`${BUCKET_URL}/blogs`)
    .then((res) => {
      if (res.status === 404) {
        // Bucket key is empty/not created, push defaults
        fetch(`${BUCKET_URL}/blogs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(DEFAULT_BLOGS)
        }).catch(() => {})
        return DEFAULT_BLOGS
      }
      if (res.ok) return res.json()
      throw new Error()
    })
    .then((data) => {
      if (Array.isArray(data)) {
        localStorage.setItem("nikhil_blogs", JSON.stringify(data))
        callback(data)
      }
    })
    .catch(() => {
      callback(getBlogs())
    })
}

export function addBlog(blog: Omit<Blog, "id" | "date" | "readTime" | "color">): Blog {
  const blogs = getBlogs()
  const dateOptions = { month: "short" as const, year: "numeric" as const }
  const formattedDate = new Date().toLocaleDateString("en-US", dateOptions)
  
  // Calculate read time based on content length
  const words = blog.content.split(/\s+/).length
  const readTimeMins = Math.ceil(words / 200)
  
  // Custom colors for border styling
  const colors = ["border-[#FF6B6B]", "border-[#2F81F7]", "border-[#FFC224]", "border-[#6366F1]", "border-[#10b981]"]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  const newBlog: Blog = {
    ...blog,
    id: Date.now().toString(),
    date: formattedDate,
    readTime: `${readTimeMins} min read`,
    color: randomColor,
  }

  blogs.unshift(newBlog)
  localStorage.setItem("nikhil_blogs", JSON.stringify(blogs))
  
  // Save globally to KVDB
  fetch(`${BUCKET_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blogs)
  }).catch(() => {})

  return newBlog
}

export function deleteBlog(id: string): void {
  const blogs = getBlogs()
  const updated = blogs.filter((b) => b.id !== id)
  localStorage.setItem("nikhil_blogs", JSON.stringify(updated))
  
  // Sync deletion globally
  fetch(`${BUCKET_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  }).catch(() => {})
}

export function updateBlog(id: string, updatedFields: Omit<Blog, "id" | "date" | "readTime" | "color">): Blog {
  const blogs = getBlogs()
  const idx = blogs.findIndex((b) => b.id === id)
  if (idx === -1) throw new Error("Blog not found")

  const original = blogs[idx]
  const words = updatedFields.content.split(/\s+/).length
  const readTimeMins = Math.ceil(words / 200)

  const updatedBlog: Blog = {
    ...original,
    ...updatedFields,
    readTime: `${readTimeMins} min read`,
  }

  blogs[idx] = updatedBlog
  localStorage.setItem("nikhil_blogs", JSON.stringify(blogs))

  // Sync update globally
  fetch(`${BUCKET_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blogs)
  }).catch(() => {})

  return updatedBlog
}

export function getSubmissions(): Submission[] {
  if (typeof window === "undefined") return DEFAULT_SUBMISSIONS
  const stored = localStorage.getItem("nikhil_submissions")
  if (!stored) {
    localStorage.setItem("nikhil_submissions", JSON.stringify(DEFAULT_SUBMISSIONS))
    return DEFAULT_SUBMISSIONS
  }
  return JSON.parse(stored)
}

export function syncSubmissionsGlobal(callback: (subs: Submission[]) => void): void {
  if (typeof window === "undefined") return
  fetch(`${BUCKET_URL}/submissions`)
    .then((res) => {
      if (res.status === 404) {
        // Bucket key is empty, push defaults
        fetch(`${BUCKET_URL}/submissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(DEFAULT_SUBMISSIONS)
        }).catch(() => {})
        return DEFAULT_SUBMISSIONS
      }
      if (res.ok) return res.json()
      throw new Error()
    })
    .then((data) => {
      if (Array.isArray(data)) {
        localStorage.setItem("nikhil_submissions", JSON.stringify(data))
        callback(data)
      }
    })
    .catch(() => {
      callback(getSubmissions())
    })
}

export function addSubmission(sub: Omit<Submission, "id" | "date">): Submission {
  const submissions = getSubmissions()
  const newSubmission: Submission = {
    ...sub,
    id: `sub-${Date.now()}`,
    date: new Date().toISOString(),
  }
  submissions.unshift(newSubmission)
  localStorage.setItem("nikhil_submissions", JSON.stringify(submissions))
  
  // Save globally to KVDB
  fetch(`${BUCKET_URL}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submissions)
  }).catch(() => {})

  return newSubmission
}

export function deleteSubmission(id: string): void {
  const submissions = getSubmissions()
  const updated = submissions.filter((s) => s.id !== id)
  localStorage.setItem("nikhil_submissions", JSON.stringify(updated))
  
  // Sync deletion globally
  fetch(`${BUCKET_URL}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  }).catch(() => {})
}

export function getVisitorStats(): { totalVisitors: number; liveUsers: number } {
  if (typeof window === "undefined") return { totalVisitors: 0, liveUsers: 1 }
  
  const storedVisitors = localStorage.getItem("nikhil_total_visitors")
  const total = storedVisitors ? parseInt(storedVisitors) : 0
  
  const storedLive = localStorage.getItem("nikhil_live_users")
  const live = storedLive ? parseInt(storedLive) : 1

  return { totalVisitors: total, liveUsers: live }
}

export async function fetchLiveUsersGlobal(callback: (live: number) => void): Promise<void> {
  if (typeof window === "undefined") return
  try {
    const res = await fetch(`${BUCKET_URL}/?prefix=active_`)
    if (res.ok) {
      const keys: [string, string][] = await res.json()
      const now = Date.now()
      let activeCount = 0
      
      keys.forEach(([key, value]) => {
        const timestamp = parseInt(value)
        // Count active heartbeats in last 20 seconds
        if (!isNaN(timestamp) && now - timestamp < 20000) {
          activeCount++
        }
      })

      const finalCount = Math.max(1, activeCount)
      localStorage.setItem("nikhil_live_users", finalCount.toString())
      callback(finalCount)
    }
  } catch (e) {
    callback(1)
  }
}

export function incrementVisitors(): void {
  if (typeof window === "undefined") return
  
  const sessionActive = sessionStorage.getItem("nikhil_session_active")
  if (!sessionActive) {
    sessionStorage.setItem("nikhil_session_active", "true")
    
    // Call real public counter API (New fresh key starting at 0)
    fetch("https://api.counterapi.dev/v1/nikhil-sharma-final-visitors/visitors/up")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.count) {
          localStorage.setItem("nikhil_total_visitors", data.count.toString())
        }
      })
      .catch((err) => console.error("Counter API Error:", err))
  } else {
    // Just fetch current count
    fetch("https://api.counterapi.dev/v1/nikhil-sharma-final-visitors/visitors")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.count) {
          localStorage.setItem("nikhil_total_visitors", data.count.toString())
        }
      })
      .catch(() => {})
  }
}
