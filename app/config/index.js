try {
    module.exports = require('./secret');
} catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
        console.error('Error: config file not found!');
        console.error('> cp app/config/secret.sample.js app/config/secret.js');
    }
}