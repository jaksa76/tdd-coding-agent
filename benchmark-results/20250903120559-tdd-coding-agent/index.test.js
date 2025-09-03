import { describe, it, expect } from 'vitest';
import { findMedianSortedArrays } from './index.js';

describe('findMedianSortedArrays', () => {
  it('should return median of two arrays with odd total length', () => {
    expect(findMedianSortedArrays([1, 3], [2])).toBe(2.0);
  });

  it('should return median of two arrays with even total length', () => {
    expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
  });

  it('should handle single element arrays', () => {
    expect(findMedianSortedArrays([1], [1])).toBe(1.0);
  });

  it('should handle empty array with non-empty array', () => {
    expect(findMedianSortedArrays([], [1])).toBe(1.0);
  });

  it('should handle non-empty array with empty array', () => {
    expect(findMedianSortedArrays([2], [])).toBe(2.0);
  });

  it('should handle arrays with negative numbers correctly', () => {
    expect(findMedianSortedArrays([-5, -3, -1], [0, 2, 4])).toBe(-0.5);
  });

  it('should handle arrays where one is much larger than the other', () => {
    expect(findMedianSortedArrays([1, 2], [3, 4, 5, 6, 7, 8])).toBe(4.5);
  });

  it('should handle arrays with all elements in first array greater than second', () => {
    expect(findMedianSortedArrays([7, 8, 9], [1, 2, 3, 4])).toBe(4.5);
  });

  it('should handle arrays with many duplicate elements', () => {
    expect(findMedianSortedArrays([1, 1, 1, 1], [1, 1, 1])).toBe(1.0);
  });

  it('should handle edge case with specific partition boundary', () => {
    expect(findMedianSortedArrays([100001], [100000])).toBe(100000.5);
  });
});