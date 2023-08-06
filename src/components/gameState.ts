import fractalNoise from './fractal'

// We define a Cell as a binary type
type Cell = 0 | 1

// The GameState is a 2D array of Cells
export type GameState = Cell[][]

/**
 * Generate a random game state using fractal noise
 * @param width - The width of the game state
 * @param height - The height of the game state
 * @returns The randomly generated GameState
 */
export function randomGameState(width: number, height: number): GameState {
  console.log('Generating random game state for size', width, 'x', height, '...')
  const gameState: GameState = []

  // Parameters for the fractal noise function
  const scale = 0.01 // Controls the level of detail of the noise
  const octaves = 17 // The number of layers of noise to combine
  const persistence = 0.5 // Determines how much each octave contributes to the final noise

  // Set the minimum and maximum density
  const minDensity = 0.01
  const maxDensity = 0.4

  // Generate a random offset
  const offsetX = Math.random() * 10000
  const offsetY = Math.random() * 10000

  // Generate cells for the game state based on the fractal noise
  for (let i = 0; i < height; i++) {
    gameState[i] = []
    for (let j = 0; j < width; j++) {
      // Get a noise value from the fractal noise function, using the random offset
      const noise = fractalNoise(
        (i + offsetX) * scale,
        (j + offsetY) * scale,
        octaves,
        persistence,
      ) as unknown as number

      // Rescale the noise value to the range [minDensity, maxDensity]
      const density = minDensity + noise * (maxDensity - minDensity)

      // Assign a cell value based on the rescaled noise
      gameState[i][j] = Math.random() < density ? 1 : 0
    }
  }
  console.log('Random game state generated')

  return gameState
}

/**
 * Calculate the number of neighbors each cell in the current game state has
 * @param currentState - The current GameState
 * @returns A 2D array with the number of neighbors for each cell
 */
function calculateNeighbourCounts(currentState: GameState): number[][] {
  const neighbourCounts: number[][] = Array.from({ length: currentState.length }, () =>
    Array(currentState[0].length).fill(0),
  )

  const rows = currentState.length
  const cols = currentState[0].length

  // Count the neighbours for each cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (currentState[i][j] === 1) {
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            if (di !== 0 || dj !== 0) {
              const neighbourI = (i + di + rows) % rows
              const neighbourJ = (j + dj + cols) % cols
              neighbourCounts[neighbourI][neighbourJ]++
            }
          }
        }
      }
    }
  }

  return neighbourCounts
}

/**
 * Generate the next game state according to the rules of Conway's Game of Life
 * @param currentState - The current GameState
 * @returns The new GameState
 */
export function nextGameState(currentState: GameState): GameState {
  const neighbourCounts = calculateNeighbourCounts(currentState)

  const nextState: GameState = Array.from({ length: currentState.length }, () => Array(currentState[0].length).fill(0))

  // Apply the rules of the Game of Life to generate the next state
  for (let i = 0; i < currentState.length; i++) {
    for (let j = 0; j < currentState[i].length; j++) {
      const neighbours = neighbourCounts[i][j]

      if (currentState[i][j] === 1 && (neighbours === 2 || neighbours === 3)) {
        nextState[i][j] = 1
      } else if (currentState[i][j] === 0 && neighbours === 3) {
        nextState[i][j] = 1
      }
    }
  }

  return nextState
}
