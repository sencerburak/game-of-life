import React, { useState, useEffect, useRef } from 'react'

// Define the types for the props
type InfoBoxProps = {
  width: number
  height: number
  cellSize: number
  isRunning: boolean
  setIsRunning: (isRunning: boolean) => void
  generation: number
  debugColor?: string
}

// Functional component for an information box
const InfoBox: React.FC<InfoBoxProps> = ({
  width,
  height,
  cellSize,
  isRunning,
  setIsRunning,
  generation,
  debugColor,
}) => {
  // State to hold FPS value
  const [fps, setFps] = useState(0)

  // References to track FPS calculation
  const startTime = useRef(new Date().getTime())
  const currentTime = useRef(startTime.current)
  const elapsedTime = useRef(0)
  const frames = useRef(0)

  // Effect to calculate FPS every time the game updates or isRunning changes
  useEffect(() => {
    currentTime.current = new Date().getTime()
    elapsedTime.current = (currentTime.current - startTime.current) / 1000
    frames.current++
    if (elapsedTime.current >= 1) {
      setFps(frames.current)
      startTime.current = currentTime.current
      frames.current = 0
    }
  }, [isRunning, generation])

  // Data to display in the table
  const rows = [
    { label: 'Generation', value: generation },
    { label: 'FPS', value: fps },
    { label: 'Width', value: width },
    { label: 'Height', value: height },
    { label: 'Pixel Size', value: cellSize },
    { label: 'Running', value: isRunning ? 'Yes' : 'No' },
  ]

  // CSS styles for the components
  const infoBoxStyle: React.CSSProperties = {
    position: 'absolute',
    top: '5px',
    left: '5px',
  }

  const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
    padding: '2px',
    zIndex: 1,
    color: debugColor || 'greenyellow',
    fontSize: '0.6rem',
    border: debugColor ? '1px solid ' + debugColor : '1px solid greenyellow',
    fontWeight: 'bold',
  }

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    ...tableStyle,
  }

  const tdStyle: React.CSSProperties = {
    textAlign: 'right',
    ...tableStyle,
  }

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '2px 0px',
    cursor: 'pointer',
    borderRadius: '1px',
    ...tableStyle,
  }

  // Render the component
  return (
    <div style={infoBoxStyle}>
      <table style={tableStyle}>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <th style={thStyle}>{row.label}</th>
              <td style={tdStyle}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={buttonStyle} onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  )
}

export default InfoBox
