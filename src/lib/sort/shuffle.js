import { swap } from "@/lib/array.js";

/**
 * Shuffles an array in place
 * @param {Array.<number>} array Array which gets shuffled
 * @param {Object} swapDelay The delay for a swap operation
 * @param {number} swapDelay.wait the delay for a swap operation
 */
async function shuffle(array, swapDelay = { wait: 1 }) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        await swap(array, i, j, swapDelay);
    }
}

export { shuffle };
