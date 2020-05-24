const { describe, it } = require('mocha');
const should = require('chai').should();

describe.skip('Service', function() {

    describe('Success', function() {
        it('should start the service for a simple entity with valid url', function() {
        });

        it('should start the service for two simple entity withoutConnection with valid url', function() {
        });
    });

    describe('Error', function() {
        it('should fail if fetching url for the entity is not given', function() {
        });
        it('should fail if the fields to map for the entity are not given', function() {
        });
        it('should fail if a field to map for the entity is of a not supported type', function() {
        });
    });
});