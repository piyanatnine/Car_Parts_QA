const express = require("express");
const pool = require("../config");
const multer = require("multer")
const saltedMd5 = require('salted-md5')
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

router.get('/user/:emplooyee_id/adminpanel', async function(req, res, next) {
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
  
    try {
      let [row, field] = await conn.query("select project_id, project_name, customer_id, count(part_number) `Part` from project left join part using (project_id) group by project_id");
      let projects =  row;
      let [row1, field1] = await conn.query("select * from customer");
      let customers = row1;
      let [row2, field2] = await conn.query("select * from employee");
      let users = row2;
      await conn.commit();
      res.json({projects, customers, users});
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
})

router.post('/user/:emplooyee_id/adminpanel/addpart', uploadStorage.single("file"), async function(req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    
    try {
      const file_pdf = req.file;
      let [row, field] = await conn.query("SELECT max(part_number) as `partnumber` from part;")
      let partnumber = row[0].partnumber+1;
      
      await conn.query("INSERT INTO part values(?, ?, ?, ?);",
        [partnumber, req.body.partname, file_pdf.path.substr(6), req.body.project_id]
      );
      await conn.commit();
      res.send('success!!')
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
})

router.post('/user/:emplooyee_id/adminpanel/addproject', async function(req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    
    try {
      let [row, field] = await conn.query("SELECT max(project_id) as `projectid` from project;")
      let projectid = row[0].projectid+1;
      console.log(projectid)
      await conn.query("INSERT INTO project values(?, ?, ?);",
        [projectid, req.body.project_name, req.body.customer_id]
      );
      await conn.commit();
      res.send('success!!')
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
})

router.post('/user/:emplooyee_id/adminpanel/adduser', async function(req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  
  try {
    console.log(req.body);
    const username = req.body.position+req.body.employee_id;
    const password = await saltedMd5(req.body.password, req.body.username, true);

    await conn.query("INSERT INTO employee values(?, ?, ?, ?, ?, ?);",
      [req.body.employee_id, req.body.firstname, req.body.lastname, req.body.position, username, password]
    );
    await conn.commit();
    res.send('success!!')
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})

router.put('/user/:emplooyee_id/adminpanel/edituser', async function(req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  
  try {
    await conn.query("UPDATE employee SET first_name = ?, last_name = ?, position = ? WHERE employee_id = ? ;",
      [req.body.firstname, req.body.lastname, req.body.position, req.body.employee_id]
    );
    await conn.commit();
    res.send('success!!')
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})

exports.router = router;