"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import FlashCard from "./FlashCard"

const FlashCardsSection = () => {
  const [visible, setVisible] = useState(true)

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="text-blood-red-400 animate-pulse-heart fill-current" size={28} />
          <h2 className="text-2xl md:text-3xl font-bold text-blood-red-100">Espera aí! Eu ainda não terminei</h2>
          <Heart className="text-blood-red-400 animate-pulse-heart fill-current" size={28} />
        </div>
        <p className="text-lg text-gray-300">Tenho mais algumas coisas para te dizer...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FlashCard
          backText="Eu ainda te olho da mesma forma que te olhei desde a primeira vez que te vi."
          className="stagger-1"
        />

        <FlashCard backText="O lugar mais confortável do mundo é dentro do seu abraço." className="stagger-2" />

        <FlashCard backText="Você foi o meu inesperado mais esperado." className="stagger-3" />
      </div>
    </div>
  )
}

export default FlashCardsSection
