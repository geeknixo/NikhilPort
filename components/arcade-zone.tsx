"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2, Trophy, RotateCcw, Zap, Flame, User, Laptop } from "lucide-react"

type GameType = "tictactoe" | "rps" | "memory" | "tapper" | "guess"

export function ArcadeZone() {
  const [activeGame, setActiveGame] = useState<GameType>("tictactoe")

  // --- TIC TAC TOE STATE ---
  const [tttBoard, setTttBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [tttIsXNext, setTttIsXNext] = useState(true)
  const [tttWinner, setTttWinner] = useState<string | null>(null)

  // --- ROCK PAPER SCISSORS STATE ---
  const [rpsUserScore, setRpsUserScore] = useState(0)
  const [rpsBotScore, setRpsBotScore] = useState(0)
  const [rpsResult, setRpsResult] = useState<string>("Choose your move!")
  const [rpsBotChoice, setRpsBotChoice] = useState<string>("")
  const [rpsUserChoice, setRpsUserChoice] = useState<string>("")

  // --- MEMORY MATCH STATE ---
  const initialMemoryCards = [
    { id: 1, val: "⚛️", matched: false },
    { id: 2, val: "⚛️", matched: false },
    { id: 3, val: "🚀", matched: false },
    { id: 4, val: "🚀", matched: false },
    { id: 5, val: "💻", matched: false },
    { id: 6, val: "💻", matched: false },
    { id: 7, val: "🔥", matched: false },
    { id: 8, val: "🔥", matched: false },
    { id: 9, val: "🛠️", matched: false },
    { id: 10, val: "🛠️", matched: false },
    { id: 11, val: "📦", matched: false },
    { id: 12, val: "📦", matched: false },
  ]
  const [memoryCards, setMemoryCards] = useState(initialMemoryCards)
  const [memorySelected, setMemorySelected] = useState<number[]>([])
  const [memoryMatches, setMemoryMatches] = useState(0)
  const [memoryTurns, setMemoryTurns] = useState(0)

  // --- SPEED TAPPER STATE ---
  const [tapperCount, setTapperCount] = useState(0)
  const [tapperActive, setTapperActive] = useState(false)
  const [tapperTimeLeft, setTapperTimeLeft] = useState(10)
  const [tapperHighScore, setTapperHighScore] = useState(0)

  // --- GUESS THE NUMBER STATE ---
  const [guessTarget, setGuessTarget] = useState(25)
  const [guessInput, setGuessInput] = useState("")
  const [guessFeedback, setGuessFeedback] = useState("Guess a number between 1 and 50!")
  const [guessAttempts, setGuessAttempts] = useState(0)
  const [guessSolved, setGuessSolved] = useState(false)

  // ==========================================
  // 1. TIC TAC TOE LOGIC
  // ==========================================
  const checkTttWinner = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    if (board.every(cell => cell !== null)) return "Draw"
    return null
  }

  const handleTttClick = (index: number) => {
    if (tttBoard[index] || tttWinner) return
    const newBoard = [...tttBoard]
    newBoard[index] = "X"
    setTttBoard(newBoard)

    const winner = checkTttWinner(newBoard)
    if (winner) {
      setTttWinner(winner)
    } else {
      setTttIsXNext(false)
      // Trigger AI Move after short delay
      setTimeout(() => makeTttAiMove(newBoard), 400)
    }
  }

  const makeTttAiMove = (currentBoard: (string | null)[]) => {
    const emptyIndices = currentBoard
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((val): val is number => val !== null)

    if (emptyIndices.length === 0) return

    // AI strategy: choose center if empty, otherwise random
    let chosenIndex = emptyIndices[0]
    if (emptyIndices.includes(4)) {
      chosenIndex = 4
    } else {
      chosenIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
    }

    const newBoard = [...currentBoard]
    newBoard[chosenIndex] = "O"
    setTttBoard(newBoard)

    const winner = checkTttWinner(newBoard)
    if (winner) {
      setTttWinner(winner)
    }
    setTttIsXNext(true)
  }

  const resetTtt = () => {
    setTttBoard(Array(9).fill(null))
    setTttWinner(null)
    setTttIsXNext(true)
  }

  // ==========================================
  // 2. ROCK PAPER SCISSORS LOGIC
  // ==========================================
  const handleRpsMove = (userMove: string) => {
    const choices = ["Rock ✊", "Paper ✋", "Scissors ✌️"]
    const botChoiceStr = choices[Math.floor(Math.random() * choices.length)]
    
    setRpsUserChoice(userMove)
    setRpsBotChoice(botChoiceStr)

    const userClean = userMove.split(" ")[0].toLowerCase()
    const botClean = botChoiceStr.split(" ")[0].toLowerCase()

    if (userClean === botClean) {
      setRpsResult("It's a Draw! 🤝")
    } else if (
      (userClean === "rock" && botClean === "scissors") ||
      (userClean === "paper" && botClean === "rock") ||
      (userClean === "scissors" && botClean === "paper")
    ) {
      setRpsResult("You Win! 🎉")
      setRpsUserScore(prev => prev + 1)
    } else {
      setRpsResult("Bot Wins! 🤖")
      setRpsBotScore(prev => prev + 1)
    }
  }

  const resetRps = () => {
    setRpsUserScore(0)
    setRpsBotScore(0)
    setRpsResult("Choose your move!")
    setRpsBotChoice("")
    setRpsUserChoice("")
  }

  // ==========================================
  // 3. MEMORY GAME LOGIC
  // ==========================================
  // Shuffle cards
  const shuffleMemory = () => {
    const shuffled = [...initialMemoryCards]
      .sort(() => Math.random() - 0.5)
      .map((card, idx) => ({ ...card, id: idx }))
    setMemoryCards(shuffled)
    setMemorySelected([])
    setMemoryMatches(0)
    setMemoryTurns(0)
  }

  useEffect(() => {
    shuffleMemory()
  }, [])

  const handleMemoryClick = (id: number) => {
    if (memorySelected.length >= 2 || memoryCards[id].matched || memorySelected.includes(id)) return

    const newSelected = [...memorySelected, id]
    setMemorySelected(newSelected)

    if (newSelected.length === 2) {
      setMemoryTurns(prev => prev + 1)
      const [firstId, secondId] = newSelected
      if (memoryCards[firstId].val === memoryCards[secondId].val) {
        // Match found!
        setMemoryCards(prev =>
          prev.map((card, idx) => (idx === firstId || idx === secondId ? { ...card, matched: true } : card))
        )
        setMemoryMatches(prev => prev + 1)
        setMemorySelected([])
      } else {
        // No match: turn back after delay
        setTimeout(() => {
          setMemorySelected([])
        }, 1000)
      }
    }
  }

  // ==========================================
  // 4. SPEED TAPPER LOGIC
  // ==========================================
  const startTapper = () => {
    setTapperCount(0)
    setTapperActive(true)
    setTapperTimeLeft(10)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (tapperActive && tapperTimeLeft > 0) {
      timer = setTimeout(() => {
        setTapperTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (tapperTimeLeft === 0 && tapperActive) {
      setTapperActive(false)
      if (tapperCount > tapperHighScore) {
        setTapperHighScore(tapperCount)
      }
    }
    return () => clearTimeout(timer)
  }, [tapperActive, tapperTimeLeft])

  // ==========================================
  // 5. GUESS THE NUMBER LOGIC
  // ==========================================
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = parseInt(guessInput)
    if (isNaN(num)) return

    setGuessAttempts(prev => prev + 1)
    if (num === guessTarget) {
      setGuessFeedback(`Correct! You solved it in ${guessAttempts + 1} attempts! 🎉`)
      setGuessSolved(true)
    } else if (num < guessTarget) {
      setGuessFeedback("Too Low! Try a higher number. 📈")
    } else {
      setGuessFeedback("Too High! Try a lower number. 📉")
    }
    setGuessInput("")
  }

  const resetGuess = () => {
    setGuessTarget(Math.floor(Math.random() * 50) + 1)
    setGuessFeedback("Guess a number between 1 and 50!")
    setGuessAttempts(0)
    setGuessSolved(false)
    setGuessInput("")
  }

  return (
    <section id="arcade" className="container mx-auto px-4 py-16 md:py-24 border-t-4 border-black bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="bg-[#A855F7] text-white border-2 border-black font-extrabold text-sm px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4 inline-flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 animate-bounce" />
            Arcade Zone
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white leading-tight">
            Play Interactive <span className="bg-[#10B981] text-black px-3 py-1 inline-block -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-xl">Mini Games!</span>
          </h2>
        </div>

        {/* Arcade Cabinet Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-3.5 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
            {(["tictactoe", "rps", "memory", "tapper", "guess"] as GameType[]).map((game) => (
              <button
                key={game}
                onClick={() => setActiveGame(game)}
                className={`flex-shrink-0 lg:w-full flex items-center gap-3 p-4 border-4 border-black rounded-2xl font-black text-sm md:text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer ${
                  activeGame === game
                    ? "bg-[#FFC224] text-black"
                    : "bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-200 hover:bg-yellow-50 dark:hover:bg-zinc-800"
                }`}
              >
                <span className="text-xl">
                  {game === "tictactoe" && "❌"}
                  {game === "rps" && "✊"}
                  {game === "memory" && "🧠"}
                  {game === "tapper" && "⚡"}
                  {game === "guess" && "🔍"}
                </span>
                <span className="capitalize">
                  {game === "tictactoe" && "Tic Tac Toe"}
                  {game === "rps" && "RPS Duel"}
                  {game === "memory" && "Memory Match"}
                  {game === "tapper" && "Speed Tapper"}
                  {game === "guess" && "Number Guesser"}
                </span>
              </button>
            ))}
          </div>

          {/* Game Window Panel */}
          <div className="lg:col-span-9 bg-[#FFFBEB] dark:bg-zinc-900 border-4 border-black rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col justify-between min-h-[450px]">
            
            <div className="absolute top-4 right-4 bg-black text-white dark:bg-white dark:text-black text-[10px] font-black px-2.5 py-0.5 rounded border border-black uppercase tracking-wider">
              Retro Console
            </div>

            <div className="flex-grow flex flex-col justify-center items-center">
              
              {/* GAME 1: TIC TAC TOE */}
              {activeGame === "tictactoe" && (
                <div className="w-full max-w-xs text-center space-y-6">
                  <h4 className="font-extrabold text-xl text-black dark:text-white">Tic Tac Toe (Vs Bot)</h4>
                  <div className="grid grid-cols-3 gap-3.5 bg-black p-3.5 border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {tttBoard.map((cell, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTttClick(idx)}
                        disabled={cell !== null || tttWinner !== null || !tttIsXNext}
                        className={`aspect-square w-full bg-white dark:bg-zinc-800 text-3xl font-black border-2 border-black rounded-xl hover:bg-yellow-50 dark:hover:bg-zinc-700 flex items-center justify-center cursor-pointer ${
                          cell === "X" ? "text-blue-500" : "text-red-500"
                        }`}
                      >
                        {cell}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-black text-sm text-black dark:text-white">
                      {tttWinner
                        ? tttWinner === "Draw"
                          ? "It's a Draw! 🤝"
                          : `Winner: ${tttWinner} 🎉`
                        : tttIsXNext
                        ? "Your Turn (X)"
                        : "Bot is Thinking... 🤖"}
                    </span>
                    <button
                      onClick={resetTtt}
                      className="flex items-center gap-1.5 bg-red-400 border-2 border-black rounded-lg px-3 py-1.5 font-bold text-xs text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-300"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {/* GAME 2: ROCK PAPER SCISSORS */}
              {activeGame === "rps" && (
                <div className="w-full max-w-md text-center space-y-6">
                  <h4 className="font-extrabold text-xl text-black dark:text-white">Rock Paper Scissors Duel</h4>
                  
                  {/* Scoreboard */}
                  <div className="flex justify-center gap-12 items-center bg-white dark:bg-zinc-800 border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-gray-500 flex items-center gap-1"><User className="w-3 h-3" /> You</span>
                      <span className="text-3xl font-black text-black dark:text-white">{rpsUserScore}</span>
                    </div>
                    <span className="text-xl font-black text-gray-400">VS</span>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-gray-500 flex items-center gap-1"><Laptop className="w-3 h-3" /> Bot</span>
                      <span className="text-3xl font-black text-black dark:text-white">{rpsBotScore}</span>
                    </div>
                  </div>

                  {/* Moves display */}
                  {(rpsUserChoice || rpsBotChoice) && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-sky-100 border-2 border-black p-3 rounded-xl font-bold text-black text-sm">
                        You: {rpsUserChoice}
                      </div>
                      <div className="bg-red-100 border-2 border-black p-3 rounded-xl font-bold text-black text-sm">
                        Bot: {rpsBotChoice}
                      </div>
                    </div>
                  )}

                  {/* Feedback */}
                  <div className="text-lg font-black text-black dark:text-white">{rpsResult}</div>

                  {/* Inputs */}
                  <div className="flex justify-center gap-3">
                    {["Rock ✊", "Paper ✋", "Scissors ✌️"].map((move) => (
                      <button
                        key={move}
                        onClick={() => handleRpsMove(move)}
                        className="bg-white border-2 border-black rounded-xl p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all font-bold text-sm text-black"
                      >
                        {move}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={resetRps}
                    className="mx-auto flex items-center gap-1.5 bg-red-400 border-2 border-black rounded-lg px-3 py-1.5 font-bold text-xs text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Scores
                  </button>
                </div>
              )}

              {/* GAME 3: MEMORY MATCH */}
              {activeGame === "memory" && (
                <div className="w-full max-w-sm text-center space-y-6">
                  <div className="flex justify-between items-center gap-4">
                    <h4 className="font-extrabold text-xl text-black dark:text-white">Memory Card Match</h4>
                    <button
                      onClick={shuffleMemory}
                      className="flex items-center gap-1.5 bg-red-400 border-2 border-black rounded-lg px-2.5 py-1 font-bold text-xs text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-300"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Shuffle
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-3 bg-black p-3.5 border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {memoryCards.map((card, idx) => {
                      const isFlipped = memorySelected.includes(idx) || card.matched
                      return (
                        <button
                          key={idx}
                          onClick={() => handleMemoryClick(idx)}
                          className={`aspect-square w-full border-2 border-black rounded-xl flex items-center justify-center font-bold text-2xl transition-all duration-300 cursor-pointer ${
                            isFlipped
                              ? "bg-yellow-100 text-black rotate-0"
                              : "bg-[#2F81F7] text-white -rotate-3 hover:scale-105"
                          }`}
                        >
                          {isFlipped ? card.val : "❓"}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex justify-between font-black text-sm text-black dark:text-white">
                    <span>Turns: {memoryTurns}</span>
                    <span>
                      {memoryMatches === 6 ? "Matched All! Winner! 🏆" : `Matches: ${memoryMatches} / 6`}
                    </span>
                  </div>
                </div>
              )}

              {/* GAME 4: SPEED TAPPER */}
              {activeGame === "tapper" && (
                <div className="w-full max-w-xs text-center space-y-6">
                  <h4 className="font-extrabold text-xl text-black dark:text-white">Speed Tapper (10 Seconds)</h4>
                  
                  {/* Timer & Scores */}
                  <div className="flex justify-between items-center bg-white dark:bg-zinc-800 border-4 border-black p-4 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-black text-sm text-black dark:text-white flex items-center gap-1"><Trophy className="w-4 h-4 text-yellow-500" /> Best: {tapperHighScore}</span>
                    <span className="font-black text-sm text-red-500 flex items-center gap-1"><Flame className="w-4 h-4" /> Time: {tapperTimeLeft}s</span>
                  </div>

                  {/* Tap Target */}
                  {tapperActive ? (
                    <button
                      onClick={() => setTapperCount(prev => prev + 1)}
                      className="w-40 h-40 rounded-full bg-red-500 text-white font-black text-4xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center select-none"
                    >
                      {tapperCount}
                    </button>
                  ) : (
                    <button
                      onClick={startTapper}
                      className="w-full bg-[#10B981] text-black border-4 border-black hover:bg-[#10B981]/90 rounded-2xl py-5 text-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                      {tapperTimeLeft === 0 ? "Play Again!" : "Start Tapping!"}
                    </button>
                  )}

                  {!tapperActive && tapperTimeLeft === 0 && (
                    <div className="font-black text-lg text-black dark:text-white animate-bounce">
                      Score: {tapperCount} Taps! 🚀
                    </div>
                  )}
                </div>
              )}

              {/* GAME 5: GUESS THE NUMBER */}
              {activeGame === "guess" && (
                <div className="w-full max-w-sm text-center space-y-6">
                  <h4 className="font-extrabold text-xl text-black dark:text-white">Guess the Secret Number (1-50)</h4>
                  
                  <div className="bg-white dark:bg-zinc-800 border-4 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-gray-700 dark:text-gray-200 font-bold leading-relaxed">{guessFeedback}</p>
                    <p className="text-xs text-gray-500 font-bold mt-2">Attempts: {guessAttempts}</p>
                  </div>

                  {!guessSolved ? (
                    <form onSubmit={handleGuessSubmit} className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={guessInput}
                        onChange={(e) => setGuessInput(e.target.value)}
                        placeholder="?"
                        className="flex-grow bg-white border-4 border-black rounded-xl p-3 font-bold text-center text-lg text-black focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-[#2F81F7] text-white border-4 border-black hover:bg-[#2F81F7]/90 rounded-xl px-6 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      >
                        Guess
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={resetGuess}
                      className="w-full bg-[#10B981] text-black border-4 border-black hover:bg-[#10B981]/90 rounded-2xl py-4 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                      Play Again
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
