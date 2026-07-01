import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function PortfolioSection() {
  const projects = [
    {
      title: "Pithal Machinaries",
      description:
        "Developed a full-stack web application with dealer onboarding, lead management, and admin dashboard modules. Implemented dynamic product pages and SEO optimization.",
      tag: "Next.js / TypeScript / MySQL",
      bgColor: "bg-[#FF6B6B]",
      illustration: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      link: "https://pithalmachine.com/",
      year: "2026",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#FF6B6B]"
    },
    {
      title: (
        <>
          MF SIP CRM <br className="hidden md:inline" />
          <span className="text-[16px] md:text-[20px] text-gray-500 font-medium block md:mt-1">(Mutual Fund Management)</span>
        </>
      ),
      description:
        "Developed CRM modules for managing investors, mutual funds, SIPs, NFOs, and portfolio data. Built responsive admin dashboards with reporting features and workflow automation.",
      tag: "Laravel / PHP / MySQL",
      bgColor: "bg-[#2F81F7]",
      illustration: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      year: "2026",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#2F81F7]"
    },
    {
      title: (
        <>
          RoyalRentals <br className="hidden md:inline" />
          <span className="text-[16px] md:text-[20px] text-gray-500 font-medium block md:mt-1">(Car Rental Platform)</span>
        </>
      ),
      description:
        "A comprehensive e-commerce platform for luxury car rentals. Features include real-time booking, payment integration via Stripe, and an intuitive user dashboard.",
      tag: "React / Node.js / ",
      bgColor: "bg-[#FFC224]",
      illustration: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      link: "https://royalrentals.in",
      year: "2024",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#FFC224]"
    },
    {
      title: (
        <>
          Woodcrafted <br className="hidden md:inline" />
          <span className="text-[16px] md:text-[20px] text-gray-500 font-medium block md:mt-1">(Furniture E-commerce)</span>
        </>
      ),
      description:
        "A sophisticated furniture e-commerce platform showcasing handcrafted wooden pieces. Implemented advanced filtering, wishlist, product catalog, and seamless checkout experience.",
      tag: "Next.js / TypeScript / PostgreSQL / Tailwind CSS",
      bgColor: "bg-[#6366F1]",
      illustration: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      link: "https://woodcrafted.in",
      year: "2024",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#6366F1]"
    },
    {
      title: (
        <>
          WTS Visa <br className="hidden md:inline" />
          <span className="text-[16px] md:text-[20px] text-gray-500 font-medium block md:mt-1">(Visa Processing Platform)</span>
        </>
      ),
      description:
        "Designed and developed the frontend layouts for the majority of the pages. Built the responsive client dashboard, application steps, and modern form interfaces integrated with a Laravel backend.",
      tag: "Laravel / PHP / Blade / CSS",
      bgColor: "bg-[#10B981]",
      illustration: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
      link: "#",
      year: "2024",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#10B981]"
    },
    {
      title: (
        <>
          Assignment in Need <br className="hidden md:inline" />
          <span className="text-[16px] md:text-[20px] text-gray-500 font-medium block md:mt-1">(Academic Writing Portal)</span>
        </>
      ),
      description:
        "Designed and implemented intuitive, high-fidelity frontend layouts, student dashboard components, and responsive landing pages for an online assignment help platform. Developed using Laravel Blade and modern CSS.",
      tag: "Laravel / PHP / Blade / CSS",
      bgColor: "bg-[#8B5CF6]",
      illustration: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      link: "https://www.assignmentinneed.com",
      year: "2024",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#8B5CF6]"
    },
  ]

  return (
    <section id="portfolio" className="container mx-auto px-4 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Take a look at my <br />
            <span className="bg-[#FFC224] text-black px-3 py-1 inline-block">engineering portfolio</span>
          </h2>
        </div>

        <div className="space-y-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group grid md:grid-cols-2 bg-white border-4 border-black rounded-[32px] overflow-hidden hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 ${project.shadowClass}`}
            >
              <div className="p-6 md:p-12 flex flex-col justify-center bg-white">
                <span className="inline-block bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 w-fit">
                  {project.tag}
                </span>

                <h3 className="text-xl md:text-[28px] font-bold mb-4 leading-tight md:leading-[40px] text-[#0B0B0B] group-hover:text-red-500 transition-colors duration-200">
                  {project.title}
                </h3>

                <p className="text-base md:text-[18px] text-[#393939] mb-6 leading-relaxed md:leading-[30px] font-medium">
                  {project.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-gray-500 font-mono text-sm">Year: {project.year}</span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-bold text-[#0B0B0B] transition-all text-sm md:text-base border-b-2 border-black"
                    >
                      Visit Website
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>

              <div className={`${project.bgColor} relative overflow-hidden min-h-[250px] md:min-h-[400px]`}>
                <Image
                  src={project.illustration || "/placeholder.svg"}
                  alt={typeof project.title === "string" ? project.title : "Project Illustration"}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
