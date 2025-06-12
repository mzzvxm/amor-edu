"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface PoemSectionProps {
  onProgressUpdate?: (progress: number) => void
}

// Component for floating hearts specifically for the poem section
const PoemFloatingHearts = () => {
  const [hearts, setHearts] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      delay: number
      duration: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = []
      for (let i = 0; i < 8; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: 100 + Math.random() * 20,
          size: Math.random() * 1.5 + 0.8, // Smaller hearts for poem
          delay: Math.random() * 8,
          duration: Math.random() * 8 + 12, // 12-20s duration
          opacity: Math.random() * 0.25 + 0.1, // Very subtle (0.1-0.35)
        })
      }
      setHearts(newHearts)
    }

    generateHearts()

    const interval = setInterval(() => {
      generateHearts()
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
          <Heart size={heart.size * 12} className="text-blood-red-400 fill-current" />
        </div>
      ))}
    </div>
  )
}

const PoemSection = ({ onProgressUpdate }: PoemSectionProps) => {
  const [currentPhase, setCurrentPhase] = useState<"welcome" | "poem">("welcome")
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showTimeText, setShowTimeText] = useState(false)
  const [showEyesPhoto, setShowEyesPhoto] = useState(false)
  const [lineKey, setLineKey] = useState(0)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const welcomeLines = [
    "oi meu amor",
    "hoje é dia 12",
    "eu fiz esse site pra tentar demonstrar todo o meu amor por você, mesmo que apenas assim seja pouco",
    "eu provavelmente estou na sua frente agora",
    "eu te amo. aproveite um de seus presentes!",
  ]

  const poemLines = [
    "sinto um fervor subir do peito quando penso em ti",
    "e não desses que queimam e somem",
    "mas um que se espalha devagarinho",
    "do coração até a ponta dos dedos",
    "como se teu nome tivesse acendido uma estrela dentro de mim",
    "e transformasse cada célula do meu corpo",
    "num altar aceso",
    "só pra te receber",
    "você é um feitiço bordado a mão",
    "o universo te costurou do avesso do tempo",
    "só pra caber no meu destino",
    "você é mística",
    "te amar é ter a alma lavada toda vez que seus olhos",
    "(seus olhos que são só teus)",
    "se debruçam sobre mim",
    "e fazem o mundo desaparecer",
    "somos nós dois",
    "sempre.",
  ]

  // Calculate time difference
  useEffect(() => {
    const startDate = new Date("2024-01-03")

    const updateTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
      const totalHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const totalMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setDays(totalDays)
      setHours(totalHours)
      setMinutes(totalMinutes)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const addWordEffects = (text: string) => {
    const wordEffects = {
      fervor: "word-fervor",
      queimam: "word-fire",
      estrela: "word-star",
      aceso: "word-bright",
      feitiço: "word-magic",
      mística: "word-mystic",
      olhos: "word-eyes",
      alma: "word-soul",
      coração: "word-heart",
      sempre: "word-eternity",
      nome: "word-name",
      destino: "word-destiny",
    }

    let processedText = text

    Object.entries(wordEffects).forEach(([word, className]) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi")
      processedText = processedText.replace(regex, `<span class="${className}">${word}</span>`)
    })

    return processedText
  }

  const getCurrentLines = () => {
    return currentPhase === "welcome" ? welcomeLines : poemLines
  }

  const getCurrentLine = () => {
    const lines = getCurrentLines()
    return lines[currentLineIndex] || ""
  }

  const getLineDuration = (line: string) => {
    return line.length > 50 ? 5000 : 4000
  }

  const getTotalLines = () => {
    return welcomeLines.length + poemLines.length
  }

  const getCurrentProgress = () => {
    const totalWelcomeLines = welcomeLines.length
    if (currentPhase === "welcome") {
      return currentLineIndex + 1
    } else {
      return totalWelcomeLines + currentLineIndex + 1
    }
  }

  const shouldShowTimeText = () => {
    return currentPhase === "poem" && currentLineIndex === 8 // Linha "você é um feitiço bordado a mão"
  }

  const shouldShowEyesPhoto = () => {
    return currentPhase === "poem" && (currentLineIndex === 12 || currentLineIndex === 13) // Linhas sobre os olhos
  }

  // Auto-dismiss elements
  useEffect(() => {
    if (showTimeText) {
      const timer = setTimeout(() => {
        setShowTimeText(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showTimeText])

  useEffect(() => {
    if (showEyesPhoto) {
      const timer = setTimeout(() => {
        setShowEyesPhoto(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showEyesPhoto])

  useEffect(() => {
    if (isComplete) return

    const lines = getCurrentLines()
    const currentLine = getCurrentLine()
    const duration = getLineDuration(currentLine)

    // Show elements based on progress
    if (shouldShowTimeText() && !showTimeText) {
      setShowTimeText(true)
    }
    if (shouldShowEyesPhoto() && !showEyesPhoto) {
      setShowEyesPhoto(true)
    }

    // Notify parent about progress
    if (onProgressUpdate) {
      const progress = getCurrentProgress()
      const total = getTotalLines()
      onProgressUpdate((progress / total) * 100)
    }

    const timer = setTimeout(() => {
      if (currentLineIndex < lines.length - 1) {
        setCurrentLineIndex((prev) => prev + 1)
        setLineKey((prev) => prev + 1)
      } else if (currentPhase === "welcome") {
        setCurrentPhase("poem")
        setCurrentLineIndex(0)
        setLineKey((prev) => prev + 1)
      } else {
        setIsComplete(true)
        if (onProgressUpdate) {
          onProgressUpdate(100)
        }
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [currentLineIndex, currentPhase, isComplete, onProgressUpdate, showTimeText, showEyesPhoto])

  if (isComplete) {
    return null
  }

  const currentLine = getCurrentLine()
  const processedLine = currentPhase === "poem" ? addWordEffects(currentLine) : currentLine

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 backdrop-blur-smooth flex items-center justify-center overflow-hidden">
      {/* Floating Hearts for Poem Section */}
      <PoemFloatingHearts />

      {/* Subtle Red Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="poem-red-gradient-1"></div>
        <div className="poem-red-gradient-2"></div>
        <div className="poem-red-gradient-3"></div>
      </div>

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blood-red-900/8 via-purple-900/5 via-transparent to-blood-red-900/8 animate-gradient"></div>

      <div className="relative z-10 w-full px-6 text-center">
        {/* Eyes photo - appears above the text when talking about eyes */}
        {showEyesPhoto && (
          <div className="mb-8 animate-scale-in">
            <img
              src="https://i.postimg.cc/jStLd6hk/Design-sem-nome-13.png"
              alt="Seus olhos únicos"
              className="mx-auto rounded-lg shadow-2xl border border-blood-red-400/30 opacity-85 smooth-transition hover:opacity-95"
              style={{ maxWidth: "900px", height: "150px", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Main poem content with enhanced animations */}
        <div className="min-h-[200px] flex items-center justify-center">
          <div key={lineKey} className="animate-text-reveal will-change-transform will-change-opacity">
            <div
              className={`leading-relaxed smooth-transition ${
                currentPhase === "welcome"
                  ? "text-xl md:text-2xl lg:text-3xl font-light"
                  : "text-lg md:text-xl lg:text-2xl font-light"
              } ${getCurrentLine().includes("(seus olhos") ? "text-blood-red-300 italic text-base" : ""} ${
                getCurrentLine().includes("seus olhos") ? "text-blood-red-200" : ""
              } text-white`}
              dangerouslySetInnerHTML={{ __html: processedLine }}
            />
          </div>
        </div>

        {/* Enhanced time text */}
        {showTimeText && (
          <div className="mt-8 animate-scale-in">
            <p className="text-blood-red-300 text-lg font-light italic smooth-transition">
              estou te <span className="word-heart">amando</span> há <span className="word-eternity">{days} dias</span>,{" "}
              <span className="word-eternity">{hours} horas</span> e{" "}
              <span className="word-eternity">{minutes} minutos</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PoemSection
