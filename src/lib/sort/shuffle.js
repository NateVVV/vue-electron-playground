import { swap } from "@/lib/array.js";

/**
 * Shuffles an array in place
 * @param {Array.<number>} array Array which gets shuffled
 */
async function shuffle(array, swapDelay = 1) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        await swap(array, i, j, swapDelay);
    }
}

export { shuffle };
