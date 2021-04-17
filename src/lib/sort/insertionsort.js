import { swap, shiftRight } from "@/lib/array.js";

async function insertionsort(array, swapDelay = { wait: 1 }) {
    for (let i = 1; i < array.length; i++) {
        const temp = array[i];
        let j = i;
        while (j > 0 && array[j - 1] > temp) {
            await swap(array, j, j - 1, swapDelay);
            j--;
        }
        // not necessary, since the temp values is already moved (due to visualization)
        //array.splice(j, 1, temp)
        //await sleep(1);
    }
}

async function fastInsertionsort(elements, swapDelay = {wait: 1}) {
    for (let i = 1; i < elements.length; i++) {
        const temp = elements[i];
        let j = i;
        while (j > 0 && elements[j - 1] > temp) {
            j--;
        }
        await shiftRight(elements, j, i, swapDelay);
    }
}

export { insertionsort, fastInsertionsort };
