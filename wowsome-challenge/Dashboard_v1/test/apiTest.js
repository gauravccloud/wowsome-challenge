var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var mongoose = require('mongoose');
var User = require('../models/users');

chai.use(chaiHttp);

describe('/GET Index Page', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/index page', () => {
        it('it should GET Index Page', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        })

        it('it should Register The User', (done) => {
            var data = {
                "name": "tipin",
                "emailId": "tipin@gmail.com",
                "mobileNumber": "121212",
                "password": "12345"
            }
            chai.request(server)
                .post('/api/v1/auth/register')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })

    describe('/should able to login', () => {
        it('it should Login The User', (done) => {
            var data = {
                "emailId": "tipin@gmail.com",
                "password": "12345"
            }
            chai.request(server)
                .post('/api/v1/auth/login')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        }).timeout(5000)
    })
});