const usercontroller = require("../controllers/usercontroller")

const express = require("express")
const userrouter = express.Router()

// user routes
userrouter.post("/checkuserlogin",usercontroller.checkuserlogin)
userrouter.post("/insertuser",usercontroller.insertuser)
userrouter.put("/updateuserprofile",usercontroller.updateuserprofile)
userrouter.get("/userprofile/:email",usercontroller.userprofile)



module.exports = userrouter