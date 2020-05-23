var assert = require('assert');
var should = require('chai').should();

describe.skip('GQL Server', function() {
    describe('Configuration', function() {
        describe('Success', function() {
            it('should run without schema and only port configuration', function() {
            });

            describe('should run with simple schema without connection between entities', function() {

                it('should run with schema and port configuration', function() {
                });

                it('should run and reply a simple query', function() {
                });

            });

        });
        describe('Error', function() {
            it('should fail without port configuration', function() {

            });

            it('should fail if selected port is taken', function() {

            });

            it('should fail if some REST API service is unreachable', function() {

            });
        });
    });
});