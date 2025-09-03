import { describe, it, expect } from 'vitest';
import { parseRoman } from './index.js';

describe('Roman numeral parser', () => {
  it('should parse I as 1', () => {
    expect(parseRoman('I')).toBe(1);
  });

  it('should parse V as 5', () => {
    expect(parseRoman('V')).toBe(5);
  });

  it('should parse X as 10', () => {
    expect(parseRoman('X')).toBe(10);
  });

  it('should parse II as 2', () => {
    expect(parseRoman('II')).toBe(2);
  });

  it('should parse IV as 4', () => {
    expect(parseRoman('IV')).toBe(4);
  });

  it('should parse L as 50', () => {
    expect(parseRoman('L')).toBe(50);
  });

  it('should parse C as 100', () => {
    expect(parseRoman('C')).toBe(100);
  });

  it('should parse D as 500', () => {
    expect(parseRoman('D')).toBe(500);
  });

  it('should parse M as 1000', () => {
    expect(parseRoman('M')).toBe(1000);
  });

  it('should throw error for invalid Roman numeral character', () => {
    expect(() => parseRoman('Z')).toThrow();
  });

  it('should parse IX as 9', () => {
    expect(parseRoman('IX')).toBe(9);
  });

  it('should parse empty string as 0', () => {
    expect(parseRoman('')).toBe(0);
  });

  it('should throw error for invalid sequence IIII', () => {
    expect(() => parseRoman('IIII')).toThrow();
  });

  it('should throw error for invalid sequence CCCC', () => {
    expect(() => parseRoman('CCCC')).toThrow();
  });

  it('should throw error for invalid subtraction IL', () => {
    expect(() => parseRoman('IL')).toThrow();
  });

  it('should parse MCMXC as 1990', () => {
    expect(parseRoman('MCMXC')).toBe(1990);
  });

  it('should throw error for invalid sequence VV', () => {
    expect(() => parseRoman('VV')).toThrow();
  });

  it('should throw error for invalid sequence IIV', () => {
    expect(() => parseRoman('IIV')).toThrow();
  });

  it('should parse lowercase roman numerals', () => {
    expect(parseRoman('iv')).toBe(4);
  });

  it('should parse mixed case roman numerals', () => {
    expect(parseRoman('McM')).toBe(1900);
  });
});