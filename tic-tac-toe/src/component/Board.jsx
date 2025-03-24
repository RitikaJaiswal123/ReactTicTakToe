import { useState } from "react";
import JSConfetti from 'js-confetti';

function Board() {
    const squaresArr = new Array(9).fill(null);
    const [squares, setSquares] = useState(squaresArr);
    const [isXNext, setXNext] = useState(true);
    
    const winner = calculateWinner(squares);
    const isBoardFull = squares.every(square => square !== null);
    
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (isBoardFull) {
        status = 'DRAW';
    } else {
        status = `Next player: ${isXNext ? "X" : "O"}`;
    }

    const handleSquares = (i) => {
        if (squares[i] || winner) {
            
            return;
        }

        const newSquares = squares.slice();
        newSquares[i] = isXNext ? "X" : "O";
        setSquares(newSquares);
        setXNext(!isXNext);
    };

    const resetGame = () => {
        setSquares(squaresArr);
        setXNext(true);
    };

    return (
        <div className='flex flex-col items-center'>
            <h2 className="text-3xl">{status}</h2>
            <div className='grid grid-cols-3 gap-2'>
                {squares.map((value, index) => (
                    <button key={index}  className='w-24 h-24 bg-blue-500 text-white text-3xl font-bold flex items-center justify-center border-2 border-white transition-all hover:bg-orange-500' onClick={() => handleSquares(index)}>
                        {value}
                    </button>
                ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800"  onClick={resetGame}  > Reset Game  </button>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti({
                emojis: ["💥", "✨"],
            });
            return squares[a];
        }
    }
    return null;
}

export default Board;