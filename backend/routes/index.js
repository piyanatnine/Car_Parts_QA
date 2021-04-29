const express = require("express");
const pool = require("../config");
const router = express.Router();
var data = { msg: '##' };

router.get('/index', function(req, res) {
    res.render('index', data);
    console.log(data)
})
router.post('/index', async function(req, res) {
    var data = { msg: '##' }
    res.render('index', data);
    username = req.body.username
    preference = req.body.preference
    const [row, fields] = await pool.query(
        'INSERT INTO users VALUES(?, ?);'
        , [username, preference]
    );
    console.log(row)
    console.log(data)
})
// router.get('/fn', async function(req, res) {
//     const [row, fields] = await pool.query(
//         'SELECT * FROM users'
//     );
//     res.render('index');
//     console.log(row)
// })

exports.router = router