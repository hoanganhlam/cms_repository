export default {
    namespaced: true,
    state: () => ({
        user: null,
        token: null,
        loggedIn: false
    }),
    mutations: {
        ['SET_USER'](state, user) {
            state.user = user;
            state.loggedIn = !!user;
        },
        ['SET_TOKEN'](state, token) {
            state.token = token;
        }
    },
    actions: {},
    getters: {
        getUser: state => {
            return state.user;
        }
    }
}
