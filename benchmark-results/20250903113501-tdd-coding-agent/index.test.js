import { describe, it, expect } from 'vitest';
import { ListNode, addTwoNumbers } from './index.js';

function createLinkedList(arr) {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

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
    it('should add two numbers with single carry operation', () => {
        const l1 = createLinkedList([5, 5]);
        const l2 = createLinkedList([5]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([0, 6]);
    });

    it('should handle multiple consecutive carries', () => {
        const l1 = createLinkedList([9, 9, 9]);
        const l2 = createLinkedList([1]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([0, 0, 0, 1]);
    });

    it('should add numbers from example 1', () => {
        const l1 = createLinkedList([2, 4, 3]);
        const l2 = createLinkedList([5, 6, 4]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([7, 0, 8]);
    });

    it('should handle adding zero to zero', () => {
        const l1 = createLinkedList([0]);
        const l2 = createLinkedList([0]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([0]);
    });

    it('should add numbers from example 3', () => {
        const l1 = createLinkedList([9,9,9,9,9,9,9]);
        const l2 = createLinkedList([9,9,9,9]);
        const result = addTwoNumbers(l1, l2);
        expect(linkedListToArray(result)).toEqual([8,9,9,9,0,0,0,1]);
    });
});