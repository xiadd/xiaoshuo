const request = require('axios')
const qs = require('querystring')
const validator = require('validator')

const config = require('../config')
const getSign = require('../utils/api_sign')
const env = process.env.NODE_ENV

const NovelType = require('../models/novels').NovelType
const Novel = require('../models/novels').Novel

function getParams (query) {
  if (typeof query !== 'object') throw new Error('传入正确的类型')
  query.showapi_appid = config.showapiAppId
  let showapiSign = getSign(env, query)

  query.showapi_sign = showapiSign
  return query
}

exports.queryBooksType = function (req, res) {
  let query = req.query //空值
  let params = getParams(query)
  let url = config['小说种类查询']
  console.log(req.session.userid)
  NovelType.find({}, function (err, types){
    if (err) {
      return res.json({
        code: -1,
        msg: err
      })
    }
    res.json({
      code: 1,
      msg: '查询成功',
      ret: types
    })
  })

  // request.get(url, {params: params}).then(results => {
  //   let data = results.data
  //   res.json({
  //     code: 1,
  //     msg: '查询成功',
  //     ret: data.showapi_res_body.typeList
  //   })
  // }).catch(err => res.json({code:-1, msg: err}))
}

//注意这里keyword关键字必须存在，typeid和查询所有小说接口删除
exports.queryBooks = function (req, res) {
  let query = req.query
  if (!query.keyword||query.keyword.length === 0) {
    return res.json({code: -1, msg: '必须提供查询关键字'})
  }
  Novel.find({name: query.keyword}, function (err, results) {
    if (err) throw err
    if (results.length !== 0) {
      res.json({ code: 1, msg: '查询成功', ret: { allPages: Math.ceil(results.length/20), contentlist: results, currentPage: 1, allNum: results.length, maxResult: 20 } })
    } else {
      let params = getParams(query)
      let url = config['小说查询']
      if (Object.keys(query).length === 0) {
        //不能提供查询所有小说的接口
      }
      request.get(url, { params: params }).then(results => {
        results.data.showapi_res_body.pagebean.contentlist.forEach(function (v, i) {
          v.name = validator.trim(v.name)
          let newNovel = new Novel(v)
          newNovel.save(function(err) {
            if(err) throw err
          })
        })
        res.json({
          code: 1,
          msg: '查询成功',
          ret: results.data.showapi_res_body.pagebean
        })
      })
    }
  })
}

exports.queryBookContent = function (req, res) {
  let query = req.params //bookid
  let params = getParams(query)
  let url = config['小说章节查询']
  Novel.findOne({id: query.bookId}).then(function (result) {
    if (result && result.chapterList.length !== 0) {
      return res.json({code: 1, msg: '查询成功', ret: result})
    }

    request.get(url, { params: params }).then(results => {
      let data = results.data
      if (!result) {
        let _novel = new Novel(data.showapi_res_body.book)
        _novel.save().then(err => {
          //TODO
        })
        return res.json({
          code: 1,
          msg: '查询成功',
          ret: data.showapi_res_body.book
        })
      }

      if (result && result.chapterList.length === 0) {
        Novel.findByIdAndUpdate(result._id, {$set: {chapterList: data.showapi_res_body.book.chapterList}}, { new: true }).then(_res => {
          //do something
          return res.json(_res)
        }, function (err) {
          res.json({
            code: -1,
            msg: err.message
          })
        })
      }
    }).catch(err => res.json({code:-1, msg: err.message}))

  }).catch(function (err) {
    res.json({
      code: -1,
      msg: err.message
    })
  })
}

exports.queryChapterContent = function (req, res) {
  let query = req.query//bookId, cid
  let params = getParams(query)
  let url = config['小说章节内容查询']
  request.get(url, { params: params }).then(results => {
    res.json(results.data)
  })
}
