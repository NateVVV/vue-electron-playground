<template>
    <v-container>
        Hier wird sortiert
        <v-card flat>
            <div>
                <v-btn elevation="2" @click="randomize" class="ma-1">
                    create random numbers
                </v-btn>
                <v-btn elevation="2" @click="createNumberRange" class="ma-1">
                    create equal range
                </v-btn>
                <v-text-field
                    v-model="arraySize"
                    hint="Specify the size of the array which gets sorted"
                    label="Size"
                >
                </v-text-field>
            </div>
            <div>
                <v-btn
                    @click="sort('bubblesort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Bubblesort
                </v-btn>
                <v-btn
                    @click="sort('improvedBubblesort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    improved Bubblesort
                </v-btn>
                <v-btn
                    @click="sort('insertionsort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Insertionsort
                </v-btn>
                <v-btn
                    @click="sort('shellsort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Shellsort
                </v-btn>
                <v-btn
                    @click="sort('quicksort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Quicksort
                </v-btn>
                <v-btn class="ma-1" disabled>
                    Mergesort
                </v-btn>
                <v-btn class="ma-1" disabled>
                    Heapsort
                </v-btn>
            </div>
        </v-card>
        <v-card class="d-flex flex-wrap mt-2" flat v-if="false">
            <div v-for="(v, n) in values" :key="n" class="px-1">
                {{ v }}
            </div>
        </v-card>
        <v-sparkline
            :value="values"
            :gradient="gradient"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            :auto-draw="autoDraw"
        ></v-sparkline>
    </v-container>
</template>

<script>
import { sleep } from "@/utils.js";

const gradients = [
    ["#222"],
    ["#42b3f4"],
    ["red", "orange", "yellow"],
    ["purple", "violet"],
    ["#00c6ff", "#F0F", "#FF0"],
    ["#f72047", "#ffd200", "#1feaea"],
];

export default {
    name: "Sorting",
    data: () => ({
        arraySize: 100,
        values: [],
        width: 1,
        radius: 1,
        padding: 8,
        lineCap: "round",
        gradient: gradients[5],
        gradientDirection: "top",
        gradients,
        fill: true,
        type: "bar",
        autoLineWidth: false,
        autoDraw: false,
        isSorting: false,
        sortMapping: new Map(),
    }),
    mounted: async function() {
        await this.randomize();
    },
    created: function() {
        const sortMapping = new Map([
            ["bubblesort", this.bubblesort],
            ["improvedBubblesort", this.improvedBubblesort],
            ["insertionsort", this.insertionsort],
            ["shellsort", this.shellsort],
            ["quicksort", this.quicksort],
        ]);
        this.sortMapping = sortMapping;
    },
    methods: {
        randomize: async function() {
            this.autoDraw = true;
            const amount = this.arraySize;
            const maxNumber = amount - 1;
            this.values = [];
            await sleep(50);
            for (let i = 0; i < amount; i++) {
                let n = Math.random() * maxNumber + 1;
                this.values.push(Math.floor(n));
            }
            console.log("Randomized");
            this.unlockSorting();
        },
        createNumberRange: async function() {
            this.autoDraw = true;
            const amount = this.arraySize;
            this.values = [];
            await sleep(50);
            for (let i = 0; i < amount; i++) {
                this.values.push(i + 1);
            }
            await this.shuffle(this.values);
            console.log("Shuffled");
            this.unlockSorting();
        },
        shuffle: async function(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                await this.swapInArray(array, i, j);
            }
        },
        lockSorting: function() {
            this.autoDraw = false;
            this.isSorting = true;
        },
        unlockSorting: function() {
            this.isSorting = false;
        },
        swapInArray: async function(array, firstIndex, secondIndex, wait = 1) {
            const temp = array[firstIndex];
            this.$set(array, firstIndex, array[secondIndex]);
            this.$set(array, secondIndex, temp);
            await sleep(wait);
        },
        sort: async function(algorithm) {
            this.lockSorting();
            const sortAlgorithm = this.sortMapping.get(algorithm);
            await sortAlgorithm();
            console.log("Finished sorting");
            this.unlockSorting();
        },
        bubblesort: async function() {
            const values = this.values;
            for (let n = values.length; n > 1; n--) {
                for (let i = 0; i < n - 1; i++) {
                    if (values[i] > values[i + 1]) {
                        // swap elements
                        await this.swapInArray(values, i, i + 1);
                    }
                    // wait after every step (to visualize the complexity)
                    //await sleep(1);
                }
            }
        },
        improvedBubblesort: async function() {
            const values = this.values;
            let swapped;
            let n = values.length;
            do {
                swapped = false;
                for (let i = 0; i < n - 1; i++) {
                    if (values[i] > values[i + 1]) {
                        // swap elements
                        await this.swapInArray(values, i, i + 1);
                        swapped = true;
                    }
                    //await sleep(1);
                }
                n--;
            } while (swapped);
        },
        insertionsort: async function() {
            const values = this.values;
            for (let i = 1; i < values.length; i++) {
                const temp = values[i];
                let j = i;
                while (j > 0 && values[j - 1] > temp) {
                    await this.swapInArray(values, j, j - 1);
                    j--;
                }
                // not necessary, since the temp values is already moved (due to visualization)
                //this.$set(values, j, temp);
                //await sleep(1);
            }
        },
        shellsort: async function() {
            const values = this.values;
            const length = values.length;
            for (
                let gap = Math.floor(length / 2);
                gap > 0;
                gap = Math.floor(gap / 2)
            ) {
                for (let i = gap; i < length; i++) {
                    const temp = values[i];
                    for (
                        let j = i;
                        j >= gap && values[j - gap] > temp;
                        j -= gap
                    ) {
                        await this.swapInArray(values, j, j - gap);
                    }
                }
            }
        },
        quicksort: async function() {
            const values = this.values;
            const length = values.length;
            await this.quicksortRecursive(values, 0, length - 1);
        },
        quicksortRecursive: async function(elements, left, right) {
            // End of recursion reached?
            if (left >= right) return;

            const pivotPos = await this.quicksortDivide(elements, left, right);
            await this.quicksortRecursive(elements, left, pivotPos - 1);
            await this.quicksortRecursive(elements, pivotPos + 1, right);
        },
        quicksortDivide: async function(elements, left, right) {
            const pivot = elements[right];
            let i = left;
            let j = right - 1;

            while (i < j) {
                // Find the first element >= pivot
                while (i < right && elements[i] < pivot) i++;
                // Find the last element < pivot
                while (j > left && elements[j] >= pivot) j--;
                // If the greater element is left of the lesser element, switch them
                if (i < j) await this.swapInArray(elements, i, j);
            }
            // Move pivot element to its final position
            if (elements[i] > pivot) await this.swapInArray(elements, i, right);

            return i;
        },
    },
};
</script>
