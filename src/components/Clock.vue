<template>
    <v-container>
        {{ time }}
    </v-container>
</template>

<script>
import eventBus from "@/eventBus.js";

let timeBegan = null;
let timeStopped = null;
let stoppedDuration = 0;
let started = null;
let running = false;

function zeroPrefix(num, digit) {
    let zero = "";
    for (let i = 0; i < digit; i++) {
        zero += "0";
    }
    return (zero + num).slice(-digit);
}

export default {
    name: "Clock",
    data: () => ({
        time: "00:00:00.000",
    }),
    methods: {
        start: function() {
            if (running) return;
            if (timeBegan === null) {
                this.reset();
                timeBegan = new Date();
            }

            if (timeStopped !== null)
                stoppedDuration += new Date() - timeStopped;

            started = setInterval(this.clockRunning, 10);
            running = true;
        },
        stop: function() {
            running = false;
            timeStopped = new Date();
            clearInterval(started);
        },
        reset: function() {
            running = false;
            clearInterval(started);
            stoppedDuration = 0;
            timeBegan = null;
            timeStopped = null;
            this.time = "00:00:00.000";
        },
        resetAndStart: function() {
            this.reset();
            this.start();
        },
        clockRunning: function() {
            let currentTime = new Date();
            let timeElapsed = new Date(
                currentTime - timeBegan - stoppedDuration
            );
            let hour = timeElapsed.getUTCHours();
            let min = timeElapsed.getUTCMinutes();
            let sec = timeElapsed.getUTCSeconds();
            let ms = timeElapsed.getUTCMilliseconds();

            this.time = `${zeroPrefix(hour, 2)}:${zeroPrefix(
                min,
                2
            )}:${zeroPrefix(sec, 2)}:${zeroPrefix(ms, 3)}`;
        },
    },
    created: function() {
        eventBus.$on("start-clock", this.start);
        eventBus.$on("reset-and-start-clock", this.resetAndStart);
        eventBus.$on("stop-clock", this.stop);
        eventBus.$on("reset-clock", this.reset);
    },
};
</script>
