import { useState } from "react";
import "../CSS/Teacher.css"
const Teacher=(props)=> {
    const [present,setPresent]=useState([]);
    const Check=(e,id)=>{
        let attendance=e.target.checked;
        if(attendance){
            setPresent(oldArray => [...oldArray, id]);
        }
        else{
            let newArray=present.filter(function(f) { return f !== id });
            setPresent(newArray);
        }
        
    }
    const Attendance=async ()=>{
        let subject=props.subject;
        let arraywithteacher=present.push(props._id)
        setPresent(arraywithteacher);
        for(let id in present){
            console.log(present[id]);
            let _id=present[id]
            await fetch("/attendance",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({_id,subject})
                });
        }
        alert("Attendance Is Taken Successfully :)");
        window.location.reload();
    }
    return ( 
        <div className="container">
            <h1 className="mx-auto heading my-5">{props.subject} Attendance</h1>
            <div className="TeacherTable">
            <table className="Table">
                <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Attendance</th>
                </tr>
                {props.student.map((stdData)=>
                    <tr key={stdData._id}>
                    <td>{stdData._id}</td>
                    <td>{stdData.Name}</td>
                    <td><input type="checkbox" onClick={(e)=>Check(e,stdData._id)}/></td>
                </tr>
                )}
            </table>
            </div>
            <button className="submit" onClick={Attendance}>Submit</button>
        </div>
     );
}

export default Teacher;