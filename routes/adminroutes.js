const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const adminrouter = express.Router()

// admin routes
adminrouter.get("/viewusers",admincontroller.viewusers)
adminrouter.delete("/deleteuser/:email",admincontroller.deleteuser)
adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)
// adminrouter.post("/fetchimg/:album",admincontroller.fetchimg)

// upload and display Albums with images

adminrouter.post("/createalbum",admincontroller.createalbum)
adminrouter.get("/viewalbums",admincontroller.viewalbums)
adminrouter.get("/viewalbumimg/:moviename",admincontroller.viewalbumimg)
adminrouter.get("/albumimage/:filename",admincontroller.albumimage)

// upload and display Songs 

adminrouter.post("/addsong",admincontroller.addsong)
adminrouter.get("/viewsongs/:moviename",admincontroller.viewsongs)
adminrouter.get("/songaudio/:filename",admincontroller.songaudio)

//playsongs

adminrouter.get("/playsong/:songname",admincontroller.playsong)

adminrouter.post("/createplaylist",admincontroller.createplaylist)
// adminrouter.get("/viewplaylists/:playlistname",admincontroller.viewplaylists)
adminrouter.get("/playlistimage/:filename",admincontroller.playlistimage)
adminrouter.get("/viewplaylist",admincontroller.viewplaylist)


// adminrouter.get("/songaudio/:filename",admincontroller.songaudio)


module.exports = adminrouter