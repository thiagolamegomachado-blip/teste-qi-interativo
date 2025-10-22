'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Brain, Clock, Target, Zap, Star, Lock, CheckCircle, Sparkles, Cpu, Atom } from 'lucide-react'

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correct: number
  difficulty: number
}

const questions: Question[] = [
  // Raciocínio Lógico (5 perguntas)
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

  // Linguagem e Interpretação (5 perguntas)
  {
    id: 6,
    category: "Linguagem e Interpretação",
    question: "LIVRO está para PÁGINA assim como CASA está para:",
    options: ["Tijolo", "Cômodo", "Telhado", "Porta"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 7,
    category: "Linguagem e Interpretação",
    question: "Qual palavra NÃO pertence ao grupo: Alegre, Feliz, Contente, Rápido",
    options: ["Alegre", "Feliz", "Contente", "Rápido"],
    correct: 3,
    difficulty: 1
  },
  {
    id: 8,
    category: "Linguagem e Interpretação",
    question: "Se 'Ontem foi terça-feira', que dia será depois de amanhã?",
    options: ["Quinta-feira", "Sexta-feira", "Sábado", "Domingo"],
    correct: 2,
    difficulty: 2
  },
  {
    id: 9,
    category: "Linguagem e Interpretação",
    question: "MÉDICO está para HOSPITAL assim como PROFESSOR está para:",
    options: ["Livro", "Escola", "Aluno", "Quadro"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 10,
    category: "Linguagem e Interpretação",
    question: "Qual é o antônimo de EFÊMERO?",
    options: ["Temporário", "Duradouro", "Breve", "Passageiro"],
    correct: 1,
    difficulty: 3
  },

  // Memória e Atenção (5 perguntas)
  {
    id: 11,
    category: "Memória e Atenção",
    question: "Memorize: 7, 3, 9, 1, 5. Qual número aparece na 3ª posição?",
    options: ["7", "3", "9", "1"],
    correct: 2,
    difficulty: 1
  },
  {
    id: 12,
    category: "Memória e Atenção",
    question: "Quantas vezes a letra 'A' aparece em: ABRACADABRA?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    difficulty: 2
  },
  {
    id: 13,
    category: "Memória e Atenção",
    question: "Observe: ★○●△□. Qual símbolo está na posição do meio?",
    options: ["★", "○", "●", "△"],
    correct: 2,
    difficulty: 1
  },
  {
    id: 14,
    category: "Memória e Atenção",
    question: "Em uma sequência de cores: AZUL, VERDE, AZUL, VERDE, AZUL, qual vem depois?",
    options: ["Azul", "Verde", "Vermelho", "Amarelo"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 15,
    category: "Memória e Atenção",
    question: "Quantos números pares há em: 2, 7, 4, 9, 6, 3, 8, 1?",
    options: ["3", "4", "5", "6"],
    correct: 1,
    difficulty: 2
  },

  // Pensamento Abstrato e Criatividade (5 perguntas)
  {
    id: 16,
    category: "Pensamento Abstrato",
    question: "O que têm em comum: Relógio, Calendário e Ampulheta?",
    options: ["São redondos", "Medem tempo", "São antigos", "Têm números"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 17,
    category: "Pensamento Abstrato",
    question: "Se você pudesse ser qualquer forma geométrica, qual seria mais útil para resolver problemas?",
    options: ["Círculo - flexibilidade", "Quadrado - estabilidade", "Triângulo - direção", "Todas são úteis"],
    correct: 3,
    difficulty: 3
  },
  {
    id: 18,
    category: "Pensamento Abstrato",
    question: "Qual item é mais diferente dos outros: Borboleta, Avião, Pássaro, Helicóptero?",
    options: ["Borboleta", "Avião", "Pássaro", "Helicóptero"],
    correct: 0,
    difficulty: 2
  },
  {
    id: 19,
    category: "Pensamento Abstrato",
    question: "Complete a analogia: Silêncio está para Som assim como Escuridão está para:",
    options: ["Noite", "Luz", "Sombra", "Cegueira"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 20,
    category: "Pensamento Abstrato",
    question: "Qual é a melhor definição de CRIATIVIDADE?",
    options: ["Fazer arte", "Pensar diferente", "Conectar ideias de forma nova", "Ser original"],
    correct: 2,
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
  const [timeLeft, setTimeLeft] = useState(30)
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
    setTimeLeft(30)
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
      setTimeLeft(30)
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
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-3 mb-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="relative">
                <Brain className="w-10 h-10 text-cyan-400" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                NeuroTest AI
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Descubra seu potencial cognitivo com nossa IA avançada 🧠✨
            </p>
          </div>

          <Card className="mb-8 border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-400" />
                Sistema Neural Avançado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Análise Cognitiva Completa</h3>
                      <p className="text-gray-300 text-sm">Algoritmos baseados em neurociência para avaliação precisa do seu QI.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">20 Desafios Inteligentes</h3>
                      <p className="text-gray-300 text-sm">Testes adaptativos que evoluem com suas respostas em tempo real.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Resultado Instantâneo</h3>
                      <p className="text-gray-300 text-sm">IA processa suas respostas em milissegundos para feedback imediato.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                      <Atom className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Relatório Quântico</h3>
                      <p className="text-gray-300 text-sm">Análise multidimensional do seu perfil cognitivo por apenas R$ 9,99.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Desbloqueie seu Perfil Cognitivo Completo:
                </h4>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>QI calculado por IA neural</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                    <span>Mapeamento cerebral avançado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200"></div>
                    <span>Comparação com gênios históricos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
                    <span>Protocolo de otimização mental</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button 
                  onClick={startQuiz}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white px-12 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-105 border border-white/20"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Iniciar Análise Neural
                </Button>
                <p className="text-sm text-gray-400 mt-3 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  Processamento: 15-20 minutos
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
        {/* Animated neural network background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-700"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Futuristic Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30 backdrop-blur-sm px-4 py-2">
                <Cpu className="w-4 h-4 mr-2" />
                {question.category}
              </Badge>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className={`font-mono text-lg ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"}`}>
                  {timeLeft.toString().padStart(2, '0')}s
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-300">
                <span className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  Neural Scan {currentQuestion + 1}/{questions.length}
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  {Math.round(progress)}% Processado
                </span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-3 bg-white/10 border border-white/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-full blur-sm"></div>
              </div>
            </div>
          </div>

          {/* Futuristic Question Card */}
          <Card className="mb-8 border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl text-white leading-relaxed flex items-start gap-3">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg mt-1">
                  <Atom className="w-5 h-5 text-white" />
                </div>
                {question.question}
              </CardTitle>
              {currentQuestion < 5 && (
                <p className="text-sm text-cyan-400 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Processamento lógico ativo
                </p>
              )}
              {currentQuestion >= 5 && currentQuestion < 10 && (
                <p className="text-sm text-green-400 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Análise linguística em curso
                </p>
              )}
              {currentQuestion >= 10 && currentQuestion < 15 && (
                <p className="text-sm text-purple-400 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Escaneamento de memória
                </p>
              )}
              {currentQuestion >= 15 && (
                <p className="text-sm text-pink-400 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Mapeamento criativo neural
                </p>
              )}
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                      selectedAnswer === index
                        ? 'border-cyan-500 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg shadow-cyan-500/25 backdrop-blur-sm'
                        : 'border-white/20 bg-white/5 hover:border-purple-500/50 hover:bg-white/10 backdrop-blur-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        selectedAnswer === index
                          ? 'border-cyan-400 bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                          : 'border-gray-400 text-gray-400 bg-white/10'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-white font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Futuristic Next Button */}
          <div className="text-center">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-10 py-4 rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 font-bold"
            >
              {currentQuestion === questions.length - 1 ? (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  Finalizar Análise
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Próximo Scan
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
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Card className="w-full max-w-md border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
          <CardContent className="p-8 text-center relative z-10">
            <div className="mb-6">
              <div className="relative mx-auto mb-6">
                <Brain className="w-20 h-20 text-cyan-400 mx-auto animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50 animate-ping"></div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Processando Análise Neural...
              </h2>
              <p className="text-gray-300">
                IA quântica analisando seus padrões cognitivos 🧠⚡
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Progress value={33} className="h-3 bg-white/20 border border-white/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-full blur-sm"></div>
              </div>
              <div className="text-sm text-gray-300 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <p>Mapeando conexões neurais</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                  <p>Calculando índices cognitivos</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-600"></div>
                  <p>Gerando perfil intelectual</p>
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
        {/* Celebration background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute top-32 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
          <div className="absolute bottom-40 left-40 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-400"></div>
          <div className="absolute bottom-20 right-20 w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-600"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="relative">
                <Star className="w-10 h-10 text-yellow-400" />
                <Sparkles className="w-4 h-4 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold text-white">Análise Neural Completa!</h1>
            </div>
            <p className="text-lg text-gray-300">Seu perfil cognitivo foi processado com sucesso:</p>
          </div>

          {/* Resultado Gratuito */}
          <Card className="mb-6 border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-purple-500/10"></div>
            <CardHeader className="text-center relative z-10">
              <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                <Brain className="w-6 h-6 text-cyan-400" />
                Perfil Cognitivo Detectado
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6 relative z-10">
              <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-6 rounded-2xl border border-emerald-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  Processamento Neural Excepcional!
                </h3>
                <p className="text-gray-200">
                  Sua mente demonstrou capacidade <strong className="text-cyan-400">{iqResult.level.toLowerCase()}</strong> com 
                  <strong className="text-purple-400"> {Math.round((score / questions.reduce((sum, q) => sum + q.difficulty, 0)) * 100)}%</strong> de precisão cognitiva.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-500/30">
                  <h4 className="font-semibold text-blue-300 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Processamento Lógico
                  </h4>
                  <p className="text-blue-200">Neural avançado</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-500/30">
                  <h4 className="font-semibold text-green-300 flex items-center gap-2">
                    <Atom className="w-4 h-4" />
                    Análise Linguística
                  </h4>
                  <p className="text-green-200">Acima do padrão</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-500/30">
                  <h4 className="font-semibold text-purple-300 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Foco Neural
                  </h4>
                  <p className="text-purple-200">Excepcional</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-4 rounded-xl border border-orange-500/30">
                  <h4 className="font-semibold text-orange-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Criatividade Quântica
                  </h4>
                  <p className="text-orange-200">Neural avançado</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Teaser Premium */}
          <Card className="mb-6 border-2 border-yellow-400/50 shadow-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5"></div>
            <CardHeader className="text-center relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="relative">
                  <Lock className="w-6 h-6 text-yellow-400" />
                  <Sparkles className="w-3 h-3 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <CardTitle className="text-xl text-white">
                  Desbloqueie Seu Mapa Neural Completo
                </CardTitle>
              </div>
              <p className="text-yellow-300 font-medium flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                98% dos usuários querem o relatório quântico completo!
              </p>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="bg-white/10 p-4 rounded-xl border border-yellow-400/30 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-2 text-center flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  Seu QI Neural: {iqResult.min} - {iqResult.max}
                </h3>
                <p className="text-center text-gray-200 text-sm">
                  Descubra sua pontuação exata e perfil cognitivo multidimensional!
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-200">QI calculado por IA quântica</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                  <span className="text-gray-200">Comparação com gênios</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200"></div>
                  <span className="text-gray-200">Mapa neural detalhado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
                  <span className="text-gray-200">Protocolo de otimização</span>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={() => setGameState('premium')}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white px-10 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-500 transform hover:scale-105 border border-white/20"
                >
                  <Atom className="w-5 h-5 mr-2" />
                  Acessar Relatório Quântico → R$ 9,99
                </Button>
                <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3" />
                  Criptografia quântica • Acesso instantâneo • Garantia neural
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
              className="border-white/30 text-gray-300 hover:bg-white/10 backdrop-blur-sm"
            >
              Nova Análise Neural
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'premium') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
        {/* Premium background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
            <CardHeader className="text-center relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="relative">
                  <Brain className="w-10 h-10 text-cyan-400" />
                  <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <CardTitle className="text-2xl text-white">
                  Relatório Neural Quântico
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-6 rounded-2xl border border-cyan-500/30 text-center backdrop-blur-sm">
                <h2 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <Atom className="w-8 h-8 text-cyan-400" />
                  QI: {iqResult.min + Math.floor(Math.random() * (iqResult.max - iqResult.min))}
                </h2>
                <p className="text-lg text-gray-200">
                  Classificação Neural: <strong className="text-cyan-400">{iqResult.level}</strong>
                </p>
                <p className="text-sm text-gray-300 mt-2 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Você supera {100 - Math.round((score / questions.reduce((sum, q) => sum + q.difficulty, 0)) * 100)}% da população global!
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  Mapeamento Neural Multidimensional:
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-500/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-blue-300 flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        Processamento Lógico Quântico
                      </span>
                      <span className="text-blue-200 font-bold">85%</span>
                    </div>
                    <Progress value={85} className="h-2 mb-2 bg-blue-900/30" />
                    <p className="text-sm text-blue-200">Capacidade excepcional de resolver problemas complexos e identificar padrões multidimensionais.</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-500/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-green-300 flex items-center gap-2">
                        <Atom className="w-4 h-4" />
                        Análise Linguística Neural
                      </span>
                      <span className="text-green-200 font-bold">78%</span>
                    </div>
                    <Progress value={78} className="h-2 mb-2 bg-green-900/30" />
                    <p className="text-sm text-green-200">Processamento avançado de linguagem com capacidade superior de analogias e interpretação.</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-500/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-purple-300 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Foco Neural Hiperdimensional
                      </span>
                      <span className="text-purple-200 font-bold">92%</span>
                    </div>
                    <Progress value={92} className="h-2 mb-2 bg-purple-900/30" />
                    <p className="text-sm text-purple-200">Capacidade extraordinária de concentração e processamento de múltiplas informações simultaneamente.</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-4 rounded-xl border border-orange-500/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-orange-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Criatividade Quântica
                      </span>
                      <span className="text-orange-200 font-bold">73%</span>
                    </div>
                    <Progress value={73} className="h-2 mb-2 bg-orange-900/30" />
                    <p className="text-sm text-orange-200">Excelente capacidade de pensamento divergente e conexões neurais inovadoras.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-xl border border-yellow-500/30">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Protocolo de Otimização Neural Personalizado:
                </h3>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    Pratique puzzles quânticos e algoritmos complexos para expandir processamento lógico
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Leia literatura multidimensional para ampliar conexões linguísticas neurais
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    Medite 15min/dia para otimizar foco neural e clareza cognitiva
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Explore arte generativa e música para estimular criatividade quântica
                  </li>
                </ul>
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={() => {
                    setGameState('intro')
                    setCurrentQuestion(0)
                    setAnswers([])
                    setScore(0)
                    setSelectedAnswer(null)
                  }}
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl border border-white/20"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Nova Análise Neural
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