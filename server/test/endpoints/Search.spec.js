import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import log from 'npmlog';
import app from '../../../serverDev';
import fakeData from '../helpers/FakeData';
import db from '../../models';
import SeedData from '../helpers/SeedData';


chai.use(chaiHttp);
const request = chai.request(app),
  privateDocument = fakeData.secondDocument,
  adminUser = fakeData.adminUser,
  firstRegularUser = fakeData.firstRegularUser;

let adminToken, firstRegularUserToken;

describe('Routes : Search', () => {
  before((done) => {
    SeedData.init().then(() => {
      request
        .post('/login')
        .send({ loginID: adminUser.email, password: adminUser.password })
        .end((err, res) => {
          adminToken = res.body.token;
        });
      request
        .post('/login')
        .send({ loginID: firstRegularUser.email,
          password: firstRegularUser.password })
        .end((err, res) => {
          firstRegularUserToken = res.body.token;
          done();
        });
    });
  });
  after((done) => {
    log.info('message :  ', 'resseting Database.......');
    db.sequelize.sync({ force: true }).then(() => {
      log.info('message :  ', 'Database reset succesful');
      done();
    });
  });

  describe('GET /search/documents/?q={}', () => {
    it('it should allow users search for documents', (done) => {
      request
        .get('/search/documents/?q=a')
        .set({ 'x-access-token': firstRegularUserToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.document).to.be.an('array');
          done();
        });
    });

    it('it should allow Admin search for private document', (done) => {
      request
        .get(`/search/documents/?q=${privateDocument.title}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.document).to.be.an('array');
          const searchDoc = res.body.document.filter((document) => {
            if (document.title === privateDocument.title) {
              return document;
            }
            return undefined;
          });
          expect(searchDoc).to.not.eql([]);
          expect(searchDoc[0]).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /search/users/?q={}', () => {
    it('it should allow Admin search for users', (done) => {
      request
        .get(`/search/users/?q=${firstRegularUser.firstName}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.be.an('array');
          const searchUser = res.body.users.filter((user) => {
            if (user.firstName === firstRegularUser.firstName) {
              return user;
            }
            return undefined;
          });
          expect(res.body.users[0].firstName)
          .to.equal(firstRegularUser.firstName);
          expect(searchUser[0].lastName).to.equal(firstRegularUser.lastName);
          expect(searchUser[0].email).to.equal(firstRegularUser.email);
          done();
        });
    });

    it('it should not allow regular user search for users', (done) => {
      request
        .get(`/search/users/?q=${firstRegularUser.firstName}`)
        .set({ 'x-access-token': firstRegularUserToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.users).to.equal(undefined);
          expect(res.body.message).to.equal('Access Denied');
          done();
        });
    });
  });
});
