const express = require("express");
const pool = require("../config");
const saltedMd5 = require('salted-md5')

router = express.Router();

router.get('/:project_id', async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  let [row, fields] = await conn.query("SELECT project.*, part_number, part_name, wi_status, inspec_status, q_point_status FROM part LEFT JOIN (SELECT doc.part_number, `status` AS wi_status FROM document doc JOIN (SELECT part_number, document_type, MAX(IFNULL(approved_datetime, upload_datetime))`date` FROM document GROUP BY part_number, document_type) AS latest ON doc.part_number = latest.part_number AND doc.document_type = latest.document_type AND(IFNULL(doc.approved_datetime, doc.upload_datetime)) = latest.date WHERE doc.document_type = 'Work_Inst') AS wi USING(part_number) LEFT JOIN(SELECT doc.part_number, `status`inspec_status FROM document doc JOIN (SELECT part_number, document_type, MAX(IFNULL(approved_datetime, upload_datetime))`date` FROM document GROUP BY part_number, document_type) AS latest ON doc.part_number = latest.part_number AND doc.document_type = latest.document_type AND(IFNULL(doc.approved_datetime, doc.upload_datetime)) = latest.date WHERE doc.document_type = 'Inspection') AS inspec USING(part_number) LEFT JOIN(SELECT doc.part_number, `status` AS q_point_status FROM document doc JOIN (SELECT part_number, document_type, MAX(IFNULL(approved_datetime, upload_datetime))`date` FROM document GROUP BY part_number, document_type) AS latest ON doc.part_number = latest.part_number AND doc.document_type = latest.document_type AND(IFNULL(doc.approved_datetime, doc.upload_datetime)) = latest.date WHERE doc.document_type = 'Q_Point') AS qp USING(part_number) RIGHT JOIN project USING(project_id) WHERE project_id =?; ",
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
});


router.put('/:project_id', async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    await conn.query("UPDATE project SET project_name = ? WHERE project_id = ?", [
      req.body.project_name,
      req.params.project_id
    ]);
    res.json({ name: req.body.project_name })
    await conn.commit();
    
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

router.put('/:project_id/reset', async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  let [row, field] = await conn.query("select password from employee where employee_id = ?;", [req.body.employee_id])
  const employee_password = row[0].password
  // if (await bcrypt.compare(employee_password, req.body.password_check)){
  //   try {
  //     console.log('OK');
  //     res.json({pw1: employee_password, pw2: req.body.password_check})
  //     await conn.commit();
    
  // } catch (err) {
  //   await conn.rollback();
  //   return res.status(500).json(err);
  // } finally {
  //   conn.release();
  // }
  // }else {
  //   return res.status(403).json('password is not macth!');
  // }
});

router.get('/data/userPasswordHash', async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  let [row, field] = await conn.query("select * from employee")
  const project = []
  let password_set = ['passwordAdmin', 'passwordQA', 'passwordUser', 'Adam578943256', 'pedkai123456', 'padthainaja'
  , 'maha6534864651', 'IamSpiderman', 'som216516515', 'somsuayInwZa007']
  row.forEach((val, index) => {
    const psw = saltedMd5( password_set[index], val.Username)
    project.push({
      username: val.Username,
      password: psw
    })
  });
try {
  await conn.commit();
  res.json(project);
} catch (err) {
  await conn.rollback();
  return res.status(500).json(err);
} finally {
  conn.release();
}
});

exports.router = router;