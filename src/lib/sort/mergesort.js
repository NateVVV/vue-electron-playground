import { shiftRight } from "@/lib/array.js";

async function mergesort(elements, swapDelay = { wait: 1 }) {
    await mergesortRecursive(elements, 0, elements.length - 1, swapDelay);
}

async function mergesortRecursive(elements, left, right, swapDelay) {
    if (left < right) {
        let mid = Math.floor(left + (right - left) / 2);
        await mergesortRecursive(elements, left, mid, swapDelay);
        await mergesortRecursive(elements, mid + 1, right, swapDelay);
        await merge(elements, left, mid, right, swapDelay);
    }
}

async function merge(elements, start, mid, end, swapDelay) {
    let start2 = mid + 1;
    if (elements[mid] <= elements[start2]) return;
    while (start <= mid && start2 <= end) {
        if (elements[start] <= elements[start2]) {
            start++;
        } else {
            await shiftRight(elements, start, start2, swapDelay)
            start++;
            mid++;
            start2++;
        }
    }
}

export { mergesort };
