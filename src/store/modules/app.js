export default {
    namespaced: true,
    state: {
        message: ''
    },
    getters: {
        getMessage(state) {
            return state.message;
        }
    },
    mutations: {
        SET_MESSAGE(state, payload) {
            state.message = payload;
        }
    },
    actions: {
        setMessage({ commit }, payload) {
            commit('SET_MESSAGE', payload)
        }
    }
}