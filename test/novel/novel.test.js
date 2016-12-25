var app = require('../../app')
var expect = require('chai').expect
var request = require('supertest')(app)

describe('小说接口', function() {
  it('获取类型', function (done) {
    request
    .get('/api/types')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '910')
    .expect(400, done)
  })
});
