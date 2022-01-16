import './Search.css';
import { Component } from 'react';
import Axios from 'axios';
import 'tachyons';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '../../Components/admin/Card.js';

const theme = createTheme();

export default class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            From: null,
            To: null,
            FlightDate: null,
            FlightNumber: null,
            NumberOfEconomySeats: null,
            NumberOfBusinessSeats: null,
            NumberOfFirstSeats: null,
            ArrivalTime: null,
            DepartureTime: null,
            data: [],

            errorText:""
        }
        this.buttonClick = this.buttonClick.bind(this);
        this.render = this.render.bind(this);
    }

    buttonClick(e) {

        e.preventDefault();
        Axios.get("http://localhost:8000/search", {
            params: this.state
        }).then((resp) => { 
            if(resp.data.length==0){
                this.setState({errorText:"No Flights Available, please change search criteria"})
            }else{
                this.setState({ data: resp.data })
            }
             })
            .catch((err) => alert(err));
    }


    render() {

        const components = this.state.data.map((flight, i) => {
            return <Card
                From={flight.From} To={flight.To} Date={flight.FlightDate} Flightnum={flight.FlightNumber} ecoseats={flight.NumberOfEconomySeats}
                bisseats={flight.NumberOfBusinessSeats} firstseats={flight.NumberOfFirstSeats} arrivalt={flight.ArrivalTime} departuret={flight.DepartureTime}
                ObjectId={flight._id} PriceEconomy={flight.PriceEconomy} PriceBusiness={flight.PriceBusiness}
                PriceFirst={flight.PriceFirst}
            />
        });
        return (

            <ThemeProvider theme={theme}>
                <CssBaseline />

                <div className='background' >
                </div>

                <Container component="main" maxWidth="sm" sx={{ mb: 4, minWidth: 700 }}>
                    <Paper variant="outlined" sx={{
                        bgcolor: "rgba(255,255,255,0.6)",
                        paddingX: 10,
                        paddingY: 10,
                        marginBottom: 7,
                        marginTop: 20,
                        borderRadius: '14px'
                    }}>


                        <Typography component="h1" variant="h4" align="center">
                            Search For A Flight
                        </Typography>
                        <br />
                        <Typography variant="h6 " gutterBottom>
                            Enter Flight Details:
                        </Typography>
                        <br />
                        <Grid container spacing={4} >

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="From"
                                    fullWidth
                                    variant="standard"
                                    value={this.props.From}
                                    onChange={(event) => this.setState({ From: event.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="to"
                                    name="to"
                                    label="To"
                                    fullWidth
                                    variant="standard"
                                    value={this.props.To}
                                    onChange={(event) => this.setState({ To: event.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Date"
                                    fullWidth
                                    variant="standard"
                                    value={this.props.To}
                                    onChange={(event) => this.setState({ FlightDate: event.target.value })}
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Flight Number"
                                    fullWidth
                                    variant="standard"
                                    value={this.props.To}
                                    onChange={(event) => this.setState({ FlightNumber: event.target.value })}
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Departure Time"
                                    fullWidth
                                    variant="standard"
                                    value={this.props.To}
                                    onChange={(event) => this.setState({ DepartureTime: event.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Arrival Time"
                                    fullWidth
                                    variant="standard"
                                    value={this.props.To}
                                    onChange={(event) => this.setState({ ArrivalTime: event.target.value })}
                                />
                            </Grid>
                        </Grid>

                        <br />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={this.buttonClick} sx={{ mt: 3, }} variant="contained">
                                Search for a flight
                            </Button>
                        </Box>
                        <br/>

                        {this.state.data.length === 0 ? (this.state.errorText) : (

                            <div className="cardListSearch">
                                {components}
                            </div>
                        )}

                    </Paper>
                </Container>
            </ThemeProvider>
        );
    }
}
