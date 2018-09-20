<template>
    <v-container fluid grid-list-md>

        <v-data-iterator
                :items="users"
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                content-tag="v-layout"
                row
                wrap
        >
            <v-toolbar
                    slot="header"
                    class="mb-2"
                    color="light-blue darken-1"
                    dark
                    flat
            >
                <v-toolbar-title>Benutzer</v-toolbar-title>
                <v-btn flat icon color="indigo" @click="addUserDialog = !addUserDialog">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar>

            <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3>
                <v-card>
                    <v-card-title class="subheading">
                        <router-link :to="{ name: 'user', params: { id: props.item.id }}">
                            <h4>{{ props.item.first_name }} {{ props.item.last_name }}</h4>
                        </router-link>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content><strong>E-Mail:</strong></v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.email }}</v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content><strong>Benutzername:</strong></v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.username }}</v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-btn small dark icon color="light-blue" :to="{ name: 'user', params: { id: props.item.id }}">
                                <v-icon>visibility</v-icon>
                            </v-btn>

                            <v-btn small dark icon color="red" @click="deleteUser(props.item.id)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>

        </v-data-iterator>

        <v-dialog v-model="addUserDialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Benutzer hinzufügen</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form v-model="valid" ref="form">
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Benutzername"
                                            required
                                            v-model="username"
                                            :rules="nameRules"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                            label="Vorname"
                                            required
                                            v-model="firstName"
                                            :rules="nameRules"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                            label="Nachname"
                                            required
                                            v-model="lastName"
                                            :rules="nameRules"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            label="E-Mail"
                                            required
                                            v-model="email"
                                            :rules="emailRules"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                    <small>* Pflichtfelder</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="clear">Abbrechen</v-btn>
                    <v-btn
                            color="blue darken-1"
                            flat
                            :disabled="!valid"
                            @click="submit"
                    >
                        Speichern
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>

</template>

<script>
    import {API} from '../api-common'

    export default {
        data: () => ({
            users: [],
            errors: [],
            rowsPerPageItems: [16, 24, 48],
            pagination: {
                rowsPerPage: 16
            },
            addUserDialog: false,
            valid: false,
            firstName: '',
            lastName: '',
            username: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
        }),

        created() {
            this.loadUsers();
        },

        methods: {
            loadUsers: function () {
                API.get("users")
                    .then(response => {
                        this.users = response.data
                    })
                    .catch(e => {
                        this.$store.commit("pushError", "Error connecting to API")
                    })
            },

            deleteUser: function (id) {
                API.delete(`user/${id}`)
                    .then(response => {
                        this.$store.commit("pushSuccess", "Benutzer erfolgreich gelöscht")
                        this.loadUsers()
                    })
                    .catch(e => {
                        this.$store.commit("pushError", "Error connecting to API")
                    })
            },

            submit () {
                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                    // axios.post('/api/submit', {
                    //     name: this.name,
                    //     email: this.email,
                    //     select: this.select,
                    //     checkbox: this.checkbox
                    // })
                    API.post("user", {
                        username: this.username,
                        first_name: this.firstName,
                        last_name: this.lastName,
                        email: this.email
                    })
                        .then(response => {
                            if (response.status === 201)
                                this.$store.commit("pushSuccess", `${this.firstName} ${this.lastName} erfolgreich angelegt`)
                            this.loadUsers()
                        })
                        .catch(e => {
                            console.log(e)
                            this.$store.commit("pushError", "Fehler beim Speichern des Benutzers")
                        })

                    console.log("submit");
                    this.addUserDialog = false
                }
            },

            clear () {
                this.$refs.form.reset()
                this.addUserDialog = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .v-card {
        .v-btn {
            margin-left: 0;
        }
    }
</style>