import React from 'react'

const Square = (props) => {
  const {
    onClick,
    position,
    value,
  } = props

  return (
    <button
      className={`square ${position}`}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default Square
