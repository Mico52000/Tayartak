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
import ChangeSearch from './ChangeSearch'
//import TripForm from './bookTrip/TripForm.js'
import EditDepFlight from './EditDepFlight.js'
import EditRetFlight from './EditRetFlight.js'
// import ReturnFlightSelect from './SelectRetFlight.js';
 import ReviewChange from './ReviewChange.js'
const steps = ['Search for Flight', 'Choose Flight', 'Review'];
const theme = createTheme();
export default class ChangeBooking extends React.Component {

  constructor() {
    super();
    this.state = {

      activeStep: 0,
        
      //TripForm search criteria
     
      departureDate: "",
      cabin: "",
      textt:"",
      //
      departureFlights: [],
      returnFlights: [],
      //
    text:"",

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
//   handleFromChange(event) {
//     this.setState({ from: event.target.value })
//   };

//   handleToChange(event) {
//     this.setState({ to: event.target.value })
//   };
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
    this.setState({textt:""})
  }
  handleSelectRetChange(flight){
    this.setState({SelectedFlightRet: flight})
    this.setState({text:""})
  }
  handleIsToggledDepChange(array){
    this.setState({isToggledDep:array})
    this.setState({text:""})
  }
  handleIsToggledRetChange(array){
    this.setState({isToggledRet:array})
    this.setState({text:""})
  }
  searchTripDep(){
    Axios.get("http://localhost:8000/searchTrip",{
      params: {from: this.props.From, to: this.props.To, departureDate:this.state.departureDate,
      numberOfPassengers:this.props.Numseats, cabin:this.state.cabin,return:this.props.Ret}
    }).then((resp)=>{this.setState({departureFlights : resp.data})}).catch((err)=> alert(err));
  }
  searchTripRet(){
    Axios.get("http://localhost:8000/searchTrip",{
      params: {from: this.props.From, to: this.props.To, departureDate:this.state.returnDate,
      numberOfPassengers:this.props.Numseats, cabin:this.state.cabin}
    }).then((resp)=>{this.setState({returnFlights : resp.data})}).catch((err)=> alert(err));
    
  }

  changeReservation(){
      if(this.props.num=='1'){
    Axios.post("http://localhost:8000/changeReservation",{
        bookingId:this.props.bookingNumber,
        Numseats: this.props.Numseats,
        oldprice:this.props.price,
        prevPage:window.location.href,
        newFlightID: this.state.SelectedFlightDep._id,
        oldFlightID:this.props.oldId,
        IdNotChanged:this.props.notChanged,
        num:this.props.num,
        oldCabin:this.props.oldcabinret,
        oldCabinChanged:this.props.oldcabindep,
        newCabin: (this.state.cabin=="economy"?"economy":this.state.cabin=="business"?"business":"first"),
        TotalPrice:(this.state.cabin=== "economy"? ((this.state.SelectedFlightDep.PriceEconomy+this.props.retprice)*this.props.Numseats)-this.props.price: this.state.cabin==="business"? 
        ((this.state.SelectedFlightDep.PriceBusiness+this.props.retprice)*this.props.Numseats)-this.props.price:((this.state.SelectedFlightDep.PriceFirst+this.props.retprice)*this.props.Numseats)-this.props.price)
    }).then((resp)=>{window.location = resp.data});
  }else{
    Axios.post("http://localhost:8000/changeReservation",{
        bookingId:this.props.bookingNumber,
        Numseats: this.props.Numseats,
        prevPage:window.location.href,
        oldprice:this.props.price,
        newFlightID: this.state.SelectedFlightRet._id,
        oldFlightID:this.props.oldId,
        IdNotChanged:this.props.notChanged,
        num:this.props.num,
        oldCabin:this.props.oldcabindep,
        oldCabinChanged:this.props.oldcabinret,
        newCabin: (this.state.cabin=="economy"?"economy":this.state.cabin=="business"?"business":"first"),
        TotalPrice:(this.state.cabin=== "economy"? ((this.state.SelectedFlightRet.PriceEconomy+this.props.depprice)*this.props.Numseats)-this.props.price : this.state.cabin==="business"? 
        ((this.state.SelectedFlightRet.PriceBusiness+this.props.depprice)*this.props.Numseats)-this.props.price: ((this.state.SelectedFlightRet.PriceFirst+this.props.depprice)*this.props.Numseats-this.props.price))
    }).then((resp)=>{window.location = resp.data});
  }
  }
  handleNext(e) {
    e.preventDefault();
    if(this.state.activeStep===0){
        if(this.props.num=='1'){
            if(this.state.departureDate==""||this.state.cabin==""){
                this.setState({textt:"Please Enter Needed Data"})
            }else{
            this.setState({textt:""})
            this.searchTripDep();
            this.setState({ activeStep: this.state.activeStep + 1 })
            }
        }else{
            if(this.state.returnDate==""||this.state.cabin==""){
                this.setState({textt:"Please Enter Needed Data"})
            }else{
                this.setState({textt:""})
                this.searchTripRet();
                this.setState({ activeStep: this.state.activeStep + 1 })
            }
        }
     
    }else if(this.state.activeStep==2){
      this.changeReservation();
      this.setState({textt:""});
      this.setState({ activeStep: this.state.activeStep + 1 })
    }else if(this.state.activeStep==1){
        // if(this.state.departureFlights==[]&&this.state.returnFlights==[]){
        // }
        if(this.state.SelectedFlightDep==null&&this.state.SelectedFlightRet==null){
            this.setState({textt:"A Flight should be Selected"})
        }else{
        this.setState({ activeStep: this.state.activeStep + 1 })
        this.setState({textt:""});
        }
    }
    // this.setState({ activeStep: this.state.activeStep + 1 })
  };
  handleBack() {
    if(this.state.activeStep===1){
      this.setState({
        isToggledDep: [false],
        isToggledRet: [false],
        SelectedFlightDep: null,
        SelectedFlightRet: null,
        textt:""
      })
     
    }
    this.setState({ activeStep: this.state.activeStep - 1 })
    this.setState({textt:""})
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return (this.props.num==1)?
        <ChangeSearch
          from={this.props.From} 
          to={this.props.To} 
          departureDate={this.state.departureDate} handleDepartureDateChange={this.handleDepartureDateChange.bind(this)}
          returnDate={this.props.Ret} 
          numberOfPassengers={this.props.Numseats}
          cabin={this.state.cabin} handleCabinChange={this.handleCabinChange.bind(this)} 
          num={this.props.num}/>: 
          <ChangeSearch
          from={this.props.From} 
          to={this.props.To} 
          departureDate={this.props.Dep} 
          returnDate={this.state.returnDate} handleReturnDateChange={this.handleReturnDateChange.bind(this)}
          numberOfPassengers={this.props.Numseats}
          cabin={this.state.cabin} handleCabinChange={this.handleCabinChange.bind(this)} 
          num={this.props.num}/>
      case 1:
        return (this.props.num=='1')? <EditDepFlight
        departureFlights ={this.state.departureFlights}
        isToggledDep={this.state.isToggledDep}
        handleIsToggledDepChange={this.handleIsToggledDepChange.bind(this)}
        handleSelectDepChange={this.handleSelectDepChange.bind(this)}
        SelectedFlightDep= {this.state.SelectedFlightDep}
        departureDate= {this.state.departureDate}
        from = {this.state.From}
        to = {this.state.To}
        cabin= {this.state.cabin}
        Price={this.props.price}
        Ret={this.props.Ret}
        Retnum={this.props.Retnum}
        ArrTime={this.props.Retarr}
        DepTime={this.props.Retdep}
        Cabin={this.props.oldcabindep}
        depprice={this.props.depprice}
        retprice={this.props.retprice}
        num={this.props.num}
         />:<EditRetFlight
       
         isToggledRet={this.state.isToggledRet}
         returnFlights ={this.state.returnFlights}
         handleIsToggledRetChange={this.handleIsToggledRetChange.bind(this)}
         handleSelectRetChange={this.handleSelectRetChange.bind(this)}
         SelectedFlightRet= {this.state.SelectedFlightRet}
         returnDate= {this.state.returnDate}
         from = {this.state.From}
         to = {this.state.To}
         cabin= {this.state.cabin}
         Price={this.props.price}
         Dep={this.props.Dep}
         Depnum={this.props.Depnum}
         ArrTime={this.props.Deparr}
         DepTime={this.props.Depdep}
         Cabin={this.props.oldcabinret}
         depprice={this.props.depprice}
         retprice={this.props.retprice}
         num={this.props.num}/>
    //   case 2:
    //     return <ReturnFlightSelect
    //     returnFlights ={this.state.returnFlights}
    //     isToggledRet={this.state.isToggledRet}
    //     handleIsToggledRetChange={this.handleIsToggledRetChange.bind(this)}
    //     handleSelectRetChange={this.handleSelectRetChange.bind(this)}
    //     SelectedFlightRet= {this.state.SelectedFlightRet}
    //     returnDate= {this.state.returnDate}
    //     from = {this.state.to}
    //     to = {this.state.from}
    //     cabin= {this.state.cabin}
    //     />;
      case 2:
        return (this.props.num=='1')?
        <ReviewChange
        SelectedFlightDep= {this.state.SelectedFlightDep}
        SelectedFlightRet= {this.state.SelectedFlightRet}
        cabin= {this.state.cabin}
        numberOfPassengers= {this.props.Numseats}
        Price={this.props.price}
        Ret={this.props.Ret}
        Retnum={this.props.Retnum}
        ArrTime={this.props.Retarr}
        DepTime={this.props.Retdep}
        Cabin={this.props.oldcabinret}
        depprice={this.props.depprice}
        retprice={this.props.retprice}
        num={this.props.num}
        />: <ReviewChange
        SelectedFlightRet={this.state.SelectedFlightRet}
        cabin={this.state.cabin}
        numberOfPassengers={this.props.Numseats}
        Price={this.props.price}
        Dep={this.props.Dep}
        Depnum={this.props.Depnum}
        ArrTime={this.props.Deparr}
        DepTime={this.props.Depdep}
        Cabin={this.props.oldcabindep}
        depprice={this.props.depprice}
        retprice={this.props.retprice}
        num={this.props.num}
        // <ChangeBooking bookingNumber = {BookingId} flighId={Id} From={from} To={to} Numseats={numseats} price={price} Dep={dep} Depnum={depnum} Deparr={deparr} Depdep={depdept} cab={oldcabin} depprice={depprice}  retprice={retprice} num={num}/>

        />
      default:
        throw new Error('Unknown step');
    }
  };

