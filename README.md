# TDD Express Project

## Introduction
Here there is a boilerplate created for NodeJs projects, specifically for express generated projects. Anyone can use this as a guide if it is starting a project from scratch.

## What is TDD?
[TDD](http://agiledata.org/essays/tdd.html) or Test Driven Development is a good approach if we want to make our classes testable since the beginning.
It consist in create our tests before functions, it means that at the end of the project, you're going to have a good level of coverage in terms of test.

It based on a basic workflow:
1- Write a test for desired feature
2- Run that test and watch how it **fails**
3- Implement the feature (Just the structure, no logic yet)
4- Run the test, and watch how it **fails again**
5- Implement the logic, syntax, etc.
6- Watch the test **PASS**

## Install and use it
If you prefer, you can use this repo as a boilerplate for a new project, if you use (express-generator)[https://www.npmjs.com/package/express-generator], you will get
the same structure, I just added a folder called test and some extra dependencies.

## Create it from scratch

### Creating a new project
We are going to need some things before to start:
- NodeJs installed, (refer to this link if you don't have it)[https://nodejs.org/en/]
- Knowledge about testing (Pretty basic, you don't need to be an expert)
- Basic knowledge about NodeJs and Express framework

- Let's get start installing express global in the environment, by running this:
```sh
$ npm install express -g
```

- Once you got it, install the generator for express projects:
```sh
$ npm install express-generator -g
```

- Then create a new project:
```sh
$ express tdd_test
```

- You will have a new project with a folder structure, if you don't know about express, (refer to this link)[http://www.journaldev.com/7993/nodejs-express-js-and-express-generator-module-basics]
- Now we need to execute an install in order to install dependencies included in the package.json:
```sh
$ npm install
```
- To check that everything went fine, run the sever by using:
```sh
$ npm start
```
Check out that there is no errors in the terminal

### Testing Section (Install dependencies)
Now we need to configure all the dependencies that we are going to require in this guide:
- (Mocha)[https://mochajs.org/] as a test runner
- (Chai)[http://chaijs.com/] as an assertion library
- (Superagent)[https://github.com/visionmedia/superagent] as a light-weight library for http requests

- You should install Mocha globally:
```sh
$ npm install -g mocha
```
But you also can using locally in your project, there is no problem:
```sh
$ npm install mocha --save-dev
```

- Now Chai:
```sh
$ npm install chai --save-dev
```

- And the last, superagent
```sh
$ npm install superagent --save-dev
```

### Testing Section (Coding)
- The first thing that you can do is modify your package.json in order to include a script for test, you need to find the section of scripts and add the following:
```json
"scripts": {
  "start": "node ./bin/www",
  "test": "mocha test"
},
```
Add the **test** line.

- You need to create a test folder in the root of the project, by default, mocha looks inside a test folder for test classes, also you can point the route of your tests.
- Inside that folder, let's create a index.test.js file, this works as primary class for our test:
```javascript
// /test/index.test.js
// Require all your test classes

require('./routes/routes.test');
require('./controllers/controller.test')
```

- Then create our tests. In order to test API's, let's create a folder called "routes", there will be located our tests to endpoints, and create our test (Step #1 TDD Workflow):
```javascript
// /test/routes/routes.test.js
var expect = require('chai').expect;
var request = require('superagent');

// Describe your steps
describe('Sample web app', function(){
  // Define server variables
  var baseUrl = 'http://localhost:3000' + port;

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
```
- Run the test:
```sh
$ npm test
```
You will see in the console that everything crashes, this is normal because we haven't implemented our function yet (Step #2 TDD Workflow).

- Locate the route folder, inside you will find some routes created by default by express-generator, let's use "index.js" and add a new endpoint (Step #3 TDD Workflow):
```javascript
// /routes/index.js
router.get('/hello', function(req, res, next) {
  res.send('');
});
```
- Before to run again, in order to test an API, we will need a server for test purposes, let's create a folder called "server" inside our "test" folder that already exists,
and create a file called "app.test.js":
```javascript
// /test/server/app.test.js
// Server created only for test purposes

var express = require('express');

// Here import all the routes that you're going to include in the testing
var routes = require('./../../routes/index');

var app = express();

// Map your routes
app.use('/', routes);

// Functions created in order to be invoked from the tests
var start = exports.start = function start(port, callback){
  server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback){
  server.close(callback);
};
```
And modify our test class in order to include our server instance:
```javascript
// /test/routes/routes.test.js
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

```
- Then, run again your test (Step #4 TDD Workflow):
```sh
$ npm test
```
- It fails again, because there is no logic inside our endpoint , let's fix that (Step #5 TDD Workflow):
```javascript
// /routes/index.js
router.get('/hello', function(req, res, next) {
  res.status(200).send('Hello world!');
});
```

- Finally, watch what is going on, everything went ok this time (Step #6 TDD Workflow)

- **You've tested your first endpoint!**

## Extra
You also can find a folder of controllers with a example how to test a function by using Chai and Mocha.
