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
        CabinDep :"",
        CabinRet:"",
        Cabin:"",
        retFrom : "",
        retTo :"",
        retDate :"",
        retNumber :"",
        retDtime :"",
        retAtime :"",
        retSeats :"",
        TotalPrice :0
        
    }
    this.buttonClick= this.buttonClick.bind(this);
    this.removeSeatsDep= this.removeSeatsDep.bind(this);
    this.removeSeatsRet= this.removeSeatsRet.bind(this);
    }
    componentDidMount(){
        Axios.get("http://localhost:8000/reservationsgetFlights",{
            params:{flightId : this.props.departureId ,bookingId:this.props.BookingId}
         }).then((resp) =>{this.setState({depFrom : resp.data.From,
        depTo :resp.data.To,
         depDate :resp.data.FlightDate,
          depNumber :resp.data.FlightNumber,
         depDtime :resp.data.DepartureTime,
         depAtime :resp.data.ArrivalTime,
          depSeats : ""+this.props.seatsDep,
          Cabin :this.props.Cab,
        CabinDep:this.props.CabDep
       })}).catch((err)=> alert(err));
     
       Axios.get("http://localhost:8000/reservationsgetFlights",{
        params:{flightId : this.props.returnId,bookingId:this.props.BookingId}
     }).then((resp) =>{this.setState({retFrom : resp.data.From,
    retTo :resp.data.To,
     retDate :resp.data.FlightDate,
      retNumber :resp.data.FlightNumber,
     retDtime :resp.data.DepartureTime,
     retAtime :resp.data.ArrivalTime,
      retSeats : ""+this.props.seatsRet,
      CabinRet:this.props.CabRet
   })}).catch((err)=> alert(err));
   
    }
    buttonClick(){
        Axios.post("http://localhost:8000/mailTicket",{
        depFrom : this.state.depFrom,
        depTo :this.state.depTo,
        depDate :this.state.depDate,
        depNumber :this.state.depNumber,
        depDtime :this.state.depDtime,
        depAtime :this.state.depAtime,
        depSeats :this.state.depSeats,
        Cabin :this.state.Cabin,
        retDate :this.state.retDate,
        retNumber :this.state.retNumber,
        retDtime :this.state.retDtime,
        retAtime :this.state.retAtime,
        retSeats :this.state.retSeats,
        TotalPrice :this.props.TotalPrice,
        bookingid:this.props.BookingId
    }).then((resp)=>{console.log(resp.data)});
    
  }

   removeSeatsDep(ev){
    ev.preventDefault();
    const {BookingId,departureId,CabDep,NumSeats} = this.props;
        Axios.put('//localhost:8000/removeSeatsDep',{
            resid: this.props.BookingId
        });
        setTimeout(function() {
            window.location.href = `editseats/${departureId}/${CabDep}/${NumSeats}/${BookingId}/${1}`;
        },400); // run after 500 milliseconds

        
   }

   removeSeatsRet(ev){
    ev.preventDefault();
    const {BookingId,returnId,CabRet,NumSeats} = this.props;
    Axios.put('//localhost:8000/removeSeatsRet',{
        resid: this.props.BookingId
    });
    setTimeout(function() {
        window.location.href = `editseats/${returnId}/${CabRet}/${NumSeats}/${BookingId}/${2}`;
    },400); // run after 500 milliseconds
    
}
   
       
    render()
    {
        const {BookingId,departureId,returnId,Cab,seatsDep,seatsRet,TotalPrice} = this.props;
        

                
             
            
            
    return(
        <div className="main2">
        <div className="sub-main2">
        <div className='dep'>
           <h2> BookingId : {BookingId}</h2>
            <h2>Total Price :{TotalPrice}$</h2>

            </div>
            <div className="flights">
            <div class="departure">
            <h1> Departure</h1> 
            <h2> From: {this.state.depFrom}</h2>
            <h2>To : {this.state.depTo}</h2>
            <h2>Date :{this.state.depDate}</h2>
            <h2>FlightNumber : {this.state.depNumber}</h2>
            <h2>Departure Time :{this.state.depDtime}</h2>
            <h2>Arrival Time: {this.state.depAtime}</h2>
            <h2>Seats : {this.state.depSeats}</h2>
            <h2>Cabin : {this.state.CabinDep}</h2>
           
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`/user/ChangeParent/${BookingId}/${this.props.departureId}/${1}`}  >Change Flight</a>   
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" onClick={this.removeSeatsDep} >ChangeSeat</a>
           
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
            <h2>Cabin : {this.state.CabinRet}</h2>
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`/user/ChangeParent/${BookingId}/${this.props.returnId}/${2}`}  >Change Flight</a>    
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue"  onClick={this.removeSeatsRet}  >ChangeSeat</a>
            
            </div>
            </div>
            <div className='buttons'>
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue"  onClick={(event) =>this.buttonClick()}>Email My Ticket</a>   
             <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`Popup/${BookingId}`} >Cancel</a>

            </div>

            
            </div>

             {/* <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`/user/ChangeParent/${this.state.depTo}`}  >Change Flight</a>    
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`Popup/${BookingId}`} >Cancel</a>
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`pickseats/${BookingId}`} >Pick A Seat</a>
            <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue"   >Email My Ticket</a>     */}

            {/* <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href ={`viewticket/${}`} >View Ticket</a> */}
            {/* <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" onClick={(event) =>this.buttonClick(ObjectId,event)}>Delete</a> */}
          {/* //  <a class ="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" onClick ={() =>{var result = window.confirm("Want to delete?"); */}
          </div>
       
            
       
    )
    }
}
