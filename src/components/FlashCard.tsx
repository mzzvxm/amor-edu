"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlashCardProps {
  frontText?: string
  backText: string
  className?: string
}

const FlashCard = ({ frontText = "Clique aqui❤️", backText, className }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className={cn("perspective-1000 w-full max-w-md mx-auto h-48 cursor-pointer", className)} onClick={handleFlip}>
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 transform-style-3d",
          isFlipped ? "rotate-y-180" : "",
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden glass-effect rounded-xl flex items-center justify-center p-6 border border-blood-red-400/30",
            "hover:border-blood-red-400/50 hover:shadow-glow-red",
            isFlipped ? "opacity-0" : "opacity-100",
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <Heart className="text-blood-red-400 animate-pulse-heart fill-current" size={32} />
            <p className="text-xl font-medium text-blood-red-100 text-center">{frontText}</p>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden glass-effect rounded-xl flex items-center justify-center p-6 border border-blood-red-400/30 rotate-y-180",
            "hover:border-blood-red-400/50 hover:shadow-glow-red",
            isFlipped ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="text-xl font-medium text-blood-red-100 text-center italic">{backText}</p>
        </div>
      </div>
    </div>
  )
}

export default FlashCard
