const eventHandlers = {
    'User.Registered': function(db, event, commit) {
        return Promise.all([
            db.ref(`/profiles/${commit.sequenceID}`).update({
                ID: commit.sequenceID,
                name: event.eventPayload.name,
                email: event.eventPayload.email,
                password: event.eventPayload.password
            })
        ]);
    }
};

module.exports = function() {
    this.requires('subscriber');
    this.requires('projectionDB');
    this.provides('projectionBuilder', function({ subscriber, projectionDB }) {
        subscriber.queue('projectionBuilder').bind('*.*').listen(function({ event, commit }) {
            const eventName = `${commit.aggregateType}.${event.eventType}`;
            // Execute a handler to reflect the effect of the given event on our
            //  projection, if any:
            if (eventHandlers[eventName]) {
                return eventHandlers[eventName](projectionDB, event, commit);
            }
        });
    });
};