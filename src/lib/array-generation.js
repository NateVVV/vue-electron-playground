/**
 * Creates an array with random values. The maximum values is equal the size of the array
 * @param {number} size The size of the array
 * @returns the generated array
 */
function randomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        const n = Math.random() * (size - 1) + 1;
        array.push(Math.floor(n));
    }
    return array;
}

/**
 * Creates an array with values from 1 to `size`
 * @param {number} size the size of the array
 * @returns the generated array
 */
function filledArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(i + 1);
    }
    return array;
}

export { randomArray, filledArray };
