import React, { Component, Fragment } from 'react'
import  T from './T';


export default class TList extends Component{
    
    render(){
        const {bookings} = this.props;
        var array =[];
        array.push(bookings);
        console.log(array);
        const components = array.map((booking,i) => {
            console.log(booking._id);
            return <T BookingId={booking._id} departureId ={booking.DepFlight}  returnId={booking.RetFlight} Cab ={booking.Cabin} 
            seatsDep ={booking.SeatsDep} seatsRet ={booking.SeatsRet}
             />});
            
            
            
        return(
           
            <Fragment>{components}</Fragment>
        )
    }
}