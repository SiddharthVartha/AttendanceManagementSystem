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
})
const UserSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    HMI:{
        type:Number,
        default:0
    },
    DC:{
        type:Number,
        default:0
    },
    PM:{
        type:Number,
        default:0
    },
    NLP:{
        type:Number,
        default:0
    },
    Teacher:{
        type:Number,
        default:0
    }
});
const User=new mongoose.model("User",UserSchema);
module.exports=User;