import * as React from 'react';
import Axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams} from 'react-router-dom';
import {useState,useEffect} from "react";

const theme = createTheme();

function Success() {
  let params = new URLSearchParams(window.location.search);
  const session_id = params.get('session_id');
  console.log(session_id);
  const [bookingId,setId]=useState();
      
    
     useEffect(()=>{
       Axios.get(`http://localhost:8000/session/${session_id}`).then((resp)=>{
        //  console.log(resp.data);
        //  setSession(resp.data);
        console.log(resp.data);
         Axios.post("http://localhost:8000/confirmReservation",{
      
             userId: resp.data.metadata.userId,
             depFrom : resp.data.metadata.DepFrom,
             depTo : resp.data.metadata.DepTo,
             depFlightNumber : resp.data.metadata.DepFlightNumber,
             depDate : resp.data.metadata.DepDate,
             depDTime : resp.data.metadata.DepDTime,
             depATime : resp.data.metadata.DepATime,
             selectedFlightIDDep: resp.data.metadata.DepId,
             selectedFlightIDRet: resp.data.metadata.RetId,
             numberOfPassengers: resp.data.metadata.NumSeats,
             cabin: resp.data.metadata.Cabin,
             retFlightNumber : resp.data.metadata.RetFlightNumber,
             retDate : resp.data.metadata.RetDate,
             retDTime : resp.data.metadata.RetDTime,
             retATime : resp.data.metadata.RetATime,
             totalPrice:resp.data.metadata.TotalPrice
             }).then((resp)=>{
               setId(resp.data)
                    });
        
    
       });
      },[]);
      return (
          <ThemeProvider theme={theme}>
            <CssBaseline />
    
    
            <Container component="main" maxWidth="sm" sx={{ mb: 4, minWidth: 700 }}>
              <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
<React.Fragment>
<Typography variant="h5" gutterBottom>
  Thank you for choosing Tayartak Airlines.
</Typography>
<Typography variant="subtitle1">
  Your trip has been booked.
</Typography>
<a href ={`pickseats/${bookingId}/${session_id}`} title="reservations">Click here to pick your seats</a>
</React.Fragment>
 </Paper>
 </Container>
 </ThemeProvider>
        )
}

export default Success;