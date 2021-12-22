import profile from '../user/image/img.png';
import { useEffect } from 'react';
import {useState} from "react";
import './editdata.css';
import axios, * as others from 'axios';
import { useParams } from 'react-router-dom';
import Edit from './Edit';

function Editdata(){
    //const{usere,first}=(useParams());
    let usern=(useParams().username);
    let firstn=(useParams().firstname);
    let lastn=(useParams().lastname);
    let mail=(useParams().email);
    let pass=(useParams().passport);
    const [username,setUsername] = useState("");
    const [firstname,setFirstname]=useState("");
    const[lastname,setLastname]=useState("");
    const[email,setEmail]=useState("");
    const[alt,setAlt]=useState("");
    const[passport,setPassport]=useState("");
    const Edit=()=>{
       
        const user={Username:username,FirstName:firstname,LastName:lastname,Email:email,Passport:passport,Password:null}
        if(passport.length<7&&passport.length>0){
            setAlt("passport should be at least 7 characters");
        }else if(!email.endsWith("@gmail.com")&&email.length!=0){
            setAlt("Email should end with @gmail.com");
        }else{
        axios.put("http://localhost:8000/updateuser",user).then(res=>{
            setAlt(res.data);
        });
    }
     
       }
    return(
        <div className="main">
            <div className="sub-main">
                <div>
                    <div className="imgs" >
                        <div className="container-image">
                        <img src={profile} alt="profile" className="profile"/>
                        </div>
                    </div>
                    <div className="inps">
                    <div className="inp1">
                      <div className="i">  UserName:</div> 
                    <input type="text" placeholder={usern} onChange={(event)=>{setUsername(event.target.value)}}/></div>
                    <div className="inp2">
                    <div className="i">  FirstName:</div> 
                    <input type="text" placeholder={firstn} onChange={(event)=>{setFirstname(event.target.value)}}/> </div>
                    <div className="inp1">
                    <div className="i">  LastName:</div> 
                    <input type="text" placeholder={lastn} onChange={(event)=>{setLastname(event.target.value)}}/></div>
                    <div className="inp1">
                    <div className="i">  Mail:</div> 
                    <input type="text" placeholder={mail} onChange={(event)=>{setEmail(event.target.value)}}/></div>
                    <div className="inp1">
                    <div className="i">PassportNumber:</div> 
                    <input type="text" placeholder={pass} onChange={(event)=>{setPassport(event.target.value)}}/></div>
                    {alt}
                    </div>

            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" onClick={()=>{Edit()}}>EDIT</a>
                </div>
            </div>
        </div>
    )
}
export default Editdata;