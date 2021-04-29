const express = require("express");
const pool = require("../config");

router = express.Router();

router.get('/:project_id', async function(req, res, next) {
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
  
    try {
      await conn.commit();
      res.json('a');
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
})

exports.router = router;