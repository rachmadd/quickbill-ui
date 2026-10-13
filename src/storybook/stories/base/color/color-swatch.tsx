import React, { useState } from 'react'

interface ColorSwatchProps {
  name: string
  hex: string
}

export const primary = {
  'qb-blue-10': '#f5f8ff',
  'qb-blue-15': '#eaf0ff',
  'qb-blue-20': '#d8e4ff',
  'qb-blue-30': '#b1caff',
  'qb-blue-40': '#8aafff',
  'qb-blue-50': '#6395ff',
  'qb-blue-60': '#3c7aff',
  'qb-blue-70': '#2f65e2',
  'qb-blue-80': '#0038b9',
  'qb-blue-90': '#022984',
  'qb-blue-100': '#0c1833',
}

export const mist = {
  'qb-mist-0': '#ffffff',
  'qb-mist-10': '#f9fafb',
  'qb-mist-20': '#e9e9e9',
  'qb-mist-30': '#e3e2df',
  'qb-mist-40': '#a6a6a6',
  'qb-mist-50': '#909090',
  'qb-mist-60': '#737373',
  'qb-mist-70': '#43423c',
  'qb-mist-80': '#302f2d',
  'qb-mist-90': '#22211f',
  'qb-mist-100': '#1d1d1d',
}

export const secondary = {
  'qb-daisy-10': '#fffbe3',
  'qb-daisy-20': '#fff7c5',
  'qb-daisy-30': '#fff3a5',
  'qb-daisy-50': '#ffe332',
  'qb-daisy-70': '#d7bb0a',
  'qb-daisy-80': '#a68f00',
}

export const success = {
  'qb-success-10': '#d6eedd',
  'qb-success-20': '#aedcba',
  'qb-success-main': '#34a853',
  'qb-success-dark': '#154321',
}

export const info = {
  'qb-info-10': '#d9e7fd',
  'qb-info-20': '#b3cefb',
  'qb-info-main': '#4285f4',
  'qb-info-dark': '#1a3562',
}

export const warning = {
  'qb-warning-10': '#ffedcc',
  'qb-warning-20': '#ffdb99',
  'qb-warning-main': '#ffa500',
  'qb-warning-dark': '#664200',
}

export const negative = {
  'qb-negative-10': '#fed7d3',
  'qb-negative-20': '#fdafa8',
  'qb-negative-main': '#f93625',
  'qb-negative-dark': '#64160f',
}

export const ColorSwatch = ({ name, hex }: ColorSwatchProps) => {
  const [copied, setCopied] = useState(false)
  const [copiedName, setCopiedName] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500) // Reset after 1.5 seconds
  }

  const handleCopyName = () => {
    navigator.clipboard.writeText(name)
    setCopiedName(true)
    setTimeout(() => setCopiedName(false), 1500) // Reset after 1.5 seconds
  }

  const swatchStyle: React.CSSProperties = {
    backgroundColor: hex,
    width: '100%',
    height: '80px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB', // A light border for white/light colors
  }

  const containerStyle: React.CSSProperties = {
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }

  const textContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const hexStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    color: '#6B7280',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: copied ? '#D1FAE5' : '#F3F4F6',
    transition: 'background-color 0.2s',
  }

  const nameStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    color: '#6B7280',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: copiedName ? '#D1FAE5' : '#F3F4F6',
    transition: 'background-color 0.2s',
  }

  return (
    <div style={containerStyle}>
      <div style={swatchStyle} />
      <div style={textContainerStyle}>
        <span style={nameStyle} onClick={handleCopyName} title="Click to copy">
          <strong style={{ fontWeight: 600 }}>{copiedName ? 'Copied!' : name}</strong>
        </span>
        <span style={hexStyle} onClick={handleCopy} title="Click to copy">
          {copied ? 'Copied!' : hex}
        </span>
      </div>
    </div>
  )
}

// A wrapper component to display a full palette from an object
export const ColorPalette = ({ colors }: { colors: Record<string, string> }) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  }

  return (
    <div style={gridStyle}>
      {Object.entries(colors).map(([name, hex]) => (
        <ColorSwatch key={name} name={name} hex={hex} />
      ))}
    </div>
  )
}
