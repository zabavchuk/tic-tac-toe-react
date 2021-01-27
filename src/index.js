import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Square(props) {

    return(
        <button
            className={`square ${props.position}`}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        let setClass = 'mark';
        let markSquare = this.props.position !== null && this.props.position === i ? setClass : '';
        let winnerLine = this.props.line;

        if(Array.isArray(winnerLine) && winnerLine.includes(i)){
            markSquare = setClass;
        }
        return (<Square
                value={this.props.squares[i]}
                position={markSquare}
                line={markSquare}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        let arr = [0, 3, 6];

        const board = arr.map((i) =>{

            return (
                <div key={i} className="board-row">
                    {this.renderSquare(i)}
                    {this.renderSquare(i + 1)}
                    {this.renderSquare(i + 2)}
                </div>
            );
        });

        return (
            <div>
                {board}
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

            return {
                player: squares[a],
                line: [a, b, c],
            };
        }
    }
    if(!squares.includes(null)){
        return{
            game: 'draw',
        }
    }
    return false;
}

ReactDOM.render(
  <React.StrictMode>
    {/*<App />*/}
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
