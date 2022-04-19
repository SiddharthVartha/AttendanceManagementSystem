const mongoose=require("mongoose");
const process=require("process");
require('dotenv').config();
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to mongodb database");
})
.catch((err)=>{
    console.log(err);
});
const Test=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    cityOfCollege:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    stream:{
        type:String,
        required:true
    },
    level:{
        type:Array,
        default:[1,2,3]
    },
    referral:{
        type:String,
        default:""
    },
    noOfReferrals:{
        type:Number,
        default:0
    },
    discount:{
        type:String,
        default:""
    }
});
const Testing=mongoose.model("Testing",Test);
module.exports=Testing;