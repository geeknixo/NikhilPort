"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export function ThreeModelViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 12)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false // Disabled to prevent interfering with page scroll
    controls.enablePan = false // Keep the model centered
    controls.autoRotate = false // Handled manually on the pivot to avoid lerp conflicts
 
    // Auto-reset state variables
    let isInteracting = false
    let resetTimeout: NodeJS.Timeout
 
    controls.addEventListener("start", () => {
      isInteracting = true
      if (resetTimeout) clearTimeout(resetTimeout)
    })
 
    controls.addEventListener("end", () => {
      resetTimeout = setTimeout(() => {
        isInteracting = false
      }, 1500) // Start returning to center 1.5 seconds after drag ends
    })
 
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)
 
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight1.position.set(5, 10, 7)
    scene.add(directionalLight1)
 
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
    directionalLight2.position.set(-5, -5, -5)
    scene.add(directionalLight2)
 
    // Pivot group to control base orientation
    const pivot = new THREE.Group()
    scene.add(pivot)
 
    // Load Materials and Model
    const mtlLoader = new MTLLoader()
    mtlLoader.setPath("/3dmodel/c2lpk7avgum8-E-45-Aircraft/E-45-Aircraft/")
    mtlLoader.load("E 45 Aircraft_obj.mtl", (materials) => {
      materials.preload()
 
      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.setPath("/3dmodel/c2lpk7avgum8-E-45-Aircraft/E-45-Aircraft/")
      objLoader.load("E 45 Aircraft_obj.obj", (object) => {
        // Center the geometry of loaded object
        const box = new THREE.Box3().setFromObject(object)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
 
        object.position.x += (object.position.x - center.x)
        object.position.y += (object.position.y - center.y)
        object.position.z += (object.position.z - center.z)
 
        // Scale to fit canvas (zoomed in slightly)
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 7.5 / maxDim
        object.scale.set(scale, scale, scale)
 
        // Set standard orientation for aircraft
        object.rotation.x = 0
        object.rotation.y = 0
        object.rotation.z = 0
 
        // Traverse the object to apply shadow mapping and texture correction
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
            if (child.material) {
              const materialsArray = Array.isArray(child.material) ? child.material : [child.material]
              materialsArray.forEach((mat) => {
                mat.side = THREE.DoubleSide
              })
            }
          }
        })
 
        pivot.add(object)
        setLoading(false)
      }, undefined, (err) => {
        console.error("Error loading OBJ Model:", err)
        setError("Failed to load 3D Model")
        setLoading(false)
      })
    }, undefined, (err) => {
      console.error("Error loading MTL Materials:", err)
      setError("Failed to load materials")
      setLoading(false)
    })
 
    // Default target values for lerping back
    const defaultCameraPos = new THREE.Vector3(0, 0, 12)
    const defaultTarget = new THREE.Vector3(0, 0, 0)
 
    // Animation Loop
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
 
      // Spin the model and add gentle breathing permanently
      if (pivot) {
        pivot.rotation.y += 0.012 // Auto Y spin permanently
        // Gentle breathing rotation on X
        pivot.rotation.x = Math.sin(Date.now() * 0.001) * 0.08
      }
 
      // Smoothly return camera to original position if user is not interacting
      if (!isInteracting) {
        camera.position.lerp(defaultCameraPos, 0.05)
        controls.target.lerp(defaultTarget, 0.05)
      }
 
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      controls.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      className="relative w-full h-full flex items-center justify-center bg-[#FAF9F5]"
      style={{
        backgroundImage: `
          radial-gradient(circle, transparent 30%, #FAF9F5 90%),
          linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 24px 24px, 24px 24px",
      }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center font-bold text-black text-base md:text-lg bg-[#FAF9F5] z-10">
          Loading 3D Model...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center font-bold text-red-600 text-base md:text-lg bg-[#FAF9F5] z-10 p-4 text-center">
          {error}
        </div>
      )}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  )
}
