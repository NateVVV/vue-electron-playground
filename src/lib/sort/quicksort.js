import { swap } from "@/lib/array.js";

/**
 * Sort an array in place
 * @param {Array.<number>} array The array which gets sorted
 * @param {Object} swapDelay The delay for a swap operation
 * @param {number} swapDelay.wait The delay for a swap operation [ms]
 */
async function quicksort(array, swapDelay = { wait: 1 }) {
    const length = array.length;
    await quicksortRecursive(array, 0, length - 1, swapDelay);
}

/**
 * Sort an array in the range [left,right]
 * @param {Array.<number>} elements The array which gets sorted
 * @param {number} left left boundary of the range
 * @param {number} right right boundary of the range
 * @param {Object} swapDelay  The delay for a swap operation
 */
async function quicksortRecursive(elements, left, right, swapDelay) {
    // End of recursion reached?
    if (left >= right) return;

    const pivotPos = await divide(elements, left, right, swapDelay);
    await quicksortRecursive(elements, left, pivotPos - 1, swapDelay);
    await quicksortRecursive(elements, pivotPos + 1, right, swapDelay);
}

/**
 * Rearange the given range [left,right] of an array into a lower part and a higher part
 * @param {number[]} elements The array
 * @param {number} left left boundary of the range
 * @param {number} right right boundary of teh range
 * @param {Object} swapDelay The delay for a swap operation
 * @returns {number} The index of the array which divides the given range in a lower and a higher part
 */
async function divide(elements, left, right, swapDelay) {
    const pivot = elements[right];
    let i = left;
    let j = right - 1;

    while (i < j) {
        // Find the first element >= pivot
        while (i < right && elements[i] < pivot) i++;
        // Find the last element < pivot
        while (j > left && elements[j] >= pivot) j--;
        // If the greater element is left of the lesser element, switch them
        if (i < j) await swap(elements, i, j, swapDelay);
    }
    // Move pivot element to its final position
    if (elements[i] > pivot) await swap(elements, i, right, swapDelay);

    return i;
}

export { quicksort };
