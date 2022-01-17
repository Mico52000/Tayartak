import React from 'react'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import {useState,useEffect} from "react";
function Popup(){
    const{id}=useParams();
    const [from,setFrom]=useState("");
    console.log(id);
    const[flag,setFlag]=useState(true);
    const cancelres=(id)=>{
        console.log(id);
        const res = {
            resid :id
        }
        Axios.put(`http://localhost:8000/removeSeats`,res);


         Axios.delete(`http://localhost:8000/deleteres/${id}`);
         
         setFlag(false);
    }
    return(flag)?(
        <div className="modalBackground">
            <div className="modalContainer">
                {/* <div className="titleCloseBtn">
                <button>X</button>
                </div> */}
                <div className="title">
                    <h1>Are you sure you want to Cancel your reservation?</h1>
                </div>
                <div className="footer">
                <button className="close-btn" onClick={()=>{cancelres(id)}}>Yes</button>
                <button className="close-btn" href="/user/reservations">No  </button>
                </div>
            </div>

        </div>
    ):"Your Reservation has been cancelled";
}
export default Popup;