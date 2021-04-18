import { sleep } from "@/lib/utils.js";

/**
 * @typedef {Object} Delay
 * @property {number} wait The time to wait [ms]
 */

/**
 * Creates an array with random values. The maximum values is equal the size of the array
 * @param {number} size The size of the array
 * @returns the generated array
 */
function randomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        const n = Math.random() * (size - 1) + 1;
        array.push(Math.floor(n));
    }
    return array;
}

/**
 * Creates an array with values from 1 to `size`
 * @param {number} size the size of the array
 * @returns the generated array
 */
function filledArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(i + 1);
    }
    return array;
}

/**
 * Swap two values in an array, specified by the indices
 * @param {Array.<number>} array The array in which the values get swapped
 * @param {number} first index of the first value
 * @param {number} second index of the second value
 * @param {Delay} delay time how long to wait after the values were swapped
 */
async function swap(array, first, second, { wait = 1 } = {}) {
    const temp = array[first];
    array.splice(first, 1, array[second]);
    array.splice(second, 1, temp);
    await sleep(wait);
}

/**
 * shift the elements in the specified range to the right. The last element is rotated to the first in the range.
 * @param {Array.<number>} array The array in which some valeus are shifted right
 * @param {number} from the index where to start with the shifting
 * @param {number} to the index where to end with the shifting
 * @param {Delay} swapDelay The delay for the shift operation
 */
async function shiftRight(array, from, to, { wait = 1 } = {}) {
    const temp = array[to];
    for (let i = to; i > from; i--) {
        array.splice(i, 1, array[i - 1]);
    }
    array.splice(from, 1, temp);
    await sleep(wait);
}

/**
 * Shift the elements in the specified range to the left. THe first element is rotated to the last in the range
 * @param {Array.<number>} array The array in which some values are shifted to the left
 * @param {number} from The index where to start with the shifting
 * @param {number} to The index where to end with the shifting
 * @param {Delay} swapDelay The delay for the shift operation
 */
async function shiftLeft(array, from, to, { wait = 1 } = {}) {
    const temp = array[from];
    for (let i = from; i < to; i++) {
        array.splice(i, 1, array[i + 1]);
    }
    array.splice(to, 1, temp);
    await sleep(wait);
}

export { randomArray, filledArray, swap, shiftRight, shiftLeft };
