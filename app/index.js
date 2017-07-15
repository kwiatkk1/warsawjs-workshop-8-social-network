const modules = [
    require('./Modules/sink'),
    require('./Modules/repository')
];

const CompositionManager = require('app-compositor').CompositionManager;
const app = new CompositionManager();

app.runModules(modules).then(async function({ repository }) {
    const User = require('./Entities/User');

    await repository.invoke(User, 'asdfasdf', async function (user) {
        await user.register({ name: 'Jan', email: 'john.doe@example.com', password: 'test1' });
        console.log('isRegistered: %s', user.isRegistered());
    });

    await repository.invoke(User, 'asdfasdf', async function (user) {
        console.log('isRegistered: %s', user.isRegistered());
    });

}).done();