const BOARD_SIZE = 8;
const WHITE_PAWN_START_ROW = 6;
const BLACK_PAWN_START_ROW = 1;
const FIRST_FILE_CHAR_CODE = 97;
const EMPTY_SQUARE = '.';
const WHITE_KING_START_ROW = 7;
const BLACK_KING_START_ROW = 0;
const KING_START_COL = 4;

const KNIGHT_MOVE_OFFSETS = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2], [1, 2], [2, -1], [2, 1]
];

const ROOK_MOVE_DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const BISHOP_MOVE_DIRECTIONS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const KING_MOVE_OFFSETS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

function generateLegalMoves(position) {
  const { board, turn } = position;
  const moves = [];
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col];
      if (isPieceOfCurrentTurn(piece, turn)) {
        const pieceMoves = generatePieceMoves(board, row, col, piece, position);
        moves.push(...pieceMoves);
      }
    }
  }
  
  return moves;
}

function isPieceOfCurrentTurn(piece, turn) {
  if (piece === EMPTY_SQUARE) return false;
  const isWhitePiece = isWhitePieceColor(piece);
  return (turn === 'white' && isWhitePiece) || (turn === 'black' && !isWhitePiece);
}

function isWhitePieceColor(piece) {
  return piece === piece.toUpperCase();
}

function getPieceColor(piece) {
  return isWhitePieceColor(piece) ? 'white' : 'black';
}

function generatePieceMoves(board, row, col, piece, position) {
  const pieceType = piece.toLowerCase();
  
  switch (pieceType) {
    case 'p':
      return generatePawnMoves(board, row, col, piece);
    case 'n':
      return generateKnightMoves(board, row, col, piece);
    case 'r':
      return generateRookMoves(board, row, col, piece);
    case 'b':
      return generateBishopMoves(board, row, col, piece);
    case 'q':
      return generateQueenMoves(board, row, col, piece);
    case 'k':
      return generateKingMoves(board, row, col, piece, position);
    default:
      return [];
  }
}

function generatePawnMoves(board, row, col, piece) {
  const moves = [];
  const from = coordsToAlgebraic(row, col);
  const isWhite = isWhitePieceColor(piece);
  const moveDirection = isWhite ? -1 : 1;
  const startingRow = isWhite ? WHITE_PAWN_START_ROW : BLACK_PAWN_START_ROW;
  const pieceColor = getPieceColor(piece);
  
  const oneSquareForward = row + moveDirection;
  if (isValidPosition(oneSquareForward, col) && board[oneSquareForward][col] === EMPTY_SQUARE) {
    const to = coordsToAlgebraic(oneSquareForward, col);
    moves.push({ from, to, piece });
    
    if (row === startingRow) {
      const twoSquaresForward = row + (2 * moveDirection);
      if (isValidPosition(twoSquaresForward, col) && board[twoSquaresForward][col] === EMPTY_SQUARE) {
        const doubleMoveTarget = coordsToAlgebraic(twoSquaresForward, col);
        moves.push({ from, to: doubleMoveTarget, piece });
      }
    }
  }
  
  // Check diagonal captures
  for (const colOffset of [-1, 1]) {
    const captureRow = row + moveDirection;
    const captureCol = col + colOffset;
    
    if (isValidPosition(captureRow, captureCol)) {
      const targetPiece = board[captureRow][captureCol];
      if (targetPiece !== EMPTY_SQUARE && getPieceColor(targetPiece) !== pieceColor) {
        const to = coordsToAlgebraic(captureRow, captureCol);
        moves.push({ from, to, piece });
      }
    }
  }
  
  return moves;
}

function generateKnightMoves(board, row, col, piece) {
  const moves = [];
  const from = coordsToAlgebraic(row, col);
  const pieceColor = getPieceColor(piece);
  
  for (const [rowOffset, colOffset] of KNIGHT_MOVE_OFFSETS) {
    const targetRow = row + rowOffset;
    const targetCol = col + colOffset;
    
    if (isValidPosition(targetRow, targetCol)) {
      const targetPiece = board[targetRow][targetCol];
      
      if (canMoveToSquare(targetPiece, pieceColor)) {
        const to = coordsToAlgebraic(targetRow, targetCol);
        moves.push({ from, to, piece });
      }
    }
  }
  
  return moves;
}

function generateRookMoves(board, row, col, piece) {
  return generateSlidingMoves(board, row, col, piece, ROOK_MOVE_DIRECTIONS);
}

