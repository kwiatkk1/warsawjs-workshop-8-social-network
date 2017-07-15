class User {

    constructor() {
        this.name = null;
        this.email = null;
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

    /**
     *
     * @return {String|*|undefined}
     */
    getName() {
        return this.name;
    }

    /**
     *
     * @return {String|*|undefined}
     */
    getEmail() {
        return this.email;
    }
}

module.exports = User;