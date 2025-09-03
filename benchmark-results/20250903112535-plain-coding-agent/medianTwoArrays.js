/**
 * Find the median of two sorted arrays with O(log(m+n)) time complexity
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} - The median of the two arrays
 */
export function findMedianSortedArrays(nums1, nums2) {
    // Ensure nums1 is the smaller array for optimization
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    const m = nums1.length;
    const n = nums2.length;
    const totalLength = m + n;
    const isEven = totalLength % 2 === 0;
    const halfLength = Math.floor(totalLength / 2);
    
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = halfLength - partition1;
        
        // Handle edge cases for partition boundaries
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];
        
        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];
        
        // Check if we found the correct partition
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if (isEven) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.min(minRight1, minRight2);
            }
        }
        // Adjust binary search bounds
        else if (maxLeft1 > minRight2) {
            right = partition1 - 1;
        } else {
            left = partition1 + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted");
}