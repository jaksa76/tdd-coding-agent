export class ChessPosition {
  constructor(board = null) {
    this.board = board || this.getInitialBoard();
  }

  getInitialBoard() {
    return [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
  }

  isWhitePiece(piece) {
    return piece !== '.' && piece === piece.toUpperCase();
  }

  isBlackPiece(piece) {
    return piece !== '.' && piece === piece.toLowerCase();
  }

  isValidSquare(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  getPiece(row, col) {
    if (!this.isValidSquare(row, col)) return null;
    return this.board[row][col];
  }

  isPieceOfColor(piece, isWhite) {
    if (piece === '.') return false;
    return isWhite ? this.isWhitePiece(piece) : this.isBlackPiece(piece);
  }

  isSquareEmpty(row, col) {
    return this.getPiece(row, col) === '.';
  }

  isSquareOccupiedByOpponent(row, col, isWhite) {
    const piece = this.getPiece(row, col);
    if (piece === '.') return false;
    return isWhite ? this.isBlackPiece(piece) : this.isWhitePiece(piece);
  }

  canMoveTo(row, col, isWhite) {
    if (!this.isValidSquare(row, col)) return false;
    const piece = this.getPiece(row, col);
    return piece === '.' || (isWhite ? this.isBlackPiece(piece) : this.isWhitePiece(piece));
  }

  getPawnMoves(row, col, isWhite) {
    const moves = [];
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;
    
    const oneForward = row + direction;
    if (this.isValidSquare(oneForward, col) && this.isSquareEmpty(oneForward, col)) {
      moves.push([oneForward, col]);
      
      if (row === startRow) {
        const twoForward = row + 2 * direction;
        if (this.isValidSquare(twoForward, col) && this.isSquareEmpty(twoForward, col)) {
          moves.push([twoForward, col]);
        }
      }
    }

    [col - 1, col + 1].forEach(newCol => {
      const newRow = row + direction;
      if (this.isValidSquare(newRow, newCol) && 
          this.isSquareOccupiedByOpponent(newRow, newCol, isWhite)) {
        moves.push([newRow, newCol]);
      }
    });

    return moves;
  }

  getRookMoves(row, col, isWhite) {
    const moves = [];
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    directions.forEach(([dr, dc]) => {
      for (let i = 1; i < 8; i++) {
        const newRow = row + dr * i;
        const newCol = col + dc * i;
        
        if (!this.isValidSquare(newRow, newCol)) break;
        
        if (this.isSquareEmpty(newRow, newCol)) {
          moves.push([newRow, newCol]);
        } else if (this.isSquareOccupiedByOpponent(newRow, newCol, isWhite)) {
          moves.push([newRow, newCol]);
          break;
        } else {
          break;
        }
      }
    });

    return moves;
  }

  getBishopMoves(row, col, isWhite) {
    const moves = [];
    const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

    directions.forEach(([dr, dc]) => {
      for (let i = 1; i < 8; i++) {
        const newRow = row + dr * i;
        const newCol = col + dc * i;
        
        if (!this.isValidSquare(newRow, newCol)) break;
        
        if (this.isSquareEmpty(newRow, newCol)) {
          moves.push([newRow, newCol]);
        } else if (this.isSquareOccupiedByOpponent(newRow, newCol, isWhite)) {
          moves.push([newRow, newCol]);
          break;
        } else {
          break;
        }
      }
    });

    return moves;
  }

  getKnightMoves(row, col, isWhite) {
    const moves = [];
    const knightMoves = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];

    knightMoves.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (this.canMoveTo(newRow, newCol, isWhite)) {
        moves.push([newRow, newCol]);
      }
    });

    return moves;
  }

  getQueenMoves(row, col, isWhite) {
    return [...this.getRookMoves(row, col, isWhite), ...this.getBishopMoves(row, col, isWhite)];
  }

  getKingMoves(row, col, isWhite) {
    const moves = [];
    const kingMoves = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    kingMoves.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (this.canMoveTo(newRow, newCol, isWhite)) {
        moves.push([newRow, newCol]);
      }
    });

    return moves;
  }

  getPieceMoves(row, col, piece, isWhite) {
    const pieceType = piece.toLowerCase();
    
    switch (pieceType) {
      case 'p':
        return this.getPawnMoves(row, col, isWhite);
      case 'r':
        return this.getRookMoves(row, col, isWhite);
      case 'n':
        return this.getKnightMoves(row, col, isWhite);
      case 'b':
        return this.getBishopMoves(row, col, isWhite);
      case 'q':
        return this.getQueenMoves(row, col, isWhite);
      case 'k':
        return this.getKingMoves(row, col, isWhite);
      default:
        return [];
    }
  }

  makeMove(fromRow, fromCol, toRow, toCol) {
    const newBoard = this.board.map(row => [...row]);
    const piece = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = '.';
    newBoard[toRow][toCol] = piece;
    return new ChessPosition(newBoard);
  }

  isInCheck(isWhite) {
    let kingRow = -1, kingCol = -1;
    const kingPiece = isWhite ? 'K' : 'k';
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.board[row][col] === kingPiece) {
          kingRow = row;
          kingCol = col;
          break;
        }
      }
      if (kingRow !== -1) break;
    }

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece !== '.' && this.isPieceOfColor(piece, !isWhite)) {
          const moves = this.getPieceMoves(row, col, piece, !isWhite);
          if (moves.some(([r, c]) => r === kingRow && c === kingCol)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  generateLegalMoves(isWhite) {
    const legalMoves = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        
        if (piece !== '.' && this.isPieceOfColor(piece, isWhite)) {
          const possibleMoves = this.getPieceMoves(row, col, piece, isWhite);
          
          for (const [toRow, toCol] of possibleMoves) {
            const newPosition = this.makeMove(row, col, toRow, toCol);
            
            if (!newPosition.isInCheck(isWhite)) {
              legalMoves.push({
                from: [row, col],
                to: [toRow, toCol],
                piece: piece
              });
            }
          }
        }
      }
    }

    return legalMoves;
  }
}

export function generateLegalMoves(position, player) {
  const chessPosition = new ChessPosition(position);
  const isWhite = player === 'white';
  return chessPosition.generateLegalMoves(isWhite);
}