const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const dburl = "mongodb://localhost:27017/musicapi"
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully")
}).catch((err) => {
    console.log(err.message)
});

const app = express()
app.use(express.json()) // to parse JSON Data
app.use(cors())

const userrrouter = require("./routes/userroutes")
const adminrouter = require("./routes/adminroutes")

app.use("",adminrouter)
app.use("",userrrouter) // it includes user routes


const port = 2032
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})