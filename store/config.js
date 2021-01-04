export default {
    namespaced: true,
    state: () => ({
        publication: null
    }),
    mutations: {
        ['SET_PUBLICATION'](state, ct) {
            state.publication = ct
        }
    },
    actions: {},
    getters: {}
}
