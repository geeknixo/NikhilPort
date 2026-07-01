"use client"

import { useEffect } from "react"
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
import { NeoCursor } from "@/components/neo-cursor"
import { WelcomeToast } from "@/components/welcome-toast"
import { HireMeSection } from "@/components/hire-me-section"
import { FunZone } from "@/components/fun-zone"
import { ThemeLangControls } from "@/components/theme-lang-controls"
import { ArcadeZone } from "@/components/arcade-zone"

export default function Home() {
  useEffect(() => {
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
            lastSpoken = section.id
            
            // Debounce speech to prevent overlapping on fast scrolling
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
              window.dispatchEvent(
                new CustomEvent("minibot-speak", {
                  detail: { text: section.spokenText },
                })
              )
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
      observer.disconnect()
      clearTimeout(timeoutId)
    }
  }, [])

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
    </main>
  )
}
