import './AddFlight.css';
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

const theme = createTheme();

export default class AddFlight extends Component {
    constructor() {
        super();
        this.state = {
            From: "",
            To: "",
            FlightDate: "",
            FlightNumber: "",
            NumberOfEconomySeats: "",
            NumberOfBusinessSeats: "",
            NumberOfFirstSeats: "",
            ArrivalTime: "",
            DepartureTime: "",
            PriceEconomy: "",
            PriceBusiness: "",
            PriceFirst: "",

            ErrorText: "",
        }
        this.addFlight = this.addFlight.bind(this);
        this.render = this.render.bind(this);
    }


    addFlight(e) {

        if (this.state.From.length === 0 || this.state.FlightDate.length === 0 || this.state.FlightNumber.length === 0 ||
            this.state.NumberOfEconomySeats.length === 0 || this.state.NumberOfBusinessSeats.length === 0 ||
            this.state.NumberOfFirstSeats.length === 0 || this.state.ArrivalTime.length === 0 ||
            this.state.DepartureTime.length === 0 || this.state.PriceEconomy.length === 0 ||
            this.state.PriceBusiness.length === 0 || this.state.PriceFirst.length === 0
        ) {
            this.setState({ ErrorText: "Please fill all fields" })
        } else {
            e.preventDefault();
            this.setState({ ErrorText: "" })
            Axios.post("http://localhost:8000/addflight", this.state).then((resp) => {
                alert(resp.data);
                window.location.reload(false);
            }).catch((err) => alert(err));
        }

    }


    componentDidMount() {

    }

    render() {
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
                            Add A New Flight
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
                                    onChange={(event) => this.setState({ From: event.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="To"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ To: event.target.value })}
                                />
                            </Grid>
 
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Date"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ FlightDate: event.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Flight Number"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ FlightNumber: event.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Departure time"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ DepartureTime: event.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Arrival time"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ ArrivalTime: event.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="number"
                                    required
                                    label="Economy Seats Available"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ NumberOfEconomySeats: event.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="number"
                                    required
                                    label="Economy Price"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ PriceEconomy: event.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="number"
                                    required
                                    label="Business Seats Available"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ NumberOfBusinessSeats: event.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="number"
                                    required
                                    label="Business Price"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ PriceBusiness: event.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="number"
                                    required
                                    label="First Seats Available"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ NumberOfFirstSeats: event.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="number"
                                    required
                                    label="First Price"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => this.setState({ PriceFirst: event.target.value })}
                                />
                            </Grid>


                        </Grid>

                        <br />
                        <Typography component="body2" variant="body2" color="red" justifyContent={'center'} >
                            {this.state.ErrorText}
                        </Typography>
                        <br />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={this.addFlight} sx={{ mt: 3, }} variant="contained">
                                Add Flight
                            </Button>
                        </Box>


                    </Paper>

                </Container>
            </ThemeProvider>
        );
    }
}


