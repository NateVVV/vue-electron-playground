import { swap } from "@/lib/array.js";

/**
 * Sort an array in place
 * @param {Array.<number>} array The array which is sorted
 * @param {Object} swapDelay The delay for a swap operation
 * @param {number} swapDelay.wait The delay for a swap operation
 */
async function shellsort(array, swapDelay = { wait: 1 }) {
    const length = array.length;
    for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < length; i++) {
            const temp = array[i];
            for (let j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                await swap(array, j, j - gap, swapDelay);
            }
        }
    }
}

export { shellsort };
