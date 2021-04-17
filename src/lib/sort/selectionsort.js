import { swap } from "@/lib/array.js";

async function selectionsort(elements, swapDelay = { wait: 1 }) {
    let length = elements.length;
    for (let i = 0; i < length - 1; i++) {
        let smallestElement = findSmallestElementInRange(elements, i, length);
        if (smallestElement.index != i)
            await swap(elements, i, smallestElement.index, swapDelay);
    }
}

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

export { selectionsort };
