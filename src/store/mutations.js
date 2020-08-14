export default {
    setLanguage(state, value) {
        state.language = value;
        localStorage.setItem('language', value);
    },
    agreeWithPolicy(state, value) {
        state.isAgreedWithPolicy = value;
        localStorage.setItem('isAgreedWithPolicy', value);
    },
};
