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
                    type="number"
                ></v-text-field>
                <v-slider
                    v-model="delay.wait"
                    color="orange"
                    label="Delay"
                    hint="Delay of swaps (ms)"
                    min="0"
                    max="100"
                    thumb-label
                ></v-slider>
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
                    @click="sort('fastInsertionsort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Fast Insertionsort
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
                <v-btn
                    @click="sort('mergesort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Mergesort
                </v-btn>
                <v-btn
                    @click="sort('heapsort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Heapsort
                </v-btn>
                <v-btn
                    @click="sort('selectionsort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Selectionsort
                </v-btn>
                <v-btn
                    @click="sort('fastSelectionsort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Fast Selectionsort
                </v-btn>
                <v-btn
                    @click="sort('cocktailsort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Cocktailsort
                </v-btn>
                <v-btn
                    @click="sort('bogosort')"
                    class="ma-1"
                    :disabled="isSorting"
                >
                    Bogosort
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
        <Clock></Clock>
    </v-container>
</template>

<script>
import { randomArray, filledArray } from "@/lib/array.js";
import { shuffle } from "@/lib/sort/shuffle.js";
import { bubblesort, improvedBubblesort } from "@/lib/sort/bubblesort.js";
import { insertionsort, fastInsertionsort } from "@/lib/sort/insertionsort.js";
import { shellsort } from "@/lib/sort/shellsort.js";
import { quicksort } from "@/lib/sort/quicksort.js";
import { heapsort } from "@/lib/sort/heapsort.js";
import { bogosort } from "@/lib/sort/bogosort.js";
import { selectionsort, fastSelectionsort } from "@/lib/sort/selectionsort.js";
import { cocktailsort } from "@/lib/sort/cocktailsort.js";
import { mergesort } from "@/lib/sort/mergesort.js";
import Clock from "@/components/Clock.vue";
import eventBus from "@/eventBus.js";

const gradients = [
    ["#222"],
    ["#42b3f4"],
    ["red", "orange", "yellow"],
    ["purple", "violet"],
    ["#00c6ff", "#F0F", "#FF0"],
    ["#f72047", "#ffd200", "#1feaea"],
];

function startClock() {
    eventBus.$emit("reset-and-start-clock");
}

function stopClock() {
    eventBus.$emit("stop-clock");
}

export default {
    name: "Sorting",
    components: {
        Clock,
    },
    data: () => ({
        arraySize: 100,
        values: [],
        isSorting: false,
        delay: { wait: 1 },
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
            ["fastInsertionsort", fastInsertionsort],
            ["shellsort", shellsort],
            ["quicksort", quicksort],
            ["heapsort", heapsort],
            ["bogosort", bogosort],
            ["selectionsort", selectionsort],
            ["fastSelectionsort", fastSelectionsort],
            ["cocktailsort", cocktailsort],
            ["mergesort", mergesort],
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
            this.values = randomArray(this.arraySize);
            console.log("Randomized");
            this.unlockSorting();
        },
        createNumberRange: async function() {
            this.cancelSorting();
            this.autoDraw = true;
            startClock();
            this.values = filledArray(this.arraySize);
            this.lockSorting();
            await shuffle(this.values, this.delay);
            stopClock();
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
            startClock();
            await sort(this.values, this.delay);
            stopClock();
            console.log("Finished sorting");
            this.unlockSorting();
        },
    },
};
</script>
