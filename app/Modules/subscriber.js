const { test: { DummyEventBusSubscriber } } = require('esdf');

module.exports = function() {
    this.requires('publisher');
    this.provides('subscriber', ({ publisher }) => new DummyEventBusSubscriber(publisher));
};