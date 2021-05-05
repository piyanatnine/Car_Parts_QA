const express = require("express");
const pool = require("../config");

router = express.Router();

router.get('/user/:employee_id/userpage', async function(req, res, next) {
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
  
    try {
      let [row, field] = await conn.query("SELECT employee_id, first_name, file_name, upload_datetime, part_number FROM employee e JOIN document d ON (e.employee_id = d.uploader ) where employee_id = ? order by upload_datetime desc",
      [req.params.employee_id]); 
      let logs = row
      await conn.commit();
      res.json({ logs });
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
})

exports.router = router;