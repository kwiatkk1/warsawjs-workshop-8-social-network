class User {

    constructor() {
        this.name = undefined;
        this.email = undefined;
    }

    /**
     *
     * @param {String} name
     * @param {String} email
     */
    register({ name, email }) {
        this.name = name;
        this.email = email;
    }

    /**
     *
     * @return {boolean}
     */
    isRegistered() {
        return !!(this.name && this.email);
    }
}

module.exports = User;