const s = 'pwwkew';
console.log('String:', s);
console.log('All valid substrings without duplicates:');

for(let i = 0; i < s.length; i++) {
  for(let j = i + 1; j <= s.length; j++) {
    const sub = s.slice(i, j);
    const chars = new Set(sub);
    if (chars.size === sub.length) {
      console.log('Valid:', sub, 'length:', sub.length);
    }
  }
}