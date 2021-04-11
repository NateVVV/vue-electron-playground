import { swapInPlace } from "@/lib/array.js";

/**
 * Shuffles an array in place
 * @param {Array.<number>} array Array which gets shuffled
 */
async function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        await swapInPlace(array, i, j);
    }
}

export { shuffle };
