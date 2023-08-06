# Conway's Game of Life React Component
This is a modern React-based implementation of Conway's Game of Life. The simulation uses fractal noise for initial state generation, giving unique and interesting patterns every time it runs.

## Features
- Dynamically generated Game of Life patterns
- Customizable colorset and dimensions
- Smooth, high-performance rendering using React
- Comprehensive type-checking with TypeScript
- Debug mode with information about the current generation, FPS, and other game state details

## Demo
You can see a live demo of the component [here](https://sencerburak.github.io/game-of-life/).

![Demo gif](demo.gif)

## Usage
First, install the library:
```bash
npm install @sencerburak/game-of-life
```

You can import the GameCanvas component from the library and use it in your React application:
```tsx
import { GameCanvas } from '@sencerburak/game-of-life'

...

<GameCanvas
  gridWidth={100}
  gridHeight={100}
  cellSize={5}
  maxFps={30}
/>
```

## Options
The GameCanvas component accepts the following props:

- `gridWidth (number)`: The number of cells in the horizontal axis.
- `gridHeight (number)`: The number of cells in the vertical axis.
- `cellSize (number)`: The size of each cell in pixels.
- `maxFps (number)`: The maximum frame rate of the simulation.

#### Note:
The total number of cells in the simulation is equal to `gridWidth * gridHeight`. Therefore, the total number of pixels rendered on the screen is equal to gridWidth * gridHeight * cellSize * cellSize. For example, if you set gridWidth to 100 and gridHeight to 100, and cellSize to 5, the total number of pixels rendered on the screen will be 250,000.

#### Optional props:
- `debug (boolean)`: Whether to display the debug information.
- `activeCellColor (string)`: The color of active cells.
- `inactiveCellColor (string)`: The color of inactive cells.
- `debugColor (string)`: The color of the debug information.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Development
First, clone the repository:
```bash
git clone git@github.com:sencerburak/game-of-life.git
```

Then, install the dependencies:
```bash
cd game-of-life
npm install
```

Finally, start the development server:
```bash
npm start
```

You can also build the application for production:
```bash
npm run build
```

The production build will be located in the dist directory.

## License
[MIT](LICENSE)

