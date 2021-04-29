const express = require('express')
const app = express()
const path = require('path')

// Setup ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// const article = require('./article-db')

// Config Router
const homeRouter = require('./routes/homepage.js')

app.use('/', homeRouter)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})