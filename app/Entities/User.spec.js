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
        it('should make the user registered', function () {
            // given
            const user = new User();

            // when
            user.register({ name: 'John Doe', email: 'john.doe@example.com' });

            // then
            assert.equal(user.isRegistered(), true);
        });
    });

});