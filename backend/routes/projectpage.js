const express = require("express");
const pool = require("../config");

router = express.Router();

router.get('/:project_id', async function(req, res, next) {
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    let [row, fields] = await conn.query("SELECT distinct pj.*, p.part_number, p.part_name, doc_wi.status as `wi_status`, doc_insp.status as `inspection_status`, doc_qp.status as `qpoint_status` from project pj join part p on (pj.project_id = p.project_id and pj.project_id = ?) left join ( select upload_datetime, status, part_number from document where document_type = 'Work_Inst' ) doc_wi on (p.part_number = doc_wi.part_number) left join ( select upload_datetime, status, part_number from document where document_type = 'Inspection' ) doc_insp on (p.part_number = doc_insp.part_number) left join ( select upload_datetime, status, part_number from document where document_type = 'Q_Point' ) doc_qp on (p.part_number = doc_qp.part_number)",
    [req.params.project_id])
    let project = row 
    try {
      await conn.commit();
      res.json(project);
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
})

exports.router = router;