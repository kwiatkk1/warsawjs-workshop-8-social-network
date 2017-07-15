const bcrypt = require('bcrypt');
const { EventSourcedAggregate, Event } = require('esdf').core;

const SALT_ROUNDS = 10;

class User extends EventSourcedAggregate {

    constructor() {
        super();

        this.name = null;
        this.email = null;
    }

    /**
     *
     * @param {String} name
     * @param {String} email
     * @param {String} password
     */
    async register({ name, email, password }) {
        if (!this.isRegistered()) {

            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(password, salt);

            this._stageEvent(new Event('Registered', {
                name,
                email,
                password: hashedPassword
            }));
        }
    }

    /**
     *
     * @param {Event} event
     */
    onRegistered(event) {
        this.name = event.eventPayload.name;
        this.email = event.eventPayload.email;
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