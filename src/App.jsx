/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, handleSquareClick }) {

  return (
    <>
      <button onClick={handleSquareClick} className="text-2xl w-20 h-20 border border-gray-300 p-1 leading-7 m-1 bg-white rounded-md"> {value} </button>
    </>
  )
}


export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isNext, setIsNext] = useState(true)

  const winner = calculateWinner(squares)
  let status;

  if (winner) {
    status = `Winner ${" "}: ${winner}`
  } else {
    status = "Next Player" + (isNext ? "X" : "O")
  }

  function handleChangeValue(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice()

    if (isNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    setIsNext(!isNext)
    setSquares(nextSquares)

  }
  return (
    <>
      <div>
        <div> {status} </div>
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