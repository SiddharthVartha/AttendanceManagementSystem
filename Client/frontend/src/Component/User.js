import "../CSS/User.css"
import { useState } from 'react';
import DoughnutChart from './DoughnutChart';
const User =(props) => {
    let _id=props._id;
    const [stdData,setstdData]=useState([]);
    const [dc,setDc]=useState(0);
    const [hmi,setHmi]=useState(0);
    const [pm,setPm]=useState(0);
    const [nlp,setNlp]=useState(0);
    const [first,setFirst]=useState(true);
    if(_id){
            async function fetchData(){
                const res=await fetch("/getstudentdata",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify({_id})
                    });
            const data=await res.json();
            setstdData(data.data[0]);
            }
            async function fetchDataDC(){
                const res=await fetch("/getstudentdata",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify({_id:"623435a44ade750a3ffc55d5"})
                    });
            const data=await res.json();
            setDc(data.data[0]);
            }
            async function fetchDataHmi(){
                const res=await fetch("/getstudentdata",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify({_id:"624af25ba5667abf4b841170"})
                    });
            const data=await res.json();
            setHmi(data.data[0]);
            }
            async function fetchDataNlp(){
                const res=await fetch("/getstudentdata",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify({_id:"624af1f8a5667abf4b84116c"})
                    });
            const data=await res.json();
            setNlp(data.data[0]);
            }
            async function fetchDataPm(){
                const res=await fetch("/getstudentdata",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify({_id:"6247446a58887b31bc2e2189"})
                    });
            const data=await res.json();
            setPm(data.data[0]);
            }
            if(first){
                fetchData();
                fetchDataDC();
                fetchDataNlp();
                fetchDataPm();
                fetchDataHmi();
                setFirst(false);
            }

    }
    return (
        
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
            <h1 className="name">Welcome {stdData.Name}</h1>
            <table>
                <tr>
                    <th>Sr. No.</th>
                    <th>Subject</th>
                    <th>Attendance</th>
                    <th>Percentage</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>DC</td>
                    <td>{stdData.DC}/{dc.DC}</td>
                    <td>{(dc.DC)==0?"-":(stdData.DC/dc.DC)*100+"%"}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>NLP</td>
                    <td>{stdData.NLP}/{nlp.NLP}</td>
                    <td>{(nlp.NLP)==0?"-":(stdData.NLP/nlp.NLP)*100+"%"}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>HMI</td>
                    <td>{stdData.HMI}/{hmi.HMI}</td>
                    <td>{(hmi.HMI)==0?"-":(stdData.HMI/hmi.HMI)*100+"%"}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>PM</td>
                    <td>{stdData.PM}/{pm.PM}</td>
                    <td>{(pm.PM)==0?"--":(stdData.PM/pm.PM)*100+"%"}</td>
                </tr>
            </table>
            </div>
            <div className="piechart">
            <h1 className="name">Virtual Representation</h1>
                {(stdData!=="undefined" && dc!=="undefined" && hmi!=="undefined" && pm!=="undefined" && nlp!=="undefined")?<DoughnutChart studentData={stdData}/>:false}
                
            </div>
        </div>
    );
}

export default User;