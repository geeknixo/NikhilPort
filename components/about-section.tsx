import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="container mx-auto px-4 py-10 md:py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="flex justify-center">
          <div className="relative w-full max-w-lg aspect-square border-[4px] border-black rounded-full overflow-hidden bg-[#FF6B6B] shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)]">
            <video 
              src="/nikhil.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t("whoBehind")} <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">{t("greatWork")}</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {t("aboutBio")}
            </p>
            
            {/* My Mission Callout */}
            <div className="bg-[#FFECEF] border-4 border-black rounded-2xl p-4.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-5">
              <h4 className="font-extrabold text-lg text-black mb-1.5 flex items-center gap-2">
                🎯 {t("mission")}
              </h4>
              <p className="text-gray-800 text-sm md:text-base font-bold leading-relaxed">
                {t("missionDesc")}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 bg-[#6366F1] border-2 border-black rounded-[5px] flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Next.js & Laravel Specialist</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Expertise in building scalable backend systems, custom CRM, admin portals, and lightning-fast frontend pages.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 bg-[#FF6B7A] border-2 border-black rounded-[5px] flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2">10+ Projects Built</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Developed e-commerce platforms, luxury rentals, business portals, and client relationship systems.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 bg-[#FFC224] border-2 border-black rounded-[5px] flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2">MCA Post Graduate Student</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Academically strong at Geetanjali Institute of Technical Studies with standard knowledge of OOPs, DBMS, and DS.
                </p>
              </div>
            </div>
          </div>

          <a href="https://wa.me/916377414779?text=Hi%20Nikhil!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you%20regarding%20web%20development%20services." target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
            <Button className="bg-[#10b981] text-black border-4 border-black hover:bg-[#10b981]/95 rounded-xl py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-black h-auto w-full sm:w-auto sm:min-w-[240px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150">
              <User className="w-5 h-5" />
              Let's Connect
            </Button>
          </a>
        </div>
      </div>

      {/* My Story & Hobbies Section */}
      <div className="max-w-7xl mx-auto mt-16 pt-12 border-t-4 border-black">
        <h3 className="text-2xl md:text-4xl font-black mb-8 text-center md:text-left">
          {t("beyondCode")} <span className="bg-[#FFC224] text-black px-3 py-1 inline-block rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-lg">{t("hobbiesTitle")}</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Travelling */}
          <div className="bg-[#E0F2FE] border-4 border-black rounded-2xl p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200">
            <div className="text-4xl mb-4">✈️</div>
            <h4 className="font-extrabold text-xl text-black mb-1.5">{t("travelling")}</h4>
            <p className="text-sm font-bold text-gray-700 leading-snug">
              {t("travellingDesc")}
            </p>
          </div>

          {/* Card 2: Videography */}
          <div className="bg-[#FCE7F3] border-4 border-black rounded-2xl p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200">
            <div className="text-4xl mb-4">🎥</div>
            <h4 className="font-extrabold text-xl text-black mb-1.5">{t("videography")}</h4>
            <p className="text-sm font-bold text-gray-700 leading-snug">
              {t("videographyDesc")}
            </p>
          </div>

          {/* Card 3: PC Gaming */}
          <div className="bg-[#E0E7FF] border-4 border-black rounded-2xl p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200">
            <div className="text-4xl mb-4">🎮</div>
            <h4 className="font-extrabold text-xl text-black mb-1.5">{t("gaming")}</h4>
            <p className="text-sm font-bold text-gray-700 leading-snug">
              {t("gamingDesc")}
            </p>
          </div>

          {/* Card 4: Badminton */}
          <div className="bg-[#FEF3C7] border-4 border-black rounded-2xl p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200">
            <div className="text-4xl mb-4">🏸</div>
            <h4 className="font-extrabold text-xl text-black mb-1.5">{t("badminton")}</h4>
            <p className="text-sm font-bold text-gray-700 leading-snug">
              {t("badmintonDesc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
