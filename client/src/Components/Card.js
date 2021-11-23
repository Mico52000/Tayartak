import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component{
    
    render()
    {
        const {From,To,Date,Flightnum,ecoseats,bisseats,firstseats,arrivalt,departuret} = this.props
    return(

        <div className=" cardbg tc bg-blue  dib br3 ma2 pa3 grow shadow-5 w5 ">
            
            <h3>From : {From}</h3>
            <h3>To : {To}</h3>
            <h3>Flight Date : {Date}</h3>
            <h3>Flight Number :{Flightnum}</h3>
            <h3> Economy class seats available : {ecoseats}</h3>
            <h3>Business class seats available : {bisseats}</h3>
            <h3>  First class seats available : {firstseats}</h3>
            <h2>Departure : {departuret}</h2>
            <h2>Arrival : {arrivalt}</h2>
            
            
        </div>
    )
    }
}

