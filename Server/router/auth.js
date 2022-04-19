const express=require("express");
const router=express.Router();
const User=require("../Model/user");
const bcrypt = require('bcrypt');
const mongoose=require("mongoose");
const crypto = require("crypto");
const Testing = require("../Model/Test");
const Jimp=require("jimp");
router.get("/",async (req,res)=>{
    console.log("HI from Home");
    let Student=await User.find({Teacher:0});
    res.send(Student);
});
router.post("/getstudentdata",async (req,res)=>{
    let Student=await User.find({_id:req.body._id});
    return res.status(200).json({data:Student});
})
router.post("/register",async (req,res)=>{
    const {Name,Email,Password}=req.body;
    console.log(req.body);
    if(!Name || !Email || !Password){
        return res.status(422).json({error:"Plz Fill Data"})
    }
    else{
        let Student=await User.findOne({Email:Email})
        if(Student){
            return res.status(404).json({error:"User Already Exist"})
        }
        else{
            const SecurePass=await bcrypt.hash(Password,10);
            Student=await new User({Name,Email,Password:SecurePass});
            Student.save();
        }
    }
    return res.status(200).json({success:"User Successfully registered"});
})
router.post("/login",async(req,res)=>{
    const {Email,Password}=req.body;
    const Teacher = { "krantigulevcet@gmail.com": 'DC',"vikrantagaskarvcet@gmail.com": 'PM', "sagartambevcet@gmail.com": 'HMI',"tatwadarshinagarhallivcet@gmail.com": 'NLP' };
    if(!Email || !Password){
        return res.status(422).json({error:"Plz Fill Data"})
    }
    else{
        let Student=await User.findOne({Email:Email})
        if(!Student){
            return res.status(404).json({error:"Incorrect Credentials"})
        }
        else{
            const SecurePass=await bcrypt.compare(Password,Student.Password);
            if(SecurePass){
                let id=Student._id;
                if(Email in Teacher){
                    console.log("Welcome Prof."+Student.Name);
                    return res.status(200).json({subject:Teacher[Email],teacher:1,_id:id});
                }
                else{
                    console.log("Welcome "+Student.Name);
                    return res.status(200).json({teacher:0,_id:id});
                }
            }
            else{
                return res.status(404).json({error:"Incorrect Credentials"})
            }
        }
    }
})
router.post("/attendance",async(req,res)=>{
    let {_id,subject}=req.body;
    if(subject=="DC"){
        await User.findByIdAndUpdate(_id,{$inc:{DC:1}});
    }
    else if(subject=="HMI"){
        await User.findByIdAndUpdate(_id,{$inc:{HMI:1}});
    }
    else if(subject=="PM"){
        await User.findByIdAndUpdate(_id,{$inc:{PM:1}});
    }
    else{
        await User.findByIdAndUpdate(_id,{$inc:{NLP:1}});
    }
    res.send(_id+" "+subject);

})
module.exports=router;