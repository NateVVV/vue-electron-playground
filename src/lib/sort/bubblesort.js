import { swap } from "@/lib/array.js";

/**
 * Sort an array in place
 * @param {Array.<number>} array The array which is sorted
 * @param {Object} swapDelay The delay for a swap operation
 * @param {number} swapDelay.wait The delay for a swap operation
 */
async function bubblesort(array, swapDelay = { wait: 1 }) {
    for (let n = array.length; n > 1; n--) {
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                // swap elements
                await swap(array, i, i + 1, swapDelay);
            }
        }
    }
}

/**
 * Sort an array in place.
 * This can reduce some operation compared to normal bubblesort, when the array is sorted earlier
 * than when iterated over each value
 * @param {Array.<number>} array The array which is sorted
 * @param {Object} swapDelay The delay for a swap operation
 * @param {number} swapDelay.wait The delay for a swap operation
 */
async function improvedBubblesort(array, swapDelay = { wait: 1 }) {
    let swapped;
    let n = array.length;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                // swap elements
                await swap(array, i, i + 1, swapDelay);
                swapped = true;
            }
        }
        n--;
    } while (swapped);
}

export { bubblesort, improvedBubblesort };
