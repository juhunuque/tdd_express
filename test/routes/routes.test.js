var expect = require('chai').expect;
var request = require('superagent');

// Describe your steps
describe('Sample web app', function(){
  // Define server variables
  var serverApp = require('./../server/app.test');
  var port = 3000;
  var baseUrl = 'http://localhost:' + port;

  before(function(done){
    serverApp.start(port,done);
  });

  after(function(done){
    serverApp.stop(done);
  });

  describe('when requested at /hello', function(){
    it('should say hello', function(done){
      request.get(baseUrl+'/hello').end(function assert(err, res){
          expect(err).to.not.be.ok;
          expect(res).to.have.property('status',200);
          expect(res.text).to.equal('Hello world!');
          done();
      });
    });
  });
});
