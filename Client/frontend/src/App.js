
import Teacher from './Component/Teacher';
import User from './Component/User';
import Home from "./Component/Home";
import axios from 'axios';
import { useState,useEffect } from 'react';

function App() {
  const [data,setData]=useState([]);
  const [checkUser,setCheckUser]=useState(false);
  const [checkTeacher,setCheckTeacher]=useState(false);
  const [teacher,setTeacher]=useState("");
  const [teacherId,setTeacherId]=useState("");
  const [studentId,setStudentId]=useState("");
  useEffect( () => {
    async function fetchData(){
    const x=await axios.get("http://localhost:5000/",{Headers:
      {"Access-Control-Allow-Origin": "*"}
    });
    setData(x.data);
    }
    fetchData();
  }
  ,[]);
  const checkStudentTeacher=(val)=>{
    if(val.teacher==0){
        setCheckUser(true);
        setStudentId(val._id);
        setCheckTeacher(false);
    }
    else{
        setCheckTeacher(true);
        setCheckUser(false);
        setTeacherId(val._id);
        setTeacher(val.subject)
    }
  }
  return (
    
    <div className='container'>
      {checkTeacher || checkUser?false && <Home/>:true && <Home checkStudentTeacher={checkStudentTeacher}/>}
      {checkTeacher && <Teacher student={data} subject={teacher} _id={teacherId}/>}
      {checkUser && <User  _id={studentId}/>}
    </div>
  );
}

export default App;
