import { sleep } from "@/utils.js";

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
 * @param {number} wait time how long to wait after the values were swapped
 */
async function swapInPlace(array, first, second, wait = 1) {
    const temp = array[first];
    array.splice(first, 1, array[second]);
    array.splice(second, 1, temp);
    await sleep(wait);
}

export { randomArray, filledArray, swapInPlace };
