var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();


chai.use(chaiHttp);

describe('/GET Index Page', () => {
    it('it should GET Index Page', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});


describe('/RegisterUser', () => {
    it('it should Register The User', (done) => {
        var data = {
            user: "gaurav",
            emailId: "gs@gmailc.com",
            mobileNumber: "19532323232",
            password: "12345"
        }
        chai.request(server)
            .post('/api/v1/auth/register')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe('/LoginUser', () => {
    it('it should Login The User', (done) => {
        var data = {
            emailId: "gs@gmail.com",
            password: "12345"
        }
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe('/LoginUser', () => {
    it('it should Login The User', (done) => {
        var data = {
            emailId: "gs@gmail.com",
            password: "12345"
        }
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});