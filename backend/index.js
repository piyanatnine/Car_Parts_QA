const express = require('express')
const path = require('path')

const app = express();

// set view engine
app.set('view engine', 'ejs')
// set folder for views
app.set('views', path.join(__dirname, 'views'))
// use static folder for storing file
app.use(express.static('static'))
// for parsing json::
app.use(express.json())
// for parsing application
app.use(express.urlencoded({ extended: true }))

// Routers
const indexRouter = require('./routes/index')
app.use(indexRouter.router)
const blogRouter = require('./routes/blog')
app.use(blogRouter.router)
const commentRouter = require('./routes/comment')
app.use(commentRouter.router)

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
})