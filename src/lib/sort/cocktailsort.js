import { swap } from "@/lib/array.js";

async function cocktailsort(elements, swapDelay = { wait: 1 }) {
    let swapped = true;
    let start = 0;
    let end = elements.length - 1;
    while (swapped) {
        swapped = false;
        for (let i = start; i < end; i++) {
            if (elements[i] > elements[i + 1]) {
                await swap(elements, i, i + 1, swapDelay);
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (let i = end; i > start; i--) {
            if (elements[i - 1] > elements[i]) {
                await swap(elements, i, i - 1, swapDelay);
                swapped = true;
            }
        }
        start++;
    }
}

export { cocktailsort };
