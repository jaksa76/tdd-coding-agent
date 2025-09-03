import { describe, it, expect } from 'vitest';
import { twoSum } from './index.js';

describe('twoSum', () => {
  it('should return [0,1] for nums=[2,7,11,15] and target=9', () => {
    const result = twoSum([2, 7, 11, 15], 9);
    expect(result.sort()).toEqual([0, 1]);
  });

  it('should return [1,2] for nums=[3,2,4] and target=6', () => {
    const result = twoSum([3, 2, 4], 6);
    expect(result.sort()).toEqual([1, 2]);
  });

  it('should return [0,1] for nums=[3,3] and target=6', () => {
    const result = twoSum([3, 3], 6);
    expect(result.sort()).toEqual([0, 1]);
  });

  it('should handle negative numbers correctly', () => {
    const result = twoSum([-1, -2, -3, -4, -5], -8);
    expect(result.sort()).toEqual([2, 4]);
  });

  it('should efficiently handle large arrays with target at end', () => {
    const largeArray = Array.from({length: 1000}, (_, i) => i + 1);
    largeArray.push(500.5);
    const result = twoSum(largeArray, 1000.5);
    expect(result.sort()).toEqual([499, 1000]);
  });
});