function generateBishopMoves(board, row, col, piece) {
  return generateSlidingMoves(board, row, col, piece, BISHOP_MOVE_DIRECTIONS);
}

function generateQueenMoves(board, row, col, piece) {
  const queenDirections = [...ROOK_MOVE_DIRECTIONS, ...BISHOP_MOVE_DIRECTIONS];
  return generateSlidingMoves(board, row, col, piece, queenDirections);
}

function generateKingMoves(board, row, col, piece, position) {
  const moves = [];
  const from = coordsToAlgebraic(row, col);
  const pieceColor = getPieceColor(piece);
  
  for (const [rowOffset, colOffset] of KING_MOVE_OFFSETS) {
    const targetRow = row + rowOffset;
    const targetCol = col + colOffset;
    
    if (isValidPosition(targetRow, targetCol)) {
      const targetPiece = board[targetRow][targetCol];
      
      if (canMoveToSquare(targetPiece, pieceColor)) {
        const to = coordsToAlgebraic(targetRow, targetCol);
        moves.push({ from, to, piece });
      }
    }
  }
  
  // Add castling moves
  if (position && position.castlingRights) {
    const castlingMoves = generateCastlingMoves(board, row, col, piece, position.castlingRights);
    moves.push(...castlingMoves);
  }
  
  return moves;
}

function generateSlidingMoves(board, row, col, piece, directions) {
  const moves = [];
  const from = coordsToAlgebraic(row, col);
  const pieceColor = getPieceColor(piece);
  
  for (const [rowDirection, colDirection] of directions) {
    let targetRow = row + rowDirection;
    let targetCol = col + colDirection;
    
    while (isValidPosition(targetRow, targetCol)) {
      const targetPiece = board[targetRow][targetCol];
      
      if (targetPiece === EMPTY_SQUARE) {
        const to = coordsToAlgebraic(targetRow, targetCol);
        moves.push({ from, to, piece });
        targetRow += rowDirection;
        targetCol += colDirection;
      } else {
        if (canMoveToSquare(targetPiece, pieceColor)) {
          const to = coordsToAlgebraic(targetRow, targetCol);
          moves.push({ from, to, piece });
        }
        break;
      }
    }
  }
  
  return moves;
}

function canMoveToSquare(targetPiece, pieceColor) {
  return targetPiece === EMPTY_SQUARE || getPieceColor(targetPiece) !== pieceColor;
}

function coordsToAlgebraic(row, col) {
  const file = String.fromCharCode(FIRST_FILE_CHAR_CODE + col);
  const rank = BOARD_SIZE - row;
  return file + rank;
}

function generateCastlingMoves(board, row, col, piece, castlingRights) {
  const moves = [];
  const from = coordsToAlgebraic(row, col);
  const isWhite = isWhitePieceColor(piece);
  
  if (isWhite && row === WHITE_KING_START_ROW && col === KING_START_COL) { // White king on e1
    // Kingside castling
    if (castlingRights.whiteKingside && 
        board[WHITE_KING_START_ROW][5] === EMPTY_SQUARE && 
        board[WHITE_KING_START_ROW][6] === EMPTY_SQUARE) {
      moves.push({ from, to: 'g1', piece, special: 'castling' });
    }
    
    // Queenside castling
    if (castlingRights.whiteQueenside && 
        board[WHITE_KING_START_ROW][1] === EMPTY_SQUARE && 
        board[WHITE_KING_START_ROW][2] === EMPTY_SQUARE && 
        board[WHITE_KING_START_ROW][3] === EMPTY_SQUARE) {
      moves.push({ from, to: 'c1', piece, special: 'castling' });
    }
  } else if (!isWhite && row === BLACK_KING_START_ROW && col === KING_START_COL) { // Black king on e8
    // Kingside castling
    if (castlingRights.blackKingside && 
        board[BLACK_KING_START_ROW][5] === EMPTY_SQUARE && 
        board[BLACK_KING_START_ROW][6] === EMPTY_SQUARE) {
      moves.push({ from, to: 'g8', piece, special: 'castling' });
    }
    
    // Queenside castling
    if (castlingRights.blackQueenside && 
        board[BLACK_KING_START_ROW][1] === EMPTY_SQUARE && 
        board[BLACK_KING_START_ROW][2] === EMPTY_SQUARE && 
        board[BLACK_KING_START_ROW][3] === EMPTY_SQUARE) {
      moves.push({ from, to: 'c8', piece, special: 'castling' });
    }
  }
  
  return moves;
}

function isValidPosition(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

module.exports = { generateLegalMoves };