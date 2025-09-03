/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * Time complexity: O(n)
 * Space complexity: O(n)
 * 
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @returns {number[]} - Indices of the two numbers that add up to target
 */
export function twoSum(nums, target) {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return [];
}