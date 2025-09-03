function lengthOfLongestSubstring(s) {
    if (!s || s.length === 0) return 0;
    
    let maxLength = 0;
    let left = 0;
    const charIndexMap = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        if (charIndexMap.has(currentChar) && charIndexMap.get(currentChar) >= left) {
            left = charIndexMap.get(currentChar) + 1;
        }
        
        charIndexMap.set(currentChar, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

export { lengthOfLongestSubstring };