"use client"

import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Pushpendra Singh",
      role: "Founder at Royal Rental",
      quote: "Nikhil delivered an outstanding rental booking system. The site speed and UI are top-notch, which helped double our online bookings. Highly recommended!",
      initials: "PS",
      color: "bg-[#FF6B6B]",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#FF6B6B]"
    },
    {
      name: "Pawan Suthar",
      role: "Owner at Woodcrafted",
      quote: "His skills in Next.js and Tailwind CSS brought our premium wooden handicraft catalog to life. The attention to detail and smooth micro-interactions are amazing.",
      initials: "PS",
      color: "bg-[#2F81F7]",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#2F81F7]"
    },
    {
      name: "Prakash Sharma",
      role: "Co-Founder at newicon.in",
      quote: "Nikhil is an exceptional developer who designed high-performance applications for our team. Truly professional, communicative, and technically brilliant.",
      initials: "PS",
      color: "bg-[#FFC224]",
      shadowClass: "hover:shadow-[12px_12px_0px_0px_#FFC224]"
    }
  ]

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4">
            What my clients say
            <br />
            about <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">my work</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Real feedback from projects and business collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`group bg-white border-4 border-black rounded-[32px] p-6 md:p-8 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 ${item.shadowClass}`}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center font-bold text-lg text-black ${item.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-gray-400 group-hover:text-red-500 transition-colors duration-200">
                    <Quote className="w-8 h-8 fill-current" />
                  </div>
                </div>

                <p className="text-gray-700 font-medium leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="border-t-2 border-black/10 pt-4 mt-auto">
                <h4 className="font-bold text-lg text-black">{item.name}</h4>
                <p className="text-gray-500 font-bold text-sm">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
