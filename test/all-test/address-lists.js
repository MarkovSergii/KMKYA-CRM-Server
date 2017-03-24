let assert = require('chai').assert;
let request = require('supertest-as-promised');

module.exports = (variables)=> {

    describe('List country TEST', () => {

        it('should return country data', () => {

            return request(variables.app)
                .get('/api/dictionary/country/all')
                .set('Authorization', global._token)
                .expect(200)
                .then((data) => {
                    assert.equal(data.error, false);
                    assert.notEqual(data.length, 0);
                });
        });

    });
}