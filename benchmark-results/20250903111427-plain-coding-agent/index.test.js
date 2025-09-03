import { describe, it, expect } from 'vitest';
import { romanToNumber } from './index.js';

describe('romanToNumber', () => {
  describe('basic numerals', () => {
    it('converts single characters correctly', () => {
      expect(romanToNumber('I')).toBe(1);
      expect(romanToNumber('V')).toBe(5);
      expect(romanToNumber('X')).toBe(10);
      expect(romanToNumber('L')).toBe(50);
      expect(romanToNumber('C')).toBe(100);
      expect(romanToNumber('D')).toBe(500);
      expect(romanToNumber('M')).toBe(1000);
    });

    it('handles lowercase input', () => {
      expect(romanToNumber('i')).toBe(1);
      expect(romanToNumber('v')).toBe(5);
      expect(romanToNumber('x')).toBe(10);
    });
  });

  describe('additive combinations', () => {
    it('converts simple additions correctly', () => {
      expect(romanToNumber('II')).toBe(2);
      expect(romanToNumber('III')).toBe(3);
      expect(romanToNumber('VI')).toBe(6);
      expect(romanToNumber('VII')).toBe(7);
      expect(romanToNumber('VIII')).toBe(8);
      expect(romanToNumber('XI')).toBe(11);
      expect(romanToNumber('XII')).toBe(12);
      expect(romanToNumber('XIII')).toBe(13);
      expect(romanToNumber('XV')).toBe(15);
      expect(romanToNumber('XVI')).toBe(16);
      expect(romanToNumber('XX')).toBe(20);
      expect(romanToNumber('XXX')).toBe(30);
    });
  });

  describe('subtractive combinations', () => {
    it('converts subtractive notation correctly', () => {
      expect(romanToNumber('IV')).toBe(4);
      expect(romanToNumber('IX')).toBe(9);
      expect(romanToNumber('XL')).toBe(40);
      expect(romanToNumber('XC')).toBe(90);
      expect(romanToNumber('CD')).toBe(400);
      expect(romanToNumber('CM')).toBe(900);
    });
  });

  describe('complex combinations', () => {
    it('converts complex Roman numerals correctly', () => {
      expect(romanToNumber('XIV')).toBe(14);
      expect(romanToNumber('XIX')).toBe(19);
      expect(romanToNumber('XXIV')).toBe(24);
      expect(romanToNumber('XXIX')).toBe(29);
      expect(romanToNumber('XLIV')).toBe(44);
      expect(romanToNumber('XLIX')).toBe(49);
      expect(romanToNumber('LXIV')).toBe(64);
      expect(romanToNumber('LXIX')).toBe(69);
      expect(romanToNumber('XCIV')).toBe(94);
      expect(romanToNumber('XCIX')).toBe(99);
      expect(romanToNumber('CDXLIV')).toBe(444);
      expect(romanToNumber('CDXLIX')).toBe(449);
      expect(romanToNumber('CMXC')).toBe(990);
      expect(romanToNumber('CMXCIV')).toBe(994);
      expect(romanToNumber('CMXCIX')).toBe(999);
    });

    it('converts historical dates and large numbers', () => {
      expect(romanToNumber('MCDXLIV')).toBe(1444);
      expect(romanToNumber('MCMLIV')).toBe(1954);
      expect(romanToNumber('MCMXC')).toBe(1990);
      expect(romanToNumber('MM')).toBe(2000);
      expect(romanToNumber('MMXXI')).toBe(2021);
      expect(romanToNumber('MMMCMXCIX')).toBe(3999);
    });
  });

  describe('edge cases', () => {
    it('handles empty or invalid input', () => {
      expect(romanToNumber('')).toBe(0);
      expect(romanToNumber(null)).toBe(0);
      expect(romanToNumber(undefined)).toBe(0);
    });

    it('throws error for invalid characters', () => {
      expect(() => romanToNumber('Z')).toThrow('Invalid Roman numeral character: Z');
      expect(() => romanToNumber('ABC')).toThrow('Invalid Roman numeral character: A');
      expect(() => romanToNumber('IVZ')).toThrow('Invalid Roman numeral character: Z');
    });

    it('handles mixed case correctly', () => {
      expect(romanToNumber('McmXc')).toBe(1990);
      expect(romanToNumber('cdXlIv')).toBe(444);
    });
  });
});