import { swap } from "@/lib/array.js";

/**
 * Sort an array in place
 * @param {Array.<number>} elements The array which gets sorted
 * @param {Object} swapDelay The delay for a swap operation
 * @param {number} swapDelay.wait The delay for a swap operation
 */
async function bogosort(elements, swapDelay = { wait: 1 }) {
    while (!isSorted(elements)) {
        let index_a = Math.floor(Math.random() * elements.length);
        let index_b = Math.floor(Math.random() * elements.length);
        await swap(elements, index_a, index_b, swapDelay);
    }
}

/**
 * Check if an array is sorted
 * @param {Array.<number>} elements The array which is evaluated
 * @returns {boolean} Inidicator if array is sorted or not
 */
function isSorted(elements) {
    for (let i = 0; i < elements.length - 1; i++) {
        if (elements[i] > elements[i + 1]) return false;
    }
    return true;
}

export { bogosort };
