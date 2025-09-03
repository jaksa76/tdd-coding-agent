import { describe, it, expect } from 'vitest';
import { ListNode, addTwoNumbers } from './index.js';

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    if (arr.length === 0) return null;
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

// Helper function to convert linked list to array for comparison
function linkedListToArray(head) {
    const result = [];
    let current = head;
    
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    
    return result;
}

describe('addTwoNumbers', () => {
    it('should add two numbers: 342 + 465 = 807', () => {
        const l1 = createLinkedList([2, 4, 3]); // represents 342
        const l2 = createLinkedList([5, 6, 4]); // represents 465
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([7, 0, 8]); // represents 807
    });

    it('should add two zeros: 0 + 0 = 0', () => {
        const l1 = createLinkedList([0]);
        const l2 = createLinkedList([0]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([0]);
    });

    it('should handle different lengths with carry: 9999999 + 9999 = 10009998', () => {
        const l1 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
        const l2 = createLinkedList([9, 9, 9, 9]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([8, 9, 9, 9, 0, 0, 0, 1]);
    });

    it('should handle single digit addition', () => {
        const l1 = createLinkedList([5]);
        const l2 = createLinkedList([5]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([0, 1]); // 5 + 5 = 10
    });

    it('should handle different lengths without carry', () => {
        const l1 = createLinkedList([1, 2, 3]);
        const l2 = createLinkedList([4, 5]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([5, 7, 3]); // 321 + 54 = 375
    });

    it('should handle carry at the end', () => {
        const l1 = createLinkedList([9]);
        const l2 = createLinkedList([9]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([8, 1]); // 9 + 9 = 18
    });

    it('should handle one empty and one non-empty list edge case simulation', () => {
        const l1 = createLinkedList([1, 8]);
        const l2 = createLinkedList([0]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([1, 8]); // 81 + 0 = 81
    });
});