import { describe, it, expect } from 'vitest';
import { ChessPosition, generateLegalMoves } from './index.js';

describe('ChessPosition', () => {
  describe('initialization', () => {
    it('should create initial chess position', () => {
      const position = new ChessPosition();
      expect(position.board[0][0]).toBe('r');
      expect(position.board[7][7]).toBe('R');
      expect(position.board[3][3]).toBe('.');
    });

    it('should accept custom board', () => {
      const customBoard = [
        ['.', '.', '.', '.', 'k', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', 'K', '.', '.', '.']
      ];
      const position = new ChessPosition(customBoard);
      expect(position.board[0][4]).toBe('k');
      expect(position.board[7][4]).toBe('K');
    });
  });

  describe('piece identification', () => {
    const position = new ChessPosition();

    it('should identify white pieces', () => {
      expect(position.isWhitePiece('K')).toBe(true);
      expect(position.isWhitePiece('Q')).toBe(true);
      expect(position.isWhitePiece('P')).toBe(true);
      expect(position.isWhitePiece('k')).toBe(false);
      expect(position.isWhitePiece('.')).toBe(false);
    });

    it('should identify black pieces', () => {
      expect(position.isBlackPiece('k')).toBe(true);
      expect(position.isBlackPiece('q')).toBe(true);
      expect(position.isBlackPiece('p')).toBe(true);
      expect(position.isBlackPiece('K')).toBe(false);
      expect(position.isBlackPiece('.')).toBe(false);
    });
  });

  describe('pawn moves', () => {
    it('should generate correct initial pawn moves for white', () => {
      const position = new ChessPosition();
      const moves = position.getPawnMoves(6, 0, true);
      expect(moves).toContainEqual([5, 0]);
      expect(moves).toContainEqual([4, 0]);
      expect(moves).toHaveLength(2);
    });

    it('should generate correct initial pawn moves for black', () => {
      const position = new ChessPosition();
      const moves = position.getPawnMoves(1, 0, false);
      expect(moves).toContainEqual([2, 0]);
      expect(moves).toContainEqual([3, 0]);
      expect(moves).toHaveLength(2);
    });

    it('should generate capture moves', () => {
      const customBoard = [
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', 'r', '.', 'r', '.', '.', '.', '.'],
        ['.', '.', 'P', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.']
      ];
      const position = new ChessPosition(customBoard);
      const moves = position.getPawnMoves(4, 2, true);
      expect(moves).toContainEqual([3, 1]);
      expect(moves).toContainEqual([3, 3]);
      expect(moves).toContainEqual([3, 2]);
      expect(moves).toHaveLength(3);
    });
  });

  describe('rook moves', () => {
    it('should generate correct rook moves', () => {
      const customBoard = [
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', 'R', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.']
      ];
      const position = new ChessPosition(customBoard);
      const moves = position.getRookMoves(4, 3, true);
      expect(moves).toHaveLength(14);
      expect(moves).toContainEqual([0, 3]);
      expect(moves).toContainEqual([4, 0]);
      expect(moves).toContainEqual([7, 3]);
      expect(moves).toContainEqual([4, 7]);
    });
  });

  describe('knight moves', () => {
    it('should generate correct knight moves', () => {
      const customBoard = [
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', 'N', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.']
      ];
      const position = new ChessPosition(customBoard);
      const moves = position.getKnightMoves(4, 3, true);
      expect(moves).toHaveLength(8);
      expect(moves).toContainEqual([2, 2]);
      expect(moves).toContainEqual([2, 4]);
      expect(moves).toContainEqual([6, 2]);
      expect(moves).toContainEqual([6, 4]);
    });
  });

  describe('check detection', () => {
    it('should detect check', () => {
      const customBoard = [
        ['.', '.', '.', '.', 'k', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', 'R', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', 'K', '.', '.', '.']
      ];
      const position = new ChessPosition(customBoard);
      expect(position.isInCheck(false)).toBe(true);
      expect(position.isInCheck(true)).toBe(false);
    });
  });

  describe('legal moves generation', () => {
    it('should generate legal moves from initial position for white', () => {
      const position = new ChessPosition();
      const moves = position.generateLegalMoves(true);
      expect(moves.length).toBe(20);
      
      const pawnMoves = moves.filter(move => move.piece === 'P');
      expect(pawnMoves.length).toBe(16);
      
      const knightMoves = moves.filter(move => move.piece === 'N');
      expect(knightMoves.length).toBe(4);
    });

    it('should generate legal moves from initial position for black', () => {
      const position = new ChessPosition();
      const moves = position.generateLegalMoves(false);
      expect(moves.length).toBe(20);
      
      const pawnMoves = moves.filter(move => move.piece === 'p');
      expect(pawnMoves.length).toBe(16);
      
      const knightMoves = moves.filter(move => move.piece === 'n');
      expect(knightMoves.length).toBe(4);
    });

    it('should not allow moves that put king in check', () => {
      const customBoard = [
        ['.', '.', '.', '.', 'k', '.', '.', '.'],
        ['.', '.', '.', '.', 'p', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', 'R', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', 'K', '.', '.', '.']
      ];
      const position = new ChessPosition(customBoard);
      const moves = position.generateLegalMoves(false);
      
      const pawnMoves = moves.filter(move => 
        move.from[0] === 1 && move.from[1] === 4
      );
      expect(pawnMoves.length).toBe(0);
    });
  });
});

describe('generateLegalMoves function', () => {
  it('should work with the exported function', () => {
    const initialBoard = [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
    
    const whiteMoves = generateLegalMoves(initialBoard, 'white');
    expect(whiteMoves.length).toBe(20);
    
    const blackMoves = generateLegalMoves(initialBoard, 'black');
    expect(blackMoves.length).toBe(20);
  });

  it('should return moves in correct format', () => {
    const simpleBoard = [
      ['.', '.', '.', '.', 'k', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', 'K', '.', '.', '.']
    ];
    
    const moves = generateLegalMoves(simpleBoard, 'white');
    expect(moves.length).toBeGreaterThan(0);
    
    const move = moves[0];
    expect(move).toHaveProperty('from');
    expect(move).toHaveProperty('to');
    expect(move).toHaveProperty('piece');
    expect(Array.isArray(move.from)).toBe(true);
    expect(Array.isArray(move.to)).toBe(true);
    expect(move.from.length).toBe(2);
    expect(move.to.length).toBe(2);
  });
});