const { test: { DummyEventSinkStreamer } } = require('esdf');

module.exports = function() {
    this.requires('sink');
    this.provides('streamer', ({ sink }) => new DummyEventSinkStreamer(sink));
};