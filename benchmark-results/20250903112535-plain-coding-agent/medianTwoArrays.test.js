import { describe, it, expect } from 'vitest';
import { findMedianSortedArrays } from './medianTwoArrays.js';

describe('findMedianSortedArrays', () => {
    it('should find median for example 1: [1,3] and [2]', () => {
        const result = findMedianSortedArrays([1, 3], [2]);
        expect(result).toBe(2.0);
    });

    it('should find median for example 2: [1,2] and [3,4]', () => {
        const result = findMedianSortedArrays([1, 2], [3, 4]);
        expect(result).toBe(2.5);
    });

    it('should handle empty first array', () => {
        const result = findMedianSortedArrays([], [1, 2, 3]);
        expect(result).toBe(2);
    });

    it('should handle empty second array', () => {
        const result = findMedianSortedArrays([1, 2, 3], []);
        expect(result).toBe(2);
    });

    it('should handle single element arrays', () => {
        const result = findMedianSortedArrays([1], [2]);
        expect(result).toBe(1.5);
    });

    it('should handle arrays with different sizes', () => {
        const result = findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6]);
        expect(result).toBe(4);
    });

    it('should handle negative numbers', () => {
        const result = findMedianSortedArrays([-2, -1], [3, 4]);
        expect(result).toBe(0.5);
    });

    it('should handle duplicate numbers', () => {
        const result = findMedianSortedArrays([1, 1], [1, 2]);
        expect(result).toBe(1);
    });

    it('should handle large numbers within constraints', () => {
        const result = findMedianSortedArrays([100000], [200000]);
        expect(result).toBe(150000);
    });
});