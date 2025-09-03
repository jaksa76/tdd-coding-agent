import { describe, it, expect } from 'vitest';
import { lengthOfLongestSubstring } from './index.js';

describe('lengthOfLongestSubstring', () => {
    it('should return 3 for "abcabcbb"', () => {
        expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
    });

    it('should return 1 for "bbbbb"', () => {
        expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
    });

    it('should return 3 for "pwwkew"', () => {
        expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
    });

    it('should return 0 for empty string', () => {
        expect(lengthOfLongestSubstring("")).toBe(0);
    });

    it('should return 0 for null input', () => {
        expect(lengthOfLongestSubstring(null)).toBe(0);
    });

    it('should return 1 for single character', () => {
        expect(lengthOfLongestSubstring("a")).toBe(1);
    });

    it('should handle string with all unique characters', () => {
        expect(lengthOfLongestSubstring("abcdef")).toBe(6);
    });

    it('should handle string with spaces and symbols', () => {
        expect(lengthOfLongestSubstring("a b!c@d#")).toBe(8);
    });

    it('should handle string with numbers', () => {
        expect(lengthOfLongestSubstring("123321")).toBe(3);
    });
});