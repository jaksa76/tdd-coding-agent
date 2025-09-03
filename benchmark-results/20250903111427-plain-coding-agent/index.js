export function romanToNumber(roman) {
  if (!roman || typeof roman !== 'string') {
    return 0;
  }

  const romanMap = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };

  let result = 0;
  const upperRoman = roman.toUpperCase();

  for (let i = 0; i < upperRoman.length; i++) {
    const current = romanMap[upperRoman[i]];
    const next = romanMap[upperRoman[i + 1]];

    if (current === undefined) {
      throw new Error(`Invalid Roman numeral character: ${upperRoman[i]}`);
    }

    if (next && current < next) {
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }

  return result;
}