import { swap } from "@/lib/array.js";

async function bubblesort(array, swapDelay = 1) {
    for (let n = array.length; n > 1; n--) {
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                // swap elements
                await swap(array, i, i + 1, swapDelay);
            }
        }
    }
}

async function improvedBubblesort(array, swapDelay = 1) {
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
