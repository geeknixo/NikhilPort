"use client"

import { useEffect } from "react"

export function CursorBlob() {
  useEffect(() => {
    const blob = document.getElementById("cursor-blob")
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      if (blob) {
        blob.style.transform = `translate(${x - 150}px, ${y - 150}px)`
      }
    }
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <div
        id="cursor-blob"
        className="fixed w-[300px] h-[300px] bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  )
}