  render() {
    return(this.props.num=='1')?(
      <ThemeProvider theme={theme}>
        <CssBaseline />


        <Container component="main" maxWidth="sm" sx={{ mb: 4, minWidth: 700 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

            <Typography component="h1" variant="h4" align="center">
              {this.props.text}
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
                    Thank you for choosing Tayartak Airlines. YOur Money will be refunded soon.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your trip has been booked.
                  </Typography>
                  <a href={`/user/editseats/${this.state.SelectedFlightDep._id}/${this.state.cabin}/${this.props.Numseats}/${this.props.bookingNumber}/${this.props.num}`} title="reservations">Click here to pick your seats</a>
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
                     <Typography variant="subtitle1">
                    {this.state.textt}
                  </Typography>
                    <Button
                      variant="contained"
                      onClick={this.handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {this.state.activeStep === steps.length - 1 ? 'Proceed To Payment' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>

          </Paper>

        </Container>
      </ThemeProvider>
    ):
    <ThemeProvider theme={theme}>
    <CssBaseline />


    <Container component="main" maxWidth="sm" sx={{ mb: 4, minWidth: 700 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

        <Typography component="h1" variant="h4" align="center">
          {this.props.text}
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
                Thank you for choosing Tayartak Airlines. YOur Money will be refunded soon.
              </Typography>
              <Typography variant="subtitle1">
                Your trip has been booked.
              </Typography>
              <a href={`/user/editseats/${this.state.SelectedFlightRet._id}/${this.state.cabin}/${this.props.Numseats}/${this.props.bookingNumber}/${this.props.num}`} title="reservations">Click here to pick your seats</a>
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
                 <Typography variant="subtitle1">
                {this.state.textt}
              </Typography>
                <Button
                  variant="contained"
                  onClick={this.handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {this.state.activeStep === steps.length - 1 ? 'Proceed To Payment' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </React.Fragment>

      </Paper>

    </Container>
  </ThemeProvider>
  }
}
