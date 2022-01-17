
import * as React from 'react';
import './Review.css';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default class Review extends React.Component {

  constructor() {
    super();
    this.state={
    
  }
    this.render = this.render.bind(this);
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


    var priceDep= this.props.cabin === "economy" ? this.props.SelectedFlightDep.PriceEconomy :
    this.props.cabin === "business" ? this.props.SelectedFlightDep.PriceBusiness : this.props.SelectedFlightDep.PriceFirst;
    var priceRet= this.props.cabin === "economy" ? this.props.SelectedFlightRet.PriceEconomy :
    this.props.cabin === "business" ? this.props.SelectedFlightRet.PriceBusiness : this.props.SelectedFlightRet.PriceFirst;


    return(
      <React.Fragment>
          <Typography variant="h6" gutterBottom>
             Review Your Booking
          </Typography>
          

         <Grid container spacing={2}>

         <Grid item xs={12} sm={6}> 
         
           <p className='p1'>
           Departure Flight:
           </p>
         
          </Grid>
        
          <Grid item xs={12} sm={6}> 
          
           <p className='p1'>
           Return Flight:
           </p>
         
          </Grid>

         <Grid item xs={12} sm={6}> 
  
           <p className='p2'>
             Date: {this.props.SelectedFlightDep.FlightDate}
             <br />
             From:  {this.props.SelectedFlightDep.From}
             <br />
             To: {this.props.SelectedFlightDep.To}
             <br />
             Flight Number: {this.props.SelectedFlightDep.FlightNumber}
             <br />
             Departure Time: {this.props.SelectedFlightDep.DepartureTime}
             <br />
             Arrival Time: {this.props.SelectedFlightDep.ArrivalTime}
             <br />
             Flight Duration: {getTimeDiff(this.props.SelectedFlightDep.DepartureTime, this.props.SelectedFlightDep.ArrivalTime)}
             <br />
             Cabin class: {this.props.cabin.charAt(0).toUpperCase() + this.props.cabin.slice(1) + " class"}
             <br />
             Bag Allowance: {(this.props.cabin === "economy" ? 1 : 2) + " x23kg"}
             <br />
             Price: {"$" + priceDep}
             <br />
             </p>
          
          </Grid>

          <Grid item xs={12} sm={6}> 
         
           <p className='p2'>
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
             Cabin class: {this.props.cabin.charAt(0).toUpperCase() + this.props.cabin.slice(1) + " class"}
             <br />
             Bag Allowance: {(this.props.cabin === "economy" ? 1 : 2) + " x23kg"}
             <br />
             Price: {"$" + priceRet}
             <br />
             </p>
         
          </Grid>

          </Grid>

          <p/>
          <List disablePadding>

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Price per person"/>
            <Typography variant="body2">{"$" + (priceDep+priceRet)}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              (x{this.props.numberOfPassengers})
          </Typography>
          </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {"$" + (this.props.numberOfPassengers*(priceDep+priceRet))}
          </Typography>
        </ListItem>

      </List>

       

        
      </React.Fragment>

    );

}
}