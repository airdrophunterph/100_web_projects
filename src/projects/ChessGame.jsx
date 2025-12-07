import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialBoard = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];

const isWhite = (piece) => ['♔', '♕', '♖', '♗', '♘', '♙'].includes(piece);
const isBlack = (piece) => ['♚', '♛', '♜', '♝', '♞', '♟'].includes(piece);

const ChessGame = () => {
  const [board, setBoard] = useState(initialBoard.map(row => [...row]));
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState('white');
  const [captured, setCaptured] = useState({ white: [], black: [] });
  const [moves, setMoves] = useState([]);

  const handleClick = (row, col) => {
    const piece = board[row][col];
    
    if (selected) {
      const [selRow, selCol] = selected;
      const selPiece = board[selRow][selCol];
      
      // Try to move
      if (row !== selRow || col !== selCol) {
        const targetPiece = board[row][col];
        const isValidTarget = turn === 'white' ? !isWhite(targetPiece) : !isBlack(targetPiece);
        
        if (isValidTarget) {
          const newBoard = board.map(r => [...r]);
          
          // Capture
          if (targetPiece) {
            if (turn === 'white') {
              setCaptured({ ...captured, white: [...captured.white, targetPiece] });
            } else {
              setCaptured({ ...captured, black: [...captured.black, targetPiece] });
            }
          }
          
          newBoard[row][col] = selPiece;
          newBoard[selRow][selCol] = '';
          setBoard(newBoard);
          setMoves([...moves, `${selPiece} ${String.fromCharCode(97 + selCol)}${8 - selRow} → ${String.fromCharCode(97 + col)}${8 - row}`]);
          setTurn(turn === 'white' ? 'black' : 'white');
        }
      }
      setSelected(null);
    } else {
      // Select piece
      if ((turn === 'white' && isWhite(piece)) || (turn === 'black' && isBlack(piece))) {
        setSelected([row, col]);
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard.map(row => [...row]));
    setSelected(null);
    setTurn('white');
    setCaptured({ white: [], black: [] });
    setMoves([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-zinc-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Chess Game</h1>
        <p className={`text-center mb-4 ${turn === 'white' ? 'text-white' : 'text-gray-400'}`}>
          {turn === 'white' ? "White's" : "Black's"} turn
        </p>
        
        {/* Board */}
        <div className="aspect-square bg-amber-900 rounded-lg overflow-hidden shadow-2xl p-1">
          <div className="grid grid-cols-8 h-full">
            {board.map((row, rowIdx) =>
              row.map((piece, colIdx) => {
                const isLight = (rowIdx + colIdx) % 2 === 0;
                const isSelected = selected && selected[0] === rowIdx && selected[1] === colIdx;
                
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => handleClick(rowIdx, colIdx)}
                    className={`
                      flex items-center justify-center text-3xl md:text-4xl cursor-pointer
                      transition-all duration-150
                      ${isLight ? 'bg-amber-100' : 'bg-amber-700'}
                      ${isSelected ? 'ring-4 ring-yellow-400 ring-inset' : ''}
                      hover:brightness-110
                    `}
                  >
                    {piece}
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Captured pieces */}
        <div className="flex justify-between mt-4 px-2">
          <div className="text-2xl">{captured.white.join(' ')}</div>
          <div className="text-2xl">{captured.black.join(' ')}</div>
        </div>
        
        <button
          onClick={resetGame}
          className="w-full mt-4 py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30"
        >
          Reset Game
        </button>
        
        {/* Move history */}
        {moves.length > 0 && (
          <div className="mt-4 bg-white/10 rounded-lg p-3 max-h-32 overflow-y-auto">
            <div className="text-white/60 text-sm">
              {moves.slice(-10).map((move, i) => (
                <div key={i}>{moves.length - 10 + i + 1}. {move}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChessGame;
