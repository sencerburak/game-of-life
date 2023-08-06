import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { GameCanvas } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<GameCanvas gridWidth={100} gridHeight={100} cellSize={10} maxFps={5} />)
  })
})
