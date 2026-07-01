import { Linkedin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Footer() {
  return (
    <footer id="contact" className="bg-black text-white py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 relative">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full flex items-center justify-center flex-shrink-0 relative bg-[#FF6B7A] border-4 border-black">
                <Image
                  src="/images/get-in-touch.svg"
                  alt="Get in Touch"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>

              <div className="w-full flex-1 bg-white border-4 border-black rounded-3xl py-4 px-4 md:py-6 md:px-8 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-black">Let's build something great together!</h3>
                </div>

                <div className="relative w-full md:w-auto md:min-w-[400px] lg:min-w-[480px] flex gap-4">
                  <a
                    href="mailto:nikhil.sharma@example.com"
                    className="flex-1 bg-[#FF6B7A] text-black hover:bg-[#FF6B7A]/95 rounded-[12px] py-4 px-6 text-center text-sm md:text-base font-black whitespace-nowrap h-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
                  >
                    Email Me
                  </a>
                  <a
                    href="tel:+916377414779"
                    className="flex-1 bg-[#FFC224] text-black hover:bg-[#FFC224]/95 rounded-[12px] py-4 px-6 text-center text-sm md:text-base font-black whitespace-nowrap h-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
                  >
                    Call Me
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white flex items-center justify-center border-2 border-black">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <span className="text-lg md:text-xl font-bold">Nikhil Sharma</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Full Stack Web Developer & MCA student specializing in Next.js, Laravel, and building high-performance web applications.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-white transition-colors">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#education" className="hover:text-white transition-colors">
                    Education
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact Info</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:nikhil.sharma@example.com" className="hover:text-white transition-colors">
                    nikhil.sharma@example.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+916377414779" className="hover:text-white transition-colors">
                    +91 6377414779
                  </a>
                </li>
                <li className="mt-4 flex gap-4">
                  <a
                    href="https://github.com/geeknixo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm hover:underline"
                  >
                    GITHUB
                  </a>
                  <a
                    href="https://linkedin.com/in/ns5762/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm hover:underline"
                  >
                    LINKEDIN
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2026 NIKHIL SHARMA. All rights reserved.</p>
            <p>Made with passion for Web Engineering</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
