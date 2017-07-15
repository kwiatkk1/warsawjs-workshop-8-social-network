const { services: { ServiceContainer } } = require('esdf');

const serviceFunctions = require('../DomainServices');

module.exports = function() {
    this.requires('config');
    this.requires('repository');

    this.provides('services', function({ config, repository }) {
        const serviceContainer = new ServiceContainer();
        serviceContainer.addResource('config', config);
        serviceContainer.addResource('repository', repository);
        //serviceContainer.addResource('authDB', authDB);
        // Add all services:
        Object.keys(serviceFunctions).forEach(function(serviceName) {
            serviceContainer.addService(serviceName, serviceFunctions[serviceName]);
        });
        return serviceContainer;
    });
};