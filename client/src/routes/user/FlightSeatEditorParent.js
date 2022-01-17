

import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import FlightSeatEditor from "./FlighSeatEditor.js";

function FlightSeatEditorParent() {
    const { FlightID , CabinClass,NumSeats,BookingNumber, isDeparture} = useParams();

  
  return (
      <Fragment>
          
          <FlightSeatEditor FlightID ={FlightID } CabinClass ={CabinClass} NumSeats = {NumSeats} isDeparture= {isDeparture}BookingNumber = {BookingNumber}/>
      </Fragment>
   
    );
   
    
  }
    



export default FlightSeatEditorParent;