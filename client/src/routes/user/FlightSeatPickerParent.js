

import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import FlightSeatPicker from "./FlightSeatPicker";


function FlightSeatPickerParent() {
    const { booking } = useParams();

  
  return (
      <Fragment>
          
          <FlightSeatPicker bookingNumber = {booking}/>
      </Fragment>
   
    );
   
    
  }
    



export default FlightSeatPickerParent;