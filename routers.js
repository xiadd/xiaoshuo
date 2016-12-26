const router = require('express').Router()

const queryBooksType = require('./controllers/book').queryBooksType
const queryBookContent = require('./controllers/book').queryBookContent
const queryBooks = require('./controllers/book').queryBooks
const queryChapterContent = require('./controllers/book').queryChapterContent

const wxLogin = require('./controllers/login').wxLogin

router.get('/types', queryBooksType)
router.get('/chapters/:bookId', queryBookContent)
router.get('/books', queryBooks)
router.get('/chapter', queryChapterContent)
router.get('/wechat/login', wxLogin)

module.exports = router
