const { generateLegalMoves } = require('./index');

describe('Chess Move Generation', () => {
  test('should generate legal moves for white pawn at starting position', () => {
    const position = {
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      turn: 'white'
    };
    
    const moves = generateLegalMoves(position);
    
    expect(moves).toContain({ from: 'e2', to: 'e3', piece: 'P' });
    expect(moves).toContain({ from: 'e2', to: 'e4', piece: 'P' });
  });

  test('should generate legal moves for white knight at starting position', () => {
    const position = {
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      turn: 'white'
    };
    
    const moves = generateLegalMoves(position);
    
    expect(moves).toContain({ from: 'b1', to: 'a3', piece: 'N' });
    expect(moves).toContain({ from: 'b1', to: 'c3', piece: 'N' });
  });

  test('should generate legal moves for white rook when path is clear', () => {
    const position = {
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', '.', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      turn: 'white'
    };
    
    const moves = generateLegalMoves(position);
    
    expect(moves).toContain({ from: 'a1', to: 'b1', piece: 'R' });
    expect(moves).toContain({ from: 'a1', to: 'a2', piece: 'R' });
  });

  test('should generate legal moves for black pawn at starting position', () => {
    const position = {
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      turn: 'black'
    };
    
    const moves = generateLegalMoves(position);
    
    expect(moves).toContain({ from: 'd7', to: 'd6', piece: 'p' });
    expect(moves).toContain({ from: 'd7', to: 'd5', piece: 'p' });
  });

  test('should generate legal moves for white bishop when path is clear', () => {
    const position = {
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', '.', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      turn: 'white'
    };
    
    const moves = generateLegalMoves(position);
    
    expect(moves).toContain({ from: 'c1', to: 'd2', piece: 'B' });
    expect(moves).toContain({ from: 'c1', to: 'e3', piece: 'B' });
  });

  test('should generate legal moves for white queen when path is clear', () => {
    const position = {
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', '.', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      turn: 'white'
    };
    
    const moves = generateLegalMoves(position);
    
    expect(moves).toContain({ from: 'd1', to: 'd2', piece: 'Q' });
    expect(moves).toContain({ from: 'd1', to: 'd3', piece: 'Q' });
  });

  test('should generate legal moves for white king when adjacent squares are free', () => {
    const position = {
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', 'P', '.', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      turn: 'white'
    };
    
    const moves = generateLegalMoves(position);
    
    expect(moves).toContain({ from: 'e1', to: 'e2', piece: 'K' });
    expect(moves).toContain({ from: 'e1', to: 'd1', piece: 'K' });
  });

  test('should generate legal capture moves for white pawn', () => {
    const position = {
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', 'p', '.', '.', '.', '.'],
        ['.', '.', 'P', '.', '.', '.', '.', '.'],
        ['P', 'P', '.', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      turn: 'white'
    };
    
    const moves = generateLegalMoves(position);
    
    expect(moves).toContain({ from: 'c3', to: 'd4', piece: 'P' });
  });

  test('should generate kingside castling move for white when conditions are met', () => {
    const position = {
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', '.', '.', 'R']
      ],
      turn: 'white',
      castlingRights: { whiteKingside: true, whiteQueenside: true, blackKingside: true, blackQueenside: true }
    };
    
    const moves = generateLegalMoves(position);
    
    expect(moves).toContain({ from: 'e1', to: 'g1', piece: 'K', special: 'castling' });
  });

  test('should generate queenside castling move for white when conditions are met', () => {
    const position = {
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', '.', '.', '.', 'K', 'B', 'N', 'R']
      ],
      turn: 'white',
      castlingRights: { whiteKingside: true, whiteQueenside: true, blackKingside: true, blackQueenside: true }
    };
    
    const moves = generateLegalMoves(position);
    
    expect(moves).toContain({ from: 'e1', to: 'c1', piece: 'K', special: 'castling' });
  });
});