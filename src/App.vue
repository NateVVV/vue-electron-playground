<template>
    <v-app>
        <v-navigation-drawer app v-model="drawer">
            <v-list nav dense>
                <v-list-item-group
                    v-model="group"
                    active-class="deep-purple--text text--accent-4"
                >
                    <router-link to="/" class="black--text text-decoration-none font-weight-thin">
                        <v-list-item>
                            <v-list-item-title>
                                Home
                            </v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to="/sorting" class="black--text text-decoration-none font-weight-medium">
                        <v-list-item>
                            <v-list-item-title>
                                Sorting
                            </v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to="/about" class="black--text text-decoration-none font-weight-bold">
                        <v-list-item>
                            <v-list-item-title>
                                About
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
                <v-toolbar-title>Playground</v-toolbar-title>
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
export default {
    name: "App",

    data: () => ({
        drawer: null,
        group: 0,
    }),
    watch: {
        group() {
            this.drawer = false;
        },
    },
};
</script>
