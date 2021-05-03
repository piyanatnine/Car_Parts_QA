const express = require('express');
const app = express()

const path = require('path');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('static'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const indexRouter = require('./routes/index')

app.use(indexRouter.router)

app.listen(3000, () => {
    console.log('Example app listening at https://localhost:3000')
})
