const esdf = require('esdf');
const firebase = require('firebase');

const config = require('./config');
const { User } = require('./entities');

/**
 * Initialize firebase app and get the database service for that app.
 *
 * @param {object} auth
 * @param {object} config
 * @return {Promise<firebase.database.Database>}
 */
async function getFirebaseDatabase({ auth, config }) {
    const app = firebase.initializeApp(config);
    await firebase.auth(app).signInWithEmailAndPassword(auth.email, auth.password);
    return firebase.database(app);
}

/**
 * Connect some esdf's pipes...
 */
function setupEsdfStuff() {
    const { DummyEventSinkStreamer, DummyEventBusSubscriber, DummyEventSink, DummyEventBusPublisher } = esdf.test;
    const { createAggregateLoader, Repository } = esdf.utils;

    const sink = new DummyEventSink();
    const streamer = new DummyEventSinkStreamer(sink);
    const publisher = new DummyEventBusPublisher();
    const subscriber = new DummyEventBusSubscriber(publisher);
    const repository = new Repository(createAggregateLoader(sink));

    streamer.setPublisher(publisher);
    streamer.start();

    return { sink, streamer, publisher, subscriber, repository };
}

/**
 *
 * @return {Promise.<void>}
 */
async function run() {
    const { repository, subscriber } = setupEsdfStuff();
    const db = await getFirebaseDatabase(config.firebase);

    // it logs all the incoming events to the console
    subscriber.queue('logger').bind('*.*').listen(console.log);

    // it handles selected events...
    subscriber.queue('build').bind('*.*').listen(({ event, commit }) => {
        if (commit.aggregateType === 'User' && event.eventType === 'Registered') {
            // ...and fills up the firebase db
            db.ref(`/profiles/${commit.sequenceID}`).update({
                ID: commit.sequenceID,
                name: event.eventPayload.name,
                email: event.eventPayload.email,
                password: event.eventPayload.password
            });
        }
    });

    repository.invoke(User, 'some-user-id', user => user.register({
        userID: '12345',
        name: 'Jan',
        email: 'john.doe@example.com',
        password: 'test1'
    }));
}

run().catch(error => {
    console.error(error);
    process.exit(1);
});