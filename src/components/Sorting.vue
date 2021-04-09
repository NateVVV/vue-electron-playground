<template>
    <v-container>
        Hier wird sortiert
        <v-card flat>
            <v-btn elevation="2" @click="randomize" class="ma-1">
                create random numbers
            </v-btn>
            <v-btn @click="sort" class="ma-1">
                Sort
            </v-btn>
        </v-card>
        <v-card class="d-flex flex-wrap mt-2" flat>
            <div v-for="(v, n) in values" :key="n" class="px-1">
                {{ v }}
            </div>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "Sorting",
    data: () => ({
        values: [],
    }),
    mounted: async function() {
        await this.randomize();
    },
    methods: {
        randomize: async function() {
            const amount = 100;
            const max_number = 100;
            this.values = [];
            await new Promise((resolve) => setTimeout(resolve, 50));
            for (let i = 0; i < amount; i++) {
                let n = Math.random() * max_number;
                this.values.push(Math.floor(n));
            }
            console.log("Randomized");
        },
        sort: async function() {
            const values = this.values;
            try {
                for (let n = this.values.length; n > 1; n--) {
                    for (let i = 0; i < n - 1; i++) {
                        if (this.values[i] > this.values[i + 1]) {
                            const temp = values[i];
                            this.$set(values, i, values[i + 1]);
                            this.$set(values, i + 1, temp);
                            await new Promise((resolve) =>
                                setTimeout(resolve, 1)
                            );
                        }
                    }
                }
            } catch (e) {
                console.log("Aborted sorting");
            } finally {
                console.log("Finished sorting");
            }
        },
    },
};
</script>
