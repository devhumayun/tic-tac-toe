/* eslint-disable react/prop-types */

import { useState } from "react";

function Square({ value, handleSquareClick }) {

  return (
    <>
      <button onClick={handleSquareClick} className="text-xl w-20 h-20 border border-gray-300 p-1 leading-7 m-1 bg-white rounded-md"> {value} </button>
    </>
  )
}


function Board({ isNext, squares, onPlay }) {

  const winner = calculateWinner(squares)
  let status;

  if (winner) {
    status = <span className="text-xl text-white"> Winner: <strong>{winner}</strong> </span>
  } else {
    status = <span className="text-xl text-white"> Next Player : {isNext ? "X" : "O"} </span>
  }

  function handleChangeValue(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice()

    if (isNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }

    onPlay(nextSquares)

  }
  return (
    <>
      <div className="bg-[#0a3d62] p-2 rounded-lg">
        <div className="mb-4"> {status} </div>
        <div className="flex">
          <Square value={squares[0]} handleSquareClick={() => handleChangeValue(0)} />
          <Square value={squares[1]} handleSquareClick={() => handleChangeValue(1)} />
          <Square value={squares[2]} handleSquareClick={() => handleChangeValue(2)} />
        </div>
        <div className="flex">
          <Square value={squares[3]} handleSquareClick={() => handleChangeValue(3)} />
          <Square value={squares[4]} handleSquareClick={() => handleChangeValue(4)} />
          <Square value={squares[5]} handleSquareClick={() => handleChangeValue(5)} />
        </div>
        <div className="flex">
          <Square value={squares[6]} handleSquareClick={() => handleChangeValue(6)} />
          <Square value={squares[7]} handleSquareClick={() => handleChangeValue(7)} />
          <Square value={squares[8]} handleSquareClick={() => handleChangeValue(8)} />
        </div>
      </div>
    </>
  )
}


export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)])
  const [isNext, setIsNext] = useState(true)
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    setIsNext(!isNext)
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(move) {
    setCurrentMove(move)
    setIsNext(move % 2 === 0)
  }

  const moves = history.map((square, move) => {
    let discription;
    if (move > 0) {
      discription = <span> Go to the move # {move} </span>
    } else {
      discription = <span className="text-white underline text-xl"> Start your move </span>
    }

    return (
      <li key={move} className="mt-2 text-white">
        <button onClick={() => jumpTo(move)}>{discription}</button>
      </li>
    )
  })

  return (
    <>
      <div className="w-screen h-[100vh] flex justify-center items-center gap-6 bg-[#e9e9e9]">
        <div>
          <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="bg-[#0a3d62] px-4 py-3 rounded-lg">
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    </>
  )
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
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null

}