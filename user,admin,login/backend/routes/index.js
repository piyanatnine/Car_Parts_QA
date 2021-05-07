const express = require("express");
const pool = require("../config");
const saltedMd5 = require('salted-md5');

router = express.Router();

router.get("/user/:username", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM employee WHERE first_name=\'' + req.params.username + '\'');
    // res.send(req.params.user)
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});
router.get("/docs", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM document WHERE uploader=(SELECT employee_id FROM employee WHERE first_name=\'somsuay\')');
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});
router.get("/acc/:username/:c_pw/:n_pw_one/:n_pw_two/:error", async function (req, res, next) {
    try {
      const [rows, fields] = await pool.query('SELECT employee_id FROM employee WHERE password=\'' + saltedMd5(req.params.c_pw, req.params.username) + '\'')
      if (req.params.error == 0)
      {
          const[pw_rows, pw_fields] = await pool.query('UPDATE employee SET password=\'' + saltedMd5(req.params.c_pw, req.params.username) + '\' WHERE Username=\'' + req.params.username + '\'')
      }
      return res.send(rows)
    } catch (err) {
        return res.status(500).json(err)
    }
})
router.post('/ps', async function (req, res, next) {
  try {
    // const [rows, fields] = await pool.query('SELECT employee_id FROM employee WHERE password=\'' + saltedMd5(req.params.c_pw, req.params.username) + '\'')
    // if (req.params.error == 0)
    // {

    // }
    const [rows, fields] = await pool.query('UPDATE vlog SET id=99 WHERE id=' + req.url.substring(7, req.url.length) + ';')
    return res.send(req.url.substring(7, req.url.length))
  } catch (err) {
      return res.status(500).json(err)
  }
})

exports.router = router;
