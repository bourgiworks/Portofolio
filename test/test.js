const chai = require ('chai');
const chaiHttp= require('chai-http')
const app =require( '../app');

chai.should()
chai.use(chaiHttp)
describe('User APIs',()=>{
    describe('Create user',()=>{
        it('It should create user',(done)=>{
            chai
                .request(app)
                .post('/api/signUp')
                .send({
                    userName: "Kamali",
                    email: "kamali@gmail.com",
                    password: "12345",
                    role: 1
            })
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    done()
                })
        }),
        it('It should return an error if you create an email existed',(done)=>{
            chai
                .request(app)
                .post('/api/signUp')
                .send({
                    userName: "Kamali",
                    email: "m1@gmail.com",
                    password: "12345",
                    role: 1
            })
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    done()
                })
        })
        // it('she/he should log in sucessfully',(done)=>{
        //     chai
        //         .request(app)
        //         .post('/api/login')
        //         .send({
                
        //             email: "m1@gmail.com",
        //             password: "12345"
                    
        //     })
        //         .end((err,res)=>{
        //             res.should.have.status(200);
        //             res.body.should.be.a('object')
        //             done()
        //         })
        // }),
        // it('it should retun Login fail if password supplied is incorrect',(done)=>{
        //     chai
        //         .request(app)
        //         .post('/api/login')
        //         .send({
                
        //             password: "12345"
                    
        //     })
        //         .end((err,res)=>{
        //             res.should.have.status(401);
        //             res.body.should.be.a('object')
        //             done()
        //         })
        // })
        
        
        
    })
    
        })
  
        //login


chai.should();
chai.use(chaiHttp);

describe('Login API', () => {
  // Testing login end-point
  describe('/api/login', () => {
    it('A registered user should be able to login/default language', (done) => {
      const user = {
        email: 'jane@gmail.com',
        password: '123456',
      };
      chai
        .request(app)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.equal(
            'You have successfully logged in as an Admin'
          );
          
        });
        done();
    });
    
    
    it('A non-registered user shouldnot be able to login', (done) => {
      const user = {
        email: 'nijohn@gmail.com',
        password: 'holdon',
      };
      chai
        .request(app)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.equal(
            'The email is not registered! Please first register'
          );
          
        });
        done();
    });
    
    
    it('A registered user with wrong password logins shouldnot be able to login/Default Language', (done) => {
      const user = {
        email: 'jane@gmail.com',
        password: 'holdon',
      };
      chai
        .request(app)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal(
            'The email or passwords entered is wrong'
          );
          
        });
        done();
    });
    
  });
});

