const express = require("express");
const pool = require("../config");

router = express.Router();

router.get('/', async function(req, res, next) {
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
  
    try {
      let [row1, field1] = await conn.query("SELECT project.*, IFNULL(completeness, 0) completeness FROM project LEFT JOIN (SELECT project_id, (SUM(perc_per_part)/COUNT(part_number))*100 completeness FROM (SELECT project_id, part_number, (COUNT(CASE `status` WHEN 'Approved' THEN 1 ELSE NULL END) + COUNT(CASE `status` WHEN 'Temporary' THEN 1 ELSE NULL END)*0.5)/3 perc_per_part FROM part LEFT JOIN (SELECT doc.part_number, doc.document_type, `status` FROM document doc JOIN (SELECT part_number, document_type, MAX(IFNULL(approved_datetime, upload_datetime)) `date` FROM document GROUP BY part_number, document_type) AS latest ON doc.part_number = latest.part_number AND doc.document_type = latest.document_type AND (IFNULL(doc.approved_datetime, doc.upload_datetime)) = latest.date) AS latest_doc USING (part_number) GROUP BY project_id, part_number) AS perc GROUP BY project_id) as project_perc USING(project_id) order by project_id;");
      let projects =  row1
      let [row2, field2] = await conn.query("SELECT * FROM part");
      let parts = row2
      await conn.commit();
      res.json({ projects, parts });
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
})

exports.router = router;