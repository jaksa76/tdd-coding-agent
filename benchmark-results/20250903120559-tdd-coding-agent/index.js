export function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  
  const smallerArrayLength = nums1.length;
  const largerArrayLength = nums2.length;
  const totalLength = smallerArrayLength + largerArrayLength;
  const isEvenLength = totalLength % 2 === 0;
  const targetPartitionSize = Math.floor(totalLength / 2);
  
  let searchLeft = 0;
  let searchRight = smallerArrayLength;
  
  while (searchLeft <= searchRight) {
    const smallerArrayPartition = Math.floor((searchLeft + searchRight) / 2);
    const largerArrayPartition = targetPartitionSize - smallerArrayPartition;
    
    const smallerLeftMax = getLeftPartitionMax(nums1, smallerArrayPartition);
    const smallerRightMin = getRightPartitionMin(nums1, smallerArrayPartition, smallerArrayLength);
    
    const largerLeftMax = getLeftPartitionMax(nums2, largerArrayPartition);
    const largerRightMin = getRightPartitionMin(nums2, largerArrayPartition, largerArrayLength);
    
    if (smallerLeftMax <= largerRightMin && largerLeftMax <= smallerRightMin) {
      return calculateMedian(smallerLeftMax, smallerRightMin, largerLeftMax, largerRightMin, isEvenLength);
    }
    
    if (smallerLeftMax > largerRightMin) {
      searchRight = smallerArrayPartition - 1;
    } else {
      searchLeft = smallerArrayPartition + 1;
    }
  }
  
  throw new Error("Input arrays are not sorted");
}

function getLeftPartitionMax(array, partitionIndex) {
  return partitionIndex === 0 ? -Infinity : array[partitionIndex - 1];
}

function getRightPartitionMin(array, partitionIndex, arrayLength) {
  return partitionIndex === arrayLength ? Infinity : array[partitionIndex];
}

function calculateMedian(smallerLeftMax, smallerRightMin, largerLeftMax, largerRightMin, isEvenLength) {
  if (isEvenLength) {
    const leftMax = Math.max(smallerLeftMax, largerLeftMax);
    const rightMin = Math.min(smallerRightMin, largerRightMin);
    return (leftMax + rightMin) / 2;
  }
  
  return Math.min(smallerRightMin, largerRightMin);
}