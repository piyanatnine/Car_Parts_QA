const express = require('express');
router = express.Router();
const pool = require('../config');
const saltedMd5 = require('salted-md5');
const Joi = require('joi');

router.get('/login', async function (req, res, next) {
        try {
            query_msg = "";
            query_msg += "SELECT * ";
            query_msg += "FROM employee; ";
            const [rows, fields] = await pool.query(query_msg);
            console.log(rows)
            return res.send('index', {
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
router.post(
    '/login', async function (req, res, next) {
        try {
            const logInSchema = Joi.object({
                username: Joi.string().required().max(20),
                password: Joi.string().required().min(4),
            }) 
             
            logInSchema.validateAsync(req.body,  { abortEarly: false })
            const [rows, fields] = await pool.query('select Username, password from employee where Username = ?',
            [req.body.username]);

            if ( rows[0] == null) {
                throw new Error('Username or password is Incorrect')
            } 
            else {
            // response_message = ''
                if ((req.body.username == '') || (req.body.password == '')){
                    throw new Error('Username or password is blank')
                }
            console.log(rows[0])
            //Check user_name
                if (rows[0].Username == null){
                    throw new Error('Incorrect username')
                }

            //Check password
                const psw = await saltedMd5(req.body.password, req.body.username, true);
                if (!(psw == rows[0].password)){
                    throw new Error('Incorrect password');
                }

                let [dataUser] = await pool.query('select employee_id, first_name, last_name, position, Username from employee where Username = ?',
                [req.body.username])
                console.log(dataUser)
                res.status(200).json(dataUser);
            }
        }
        catch (err) {
            console.log(err)
            next (err)
        }
    }
)

exports.router = router;
