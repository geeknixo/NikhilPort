"use client"

import { useEffect, useState } from "react"
import { Loader } from "@/components/loader"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LogoMarquee } from "@/components/logo-marquee"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { EducationSection } from "@/components/education-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ArticlesSection } from "@/components/articles-section"
import { Footer } from "@/components/footer"
import { ContactPopup } from "@/components/contact-popup"
import { NeoCursor } from "@/components/neo-cursor"
import { WelcomeToast } from "@/components/welcome-toast"
import { HireMeSection } from "@/components/hire-me-section"
import { FunZone } from "@/components/fun-zone"
import { ThemeLangControls } from "@/components/theme-lang-controls"
import { ArcadeZone } from "@/components/arcade-zone"
import { incrementVisitors } from "@/lib/data-store"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Record page visit in database store
    incrementVisitors()

    const timer = setTimeout(() => {
      setLoading(false)
    }, 400)

    // Real-time Concurrent Active User Heartbeat Setup
    const sessionId = Math.random().toString(36).substring(2, 9)
    const BUCKET_URL = "https://kvdb.io/nikhil_port_final_192837"

    const sendHeartbeat = () => {
      fetch(`${BUCKET_URL}/active_${sessionId}`, {
        method: "POST",
        body: Date.now().toString()
      }).catch(() => {})
    }

    sendHeartbeat()
    const heartbeatInterval = setInterval(sendHeartbeat, 10000)

    const cleanupSession = () => {
      navigator.sendBeacon(`${BUCKET_URL}/active_${sessionId}`, "")
    }

    window.addEventListener("beforeunload", cleanupSession)

    const sections = [
      { id: "about", spokenText: "Who is behind all this great work?" },
      { id: "skills", spokenText: "Technical expertise and skills." },
      { id: "portfolio", spokenText: "Take a look at my engineering portfolio." },
      { id: "education", spokenText: "My academic milestones and certifications." },
      { id: "contact", spokenText: "Let's build something great together. Feel free to contact Nikhil." },
    ]

    let lastSpoken: string | null = null
    let timeoutId: NodeJS.Timeout

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.35, // Speak when 35% of the section is visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find((s) => s.id === entry.target.id)
          if (section && lastSpoken !== section.id) {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
              // Cancel ongoing speech to free main rendering threads
              if (typeof window !== "undefined" && window.speechSynthesis) {
                window.speechSynthesis.cancel()
              }
              const utterance = new SpeechSynthesisUtterance(section.spokenText)
              utterance.rate = 1.0
              utterance.pitch = 1.0
              window.speechSynthesis.speak(utterance)
              lastSpoken = section.id
            }, 600) // Delay to ensure user is dwelling on the section
          }
        }
      })
    }, observerOptions)

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      clearTimeout(timeoutId)
      clearInterval(heartbeatInterval)
      window.removeEventListener("beforeunload", cleanupSession)
      fetch(`${BUCKET_URL}/active_${sessionId}`, { method: "DELETE" }).catch(() => {})
    }
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300 relative overflow-hidden">
      <NeoCursor />
      <WelcomeToast />
      <ThemeLangControls />
      <Navigation />
      <HeroSection />
      <LogoMarquee />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <EducationSection />
      <TestimonialsSection />
      <ArticlesSection />
      <FunZone />
      {/* <ArcadeZone /> */}
      <HireMeSection />
      <Footer />
      {/* <ContactPopup /> */}
    </main>
  )
}
