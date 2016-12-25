const app = require('./app')
const env = process.env.NODE_ENV
const PORT = process.env.PORT || 8080

app.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`)
})
