const express = require("express");
const pool = require("../config");

router = express.Router();

router.get('/:project_id/:part_number', async function(req, res, next) {
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    let [rows, fields]= await conn.query("select * from part where part_number = ?", req.params.part_number)
    let part = rows
    let [row1, field1] = await conn.query("select * from document where part_number = ? and document_type = 'Work_Inst' and upload_datetime = ( select max(upload_datetime) from document where part_number = ? and document_type = 'Work_Inst')", 
    [req.params.part_number, req.params.part_number])
    let Work_Inst = row1
    let [row2, field2]= await conn.query("select * from document where part_number = ? and document_type = 'Inspection' and upload_datetime = ( select max(upload_datetime) from document where part_number = ? and document_type = 'Inspection')", 
    [req.params.part_number, req.params.part_number])
    let Inspection = row2
    let [row3, field3] = await conn.query("select * from document where part_number = ? and document_type = 'Q_Point' and upload_datetime = ( select max(upload_datetime) from document where part_number = ? and document_type = 'Q_Point')", 
    [req.params.part_number, req.params.part_number])
    let Q_Point = row3
    try {
      await conn.commit();
      res.json({part, Work_Inst, Inspection, Q_Point});
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
})

exports.router = router;