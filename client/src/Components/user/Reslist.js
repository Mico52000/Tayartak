import React, { Component, Fragment } from 'react'
import  Res from './Res';


export default class ResList extends Component{
    
    render(){
        const {bookings} = this.props;
        
        const components = bookings.map((booking,i) => {
            return <Res BookingId={booking._id} departureId ={booking.DepFlight}  returnId={booking.RetFlight} Cab ={booking.Cabin} NumSeats={booking.NumSeats}
            seatsDep ={booking.SeatsDep} seatsRet ={booking.SeatsRet} TotalPrice ={booking.TotalPrice} CabDep ={booking.CabinDep} CabRet={booking.CabinRet}
             />});
            
            
            
        return(
         
            <Fragment>{components}</Fragment>
        )
    }
}