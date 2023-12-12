module.exports = {
    validateName: (name) => {
        const nameValidatorRegex = /^[a-zA-Z ]{2,30}$/;
        return nameValidatorRegex.test(name);
    },
    validatePassword: (password) => {
        return password.length >= 8;
    },

    validateEmail: (email) => {
        const emailValidatorRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailValidatorRegex.test(email);
    },
};
