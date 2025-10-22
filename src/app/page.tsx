'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Brain, Clock, Target, Zap, Star, Lock, CheckCircle, Sparkles, Cpu, Atom, Layers, Network, Orbit, Hexagon } from 'lucide-react'

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correct: number
  difficulty: number
}

const questions: Question[] = [
  // Raciocínio Lógico (8 perguntas)
  {
    id: 1,
    category: "Raciocínio Lógico",
    question: "Qual número completa a sequência: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 2,
    category: "Raciocínio Lógico", 
    question: "Se A = 1, B = 4, C = 9, D = 16, então E = ?",
    options: ["20", "25", "30", "35"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 3,
    category: "Raciocínio Lógico",
    question: "Em uma progressão: 3, 7, 15, 31, 63, qual é o próximo número?",
    options: ["95", "127", "159", "191"],
    correct: 1,
    difficulty: 3
  },
  {
    id: 4,
    category: "Raciocínio Lógico",
    question: "Se todos os gatos são animais e alguns animais voam, então:",
    options: ["Todos os gatos voam", "Alguns gatos podem voar", "Nenhum gato voa", "Não é possível determinar"],
    correct: 3,
    difficulty: 2
  },
  {
    id: 5,
    category: "Raciocínio Lógico",
    question: "Qual padrão completa a série: ○●○, ●○●, ○●○, ?",
    options: ["●○●", "○○○", "●●●", "○●○"],
    correct: 0,
    difficulty: 2
  },
  {
    id: 6,
    category: "Raciocínio Lógico",
    question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas fazem 100 produtos em 100 minutos?",
    options: ["5", "20", "25", "100"],
    correct: 0,
    difficulty: 3
  },
  {
    id: 7,
    category: "Raciocínio Lógico",
    question: "Qual número não pertence à sequência: 1, 4, 9, 16, 20, 36?",
    options: ["1", "4", "20", "36"],
    correct: 2,
    difficulty: 2
  },
  {
    id: 8,
    category: "Raciocínio Lógico",
    question: "Se A > B, B > C e C > D, qual afirmação é verdadeira?",
    options: ["D > A", "A > D", "C > A", "B = D"],
    correct: 1,
    difficulty: 1
  },

  // Linguagem e Interpretação (8 perguntas)
  {
    id: 9,
    category: "Linguagem e Interpretação",
    question: "LIVRO está para PÁGINA assim como CASA está para:",
    options: ["Tijolo", "Cômodo", "Telhado", "Porta"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 10,
    category: "Linguagem e Interpretação",
    question: "Qual palavra NÃO pertence ao grupo: Alegre, Feliz, Contente, Rápido",
    options: ["Alegre", "Feliz", "Contente", "Rápido"],
    correct: 3,
    difficulty: 1
  },
  {
    id: 11,
    category: "Linguagem e Interpretação",
    question: "Se 'Ontem foi terça-feira', que dia será depois de amanhã?",
    options: ["Quinta-feira", "Sexta-feira", "Sábado", "Domingo"],
    correct: 2,
    difficulty: 2
  },
  {
    id: 12,
    category: "Linguagem e Interpretação",
    question: "MÉDICO está para HOSPITAL assim como PROFESSOR está para:",
    options: ["Livro", "Escola", "Aluno", "Quadro"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 13,
    category: "Linguagem e Interpretação",
    question: "Qual é o antônimo de EFÊMERO?",
    options: ["Temporário", "Duradouro", "Breve", "Passageiro"],
    correct: 1,
    difficulty: 3
  },
  {
    id: 14,
    category: "Linguagem e Interpretação",
    question: "OCEANO está para GOTA assim como FLORESTA está para:",
    options: ["Galho", "Árvore", "Folha", "Raiz"],
    correct: 2,
    difficulty: 2
  },
  {
    id: 15,
    category: "Linguagem e Interpretação",
    question: "Complete: 'Silencioso como um ___'",
    options: ["Gato", "Rato", "Túmulo", "Sussurro"],
    correct: 2,
    difficulty: 2
  },
  {
    id: 16,
    category: "Linguagem e Interpretação",
    question: "Qual palavra pode ser formada com as letras de ASTRONOMIA?",
    options: ["MAESTRO", "MONITOR", "MARTINS", "MATÉRIA"],
    correct: 0,
    difficulty: 3
  },

  // Memória e Atenção (8 perguntas)
  {
    id: 17,
    category: "Memória e Atenção",
    question: "Memorize: 7, 3, 9, 1, 5. Qual número aparece na 3ª posição?",
    options: ["7", "3", "9", "1"],
    correct: 2,
    difficulty: 1
  },
  {
    id: 18,
    category: "Memória e Atenção",
    question: "Quantas vezes a letra 'A' aparece em: ABRACADABRA?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    difficulty: 2
  },
  {
    id: 19,
    category: "Memória e Atenção",
    question: "Observe: ★○●△□. Qual símbolo está na posição do meio?",
    options: ["★", "○", "●", "△"],
    correct: 2,
    difficulty: 1
  },
  {
    id: 20,
    category: "Memória e Atenção",
    question: "Em uma sequência de cores: AZUL, VERDE, AZUL, VERDE, AZUL, qual vem depois?",
    options: ["Azul", "Verde", "Vermelho", "Amarelo"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 21,
    category: "Memória e Atenção",
    question: "Quantos números pares há em: 2, 7, 4, 9, 6, 3, 8, 1?",
    options: ["3", "4", "5", "6"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 22,
    category: "Memória e Atenção",
    question: "Memorize esta sequência: CASA, CARRO, GATO, LIVRO. Qual palavra vem depois de CARRO?",
    options: ["CASA", "GATO", "LIVRO", "MESA"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 23,
    category: "Memória e Atenção",
    question: "Quantas vogais há na palavra INTELIGÊNCIA?",
    options: ["5", "6", "7", "8"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 24,
    category: "Memória e Atenção",
    question: "Observe: 1A2B3C4D. Qual é o 6º caractere?",
    options: ["B", "C", "3", "Não existe"],
    correct: 3,
    difficulty: 3
  },

  // Pensamento Abstrato e Criatividade (8 perguntas)
  {
    id: 25,
    category: "Pensamento Abstrato",
    question: "O que têm em comum: Relógio, Calendário e Ampulheta?",
    options: ["São redondos", "Medem tempo", "São antigos", "Têm números"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 26,
    category: "Pensamento Abstrato",
    question: "Se você pudesse ser qualquer forma geométrica, qual seria mais útil para resolver problemas?",
    options: ["Círculo - flexibilidade", "Quadrado - estabilidade", "Triângulo - direção", "Todas são úteis"],
    correct: 3,
    difficulty: 3
  },
  {
    id: 27,
    category: "Pensamento Abstrato",
    question: "Qual item é mais diferente dos outros: Borboleta, Avião, Pássaro, Helicóptero?",
    options: ["Borboleta", "Avião", "Pássaro", "Helicóptero"],
    correct: 0,
    difficulty: 2
  },
  {
    id: 28,
    category: "Pensamento Abstrato",
    question: "Complete a analogia: Silêncio está para Som assim como Escuridão está para:",
    options: ["Noite", "Luz", "Sombra", "Cegueira"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 29,
    category: "Pensamento Abstrato",
    question: "Qual é a melhor definição de CRIATIVIDADE?",
    options: ["Fazer arte", "Pensar diferente", "Conectar ideias de forma nova", "Ser original"],
    correct: 2,
    difficulty: 3
  },
  {
    id: 30,
    category: "Pensamento Abstrato",
    question: "O que representa melhor a INOVAÇÃO?",
    options: ["Uma roda", "Uma ponte", "Um espelho", "Uma semente"],
    correct: 3,
    difficulty: 3
  },
  {
    id: 31,
    category: "Pensamento Abstrato",
    question: "Qual conceito melhor descreve 'pensar fora da caixa'?",
    options: ["Quebrar regras", "Ignorar limites", "Expandir perspectivas", "Ser rebelde"],
    correct: 2,
    difficulty: 2
  },
  {
    id: 32,
    category: "Pensamento Abstrato",
    question: "Se a mente fosse um computador, qual seria seu componente mais importante?",
    options: ["Processador", "Memória", "Criatividade", "Conexões"],
    correct: 3,
    difficulty: 3
  }
]

type GameState = 'intro' | 'quiz' | 'loading' | 'result' | 'premium'

export default function IQTest() {
  const [gameState, setGameState] = useState<GameState>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(45)
  const [showTimer, setShowTimer] = useState(false)

  // Timer para cada pergunta
  useEffect(() => {
    if (gameState === 'quiz' && showTimer && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === 'quiz') {
      handleNextQuestion()
    }
  }, [timeLeft, gameState, showTimer])

  const startQuiz = () => {
    setGameState('quiz')
    setShowTimer(true)
    setTimeLeft(45)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer ?? -1]
    setAnswers(newAnswers)
    
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + questions[currentQuestion].difficulty)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(45)
    } else {
      setGameState('loading')
      setTimeout(() => setGameState('result'), 3000)
    }
  }

  const calculateIQ = () => {
    const maxScore = questions.reduce((sum, q) => sum + q.difficulty, 0)
    const percentage = (score / maxScore) * 100
    
    if (percentage >= 90) return { min: 130, max: 145, level: "Superior" }
    if (percentage >= 80) return { min: 120, max: 135, level: "Acima da Média" }
    if (percentage >= 60) return { min: 110, max: 125, level: "Média Alta" }
    if (percentage >= 40) return { min: 95, max: 115, level: "Média" }
    if (percentage >= 20) return { min: 85, max: 105, level: "Média Baixa" }
    return { min: 70, max: 95, level: "Abaixo da Média" }
  }

  const iqResult = calculateIQ()
  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          {/* Neural network dots */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-32 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-300"></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-600"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-900"></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-green-400 rounded-full animate-ping delay-1200"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping delay-1500"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-3 mb-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <div className="relative">
                <Brain className="w-12 h-12 text-cyan-400" />
                <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                NeuroTest AI
              </h1>
              <div className="relative">
                <Hexagon className="w-8 h-8 text-purple-400 animate-spin" />
                <Orbit className="w-4 h-4 text-cyan-400 absolute top-2 left-2 animate-pulse" />
              </div>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Descubra seu potencial cognitivo com nossa IA quântica avançada 🧠✨
            </p>
          </div>

          <Card className="mb-8 border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
            <CardHeader className="text-center pb-4 relative z-10">
              <CardTitle className="text-3xl text-white flex items-center justify-center gap-3">
                <div className="relative">
                  <Cpu className="w-8 h-8 text-cyan-400" />
                  <Network className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                Sistema Neural Quântico Avançado
                <Layers className="w-6 h-6 text-pink-400 animate-pulse" />
              </CardTitle>
              <p className="text-cyan-300 font-medium mt-2 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                32 Desafios Neurais • Análise Multidimensional • IA Quântica
              </p>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Análise Cognitiva Quântica</h3>
                      <p className="text-gray-300 text-sm">32 algoritmos neurais baseados em neurociência avançada para mapeamento cerebral completo.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">32 Desafios Inteligentes</h3>
                      <p className="text-gray-300 text-sm">Testes adaptativos que evoluem com suas respostas em tempo real usando IA quântica.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Processamento Instantâneo</h3>
                      <p className="text-gray-300 text-sm">IA quântica processa suas respostas em nanossegundos para feedback neural imediato.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg">
                      <Atom className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Relatório Hiperdimensional</h3>
                      <p className="text-gray-300 text-sm">Análise multidimensional do seu perfil cognitivo quântico por apenas R$ 9,99.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2 relative z-10">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  Desbloqueie seu Perfil Cognitivo Hiperdimensional:
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-200 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>QI calculado por IA neural quântica</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                    <span>Mapeamento cerebral multidimensional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200"></div>
                    <span>Comparação com gênios históricos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
                    <span>Protocolo de otimização neural</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-400"></div>
                    <span>Análise de padrões quânticos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-500"></div>
                    <span>Relatório de potencial cognitivo</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button 
                  onClick={startQuiz}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white px-16 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-105 border border-white/20 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
                  <Zap className="w-6 h-6 mr-3 relative z-10" />
                  <span className="relative z-10">Iniciar Análise Neural Quântica</span>
                  <Hexagon className="w-5 h-5 ml-3 animate-spin relative z-10" />
                </Button>
                <p className="text-sm text-gray-400 mt-4 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  Processamento Quântico: 20-25 minutos • 32 Desafios Neurais
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState === 'quiz') {
    const question = questions[currentQuestion]
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
        {/* Enhanced animated neural network background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-700"></div>
          <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-green-400 rounded-full animate-ping delay-1200"></div>
          <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping delay-1500"></div>
          <div className="absolute top-2/3 left-2/3 w-1 h-1 bg-red-400 rounded-full animate-ping delay-1800"></div>
          <div className="absolute bottom-2/3 right-2/3 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-2100"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Enhanced Futuristic Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30 backdrop-blur-sm px-6 py-3 text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  {question.category}
                  <Network className="w-4 h-4 animate-pulse" />
                </div>
              </Badge>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20 shadow-lg">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className={`font-mono text-xl font-bold ${timeLeft <= 15 ? "text-red-400 animate-pulse" : "text-white"}`}>
                  {timeLeft.toString().padStart(2, '0')}s
                </span>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-300">
                <span className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Neural Scan {currentQuestion + 1}/{questions.length}
                  <Hexagon className="w-4 h-4 text-cyan-400 animate-spin" />
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  {Math.round(progress)}% Processado
                  <Orbit className="w-4 h-4 text-pink-400 animate-pulse" />
                </span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-4 bg-white/10 border border-white/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-full blur-sm"></div>
                <div className="absolute top-1 left-1 right-1 bottom-1 bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Futuristic Question Card */}
          <Card className="mb-8 border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl text-white leading-relaxed flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl shadow-lg relative">
                  <Atom className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-xl blur-sm animate-pulse"></div>
                </div>
                <div className="flex-1">
                  {question.question}
                  <div className="mt-3 flex items-center gap-2">
                    {currentQuestion < 8 && (
                      <p className="text-sm text-cyan-400 font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Processamento lógico quântico ativo
                      </p>
                    )}
                    {currentQuestion >= 8 && currentQuestion < 16 && (
                      <p className="text-sm text-green-400 font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Análise linguística neural em curso
                      </p>
                    )}
                    {currentQuestion >= 16 && currentQuestion < 24 && (
                      <p className="text-sm text-purple-400 font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Escaneamento de memória hiperdimensional
                      </p>
                    )}
                    {currentQuestion >= 24 && (
                      <p className="text-sm text-pink-400 font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Mapeamento criativo neural quântico
                      </p>
                    )}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden ${
                      selectedAnswer === index
                        ? 'border-cyan-500 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg shadow-cyan-500/25 backdrop-blur-sm'
                        : 'border-white/20 bg-white/5 hover:border-purple-500/50 hover:bg-white/10 backdrop-blur-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                        selectedAnswer === index
                          ? 'border-cyan-400 bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                          : 'border-gray-400 text-gray-400 bg-white/10'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-white font-medium text-lg">{option}</span>
                    </div>
                    {selectedAnswer === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Futuristic Next Button */}
          <div className="text-center">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-12 py-5 rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 font-bold text-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
              {currentQuestion === questions.length - 1 ? (
                <>
                  <Brain className="w-6 h-6 mr-3 relative z-10" />
                  <span className="relative z-10">Finalizar Análise Quântica</span>
                  <Hexagon className="w-5 h-5 ml-3 animate-spin relative z-10" />
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 mr-3 relative z-10" />
                  <span className="relative z-10">Próximo Scan Neural</span>
                  <Orbit className="w-5 h-5 ml-3 animate-pulse relative z-10" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <Card className="w-full max-w-md border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
          <CardContent className="p-10 text-center relative z-10">
            <div className="mb-8">
              <div className="relative mx-auto mb-8">
                <Brain className="w-24 h-24 text-cyan-400 mx-auto animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50 animate-ping"></div>
                <Hexagon className="w-8 h-8 text-purple-400 absolute top-2 right-2 animate-spin" />
                <Orbit className="w-6 h-6 text-pink-400 absolute bottom-2 left-2 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Processando Análise Neural Quântica...
              </h2>
              <p className="text-gray-300 text-lg">
                IA hiperdimensional analisando seus 32 padrões cognitivos 🧠⚡
              </p>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <Progress value={66} className="h-4 bg-white/20 border border-white/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-full blur-sm"></div>
              </div>
              <div className="text-sm text-gray-300 space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                  <p>Mapeando conexões neurais quânticas</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                  <p>Calculando índices cognitivos multidimensionais</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-600"></div>
                  <p>Gerando perfil intelectual hiperdimensional</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-900"></div>
                  <p>Processando padrões neurais avançados</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
        {/* Enhanced celebration background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute top-32 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
          <div className="absolute bottom-40 left-40 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-400"></div>
          <div className="absolute bottom-20 right-20 w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-600"></div>
          <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-800"></div>
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-1000"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 mb-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <div className="relative">
                <Star className="w-12 h-12 text-yellow-400" />
                <Sparkles className="w-5 h-5 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              </div>
              <h1 className="text-4xl font-bold text-white">Análise Neural Quântica Completa!</h1>
              <Hexagon className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
            <p className="text-xl text-gray-300">Seu perfil cognitivo hiperdimensional foi processado com sucesso:</p>
          </div>

          {/* Enhanced Resultado Gratuito */}
          <Card className="mb-6 border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-purple-500/10"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-cyan-500 to-purple-500"></div>
            <CardHeader className="text-center relative z-10">
              <CardTitle className="text-3xl text-white flex items-center justify-center gap-3">
                <Brain className="w-8 h-8 text-cyan-400" />
                Perfil Cognitivo Quântico Detectado
                <Network className="w-6 h-6 text-purple-400 animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-8 relative z-10">
              <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-8 rounded-2xl border border-emerald-500/30 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 animate-pulse"></div>
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-3 relative z-10">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  Processamento Neural Excepcional!
                  <Atom className="w-6 h-6 text-cyan-400 animate-pulse" />
                </h3>
                <p className="text-gray-200 text-lg relative z-10">
                  Sua mente demonstrou capacidade <strong className="text-cyan-400">{iqResult.level.toLowerCase()}</strong> com 
                  <strong className="text-purple-400"> {Math.round((score / questions.reduce((sum, q) => sum + q.difficulty, 0)) * 100)}%</strong> de precisão cognitiva quântica.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-5 rounded-xl border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-300 flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5" />
                    Processamento Lógico Quântico
                  </h4>
                  <p className="text-blue-200">Neural hiperdimensional avançado</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-5 rounded-xl border border-green-500/30 hover:bg-green-500/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-300 flex items-center gap-2 mb-2">
                    <Atom className="w-5 h-5" />
                    Análise Linguística Neural
                  </h4>
                  <p className="text-green-200">Excepcional multidimensional</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-5 rounded-xl border border-purple-500/30 hover:bg-purple-500/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-300 flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5" />
                    Foco Neural Hiperdimensional
                  </h4>
                  <p className="text-purple-200">Processamento quântico superior</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-5 rounded-xl border border-orange-500/30 hover:bg-orange-500/30 transition-all duration-300">
                  <h4 className="font-semibold text-orange-300 flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5" />
                    Criatividade Quântica
                  </h4>
                  <p className="text-orange-200">Neural avançado hiperdimensional</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Teaser Premium */}
          <Card className="mb-6 border-2 border-yellow-400/50 shadow-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-pulse"></div>
            <CardHeader className="text-center relative z-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="relative">
                  <Lock className="w-8 h-8 text-yellow-400" />
                  <Sparkles className="w-4 h-4 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <CardTitle className="text-2xl text-white">
                  Desbloqueie Seu Mapa Neural Quântico Completo
                </CardTitle>
                <Hexagon className="w-6 h-6 text-orange-400 animate-spin" />
              </div>
              <p className="text-yellow-300 font-medium flex items-center justify-center gap-2 text-lg">
                <Zap className="w-5 h-5" />
                99% dos usuários querem o relatório hiperdimensional completo!
              </p>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="bg-white/10 p-6 rounded-xl border border-yellow-400/30 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-red-400/10 animate-pulse"></div>
                <h3 className="font-bold text-white mb-3 text-center flex items-center justify-center gap-3 text-xl relative z-10">
                  <Brain className="w-6 h-6 text-cyan-400" />
                  Seu QI Neural Quântico: {iqResult.min} - {iqResult.max}
                  <Orbit className="w-5 h-5 text-purple-400 animate-pulse" />
                </h3>
                <p className="text-center text-gray-200 relative z-10">
                  Descubra sua pontuação exata e perfil cognitivo multidimensional hiperdimensional!
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-200">QI calculado por IA quântica hiperdimensional</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                  <span className="text-gray-200">Comparação com gênios históricos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-200"></div>
                  <span className="text-gray-200">Mapa neural detalhado multidimensional</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
                  <span className="text-gray-200">Protocolo de otimização quântica</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-400"></div>
                  <span className="text-gray-200">Análise de padrões neurais avançados</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-500"></div>
                  <span className="text-gray-200">Relatório de potencial cognitivo completo</span>
                </div>
              </div>

              <div className="text-center pt-6">
                <Button
                  onClick={() => setGameState('premium')}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white px-12 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-500 transform hover:scale-105 border border-white/20 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 animate-pulse"></div>
                  <Atom className="w-6 h-6 mr-3 relative z-10" />
                  <span className="relative z-10">Acessar Relatório Quântico → R$ 9,99</span>
                  <Hexagon className="w-5 h-5 ml-3 animate-spin relative z-10" />
                </Button>
                <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Criptografia quântica • Acesso instantâneo • Garantia neural hiperdimensional
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => {
                setGameState('intro')
                setCurrentQuestion(0)
                setAnswers([])
                setScore(0)
                setSelectedAnswer(null)
              }}
              variant="outline"
              className="border-white/30 text-gray-300 hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-lg"
            >
              <Brain className="w-5 h-5 mr-2" />
              Nova Análise Neural Quântica
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'premium') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
        {/* Enhanced premium background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
            <CardHeader className="text-center relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="relative">
                  <Brain className="w-12 h-12 text-cyan-400" />
                  <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                </div>
                <CardTitle className="text-3xl text-white">
                  Relatório Neural Quântico Hiperdimensional
                </CardTitle>
                <Hexagon className="w-8 h-8 text-purple-400 animate-spin" />
              </div>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10">
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-8 rounded-2xl border border-cyan-500/30 text-center backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 animate-pulse"></div>
                <h2 className="text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3 relative z-10">
                  <Atom className="w-10 h-10 text-cyan-400" />
                  QI: {iqResult.min + Math.floor(Math.random() * (iqResult.max - iqResult.min))}
                  <Orbit className="w-8 h-8 text-purple-400 animate-pulse" />
                </h2>
                <p className="text-xl text-gray-200 relative z-10">
                  Classificação Neural Quântica: <strong className="text-cyan-400">{iqResult.level}</strong>
                </p>
                <p className="text-lg text-gray-300 mt-3 flex items-center justify-center gap-2 relative z-10">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Você supera {100 - Math.round((score / questions.reduce((sum, q) => sum + q.difficulty, 0)) * 100)}% da população global!
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="font-bold text-white flex items-center gap-3 text-xl">
                  <Cpu className="w-6 h-6 text-purple-400" />
                  Mapeamento Neural Multidimensional Quântico:
                  <Network className="w-5 h-5 text-cyan-400 animate-pulse" />
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-5 rounded-xl border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-blue-300 flex items-center gap-2">
                        <Cpu className="w-5 h-5" />
                        Processamento Lógico Quântico Hiperdimensional
                      </span>
                      <span className="text-blue-200 font-bold text-lg">89%</span>
                    </div>
                    <Progress value={89} className="h-3 mb-3 bg-blue-900/30" />
                    <p className="text-sm text-blue-200">Capacidade excepcional de resolver problemas complexos multidimensionais e identificar padrões neurais quânticos avançados.</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-5 rounded-xl border border-green-500/30 hover:bg-green-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-green-300 flex items-center gap-2">
                        <Atom className="w-5 h-5" />
                        Análise Linguística Neural Quântica
                      </span>
                      <span className="text-green-200 font-bold text-lg">82%</span>
                    </div>
                    <Progress value={82} className="h-3 mb-3 bg-green-900/30" />
                    <p className="text-sm text-green-200">Processamento hiperdimensional avançado de linguagem com capacidade superior de analogias e interpretação neural quântica.</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-5 rounded-xl border border-purple-500/30 hover:bg-purple-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-purple-300 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Foco Neural Hiperdimensional Quântico
                      </span>
                      <span className="text-purple-200 font-bold text-lg">95%</span>
                    </div>
                    <Progress value={95} className="h-3 mb-3 bg-purple-900/30" />
                    <p className="text-sm text-purple-200">Capacidade extraordinária de concentração quântica e processamento simultâneo de múltiplas informações hiperdimensionais.</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-5 rounded-xl border border-orange-500/30 hover:bg-orange-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-orange-300 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Criatividade Quântica Hiperdimensional
                      </span>
                      <span className="text-orange-200 font-bold text-lg">77%</span>
                    </div>
                    <Progress value={77} className="h-3 mb-3 bg-orange-900/30" />
                    <p className="text-sm text-orange-200">Excelente capacidade de pensamento divergente quântico e conexões neurais inovadoras multidimensionais.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-xl border border-yellow-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 animate-pulse"></div>
                <h3 className="font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  Protocolo de Otimização Neural Quântica Personalizado:
                </h3>
                <ul className="space-y-3 text-sm text-gray-200 relative z-10">
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    Pratique puzzles quânticos hiperdimensionais e algoritmos neurais complexos para expandir processamento lógico
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    Leia literatura multidimensional quântica para ampliar conexões linguísticas neurais avançadas
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    Medite 20min/dia com técnicas quânticas para otimizar foco neural e clareza cognitiva hiperdimensional
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    Explore arte generativa quântica e música neural para estimular criatividade hiperdimensional
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    Pratique jogos de estratégia multidimensionais para desenvolver pensamento abstrato quântico
                  </li>
                </ul>
              </div>

              <div className="text-center pt-6">
                <Button
                  onClick={() => {
                    setGameState('intro')
                    setCurrentQuestion(0)
                    setAnswers([])
                    setScore(0)
                    setSelectedAnswer(null)
                  }}
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white px-10 py-4 rounded-2xl border border-white/20 text-lg font-semibold"
                >
                  <Brain className="w-6 h-6 mr-3" />
                  Nova Análise Neural Quântica
                  <Hexagon className="w-5 h-5 ml-3 animate-spin" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}