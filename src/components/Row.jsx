import React from 'react'
import {createRange} from '../utils/helpers'
import Square from './Square'

const Row = (props) => {
  const {
    col,
    line,
    onClick,
    position,
    rows = 3,
    squares,
  } = props

  const start = rows * col
  const range = createRange({ start, length: rows })

  let setClass = 'mark';
  let markSquare = position !== null && position === start ? setClass : '';
  let winnerLine = line;

  if (Array.isArray(winnerLine) && winnerLine.includes(start)){
    markSquare = setClass;
  }

  return (
    <div className="board-row">
      {range.map((item) => (
        <Square
          onClick={() => onClick(item)}
          position={markSquare}
          value={squares[item]}
        />
      ))}
    </div>
  )
}

Row.defaultProps = {
  rows: 3
}

export default Row
