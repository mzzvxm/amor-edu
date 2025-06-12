"use client"

import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

interface HeartPosition {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartPosition[]>([])

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: HeartPosition[] = []
      for (let i = 0; i < 12; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: 100 + Math.random() * 20, // Start below the viewport
          size: Math.random() * 2 + 1, // Smaller hearts (1-3)
          delay: Math.random() * 10,
          duration: Math.random() * 10 + 15, // Longer animation (15-25s)
          opacity: Math.random() * 0.3 + 0.1, // More subtle opacity (0.1-0.4)
        })
      }
      setHearts(newHearts)
    }

    generateHearts()

    // Regenerate hearts periodically
    const interval = setInterval(() => {
      generateHearts()
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: `-5%`,
            opacity: heart.opacity,
            animation: `floatUpHeart ${heart.duration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart size={heart.size * 10} className="text-blood-red-400 fill-current" />
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts
