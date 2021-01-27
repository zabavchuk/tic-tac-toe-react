import React from 'react';

import { createRange } from '../utils/helpers'

import Row from './Row'

const Board = (props) => (
  <div>
    {createRange({ length: props.rows }).map((item, index) => (
      <Row
        key={index}
        col={index}
        {...props}
      />
    ))}
  </div>
)

export default Board