import * as React from 'react';
import Axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TripForm from './TripForm.js';
import DepartureFlightSelect from './SelectDepFlight.js';
import ReturnFlightSelect from './SelectRetFlight.js';
import Review from './Review.js';

const steps = ['Trip Details', 'Departure Flight', 'Return Flight', 'Review'];



const theme = createTheme();


export default class BookTrip extends React.Component {

  constructor() {
    super();
    this.state = {

      activeStep: 0,

      //TripForm search criteria
      from: "",
      to: "",
      departureDate: "",
      returnDate: "",
      numberOfPassengers: "",
      cabin: "",
      //
      departureFlights: [],
      returnFlights: [],
      //


      isToggledDep: [false],
      isToggledRet: [false],
      SelectedFlightDep: null,
      SelectedFlightRet: null,



    }

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.render = this.render.bind(this);
  }


  //TripForm
  handleFromChange(event) {
    this.setState({ from: event.target.value })
  };

  handleToChange(event) {
    this.setState({ to: event.target.value })
  };

  handleDepartureDateChange(event) {
    this.setState({ departureDate: event.target.value })
  };

  handleReturnDateChange(event) {
    this.setState({ returnDate: event.target.value })
  };

  handleNumberOfPassengersChange(event) {
    this.setState({ numberOfPassengers: event.target.value })
  };

  handleCabinChange(event) {
    this.setState({ cabin: event.target.value })
  };
  //
  //selecting flights
  handleSelectDepChange(flight){
    this.setState({SelectedFlightDep: flight})
  }
  handleSelectRetChange(flight){
    this.setState({SelectedFlightRet: flight})
  }
  handleIsToggledDepChange(array){
    this.setState({isToggledDep:array})
  }
  handleIsToggledRetChange(array){
    this.setState({isToggledRet:array})
  }

  searchTripDep(){

    Axios.get("http://localhost:8000/searchTrip",{
      params: {from: this.state.from, to: this.state.to, departureDate:this.state.departureDate,
      numberOfPassengers:this.state.numberOfPassengers, cabin:this.state.cabin}
    }).then((resp)=>{this.setState({departureFlights : resp.data})}).catch((err)=> alert(err));
   
  }

  searchTripRet(){

    Axios.get("http://localhost:8000/searchTrip",{
      params: {from: this.state.to, to: this.state.from, departureDate:this.state.returnDate,
      numberOfPassengers:this.state.numberOfPassengers, cabin:this.state.cabin}
    }).then((resp)=>{this.setState({returnFlights : resp.data})}).catch((err)=> alert(err));
    

  }


  confirmReservation(){
    Axios.post("http://localhost:8000/confirmReservation",{
      
        userId:"61bff21874e339983be37a00",
        selectedFlightIDDep: this.state.SelectedFlightDep._id,
        selectedFlightIDRet: this.state.SelectedFlightRet._id,
        numberOfPassengers: this.state.numberOfPassengers,
        cabin: this.state.cabin,
        totalPrice:this.state.numberOfPassengers*(this.state.cabin=== "economy"? this.state.SelectedFlightDep.PriceEconomy +
        this.state.SelectedFlightRet.PriceEconomy: this.state.cabin==="business"? this.state.SelectedFlightDep.PriceBusiness +
        this.state.SelectedFlightRet.PriceBusiness: this.state.SelectedFlightDep.PriceFirst +
        this.state.SelectedFlightRet.PriceFirst
        ) ,
      
    }).then((resp)=>{console.log(resp.data)});
    
  }


  handleNext(e) {
    e.preventDefault();
    if(this.state.activeStep===0){
     this.searchTripDep();
    }else if(this.state.activeStep===1){
      this.searchTripRet();
    }else if(this.state.activeStep==3){
      this.confirmReservation();
    }
    this.setState({ activeStep: this.state.activeStep + 1 })
  };
  handleBack() {
    if(this.state.activeStep===1){
      this.setState({
        isToggledDep: [false],
        isToggledRet: [false],
        SelectedFlightDep: null,
        SelectedFlightRet: null,
      })
     
    }
    this.setState({ activeStep: this.state.activeStep - 1 })
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return <TripForm
          from={this.state.from} handleFromChange={this.handleFromChange.bind(this)}
          to={this.state.to} handleToChange={this.handleToChange.bind(this)}
          departureDate={this.state.departureDate} handleDepartureDateChange={this.handleDepartureDateChange.bind(this)}
          returnDate={this.state.returnDate} handleReturnDateChange={this.handleReturnDateChange.bind(this)}
          numberOfPassengers={this.state.numberOfPassengers} handleNumberOfPassengersChange={this.handleNumberOfPassengersChange.bind(this)}
          cabin={this.state.cabin} handleCabinChange={this.handleCabinChange.bind(this)} />;
      case 1:
        return <DepartureFlightSelect
        departureFlights ={this.state.departureFlights}
        isToggledDep={this.state.isToggledDep}
        handleIsToggledDepChange={this.handleIsToggledDepChange.bind(this)}
        handleSelectDepChange={this.handleSelectDepChange.bind(this)}
        SelectedFlightDep= {this.state.SelectedFlightDep}
        departureDate= {this.state.departureDate}
        from = {this.state.from}
        to = {this.state.to}
        cabin= {this.state.cabin}
         />;
      case 2:
        return <ReturnFlightSelect
        returnFlights ={this.state.returnFlights}
        isToggledRet={this.state.isToggledRet}
        handleIsToggledRetChange={this.handleIsToggledRetChange.bind(this)}
        handleSelectRetChange={this.handleSelectRetChange.bind(this)}
        SelectedFlightRet= {this.state.SelectedFlightRet}
        returnDate= {this.state.returnDate}
        from = {this.state.to}
        to = {this.state.from}
        cabin= {this.state.cabin}
        />;
      case 3:
        return <Review 
        SelectedFlightDep= {this.state.SelectedFlightDep}
        SelectedFlightRet= {this.state.SelectedFlightRet}
        cabin= {this.state.cabin}
        numberOfPassengers= {this.state.numberOfPassengers}
        />;
      default:
        throw new Error('Unknown step');
    }
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />


        <Container component="main" maxWidth="sm" sx={{ mb: 4, minWidth: 700 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

            <Typography component="h1" variant="h4" align="center">
              Book Your Flight!
            </Typography>

            <Stepper activeStep={this.state.activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <React.Fragment>
              {this.state.activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for choosing Tayartak Airlines.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your trip has been booked.
                    Click here to choose your seats:
                  </Typography>
                  <a class="link dim white dib mr3" href="/user/reservations" title="reservations">My Reservations</a>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(this.state.activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {this.state.activeStep !== 0 && (
                      <Button onClick={this.handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={this.handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {this.state.activeStep === steps.length - 1 ? 'Confirm Reservation' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>

          </Paper>

        </Container>
      </ThemeProvider>
    );
  }
}
