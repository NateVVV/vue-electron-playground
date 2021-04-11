import { swapInPlace } from "@/lib/array.js";

async function quicksort(array) {
    const length = array.length;
    await quicksortRecursive(array, 0, length - 1);
}

async function quicksortRecursive(elements, left, right) {
    // End of recursion reached?
    if (left >= right) return;

    const pivotPos = await divide(elements, left, right);
    await quicksortRecursive(elements, left, pivotPos - 1);
    await quicksortRecursive(elements, pivotPos + 1, right);
}

async function divide(elements, left, right) {
    const pivot = elements[right];
    let i = left;
    let j = right - 1;

    while (i < j) {
        // Find the first element >= pivot
        while (i < right && elements[i] < pivot) i++;
        // Find the last element < pivot
        while (j > left && elements[j] >= pivot) j--;
        // If the greater element is left of the lesser element, switch them
        if (i < j) await swapInPlace(elements, i, j);
    }
    // Move pivot element to its final position
    if (elements[i] > pivot) await swapInPlace(elements, i, right);

    return i;
}

export { quicksort };
