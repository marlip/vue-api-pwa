import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        notifications: [],
    },
    getters: {
        notifications: state => {
            return state.notifications.filter(notification => !notification.seen)
        }
    },
    mutations: {
        pushError(state, message) {
            let error = {
                id: state.notifications.length,
                message: message,
                seen: false,
                type: "error",
            }

            state.notifications.push(error)
        },

        pushSuccess(state, message) {
            let success = {
                id: state.notifications.length,
                message: message,
                seen: false,
                type: "success"
            }

            state.notifications.push(success)
        },

        markNotificationSeen(state, index) {
            state.notifications[index].seen = true
        }
    },
    actions: {}
})
