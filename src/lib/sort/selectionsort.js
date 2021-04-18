import { swap, shiftRight } from "@/lib/array.js";

/**
 * @typedef {Object} ArrayElement
 * @property {number} value The value of the element
 * @property {number} index The index of the element in the corresponding array
 */

/**
 * Sort an array in place using swap operation
 * @param {Array.<number>} elements The array which gets sorted
 * @param {Object} swapDelay The delay for a swap operation
 * @param {number} swapDelay.wait The delay for a swap operation [ms]
 */
async function selectionsort(elements, swapDelay = { wait: 1 }) {
    let length = elements.length;
    for (let i = 0; i < length - 1; i++) {
        let smallestElement = findSmallestElementInRange(elements, i, length);
        if (smallestElement.index != i)
            await swap(elements, i, smallestElement.index, swapDelay);
    }
}

/**
 * Sort an array in place using shift operation
 * @param {Array.<number>} elements The array which gets sorted
 * @param {Object} swapDelay The delay for a swap operation
 * @param {number} swapDelay.wait The delay for a swap operation [ms]
 */
async function fastSelectionsort(elements, swapDelay = { wait: 1 }) {
    let length = elements.length;
    for (let i = 0; i < length - 1; i++) {
        let smallestElement = findSmallestElementInRange(elements, i, length);
        if (smallestElement.index != i)
            await shiftRight(elements, i, smallestElement.index, swapDelay);
    }
}

/**
 * 
 * @param {Array.<number>} elements The array which is investigated
 * @param {number} from index where to start the search
 * @param {number} to index where to end the search
 * @returns {ArrayElement} The smallest element
 */
function findSmallestElementInRange(elements, from, to) {
    let smallesElement = { value: elements[from], index: from };
    for (let i = from + 1; i < to; i++) {
        if (elements[i] < smallesElement.value) {
            smallesElement.value = elements[i];
            smallesElement.index = i;
        }
    }
    return smallesElement;
}

export { selectionsort, fastSelectionsort };
