<template>
    <v-app>
        <v-navigation-drawer persistent clipped v-model="drawer" enable-resize-watcher fixed app>
            <v-list dense>
                <v-list-tile value="true" v-for="(item, i) in items" :key="i" :to="item.route">
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app clipped-left dark color="light-blue darken-2">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title v-text="title"></v-toolbar-title>
        </v-toolbar>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                drawer: true,
                items: [
                    {
                        icon: 'android',
                        title: 'Benutzer',
                        route: 'users',
                    },
                    {
                        icon: 'list',
                        title: 'Projekte',
                        route: 'projects',
                    }
                ],
                title: 'taskr.'
            }
        }
    }
</script>
