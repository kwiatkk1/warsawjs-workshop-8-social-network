const { CompositionManager } = require('app-compositor');

const modules = [
    require('./Modules/config'),
    require('./Modules/sink'),
    require('./Modules/repository'),
    require('./Modules/services'),
    require('./Modules/publisher'),
    require('./Modules/subscriber'),
    require('./Modules/streamer'),
    require('./Modules/projectionDB'),
    require('./Modules/projectionBuilder')
];

const app = new CompositionManager();

app.runModules(modules).then(async function({ streamer, subscriber, services }) {
    streamer.start();

    // subscriber.queue('eventLogger').bind('*.*').listen(({ event, commit }) => {
    //     console.log(event, commit);
    // });
    //
    // const registerUser = services.service('registerUser');
    // await registerUser({ userID: '12345', name: 'Jan', email: 'john.doe@example.com', password: 'test1' });
}).done();