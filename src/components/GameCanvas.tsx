import React, { useState, useEffect, useRef, useMemo } from 'react'
import InfoBox from './InfoBox'
import { GameState, nextGameState, randomGameState } from './gameState'

// Define the types for the props
type GameCanvasProps = {
  gridWidth: number
  gridHeight: number
  cellSize: number
  maxFps: number
  debug?: boolean
  activeCellColor?: string
  inactiveCellColor?: string
  debugColor?: string
}

// Styles for the canvas container
const canvasContainerStyle: React.CSSProperties = {
  position: 'relative',
}

// Main component for the game canvas
export function GameCanvas({
  gridWidth,
  gridHeight,
  cellSize,
  maxFps,
  debug,
  activeCellColor,
  inactiveCellColor,
  debugColor,
}: GameCanvasProps) {
  // State for game data and control
  const [generation, setGeneration] = useState<number>(0)
  const initialGameState = useMemo(() => randomGameState(gridWidth, gridHeight), [gridWidth, gridHeight])
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const gameStateRef = useRef<GameState>(initialGameState)
  gameStateRef.current = gameState
  const [isRunning, setIsRunning] = useState(debug ? false : true)

  // Calculate the time interval based on the maximum fps
  const fpsInterval = 1000 / maxFps

  // Effect for game progression
  useEffect(() => {
    if (!isRunning) return

    let lastDrawTime = -1
    let animationFrameId: number

    const animate = (timestamp: number) => {
      const currentTime = new Date().getTime()
      if (lastDrawTime < 0) {
        lastDrawTime = timestamp - fpsInterval
      }

      if (timestamp - lastDrawTime >= fpsInterval) {
        const nextGameStatee = nextGameState(gameStateRef.current)
        setGameState(nextGameStatee)
        setGeneration((generation) => generation + 1)
        lastDrawTime = timestamp - new Date().getTime() + currentTime
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isRunning, fpsInterval])

  // Reference to the canvas element
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  // Effect for drawing the game state on the canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    context.clearRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = inactiveCellColor || 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)

    gameState.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 1) {
          context.fillStyle = activeCellColor || 'white'
          context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
        }
      })
    })
  }, [gameState, cellSize])

  // Render the component
  return (
    <div style={canvasContainerStyle}>
      <canvas ref={canvasRef} width={gameState[0].length * cellSize} height={gameState.length * cellSize} />
      {debug && (
        <InfoBox
          width={gridWidth}
          height={gridHeight}
          cellSize={cellSize}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          generation={generation}
          debugColor={debugColor}
        />
      )}
    </div>
  )
}
