import { describe, it, expect } from 'vitest';
import { twoSum } from './index.js';

describe('twoSum', () => {
    it('should return indices for example 1', () => {
        const nums = [2, 7, 11, 15];
        const target = 9;
        const result = twoSum(nums, target);
        
        expect(result).toEqual([0, 1]);
        expect(nums[result[0]] + nums[result[1]]).toBe(target);
    });
    
    it('should return indices for example 2', () => {
        const nums = [3, 2, 4];
        const target = 6;
        const result = twoSum(nums, target);
        
        expect(result).toEqual([1, 2]);
        expect(nums[result[0]] + nums[result[1]]).toBe(target);
    });
    
    it('should return indices for example 3', () => {
        const nums = [3, 3];
        const target = 6;
        const result = twoSum(nums, target);
        
        expect(result).toEqual([0, 1]);
        expect(nums[result[0]] + nums[result[1]]).toBe(target);
    });
    
    it('should handle negative numbers', () => {
        const nums = [-1, -2, -3, -4, -5];
        const target = -8;
        const result = twoSum(nums, target);
        
        expect(result).toEqual([2, 4]);
        expect(nums[result[0]] + nums[result[1]]).toBe(target);
    });
    
    it('should handle mixed positive and negative numbers', () => {
        const nums = [-3, 4, 3, 90];
        const target = 0;
        const result = twoSum(nums, target);
        
        expect(result).toEqual([0, 2]);
        expect(nums[result[0]] + nums[result[1]]).toBe(target);
    });
    
    it('should handle large numbers', () => {
        const nums = [1000000000, -1000000000, 999999999];
        const target = 1999999999;
        const result = twoSum(nums, target);
        
        expect(result).toEqual([0, 2]);
        expect(nums[result[0]] + nums[result[1]]).toBe(target);
    });
});