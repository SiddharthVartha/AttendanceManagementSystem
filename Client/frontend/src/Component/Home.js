import '../CSS/Home.css';
import '../JS/home.js';
import {useState} from 'react';
const Home=(props)=> {
    const [add,setAdd]=useState("right-panel-active");
    const [user,setUser]=useState({Name:"",Email:"",Password:""});
    const [check,setCheckUser]=useState({Email:"",Password:""});
    const signin=()=>{
            setAdd("");
    }
    const signup=()=>{
            setAdd("right-panel-active");
    }
    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setUser({...user,[name]:value});
    }
    const handleLoginInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setCheckUser({...check,[name]:value});
    }
    const Register=async (e)=>{
        e.preventDefault();
        const {Name,Email,Password}=user;
        const res=await fetch("/register",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({Name,Email,Password})
            });
        const data=await res.json();
        console.log(data);
        if(data.status==422 || data.error=="Plz Fill Data"){
            alert("Pls Fill Data Properly");
        }
        else if(data.status==404 || data.error=="User Already Exist"){
            alert("User Already Exist");
        }
        else{
            console.log("Registered Successfully");
            signin();
        }
    }
    const Login=async (e)=>{
        e.preventDefault();
        const {Email,Password}=check;
        const res=await fetch("/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({Email,Password})
            });
        const data=await res.json();
        if(data.status==422 || data.error=="Plz Fill Data"){
            alert("Pls Fill Data Properly");
        }
        else if(data.status==404 || data.error=="Incorrect Credentials"){
            alert("Incorrect Credentials");
        }
        else{
            if(data.subject){
                props.checkStudentTeacher(data);
            }
            else{
                props.checkStudentTeacher(data);
            }
        }
    }
    return (
        <>
            <div className={add==""?"main":"main right-panel-active"}>
                <div className="form-container sign-in-container">
                    <form method="POST" action="#" className="form" id="login">
                        <h1 className="form__title">Login</h1>
                        <div className="form__input-group">
                            <label htmlFor="EmailLogin">Email: </label>
                            <input type="email" className="form__input" name="Email" id="EmailLogin" onChange={handleLoginInput}  required/>
                        </div>
                        <div className="form__input-group">
                            <label htmlFor="PasswordLogin">Password: </label>
                            <input type="password" className="form__input" name="Password" id="PasswordLogin" onChange={handleLoginInput} required/>
                        </div>
                        <div className="form__input-group">
                            <button type="submit" className="form__button" onClick={Login}>Submit</button>
                        </div>
                    </form>
                </div>
                <div className="form-container sign-up-container">
                    <form method="POST" action="#" className="form" id="register">
                        <h1 className="form__title">Register</h1>
                        <div className="form__input-group">
                            <label htmlFor="NameReg">Name: </label>
                            <input type="text" className="form__input" name="Name" id="NameReg" onChange={handleInput}  required/>
                        </div>
                        <div className="form__input-group">
                            <label htmlFor="EmailReg"> Email: </label>
                            <input type="email" className="form__input" name="Email" id="EmailReg" onChange={handleInput} required/>
                        </div>
                        <div className="form__input-group">
                            <label htmlFor="PasswordReg">Password: </label>
                            <input type="password" className="form__input" name="Password" id="PasswordReg" onChange={handleInput} required/>
                        </div>
                        <button className="form__button" onClick={Register} type="submit" >Submit</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={signin} >Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details</p>
                            <button className="ghost" id="signUp" onClick={signup} >Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;