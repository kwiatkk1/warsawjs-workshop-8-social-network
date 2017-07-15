const { test: { DummyEventSink } } = require('esdf');

module.exports = function() {
    this.provides('sink', () => new DummyEventSink());
};