import React from 'react'
import Board from './Board'
import calculateWinner from '../utils/calculateWinner'

class Game extends React.Component {

  state = {
    history: [{
      squares: Array(9).fill(null),
      col: null,
      row: null,
      position: null,
    }],
    stepNumber: 0,
    xIsNext: true,
    position: null,
    jumpTo: false,
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares).player || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        col: i % 3 + 1,
        row: i < 3 ? 1 : i > 2 && i < 6 ? 2 : i > 5 && i < 9 ? 3 : 0,
        position: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      position: null,
      jumpTo: false
    });
  }

  jumpTo(step, position) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      position: position,
      jumpTo: true
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const position = this.state.position;
    let setClass = '';

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' col:' + step.col + ' row:' + step.row :
        'Go to game start';

      setClass = step.position === position && step.position !== null ? 'mark' : '';

      return (
        <li key={move}>
          <button className={setClass} onClick={() => this.jumpTo(move, step.position)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner.player) {
      status = 'Winner: ' + winner.player;
    }
    else if(winner.game){
      status = 'Its a tie';
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            rows={3}
            squares={current.squares}
            position={position}
            line={winner.line}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game
