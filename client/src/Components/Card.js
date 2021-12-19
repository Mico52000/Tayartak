import React, { Component } from 'react';

import './Card.css';

import Axios from 'axios';

export default class Card extends Component{
    constructor(){
    super();
    this.state={

    }
    this.buttonClick= this.buttonClick.bind(this);
    this.render= this.render.bind(this);
    }
    
    buttonClick(Id){
        // Axios.post("http://localhost:8000/insert",this.state).then(()=>alert('success')).catch((err) => alert(err));
        
        var result = window.confirm("Are you sure you want to delete this flight?");
         if (result) {
        Axios.delete(`http://localhost:8000/delete/${Id}`
        );
        window.location.reload(false);
        console.log(Id);
    
      }
    }
       
    render()
    {
        const {ObjectId,From,To,Date,Flightnum,ecoseats,bisseats,firstseats,arrivalt,departuret} = this.props
    return(
          
      
        <div className=" cardbg tc bg-blue  dib br3 ma2 pa3  shadow-5 w5 ">
            
            <h3>From : {From}</h3>
            <h3>To : {To}</h3>
            <h3>Flight Date : {Date}</h3>
            <h3>Flight Number :{Flightnum}</h3>
            <h3> Economy class seats available : {ecoseats}</h3>
            <h3>Business class seats available : {bisseats}</h3>
            <h3>  First class seats available : {firstseats}</h3>
            <h2>Departure : {departuret}</h2>
            <h2>Arrival : {arrivalt}</h2>
            
            <a class=" f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue " href ={`/update/${ObjectId}`} >Update</a>        
            <a class=" f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue " onClick={(event) =>this.buttonClick(ObjectId,event)}>Delete</a>
            
          {/* //  <a class ="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" onClick ={() =>{var result = window.confirm("Want to delete?"); */}
{/* if (result) {
    //Logic to delete the item
    // console.log("hello");
    // console.log(From)
    // console.log({ObjectId});
     var stringId = ObjectId.toString();
    // console.log(stringId);
    // console.log(typeof stringId);
    this.deleteFlight({stringId}
        )}
    }
}> Delete  </a>  */}

            
              
            
        </div>
       
    )
    }
}
