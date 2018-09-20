<template>
    <v-app>
        <v-navigation-drawer persistent clipped v-model="drawer" enable-resize-watcher fixed app>
            <v-list dense>
                <v-list-tile value="true" v-for="(item, i) in items" :key="i" :to="{ name: item.route }">
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
            <div class="notifications" v-if="notifications">
                <v-alert
                        :value="true"
                        :type="notification.type"
                        transition="fade-transition"
                        @click="dismissNotification(notification.id)"
                        v-for="(notification, i) in notifications" :key="i">
                    {{ notification.message }} ({{ notification.type }})
                </v-alert>
            </div>
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
                title: 'taskr.',
            }
        },

        computed: {
            notifications () {
                return this.$store.getters.notifications
            }
        },

        methods: {
            dismissNotification (index) {
                this.$store.commit("markNotificationSeen", index)
            }
        }
    }
</script>

<style scoped>
    .notifications {
        position: fixed;
        bottom: 20px;
        right: 24px;
        z-index: 3;
    }
</style>