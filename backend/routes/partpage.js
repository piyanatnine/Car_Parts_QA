const express = require("express");
const pool = require("../config");
const multer = require("multer")

router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

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
    let [row4, field4] = await conn.query("SELECT part_number, latest_update FROM part LEFT JOIN (SELECT part_number,  MAX(IFNULL(approved_datetime, upload_datetime)) latest_update FROM document GROUP BY part_number) AS latest USING (part_number) WHERE part_number = ?;", 
    [req.params.part_number])
    let lastupdate = row4
    try {
      await conn.commit();
      res.json({part, Work_Inst, Inspection, Q_Point, lastupdate});
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
})

router.post('/:project_id/:part_number', uploadStorage.single("file"), async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const file_pdf = req.file;
    let [row, field] = await conn.query("select max(upload_no) as 'last_upload' from document")
    const upload_no = (parseInt(row[0].last_upload)+1).toString()
    const pev_doc = req.body.pev_doc
    await conn.query("INSERT INTO document (upload_no, file_name, Document_URL, document_type, status, part_number, uploader, upload_datetime) values(?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);",
      [upload_no, file_pdf.filename, file_pdf.path.substr(6), req.body.document_type, 'Temporary', req.params.part_number, req.body.uploader]
    );
    

    if (pev_doc != 'null') {
      await conn.query("UPDATE document SET preceding_doc = ? where upload_no = ?", [pev_doc, upload_no])
    }
    res.json({
      'upload_no': upload_no, 
      'file_name': file_pdf.filename,
      'doc_url': file_pdf.path.substr(6), 
      'doc_type': req.body.document_type,
      'partnum': req.params.part_number,
      'uploader': req.body.uploader,
      'pev': pev_doc
    })
    await conn.commit();
    
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

router.get(`/:project_id/:part_number/history/:type`, async function (req, res, next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [row, field] = await conn.query("SELECT * FROM document WHERE part_number = ? and document_type = ? ORDER BY upload_datetime DESC;", [
      req.params.part_number, req.params.type
    ]);
    res.json(row);
    await conn.commit();
    
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})


router.put(`/:project_id/:part_number/status`, async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    var currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await conn.query("UPDATE document SET status = 'Approved', approver = ?, approved_datetime = ? WHERE upload_no = ? and part_number = ?", [
      req.body.user_id, currentTime, req.body.upload_no, req.params.part_number
    ]);
    res.send( 'success!!' )
    await conn.commit();
    
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

router.put('/:project_id/:part_number', uploadStorage.single("file"), async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  console.log('hi')
  try {
    const file_pdf = req.file;
    // console.log(req.file) 
    if (file_pdf){
      await conn.query(
        "UPDATE part SET part_drawing = ? WHERE part_number = ? ",
        [file_pdf.path.substr(6), req.params.part_number])
    } 
    await conn.query("UPDATE part SET part_name = ? WHERE part_number = ?", [
      req.body.name,
      req.params.part_number
    ]);
    res.send( 'success!!' )
    await conn.commit();
    
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;