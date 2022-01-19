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

function EditSuccess() {
  let params = new URLSearchParams(window.location.search);
  const session_id = params.get('session_id');
  
  const [BookingNumber,setBId]=useState();
  const [NumSeats,setNumSeats] = useState();
  const [FlightID,setFId] = useState();
  const [CabinClass,setCabin] = useState();
  const [isDeparture,setDetect] = useState();
  
     useEffect(()=>{
       Axios.get(`http://localhost:8000/session/${session_id}`).then((resp)=>{
      
        setBId(resp.data.metadata.booking);
        setNumSeats(resp.data.metadata.NumberOfSeats);
        setFId(resp.data.metadata.FlightId);
        setCabin(resp.data.metadata.Cabin);
        setDetect(resp.data.metadata.detect);
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
<a href ={`editseats/${FlightID}/${CabinClass}/${NumSeats}/${BookingNumber}/${isDeparture}`} title="reservations">Click here to pick your seats</a>
</React.Fragment>
 </Paper>
 </Container>
 </ThemeProvider>
        )
}

export default EditSuccess;