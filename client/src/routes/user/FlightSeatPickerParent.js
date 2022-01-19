

import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import FlightSeatPicker from "./FlightSeatPicker";


function FlightSeatPickerParent() {
    const { booking,sessionId } = useParams();

  
  return (
      <Fragment>
          
          <FlightSeatPicker bookingNumber = {booking} sessionIden ={sessionId}/>
      </Fragment>
   
    );
   
    
  }
    



export default FlightSeatPickerParent;