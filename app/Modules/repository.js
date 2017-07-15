const { utils: { createAggregateLoader, Repository } } = require('esdf');

module.exports = function() {
    this.requires('sink');
    this.provides('repository', function({ sink }) {
        const loader = createAggregateLoader(sink);
        return new Repository(loader);
    });
};