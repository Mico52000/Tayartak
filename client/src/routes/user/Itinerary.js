import { Component } from 'react';
import 'tachyons';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import {useState,useEffect} from "react";
// import ITDept from '../Components/ITDept.js';
// import ITRet from '../Components/ITRet';
import Ticket from '../../Components/user/ticket';
import Button from '@mui/material/Button';
//import './Summary.css'
//import CardListUser from '../Components/CardListUser.js';
import { Fragment } from 'react';
//import ResList from '../Components/Reslist.js'
//import ticket from '../Components/ticket.js';
//import ticket from '../../Components/user/ticket';
function Itinerary(){

        const  {BookingId} = useParams();
        const Book = BookingId;
        //const userId = "61bff21874e339983be37a00"
        console.log(BookingId);
       
        

        return (
            <Fragment>
            <Ticket Id={Book} />
            </Fragment>
          );
    
    }

    export default Itinerary;
