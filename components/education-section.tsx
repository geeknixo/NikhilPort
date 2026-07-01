import { useEffect, useRef } from "react"
import { GraduationCap, Award } from "lucide-react"

export function EducationSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    // Twinkling stars configuration
    const stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = []
    const starCount = 100

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.015 + 0.005,
      })
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener("resize", handleResize)

    const render = () => {
      // Cosmic radial nebula gradient
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        100,
        width / 2,
        height / 2,
        Math.max(width, height)
      )
      gradient.addColorStop(0, "#080720") // Cosmic dark violet-blue
      gradient.addColorStop(0.6, "#03020c") // Deep space space-blue
      gradient.addColorStop(1, "#000000") // Black abyss

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw and animate twinkling stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Twinkle update
        star.alpha += star.speed
        if (star.alpha > 0.95 || star.alpha < 0.05) {
          star.speed = -star.speed
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const educationList = [
    {
      type: "education",
      period: "2024 — 2026",
      title: "Master of Computer Applications (MCA)",
      institution: "Geetanjali Institute Of Technical Studies, Udaipur",
      details: [
        "Current CGPA: 7.5",
        "Led BCA & MCA student teams for the Smart India Hackathon (SIH)",
        "Advanced studies in Data Structures, DBMS, Object-Oriented Programming (OOP)",
        "Extensive practical work in full-stack web development (HTML, CSS, JS, PHP, MySQL)",
        "Exploring modern systems including C#, .NET Framework, and Angular"
      ],
      color: "bg-[#FF6B6B]",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#FF6B6B]"
    },
    {
      type: "education",
      period: "2021 — 2024",
      title: "Bachelor of Computer Applications (BCA)",
      institution: "Aishwarya College, Udaipur",
      details: [
        "Graduated with 65%",
        "Built academic web development and database management projects",
        "Developed solid skills in logic building, programming languages, and SQL databases"
      ],
      color: "bg-[#2F81F7]",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#2F81F7]"
    },
    {
      type: "certification",
      period: "Issued Sep 2025",
      title: "FullStack Development (MERN Stack)",
      institution: "Grras Solutions",
      details: [
        "Completed comprehensive training with distinction",
        "Built and deployed end-to-end applications using MongoDB, Express.js, React.js, and Node.js"
      ],
      color: "bg-[#FFC224]",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#FFC224]"
    }
  ]

  return (
    <section id="education" className="relative overflow-hidden py-10 md:py-14 bg-black text-white">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4">
              Education & <span className="bg-[#6366F1] text-white px-3 py-1 inline-block">Certifications</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              My academic milestones and specialized technical training.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {educationList.map((item, index) => (
              <div
                key={index}
                className={`group bg-white border-4 border-black rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-10 text-black ${item.shadowClass}`}
              >
                <div className="md:w-1/4 flex-shrink-0 flex flex-row md:flex-col justify-between items-start md:border-r-4 md:border-black pr-6">
                  <div>
                    <span className="font-mono text-lg font-bold text-gray-500 block">{item.period}</span>
                    <span className="inline-block mt-2 px-3 py-1 bg-black text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                  <div className={`p-4 border-2 border-black rounded-2xl ${item.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:block mt-8 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}>
                    {item.type === "education" ? (
                      <GraduationCap className="w-8 h-8 text-black" />
                    ) : (
                      <Award className="w-8 h-8 text-black" />
                    )}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold leading-tight text-[#0B0B0B] group-hover:text-red-500 transition-colors duration-200">{item.title}</h3>
                    <p className="text-gray-600 font-bold mt-1">{item.institution}</p>
                  </div>
                  
                  <ul className="space-y-2 list-disc pl-5 text-gray-700 font-medium">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="leading-relaxed">{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
