import React, { Component } from 'react';

//import './Card.css';
import './Res.css';

import Axios from 'axios';

export default class res extends Component{
    constructor({props}){
    super();
    this.state={
        depId :"",
        depFrom : "",
        depTo :"",
        depDate :"",
        depNumber :"",
        depDtime :"",
        depAtime :"",
        depSeats :"",
        Cabin :"",
        retFrom : "",
        retTo :"",
        retDate :"",
        retNumber :"",
        retDtime :"",
        retAtime :"",
        retSeats :"",
        
    }
    
    }
    componentDidMount(){
        Axios.get("http://localhost:8000/reservationsgetFlights",{
            params:{flightId : this.props.departureId}
         }).then((resp) =>{this.setState({depFrom : resp.data.From,
        depTo :resp.data.To,
         depDate :resp.data.FlightDate,
          depNumber :resp.data.FlightNumber,
         depDtime :resp.data.DepartureTime,
         depAtime :resp.data.ArrivalTime,
          depSeats : ""+this.props.seatsDep,
          Cabin :this.props.Cab,
       })}).catch((err)=> alert(err));
     
       Axios.get("http://localhost:8000/reservationsgetFlights",{
        params:{flightId : this.props.returnId}
     }).then((resp) =>{this.setState({retFrom : resp.data.From,
    retTo :resp.data.To,
     retDate :resp.data.FlightDate,
      retNumber :resp.data.FlightNumber,
     retDtime :resp.data.DepartureTime,
     retAtime :resp.data.ArrivalTime,
      retSeats : ""+this.props.seatsRet,
      
   })}).catch((err)=> alert(err));
   
    }
    
   
       
    render()
    {
        const {BookingId,departureId,returnId,Cab,seatsDep,seatsRet} = this.props;
        

                
             
            
            
    return(
          
        <div className=" cardbg tc bg-blue  dib br3 ma2 pa3  shadow-5 w5 ">
            <div class ="book">
            <h2>BookingId : {BookingId}</h2>
            </div>
            <div class="departure">
            <h1> Departure</h1>
            <h2> From: {this.state.depFrom}</h2>
            <h2>To : {this.state.depTo}</h2>
            <h2>Date :{this.state.depDate}</h2>
            <h2>FlightNumber : {this.state.depNumber}</h2>
            <h2>Departure Time :{this.state.depDtime}</h2>
            <h2>Arrival Time: {this.state.depAtime}</h2>
            <h2>Seats : {this.state.depSeats}</h2>
            <h2>Cabin : {this.state.Cabin}</h2>
            </div>
            <div class ="return">
            <h1>Return </h1>
            <h2> From: {this.state.retFrom}</h2>
            <h2>To : {this.state.retTo}</h2>
            <h2>Date :{this.state.retDate}</h2>
            <h2>FlightNumber : {this.state.retNumber}</h2>
            <h2>Departure Time :{this.state.retDtime}</h2>
            <h2>Arrival Time: {this.state.retAtime}</h2>
            <h2>Seats : {this.state.retSeats}</h2>
            <h2>Cabin : {this.state.Cabin}</h2>
            </div>
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`Popup/${BookingId}`} >Cancel</a>
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`pickaseat/${BookingId}`} >Pick A Seat</a>
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`viewticket/${BookingId}`} >View Ticket</a>
            {/* <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" onClick={(event) =>this.buttonClick(ObjectId,event)}>Delete</a> */}
          {/* //  <a class ="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" onClick ={() =>{var result = window.confirm("Want to delete?"); */}

            
        </div>
    )
    }
}
