/**
 * Sleep for a specified time
 * @param {number} ms The duration, how long to sleep [ms]
 */
const sleep = async (ms) =>
    await new Promise((resolve) => setTimeout(resolve, ms));

export { sleep };
