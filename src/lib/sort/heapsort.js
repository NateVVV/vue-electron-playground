import { swap } from "@/lib/array.js";

async function heapsort(array) {
    await buildHeap(array);

    for (
        let swapPosition = array.length - 1;
        swapPosition > 0;
        swapPosition--
    ) {
        // move root to end
        await swap(array, 0, swapPosition);
        // Fix remaining heap
        await heapify(array, swapPosition, 0);
    }
}

async function buildHeap(array) {
    const lastParentNode = Math.floor(array.length / 2) - 1;
    // Heapify it from here on backwards
    for (let i = lastParentNode; i >= 0; i--) {
        await heapify(array, array.length, i);
    }
}

async function heapify(heap, length, parentPosition) {
    let childPosition = 2 * parentPosition + 1;
    while (childPosition < length) {
        if (
            childPosition + 1 < length &&
            heap[childPosition + 1] > heap[childPosition]
        )
            childPosition += 1;
        if (heap[parentPosition] >= heap[childPosition]) break;
        await swap(heap, parentPosition, childPosition);
        parentPosition = childPosition;
        childPosition = 2 * parentPosition + 1;
    }
}

export { heapsort };
