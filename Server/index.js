const express=require("express");
const mongoose=require("mongoose");
const process=require("process");
const cors = require('cors');
require('dotenv').config();
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to mongodb database");
})
.catch((err)=>{
    console.log(err);
})
const app=express();
app.use(express.json());
app.use(cors());
app.use(require("./router/auth"));
app.get("/",(req,res)=>{
    console.log("HI from Home");
    res.send("HI From Server");
});
app.listen(5000,()=>{
    console.log("listning on port 5000");
});
