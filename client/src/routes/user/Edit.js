import './Edit.css';
import profile from '../user/image/img.png'
import { useEffect } from 'react';
import {useState} from "react";
import axios, * as others from 'axios';
function Edit(){
    const [username,setUsername] = useState("");
    const [firstname,setFirstname]=useState("");
    const[lastname,setLastname]=useState("");
    const[email,setEmail]=useState("");
    const[passport,setPassport]=useState("");
    useEffect(() => {
      axios.get('http://localhost:8000/edit').then(res =>{
          setUsername(res.data.Username);
          setFirstname(res.data.FirstName);         
        setLastname(res.data.LastName);
          setEmail(res.data.Email);
          setPassport(res.data.Passport);

          
      })
    });
    return(
        <div className="main">
            <div className="sub-main">
                <div>
                    <div className="imgs" >
                        <div className="container-image">
                        <img src={profile} alt="profile" className="profile"/>
                        </div>
                    </div>
                    <div className="info">
                   <div className="user"> USERNAME: {username}</div>
                    <div className='first'>FIRSTNAME: {firstname}</div>
                    <div className='last'>LASTNAME: {lastname}</div>
                    <div className='mail'>MAIL: {email}</div>
                    <div className='pass'>PASSPORTNUMBER: {passport}</div>
                    </div>  
                    <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`/user/editdata/${username}/${firstname}/${lastname}/${email}/${passport}`} >EDIT</a>
                </div>
            </div>
        </div>
    )
}
export default Edit;