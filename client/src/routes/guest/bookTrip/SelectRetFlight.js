import * as React from 'react';
import './SelectRetFlight.css';
import Typography from '@mui/material/Typography';
import Card from '../../../Components/user/SelectFlightCard/Card.js';



export default class SelectRetFlight extends React.Component {

  constructor() {
    super();
    this.state = {

    }
    this.render = this.render.bind(this);
  }



  handleClick(index) {

    var arrtemp = this.props.isToggledRet;
    arrtemp[arrtemp.indexOf(true)] = false;
    arrtemp[index] = !arrtemp[index];
    this.props.handleIsToggledRetChange(arrtemp);

    var flighttemp = this.props.returnFlights[index];
    this.props.handleSelectRetChange(flighttemp);
  }


  render() {

    function getTimeDiff(departureTime, arrivalTime) {
      // Extract hours, minutes and seconds
      var partsDep = departureTime.split(':');
      var partsArr = arrivalTime.split(':');

      var depSecs = partsDep[0] * 3600 + partsDep[1] * 60;
      var arrSecs = partsArr[0] * 3600 + partsArr[1] * 60;
      var DiffTime, diffSecs;
      diffSecs = arrSecs - depSecs;
      if (diffSecs < 0) {//this means the arrival date is next day
        diffSecs = (24 * 3600 - depSecs) + arrSecs;
      }
      var temp = Math.floor((diffSecs % 3600) / 60);
      DiffTime = Math.floor(diffSecs / 3600);
      if (temp < 10) {
        DiffTime += ":0"
      } else {
        DiffTime += ":";
      }
      DiffTime += temp;

      return DiffTime;
    }

    //cabin in this.props.cabin is either econonmy/business/first
    const cabin = this.props.cabin;
    const flights = this.props.returnFlights;
    const components = flights.map((flight, i) => {
      return <Card Flightnum={flight.FlightNumber}
        departuret={flight.DepartureTime} arrivalt={flight.ArrivalTime} tripDuration={getTimeDiff(flight.DepartureTime, flight.ArrivalTime)}
        price={cabin === "economy" ? flight.PriceEconomy : cabin === "business" ? flight.PriceBusiness : flight.PriceFirst}
        index={i}
        isToggled={this.props.isToggledRet[i]}
        handleClick={this.handleClick.bind(this)}
      />
    });




    return (
      <React.Fragment>

        <Typography variant="h6" gutterBottom>
          Select Return Flight
        </Typography>

        <p className='center'>From {this.props.from} to {this.props.to} <br />
          on {this.props.returnDate}</p>

        <br />

        {flights.length === 0 ? "No Flights Available, please change search criteria" : (

          <div className="cardList">
            {components}
          </div>
        )}


        {this.props.SelectedFlightRet != null ? (
          <React.Fragment>

            <Typography variant="h6" gutterBottom>
              <br />
              Selected Flight Details:
            </Typography>

            <Typography variant="p" gutterBottom>
              Date: {this.props.SelectedFlightRet.FlightDate}
              <br />
              From:  {this.props.SelectedFlightRet.From}
              <br />
              To: {this.props.SelectedFlightRet.To}
              <br />
              Flight Number: {this.props.SelectedFlightRet.FlightNumber}
              <br />
              Departure Time: {this.props.SelectedFlightRet.DepartureTime}
              <br />
              Arrival Time: {this.props.SelectedFlightRet.ArrivalTime}
              <br />
              Flight Duration: {getTimeDiff(this.props.SelectedFlightRet.DepartureTime, this.props.SelectedFlightRet.ArrivalTime)}
              <br />
              Cabin class: {cabin.charAt(0).toUpperCase() + cabin.slice(1) + " class"}
              <br />
              Bag Allowance: {(cabin === "economy" ? 1 : 2) + " x23kg"}
              <br />
              Price: {"$" + (cabin === "economy" ? this.props.SelectedFlightRet.PriceEconomy :
                cabin === "business" ? this.props.SelectedFlightRet.PriceBusiness : this.props.SelectedFlightRet.PriceFirst)}
              <br />
            </Typography>
          </React.Fragment>
        ) : ""}

      </React.Fragment>
    )
  }

}

