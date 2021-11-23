import React, { Component, Fragment } from 'react'
import  Card from './Card.js';


export default class CardList extends Component{
    
    render(){
        const {flights} = this.props;
        const components = flights.map((flight,i) => {
            return <Card From={flight.From} To ={flight.To}  Date={flight.FlightDate} Flightnum={flight.FlightNumber} ecoseats ={flight.NumberOfEconomySeats}
             bisseats = {flight.NumberOfBusinessSeats} firstseats = {flight.NumberOfFirstSeats} arrivalt = {flight.ArrivalTime} departuret = {flight.DepartureTime}
             />});
            
            
            
        return(
           
            <Fragment>{components}</Fragment>
        )
    }
}