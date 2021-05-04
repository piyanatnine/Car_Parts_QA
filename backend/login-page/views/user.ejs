const express = require('express');
router = express.Router();

const pool = require('../config');
const saltedMd5 = require('salted-md5')
router.get(
    '/', async function (req, res, next) {
        try {
            query_msg = "";
            query_msg += "SELECT * ";
            query_msg += "FROM employee; ";
            const [rows, fields] = await pool.query(query_msg);
            console.log(rows)
            return res.render('index', {
                user: rows,
                username_input: '',
                matched_username_position: -1,
                password_input: '',
                matched_password_position: -1,
                response_msg: ''
            })
        }
        catch (err) {
            return next(err)
        }
    }
)
router.get(
    '/home', async function (req, res, next) {
        res.send('this is homepage')
    }
)
router.get(
    '/admin', async function (req, res, next) {
        res.send('this is Admin Panel')
    }
)
router.post(
    '/user', async function (req, res, next) {
        try {
            query_msg = "";
            query_msg += "SELECT * ";
            query_msg += "FROM employee; ";
            const [rows, fields] = await pool.query(query_msg);
            response_message = ''
            if ((req.body.username == '') || (req.body.password == ''))
            {
                response_message = 'Username or password is blank'
            }
            username_msg = ''
            username_position = -1
            password_msg = ''
            password_position = -1
            for (let i = 0; i < rows.length; i++) {
                const element = rows[i];
                if (element.Username == req.body.username)
                {
                    username_msg += '1';
                    username_position = i;
                }
                else
                {
                    username_msg += '0'
                }
                if (element.password == saltedMd5(req.body.password, req.body.username))
                {
                    password_msg += '1';
                    password_position = i;
                }
                else
                {
                    password_msg += '0'
                }
                
            }
            username_msg += ',' + username_position
            password_msg += ',' + password_position
            if ((username_position == -1) || (password_position == -1))
            {
                response_message = 'Username or password is wrong'
            }
            if ((username_position != -1) && (password_position != -1))
            {
                doc_query_msg = "";
                doc_query_msg += "SELECT * ";
                doc_query_msg += "FROM document ";
                doc_query_msg += "WHERE uploader=" + rows[username_position].employee_id + "; ";
                const [doc_rows, doc_fields] = await pool.query(doc_query_msg);
                console.log(doc_rows)
                    let isAdmin = 0;
                if (rows[username_position].position == 'Admin')
                {
                    isAdmin = 1;
                }
                res.render('user', {
                    message: rows,
                    row_no: username_position,
                    isAdmin: isAdmin,
                    doc_rec: doc_rows
                })
                // res.send(req.body.username)
            }
            return res.render('index', {
                user: rows,
                username_input: req.body.username,
                matched_username_position: username_msg,
                password_input:  saltedMd5(req.body.password, req.body.username),
                matched_password_position: password_msg,
                response_msg: response_message
            })
        }
        catch (err) {
            return next(err)
        }
    }
)

exports.router = router;
