import * as React from 'react';
import './bookTrip/SelectDepFlight.css';
import Typography from '@mui/material/Typography';
import Card from '../../Components/user/SelectFlightCard/Card.js';
export default class EditDepFlight extends React.Component {

  constructor() {
    super();
    this.state={

  }
    this.render = this.render.bind(this);
  }

  

  handleClick(index){

    var arrtemp = this.props.isToggledDep;
    arrtemp[arrtemp.indexOf(true)] = false;
    arrtemp[index]= !arrtemp[index];
    this.props.handleIsToggledDepChange(arrtemp);

    var flighttemp = this.props.departureFlights[index];
    this.props.handleSelectDepChange(flighttemp);
   
  }
  

  render() {

    function getTimeDiff(departureTime,arrivalTime) {
      // Extract hours, minutes and seconds
      var partsDep = departureTime.split(':');
      var partsArr = arrivalTime.split(':');
      
      var depSecs= partsDep[0]*3600 + partsDep[1]*60;
      var arrSecs=partsArr[0]*3600 + partsArr[1]*60;
      var DiffTime,diffSecs;
      diffSecs = arrSecs-depSecs;
      if(diffSecs<0){//this means the arrival date is next day
        diffSecs = (24*3600 - depSecs) +arrSecs;
      }
      var temp=Math.floor((diffSecs % 3600) / 60);
      DiffTime = Math.floor(diffSecs / 3600);
      if(temp<10){
        DiffTime+= ":0"
      }else{
        DiffTime+=":";
      }
      DiffTime+=temp;

      return DiffTime;
    }
    //cabin in this.props.cabin is either econonmy/business/first
    const cabin = this.props.cabin;
    const flights = this.props.departureFlights;
    const components = flights.map((flight, i) => {
      return <Card 
      num={this.props.num}
       Flightnum={flight.FlightNumber} 
        departuret={flight.DepartureTime} arrivalt={flight.ArrivalTime} tripDuration={getTimeDiff(flight.DepartureTime,flight.ArrivalTime)}
        price={cabin=="economy"? flight.PriceEconomy: cabin=="business"? flight.PriceBusiness: flight.PriceFirst}
        index={i}
        isToggled={this.props.isToggledDep[i]}
        handleClick={this.handleClick.bind(this)}  
      />
    });

    

    
    return (
      <React.Fragment>
        
         <Typography variant="h6" gutterBottom>
          Select Departure Flight 
        </Typography>       
      

        {/* <p className='center'>From {this.props.from} to {this.props.to} <br/>
         on {this.props.returnDate}</p> */}

        {/* <Grid container spacing={4}  >


          <Grid item xs={12} sm={12}>
            
         
              <React.Fragment> */}
              <div className="cardList">
                {components}
              </div>
              {/* </React.Fragment> */}
              {flights.length === 0 ? "No Flights Available, please change search criteria" : ""}
          {/* </Grid> */}

        {/* </Grid> */}

        
        {this.props.SelectedFlightDep!=null? (
          <React.Fragment>
       
        <Typography variant="h6" gutterBottom>
          <br/>
          Selected Flight Details: 
        </Typography>
   
        <Typography variant="p" gutterBottom>
          Date: {this.props.SelectedFlightDep.FlightDate}
          <br/>
          From:  {this.props.SelectedFlightDep.From}
          <br/>
          To: {this.props.SelectedFlightDep.To}
          <br/>
          Flight Number: {this.props.SelectedFlightDep.FlightNumber}
          <br/>
          Departure Time: {this.props.SelectedFlightDep.DepartureTime}
          <br/>
          Arrival Time: {this.props.SelectedFlightDep.ArrivalTime}
          <br/>
          Flight Duration: {getTimeDiff(this.props.SelectedFlightDep.DepartureTime,this.props.SelectedFlightDep.ArrivalTime)}
          <br/>
          Cabin class: {cabin.charAt(0).toUpperCase() + cabin.slice(1) + " class"} 
          <br/>
          Bag Allowance: {(cabin==="Economy"?1:2)+ " x23kg"}
          <br/>
          Price Diff: {"$"+(cabin==="economy"? this.props.SelectedFlightDep.PriceEconomy-this.props.depprice :
           cabin==="business"? this.props.SelectedFlightDep.PriceBusiness-this.props.depprice: this.props.SelectedFlightDep.PriceFirst-this.props.depprice)}
          <br/>
        </Typography>
        </React.Fragment>
        ) :""}

      </React.Fragment>
    )
  }

}
