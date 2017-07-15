const assert = require('assert');

describe('User', function () {

    const User = require('./User');

    describe('#constructor', function () {
        it('should not register user right away', function () {
            // given
            const user = new User();

            // when
            const isUserRegistered = user.isRegistered();

            // expect
            assert.equal(isUserRegistered, false);
        })
    });

});