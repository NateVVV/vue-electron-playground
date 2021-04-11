import { swap } from "@/lib/array.js";

async function bubblesort(array) {
    for (let n = array.length; n > 1; n--) {
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                // swap elements
                await swap(array, i, i + 1);
            }
            // wait after every step (to visualize the complexity)
            //await sleep(1);
        }
    }
}

async function improvedBubblesort(array) {
    let swapped;
    let n = array.length;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                // swap elements
                await swap(array, i, i + 1);
                swapped = true;
            }
            //await sleep(1);
        }
        n--;
    } while (swapped);
}

export { bubblesort, improvedBubblesort };
