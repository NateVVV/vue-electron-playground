import { swap } from "@/lib/array.js";

async function cocktailsort(elements, swapDelay = { wait: 1 }) {
    let swapped;
    let start = 0;
    let end = elements.length - 1;
    do {
        swapped = await bubblesortUpwards(elements, start, end, swapDelay);
        if (!swapped) break;
        end--;
        swapped = await bubblesortDownwards(elements, end, start, swapDelay);
        start++;
    } while (swapped);
}

async function bubblesortUpwards(elements, from, to, swapDelay) {
    let swapped = false;
    for (let i = from; i < to; i++) {
        if (elements[i] > elements[i + 1]) {
            await swap(elements, i, i + 1, swapDelay);
            swapped = true;
        }
    }
    return swapped;
}

async function bubblesortDownwards(elements, from, to, swapDelay) {
    let swapped = false;
    for (let i = from; i > to; i--) {
        if (elements[i - 1] > elements[i]) {
            await swap(elements, i, i - 1, swapDelay);
            swapped = true;
        }
    }
    return swapped;
}

export { cocktailsort };
