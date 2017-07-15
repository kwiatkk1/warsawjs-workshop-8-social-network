const { test: { DummyEventBusPublisher } } = require('esdf');

module.exports = function() {
    this.requires('streamer');
    this.provides('publisher', function({ streamer }) {
        const eventPublisher = new DummyEventBusPublisher();
        streamer.setPublisher(eventPublisher);
        return eventPublisher;
    });
};