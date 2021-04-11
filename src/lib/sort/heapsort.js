import { swapInPlace } from "@/lib/array.js";

async function heapsort(array) {
    await buildHeap(array);

    for (
        let swapPosition = array.length - 1;
        swapPosition > 0;
        swapPosition--
    ) {
        // move root to end
        await swapInPlace(array, 0, swapPosition);
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
    let isHeap = false;
    while (!isHeap) {
        let leftChildPosition = parentPosition * 2 + 1;
        let rightChildPosition = parentPosition * 2 + 2;

        // find largest element
        let largestPosition = parentPosition;
        if (
            leftChildPosition < length &&
            heap[leftChildPosition] > heap[largestPosition]
        )
            largestPosition = leftChildPosition;

        if (
            rightChildPosition < length &&
            heap[rightChildPosition] > heap[largestPosition]
        )
            largestPosition = rightChildPosition;

        // if parent is already largest, go to next
        if (largestPosition == parentPosition) {
            isHeap = true;
            return;
        }
        // switch parent
        await swapInPlace(heap, parentPosition, largestPosition);
        // fix the child
        parentPosition = largestPosition;
    }
}

export { heapsort };
