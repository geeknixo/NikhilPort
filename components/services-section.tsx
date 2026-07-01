import { Code2, Terminal, Cpu, Database, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      description: "Building responsive, smooth, and interactive user interfaces.",
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "React.js", "JavaScript", "Framer Motion", "Three.js", "3D Modeling"],
      color: "bg-[#FF6B7A]",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#FF6B7A]",
      pillHoverClass: "hover:bg-[#FF6B7A] hover:text-white",
      icon: <Cpu className="w-8 h-8 text-black" />
    },
    {
      title: "Backend Development",
      description: "Developing robust backend APIs, CRMs, and portals.",
      skills: ["Laravel", "PHP", "CRM Development", "Admin Portals", "REST APIs"],
      color: "bg-[#2F81F7]",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#2F81F7]",
      pillHoverClass: "hover:bg-[#2F81F7] hover:text-white",
      icon: <Terminal className="w-8 h-8 text-black" />
    },
    {
      title: "Tools & Platforms",
      description: "Deploying and managing code with modern tools.",
      skills: ["Git", "GitHub", "Vercel", "Firebase", "MySQL", "Figma", "VS Code"],
      color: "bg-[#6366F1]",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#6366F1]",
      pillHoverClass: "hover:bg-[#6366F1] hover:text-white",
      icon: <Database className="w-8 h-8 text-black" />
    },
    {
      title: "Languages & Core",
      description: "Solid foundation in programming languages and logic.",
      skills: ["PHP", "JavaScript", "SQL", "Java", "HTML5", "Python", "Data Structures"],
      color: "bg-[#FFC224]",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#FFC224]",
      pillHoverClass: "hover:bg-[#FFC224] hover:text-black",
      icon: <Code2 className="w-8 h-8 text-black" />
    }
  ]

  return (
    <section id="skills" className="bg-white py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4">
              Technical <span className="bg-[#FF4A60] text-white px-3 py-1 inline-block">Expertise & Skills</span>
            </h2>
            <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed md:leading-[30px] max-w-2xl mx-auto">
              A comprehensive toolkit spanning modern frontend architectures, reliable backend systems, and agile deployment workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-white border-4 border-black rounded-[32px] overflow-hidden hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 p-8 flex flex-col justify-between group min-h-[300px] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] ${category.shadowClass}`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 border-2 border-black rounded-2xl ${category.color} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}>
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#0B0B0B] group-hover:text-red-500 transition-colors duration-200">{category.title}</h3>
                  </div>
                  <p className="text-gray-600 font-medium mb-6">{category.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 bg-white border-2 border-black rounded-xl font-bold text-sm text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 cursor-default ${category.pillHoverClass}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#FFC224] border-4 border-black rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8 hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex-1">
              <h3 className="text-[28px] leading-[40px] font-bold mb-3 text-[#0B0B0B]">Need custom solutions?</h3>
              <p className="text-[18px] leading-[30px] font-medium text-[#393939] max-w-xl">
                Looking to build a custom dashboard, high-performance API integration, or dynamic Next.js application? Let's connect!
              </p>
            </div>
            <a href="https://wa.me/916377414779?text=Hi%20Nikhil!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20web%20development%20project." target="_blank" rel="noopener noreferrer" className="w-full md:w-auto flex-shrink-0">
              <Button className="bg-[#c084fc] text-black border-4 border-black hover:bg-[#c084fc]/95 rounded-[16px] px-12 py-[22px] font-black text-[18px] w-full md:w-auto h-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150">
                <Mail className="w-5 h-5 mr-2" />
                Let's Work Together
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
