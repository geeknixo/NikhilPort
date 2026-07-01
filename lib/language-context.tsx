"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "hi" | "es"

export const translations = {
  en: {
    // Navigation
    about: "About",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    contact: "Contact",
    // Hero
    im: "I'm",
    a: "a",
    nikhil: "Nikhil Sharma",
    dev: "Full Stack Developer",
    subtitle: "Full Stack Developer | MCA | BCA",
    desc: "Passionate about crafting modern, high-performance web applications and scalable backend architectures. Specializing in Next.js, Laravel, and comprehensive database systems.",
    viewProjects: "View Projects",
    downloadCV: "Download CV",
    // About
    whoBehind: "Who's behind all this",
    greatWork: "great work?",
    aboutBio: "I am a passionate Full Stack Web Developer and MCA Student with specialized expertise in Next.js and Laravel. I thrive on crafting modern, high-performance web applications and scalable backend architectures. With a strong foundation in both frontend aesthetics and robust backend logic, I bridge the gap between design and functionality to deliver comprehensive digital solutions.",
    mission: "My Mission",
    missionDesc: "To build high-performance, accessible, and user-centric web systems that solve real-world problems through clean code, modern architecture, and aesthetic design.",
    // Hobbies
    beyondCode: "Beyond the code:",
    hobbiesTitle: "My Story & Hobbies",
    travelling: "Travelling",
    travellingDesc: "Exploring new places, nature, mountains, and local cultures. Always ready for the next adventure!",
    videography: "Videography",
    videographyDesc: "Capturing cinematic stories, camera-work, and digital editing to freeze beautiful moments in time.",
    gaming: "PC Gaming",
    gamingDesc: "Immersive virtual worlds, custom PC builds, and competitive multiplayer games with friends.",
    badminton: "Badminton",
    badmintonDesc: "Smashing shuttlecocks on the court. An active player passionate about stamina, agility, and sports.",
  },
  hi: {
    // Navigation
    about: "परिचय",
    skills: "कौशल",
    projects: "प्रोजेक्ट्स",
    education: "शिक्षा",
    contact: "संपर्क",
    // Hero
    im: "मैं हूँ",
    a: "एक",
    nikhil: "निखिल शर्मा",
    dev: "फुल स्टैक डेवलपर",
    subtitle: "फुल स्टैक डेवलपर | MCA | BCA",
    desc: "आधुनिक, उच्च-प्रदर्शन वाले वेब एप्लिकेशन और स्केलेबल बैकएंड आर्किटेक्चर बनाने के लिए हमेशा तत्पर। Next.js, Laravel और डेटाबेस सिस्टम में विशेषज्ञता।",
    viewProjects: "प्रोजेक्ट्स देखें",
    downloadCV: "सीवी डाउनलोड करें",
    // About
    whoBehind: "इस बेहतरीन काम के पीछे",
    greatWork: "कौन है?",
    aboutBio: "मैं एक जुनूनी फुल स्टैक वेब डेवलपर और MCA छात्र हूँ, जिसे Next.js और Laravel में विशेष विशेषज्ञता हासिल है। मैं आधुनिक, उच्च-प्रदर्शन वेब एप्लिकेशन बनाने का शौकीन हूँ।",
    mission: "मेरा लक्ष्य",
    missionDesc: "स्वच्छ कोड, आधुनिक वास्तुकला और सौंदर्यपूर्ण डिज़ाइन के माध्यम से वास्तविक दुनिया की समस्याओं को हल करने वाले उच्च-प्रदर्शन वेब सिस्टम बनाना।",
    // Hobbies
    beyondCode: "कोडिंग से परे:",
    hobbiesTitle: "मेरी कहानी और शौक",
    travelling: "यात्रा करना",
    travellingDesc: "नई जगहों, प्रकृति, पहाड़ों और स्थानीय संस्कृतियों की खोज करना। हमेशा अगली यात्रा के लिए तैयार!",
    videography: "वीडियो ग्राफ़ी",
    videographyDesc: "सुंदर क्षणों को समय में फ्रीज करने के लिए सिनेमैटिक कहानियां, कैमरा-वर्क और डिजिटल संपादन कैप्चर करना।",
    gaming: "पीसी गेमिंग",
    gamingDesc: "इमर्सिव वर्चुअल दुनिया, कस्टम पीसी बिल्ड और दोस्तों के साथ प्रतिस्पर्धी मल्टीप्लेयर गेम।",
    badminton: "बैडमिंटन",
    badmintonDesc: "कोर्ट पर शटलकॉक से खेलना। स्टैमिना, चपलता और खेल के प्रति समर्पित एक सक्रिय खिलाड़ी।",
  },
  es: {
    // Navigation
    about: "Sobre mí",
    skills: "Habilidades",
    projects: "Proyectos",
    education: "Educación",
    contact: "Contacto",
    // Hero
    im: "Soy",
    a: "un",
    nikhil: "Nikhil Sharma",
    dev: "Desarrollador Full Stack",
    subtitle: "Desarrollador Full Stack | MCA | BCA",
    desc: "Apasionado por la creación de aplicaciones web modernas de alto rendimiento y arquitecturas backend escalables. Especializado en Next.js, Laravel y sistemas de bases de datos.",
    viewProjects: "Ver Proyectos",
    downloadCV: "Descargar CV",
    // About
    whoBehind: "¿Quién está detrás de",
    greatWork: "este gran trabajo?",
    aboutBio: "Soy un desarrollador web Full Stack apasionado y estudiante de MCA con experiencia especializada en Next.js y Laravel. Me encanta crear aplicaciones web modernas de alto rendimiento.",
    mission: "Mi Misión",
    missionDesc: "Crear sistemas web de alto rendimiento, accesibles y centrados en el usuario que resuelvan problemas del mundo real mediante código limpio, arquitectura moderna y diseño estético.",
    // Hobbies
    beyondCode: "Más allá del código:",
    hobbiesTitle: "Mi Historia y Aficiones",
    travelling: "Viajar",
    travellingDesc: "Explorando nuevos lugares, naturaleza, montañas y culturas locales. ¡Siempre listo para la próxima aventura!",
    videography: "Videografía",
    videographyDesc: "Capturar historias cinematográficas, trabajo de cámara y edición digital para congelar momentos hermosos.",
    gaming: "Juegos de PC",
    gamingDesc: "Mundos virtuales inmersivos, construcciones de PC personalizadas y juegos multijugador competitivos con amigos.",
    badminton: "Bádminton",
    badmintonDesc: "Golpeando volantes en la cancha. Un jugador activo apasionado por la resistencia, la agilidad y los deportes.",
  }
}

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // 1. Detect language automatically from browser settings
    const browserLang = navigator.language.slice(0, 2)
    if (browserLang === "hi") {
      setLanguage("hi")
    } else if (browserLang === "es") {
      setLanguage("es")
    } else {
      setLanguage("en")
    }

    // 2. Check if user selected language before
    const storedLang = localStorage.getItem("portfolio-language") as Language
    if (storedLang && ["en", "hi", "es"].includes(storedLang)) {
      setLanguage(storedLang)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("portfolio-language", lang)
  }

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations["en"][key] || ""
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
