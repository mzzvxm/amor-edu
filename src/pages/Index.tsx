"use client"

import { useState } from "react"
import DaysCounter from "../components/DaysCounter"
import PoemSection from "../components/PoemSection"
import FloatingHearts from "../components/FloatingHearts"
import FlashCardsSection from "../components/FlashCardsSection"
import { Heart } from "lucide-react"

const Index = () => {
  const [poemProgress, setPoemProgress] = useState(0)
  const [showMainContent, setShowMainContent] = useState(false)
  const [showFlashCards, setShowFlashCards] = useState(false)

  const handlePoemProgress = (progress: number) => {
    setPoemProgress(progress)

    // Show flashcards first after poem is complete
    if (progress >= 100 && !showFlashCards) {
      setTimeout(() => setShowFlashCards(true), 800) // Smooth delay
    }
  }

  // Show main content after a delay when flashcards are shown
  const handleContinueToMainContent = () => {
    setShowMainContent(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-blood-red-950/10 to-black">
      <FloatingHearts />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Poem Section - Always visible when not complete */}
        {poemProgress < 100 && (
          <section className="w-full">
            <PoemSection onProgressUpdate={handlePoemProgress} />
          </section>
        )}

        {/* Flash Cards Section - Shows after poem is complete */}
        {showFlashCards && !showMainContent && (
          <section className="w-full py-12">
            <FlashCardsSection />

            <div className="mt-16 text-center">
              <button
                onClick={handleContinueToMainContent}
                className="glass-effect px-8 py-3 rounded-full border border-blood-red-400/30 text-blood-red-100 flex items-center gap-2 mx-auto hover:border-blood-red-400/50 hover:shadow-glow-red transition-all duration-300"
              >
                <span>Continuar</span>
                <Heart className="text-blood-red-400 fill-current" size={16} />
              </button>
            </div>
          </section>
        )}

        {/* Main Content - Shows only after flashcards */}
        {showMainContent && (
          <div className="space-y-20 animate-fade-in">
            {/* Header */}
            <header className="text-center py-20">
              <div className="flex items-center justify-center gap-4 mb-8 animate-scale-in">
                <Heart className="text-blood-red-400 animate-soft-pulse fill-current" size={40} />
                <h1 className="text-4xl md:text-6xl font-bold text-shadow bg-gradient-to-r from-white via-blood-red-200 to-white bg-clip-text text-transparent animate-gradient">
                  Para Você
                </h1>
                <Heart className="text-blood-red-400 animate-soft-pulse fill-current" size={40} />
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed animate-slide-in">
                Eu te amo minha pituca
              </p>
            </header>

            {/* Days Counter */}
            <section className="max-w-md mx-auto stagger-1 animate-fade-in">
              <DaysCounter />
            </section>

            {/* Footer */}
            <footer className="text-center py-20 stagger-5 animate-fade-in">
              <div className="glass-effect rounded-xl p-8 max-w-2xl mx-auto border border-blood-red-900/20 smooth-transition">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="text-blood-red-400 fill-current animate-soft-pulse" size={24} />
                  <Heart className="text-purple-400 fill-current animate-soft-pulse" size={20} />
                  <Heart className="text-blood-red-400 fill-current animate-soft-pulse" size={24} />
                </div>
                <p className="text-lg text-gray-300 italic">
                  "Em cada batida do meu coração, há uma sílaba do seu nome"
                </p>
                <p className="text-sm text-gray-500 mt-4">Feito com muito amor ❤️</p>
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
