<template>
    <v-container fluid>
        <h1>{{ user.first_name }} {{ user.last_name }}</h1>
    </v-container>
</template>

<script>
    import {API} from '../api-common'

    export default {
        name: "User",

        data: () => ({
            user: null,
        }),

        created() {
            API.get(`user/${this.$route.params.id}`)
                .then(response => {
                    this.user = response.data
                })
        }
    }
</script>

<style scoped>

</style>