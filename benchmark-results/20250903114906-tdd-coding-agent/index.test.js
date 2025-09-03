import { test, expect } from 'vitest';
import { lengthOfLongestSubstring } from './index.js';

test('should return 3 for "abcabcbb"', () => {
  expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
});

test('should return 1 for single character string', () => {
  expect(lengthOfLongestSubstring("a")).toBe(1);
});

test('should return 3 for "pwwkew" case', () => {
  expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
});

test('should return 3 for string with spaces and special characters', () => {
  expect(lengthOfLongestSubstring("a b")).toBe(3);
});

test('should return 0 for empty string', () => {
  expect(lengthOfLongestSubstring("")).toBe(0);
});

test('should return 1 for "bbbbb" (all same characters)', () => {
  expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
});