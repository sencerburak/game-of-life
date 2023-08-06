/**
 * Linearly interpolates between two values
 * @param a - start value
 * @param b - end value
 * @param t - interpolation factor between 0 and 1
 */
function lerp(a: number, b: number, t: number) {
  return a + t * (b - a)
}

/**
 * Smoothstep function for smoothing values
 * @param t - value to be smoothed
 */
function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

/**
 * Computes a gradient based on input coordinates using Perlin's hash function
 * @param x - x coordinate
 * @param y - y coordinate
 */
function gradient(x: number, y: number) {
  const random = Math.sin(x * 1234.567 + y * 9876.543) * 43758.5453
  return random - Math.floor(random)
}

/**
 * Computes Perlin noise at specific coordinates
 * @param x - x coordinate
 * @param y - y coordinate
 */
function noise(x: number, y: number) {
  const x0 = Math.floor(x)
  const x1 = x0 + 1
  const y0 = Math.floor(y)
  const y1 = y0 + 1

  const sx = smoothstep(x - x0)
  const sy = smoothstep(y - y0)

  const n0 = gradient(x0, y0)
  const n1 = gradient(x1, y0)
  const ix0 = lerp(n0, n1, sx)

  const n2 = gradient(x0, y1)
  const n3 = gradient(x1, y1)
  const ix1 = lerp(n2, n3, sx)

  return lerp(ix0, ix1, sy)
}

/**
 * Computes fractal noise using Perlin noise function
 * @param x - x coordinate
 * @param y - y coordinate
 * @param octaves - number of octaves for the noise
 * @param persistence - persistence factor for the noise
 */
export default function fractalNoise(x: number, y: number, octaves: number, persistence: number) {
  let total = 0
  let frequency = 1
  let amplitude = 1
  let maxValue = 0 // Used for normalizing result to 0.0 - 1.0

  for (let i = 0; i < octaves; i++) {
    total += noise(x * frequency, y * frequency) * amplitude

    maxValue += amplitude

    amplitude *= persistence
    frequency *= 2
  }

  return total / maxValue
}
