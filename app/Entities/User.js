const { core: { EventSourcedAggregate, Event } } = require('esdf');

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
     */
    register({ name, email }) {
        this._stageEvent(new Event('Registered', { name, email }));
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