let assert = require('chai').assert;
let request = require('supertest-as-promised');

module.exports = (variables)=> {

    describe('Authentication TEST', () => {

        global._token = null;
        it('should login and return token as json', () => {

            return request(variables.app)
                .post('/api/login')
                .send({email:variables.email, password:variables.password})
                .expect(200)
                .then((data) => {
                    global._token = data.body.token;
                    assert.ok(_token);
                });
        });

        it('should return 401 when try get dictianory data when not auth', () => {

            return request(variables.app)
                .get('/api/dictionary/country/all')
                .set('Authorization', 'none')
                .expect(401);
        });

    });
}