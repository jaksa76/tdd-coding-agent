const ROMAN_NUMERALS = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
};

const INVALID_SUBTRACTIONS = ['IL', 'IC', 'ID', 'IM', 'XD', 'XM'];
const INVALID_SEQUENCES = ['IIII', 'CCCC', 'VV', 'IIV'];

export function parseRoman(roman) {
  if (roman === '') return 0;
  
  roman = roman.toUpperCase();
  validateRomanNumeral(roman);
  
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = ROMAN_NUMERALS[roman[i]];
    const next = ROMAN_NUMERALS[roman[i + 1]];
    
    if (next && current < next) {
      validateSubtraction(roman[i], roman[i + 1]);
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

function validateRomanNumeral(roman) {
  for (const char of roman) {
    if (!(char in ROMAN_NUMERALS)) {
      throw new Error(`Invalid Roman numeral character: ${char}`);
    }
  }
  
  for (const sequence of INVALID_SEQUENCES) {
    if (roman.includes(sequence)) {
      throw new Error(`Invalid Roman numeral sequence: ${sequence}`);
    }
  }
}

function validateSubtraction(current, next) {
  const combination = current + next;
  if (INVALID_SUBTRACTIONS.includes(combination)) {
    throw new Error(`Invalid subtraction: ${combination}`);
  }
}