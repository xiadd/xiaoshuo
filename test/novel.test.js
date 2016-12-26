var app = require('../app')
var expect = require('chai').expect
var request = require('supertest')(app)

describe('小说接口', function() {
  describe('小说类型获取 GET /api/types', function () {
    it('全部类型', function (done) {
      request.get('/api/types')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        expect(res.body).to.have.ownProperty('ret')
        expect(res.body.ret).to.have.lengthOf(10)
      })
      .end(done)
    })
  })

  describe('小说查询', function () {
    it('小说关键词查询', function (done) {
      request.get('/api/books?keyword=' + encodeURIComponent('遮天'))
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        expect(res.body).to.have.ownProperty('ret')
        expect(res.body.code).to.equal(1)
      })
      .end(done)
    })
    it('未提供关键词', function (done) {
      request.get('/api/books')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        expect(res.body.code).to.equal(-1)
        expect(res.body.msg).to.equal('必须提供查询关键字')
      })
      .end(done)
    })
    it('关键字为空', function (done) {
      request.get('/api/books?keyword=')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        expect(res.body.code).to.equal(-1)
        expect(res.body.msg).to.equal('必须提供查询关键字')
      })
      .end(done)
    })
  })
})
