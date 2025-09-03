const { generateLegalMoves } = require('./index');

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
console.log('Generated moves:', moves.length);

const e2e3Move = moves.find(m => m.from === 'e2' && m.to === 'e3' && m.piece === 'P');
const e2e4Move = moves.find(m => m.from === 'e2' && m.to === 'e4' && m.piece === 'P');
const b1a3Move = moves.find(m => m.from === 'b1' && m.to === 'a3' && m.piece === 'N');
const b1c3Move = moves.find(m => m.from === 'b1' && m.to === 'c3' && m.piece === 'N');

console.log('E2-E3 move found:', !!e2e3Move);
console.log('E2-E4 move found:', !!e2e4Move);
console.log('B1-A3 move found:', !!b1a3Move);
console.log('B1-C3 move found:', !!b1c3Move);

console.log('All expected moves present:', !!(e2e3Move && e2e4Move && b1a3Move && b1c3Move));