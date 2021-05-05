const express = require("express")
var cors = require('cors')
const path = require("path")

const app = express();
app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const home_Router = require('./routes/homepage.js')
const project_Router = require('./routes/projectpage.js')
const part_Router = require('./routes/partpage.js')
const login_Router = require('./routes/logIn.js')
const adminpanel_Router = require('./routes/adminPanelpage.js')
const user_Router = require('./routes/userpage.js')

app.use(home_Router.router);
app.use(project_Router.router);
app.use(part_Router.router);
app.use(login_Router.router);
app.use(adminpanel_Router.router);
app.use(user_Router.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})