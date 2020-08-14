export default {
    setLanguage({ commit }, language) {
        commit('setLanguage', language);
    },
    agreeWithPolicy({ commit }, isAgreedWithPolicy) {
        commit('agreeWithPolicy', isAgreedWithPolicy)
    },
}
