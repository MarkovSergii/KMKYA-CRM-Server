/**
 * Created by user on 23.07.2016.
 */
'use strict';

let assert = require('chai').assert;
let request = require('supertest-as-promised');


let email = '1@1.com';
let password = '1';

let app = require('../app');


describe('Authentication Controller', () => {

    var  _token = null;
    it('should login and return token as json', () => {

        return request(app)
            .post('/api/login')
            .send({ email, password })
            .expect(200)
            .then((data) => {
                _token = data.body.token;
                console.log(_token);
                assert.ok(_token);
            });
    });

    it('should return 401 when try get dictianory data when not auth', () => {

        return request(app)
            .get('/api/dictionary/country')
            .set('Authorization', 'none')
            .expect(401);
    });

    it('should return dictianory data when auth', () => {

        return request(app)
            .get('/api/dictionary/country/all')
            .set('Authorization', _token)
            .expect(200)
            .then((data) => {
                assert.equal(data.text, 'country');   // TODO: change test to real data
            });
    });

});
