const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    var data = { title: 'Express' }
    res.render('index', data)
})

module.exports = router