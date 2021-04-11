import { swap } from "@/lib/array.js";

async function shellsort(array) {
    const length = array.length;
    for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < length; i++) {
            const temp = array[i];
            for (let j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                await swap(array, j, j - gap);
            }
        }
    }
}

export { shellsort };
