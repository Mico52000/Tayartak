import { Component } from 'react';
import 'tachyons';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import {useState,useEffect} from "react";



import { Fragment } from 'react';
//import Res from '../Components/user/Res.js';

import  Res from '../../Components/user/Res.js';

function Itinerary(){
           const [departure,setDeparture]= useState("");
           const [returnS,setReturn] = useState("");
           const {bookingId,departureId,returnId,Cab,TotalPrice,departureSeats} = useParams();
          // console.log(departureSeats);
           
        useEffect(()=>{
            Axios.get(`http://localhost:8000/Itinerary/${bookingId}`).then((resp)=>{setDeparture(resp.data[0]);
            setReturn(resp.data[1]);
            
          });
        },[]);
       
     
        return (
          //  <h1>helllo</h1>
          
           
         
            <Fragment>
             <Res BookingId={bookingId} departureId={departureId} returnId ={returnId} Cab ={Cab} seatsDep={departure} seatsRet={returnS} TotalPrice={TotalPrice} />
            </Fragment>
          );
    
    }

    export default Itinerary;
