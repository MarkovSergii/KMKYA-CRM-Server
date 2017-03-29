let assert = require('chai').assert;
let request = require('supertest-as-promised');

module.exports = ({variables,table,insert1,insert2,update,fieldTestUpdate})=> {

    describe('List '+table+' TEST', () => {

        let Id1;
        let Id2;

        it('should insert first record in '+table, () => {
            return request(variables.app)
                .post('/api/dictionary/'+table+'/insert')
                .set('Authorization', global._token)
                .send(insert1)
                .expect(200)
                .then((response) => {
                    assert.equal(response.body.error, false);
                    assert.ok(response.body.data.id);
                    Id1 = response.body.data.id
                });
        });

        it('should insert second record in '+table, () => {
            return request(variables.app)
                .post('/api/dictionary/'+table+'/insert')
                .set('Authorization', global._token)
                .send(insert2)
                .expect(200)
                .then((response) => {
                    assert.equal(response.body.error, false);
                    assert.ok(response.body.data.id);
                    Id2 = response.body.data.id
                });
        });

        it('should return all from '+table, () => {
            return request(variables.app)
                .get('/api/dictionary/'+table+'/all')
                .set('Authorization', global._token)
                .expect(200)
                .then((response) => {
                    assert.equal(response.body.error, false);
                    assert.isAbove(response.body.data.length, 1);
                });
        });

        it('should update second record in '+table, () => {
            return request(variables.app)
                .post('/api/dictionary/'+table+'/'+Id2+'/update')
                .set('Authorization', global._token)
                .send(update)
                .expect(200)
                .then((response) => {
                    assert.equal(response.body.error, false);
                });
        });

        it('should return updated second inserted record from '+table, () => {
            return request(variables.app)
                .get('/api/dictionary/'+table+'/selectBy/id/'+Id2)  
                .set('Authorization', global._token)
                .expect(200)
                .then((response) => {
                    assert.equal(response.body.error, false);
                    assert.equal(response.body.data[0][fieldTestUpdate], update[fieldTestUpdate]);
                });
        });

        it('should delete first inserted record in '+table, () => {
            return request(variables.app)
                .post('/api/dictionary/'+table+'/'+Id1+'/delete')
                .set('Authorization', global._token)
                .expect(200)
                .then((response) => {
                    assert.equal(response.body.error, false);
                });
        });

        it('should delete second inserted record in '+table, () => {
            return request(variables.app)
                .post('/api/dictionary/'+table+'/'+Id2+'/delete')
                .set('Authorization', global._token)
                .expect(200)
                .then((response) => {
                    assert.equal(response.body.error, false);
                });
        });

        it('should return no record from '+table, () => {
            return request(variables.app)
                .get('/api/dictionary/'+table+'/selectBy/id/'+Id1)
                .set('Authorization', global._token)
                .expect(200)
                .then((response) => {
                    assert.equal(response.body.error, false);
                    assert.equal(response.body.data.length, 0);
                });
        });
        
        it('should return no record from '+table, () => {
            return request(variables.app)
                .get('/api/dictionary/'+table+'/selectBy/id/'+Id2)
                .set('Authorization', global._token)
                .expect(200)
                .then((response) => {
                    assert.equal(response.body.error, false);
                    assert.equal(response.body.data.length, 0);
                });
        });




    });
}