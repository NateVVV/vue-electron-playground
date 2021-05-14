<template>
    <v-app>
        <v-navigation-drawer app v-model="drawer">
            <v-list nav dense>
                <v-list-item-group
                    v-model="selectedItem"
                    active-class="deep-purple--text text--accent-4"
                    mandatory
                >
                    <router-link
                        v-for="page in pages"
                        :key="page.name"
                        :to="page.path"
                        class="black--text
                        text-decoration-none font-weight-thin"
                    >
                        <v-list-item>
                            <v-list-item-title>
                                {{ page.name }}
                            </v-list-item-title>
                        </v-list-item>
                    </router-link>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-app-bar-nav-icon
                    @click="drawer = !drawer"
                ></v-app-bar-nav-icon>
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
                />
                <v-img
                    alt="Vuetify Name"
                    class="shrink mt-1 hidden-sm-and-down"
                    contain
                    min-width="100"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                    width="100"
                />
                <v-toolbar-title class="mx-2">
                    Playground –
                    {{ pages[selectedItem].name }}
                </v-toolbar-title>
            </div>

            <v-spacer></v-spacer>

            <v-btn
                href="https://github.com/vuetifyjs/vuetify/releases/latest"
                target="_blank"
                text
            >
                <span class="mr-2">Latest Release</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
    name: "App",
    data: () => ({
        drawer: null,
        selectedItem: 0,
        pages: null,
    }),
    watch: {
        selectedItem() {
            this.drawer = false;
        },
    },
    async created() {
        this.pages = this.$router.options.routes;
    },
    async mounted() {
        // This is needed when reloading (at least in electron)
        // Otherwise, the title is wrong
        await timeout(40);

        this.selectedItem = this.pages.findIndex(
            (page) => page.path === this.$route.path
        );
    },
};
</script>
