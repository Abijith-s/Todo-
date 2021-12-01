const express = require('express')
var app = express()
require('dotenv').config()
var userRouter = require('./routes/hello')
var cors = require('cors')
var db = require("./connection")

db.connect((err)=>{
    if(err){
      console.log("connection failed")
    }else{
      console.log("database connected successfully")
    }
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/',userRouter)
const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`server starts at port :${PORT}`)
})
