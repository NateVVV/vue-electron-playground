<template>
    <v-container>
        Hier wird sortiert
        <v-card flat>
            <div>
                <v-btn elevation="2" @click="randomize" class="ma-1">
                    create random numbers
                </v-btn>
            </div>
            <div>
                <v-btn @click="bubblesort" class="ma-1" :disabled="sorting">
                    Bubblesort
                </v-btn>
                <v-btn
                    @click="improvedBubblesort"
                    class="ma-1"
                    :disabled="sorting"
                >
                    improved Bubblesort
                </v-btn>
                <v-btn class="ma-1" disabled>
                    Insertionsort
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
        sorting: false,
    }),
    mounted: async function() {
        await this.randomize();
    },
    methods: {
        randomize: async function() {
            this.autoDraw = true;
            const amount = 100;
            const max_number = 100;
            this.values = [];
            await sleep(50);
            for (let i = 0; i < amount; i++) {
                let n = Math.random() * max_number;
                this.values.push(Math.floor(n));
            }
            console.log("Randomized");
            this.enableSorting();
        },
        setupSorting: function() {
            this.autoDraw = false;
            this.sorting = true;
        },
        enableSorting: function() {
            this.sorting = false;
        },
        bubblesort: async function() {
            this.setupSorting();
            const values = this.values;
            for (let n = values.length; n > 1; n--) {
                for (let i = 0; i < n - 1; i++) {
                    if (values[i] > values[i + 1]) {
                        // swap elements
                        const temp = values[i];
                        this.$set(values, i, values[i + 1]);
                        this.$set(values, i + 1, temp);
                    }
                    // wait after every step (to visualize the complexity)
                    await sleep(1);
                }
            }
            console.log("Finished sorting");
            this.enableSorting();
        },
        improvedBubblesort: async function() {
            this.setupSorting();
            const values = this.values;
            let swapped;
            let n = values.length;
            do {
                swapped = false;
                for (let i = 0; i < n - 1; i++) {
                    if (values[i] > values[i + 1]) {
                        // swap elements
                        const temp = values[i];
                        this.$set(values, i, values[i + 1]);
                        this.$set(values, i + 1, temp);
                        swapped = true;
                    }
                    await sleep(1);
                }
                n--;
            } while (swapped);
            console.log("Finished sorting");
            this.enableSorting();
        },
    },
};
</script>
