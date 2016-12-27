const router = require('express').Router()

const queryBooksType = require('./controllers/book').queryBooksType
const queryBookContent = require('./controllers/book').queryBookContent
const queryBooks = require('./controllers/book').queryBooks
const queryChapterContent = require('./controllers/book').queryChapterContent

const wxLogin = require('./controllers/user').wxLogin
const getUserInfo = require('./controllers/user').getUserInfo
const addToList = require('./controllers/user').addToList

//middlewares
const loginRequired = require('./middlewares/auth').loginRequired

router.get('/types', queryBooksType)
router.get('/chapters/:bookId', queryBookContent)
router.get('/books', queryBooks)
router.get('/chapter', queryChapterContent)
router.get('/wechat/login', wxLogin)
router.get('/wechat/user', loginRequired, getUserInfo)
router.put('/add/:bookId', loginRequired, addToList)

module.exports = router
