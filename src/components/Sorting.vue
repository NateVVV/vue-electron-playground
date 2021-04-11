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
                <v-btn
                    @click="sort('heapsort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Heapsort
                </v-btn>
                <v-btn class="ma-1" disabled>
                    Selectionsort
                </v-btn>
                <v-btn class="ma-1" disabled>
                    Cocktailsort
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
            :gradient="sparklineSettings.gradient"
            :smooth="sparklineSettings.radius || false"
            :padding="sparklineSettings.padding"
            :line-width="sparklineSettings.width"
            :stroke-linecap="sparklineSettings.lineCap"
            :gradient-direction="sparklineSettings.gradientDirection"
            :fill="sparklineSettings.fill"
            :type="sparklineSettings.type"
            :auto-line-width="sparklineSettings.autoLineWidth"
            :auto-draw="sparklineSettings.autoDraw"
        ></v-sparkline>
    </v-container>
</template>

<script>
import { sleep } from "@/lib/utils.js";
import { randomArray, filledArray } from "@/lib/array.js";
import { shuffle } from "@/lib/sort/shuffle.js";
import { bubblesort, improvedBubblesort } from "@/lib/sort/bubblesort.js";
import { insertionsort } from "@/lib/sort/insertionsort.js";
import { shellsort } from "@/lib/sort/shellsort.js";
import { quicksort } from "@/lib/sort/quicksort.js";
import { heapsort } from "@/lib/sort/heapsort.js";

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
        isSorting: false,
        sortMapping: new Map(),
        sparklineSettings: {
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
        },
    }),
    mounted: async function() {
        await this.randomize();
    },
    created: function() {
        const sortMapping = new Map([
            ["bubblesort", bubblesort],
            ["improvedBubblesort", improvedBubblesort],
            ["insertionsort", insertionsort],
            ["shellsort", shellsort],
            ["quicksort", quicksort],
            ["heapsort", heapsort],
        ]);
        this.sortMapping = sortMapping;
    },
    methods: {
        cancelSorting: function() {
            // delete old array -> set array to zero
            this.values.splice(0);
        },
        randomize: async function() {
            this.cancelSorting();
            this.autoDraw = true;
            await sleep(50);
            this.values = randomArray(this.arraySize);
            console.log("Randomized");
            this.unlockSorting();
        },
        createNumberRange: async function() {
            this.cancelSorting();
            this.autoDraw = true;
            await sleep(50);
            this.values = filledArray(this.arraySize);
            this.lockSorting();
            await shuffle(this.values, 1);
            console.log("Shuffled");
            this.unlockSorting();
        },
        lockSorting: function() {
            this.autoDraw = false;
            this.isSorting = true;
        },
        unlockSorting: function() {
            this.isSorting = false;
        },
        sort: async function(algorithm) {
            this.lockSorting();
            const sort = this.sortMapping.get(algorithm);
            console.time("sort");
            await sort(this.values, 1);
            console.timeEnd("sort");
            console.log("Finished sorting");
            this.unlockSorting();
        },
    },
};
</script>
