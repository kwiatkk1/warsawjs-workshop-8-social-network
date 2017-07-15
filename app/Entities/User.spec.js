const assert = require('assert');

describe('User', function () {

    const User = require('./User');

    describe('#constructor', function () {
        it('should not register user right away', function () {
            // given
            const user = new User();

            // expect
            assert.equal(user.isRegistered(), false);
        })
    });

    describe('#register', function () {
        it('should make the user registered', async function () {
            // given
            const user = new User();

            // when
            await user.register({ name: 'John Doe', email: 'john.doe@example.com', password: 'test1' });

            // then
            assert.equal(user.isRegistered(), true);
        });

        it('should store users data', async function () {
            // given
            const user = new User();

            // when
            await user.register({ name: 'John Doe', email: 'john.doe@example.com', password: 'test1' });

            // then
            assert.equal(user.getName(), 'John Doe');
        });

        it('should be idempotent', async function () {
            // given
            const user = new User();
            await user.register({ name: 'John Doe', email: 'john.doe@example.com', password: 'test1' });
            const beforeCount = user.getStagedEvents().length;

            // when
            await user.register({ name: 'John Doe', email: 'john.doe@example.com', password: 'test1' });

            // then
            assert.equal(beforeCount, user.getStagedEvents().length);
        });
    });

});