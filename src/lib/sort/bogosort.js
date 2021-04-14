import { swap } from "@/lib/array.js";

async function bogosort(elements, swapDelay = { wait: 1 }) {
    while (!isSorted(elements)) {
        let index_a = Math.floor(Math.random() * elements.length);
        let index_b = Math.floor(Math.random() * elements.length);
        await swap(elements, index_a, index_b, swapDelay);
    }
}

function isSorted(elements) {
    for (let i = 0; i < elements.length - 1; i++) {
        if (elements[i] > elements[i + 1]) return false;
    }
    return true;
}

export { bogosort };
