import React, { Component, Fragment } from 'react'
import  Res from './Res';


export default class ResList extends Component{
    
    render(){
        const {bookings} = this.props;
        
        const components = bookings.map((booking,i) => {
            return <Res BookingId={booking._id} departureId ={booking.DepFlight}  returnId={booking.RetFlight} Cab ={booking.Cabin} 
            seatsDep ={booking.SeatsDep} seatsRet ={booking.SeatsRet}
             />});
            
            
            
        return(
         
            <Fragment>{components}</Fragment>
        )
    }
}