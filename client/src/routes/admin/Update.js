import { useState, useEffect } from "react";
import Axios from 'axios';
import './Update.css';
import 'tachyons';
import { useParams } from 'react-router-dom';
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



function Update() {

    const theme = createTheme();

    const { id } = useParams();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [flightDate, setFlightDate] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [numberOfEc, setNumberOfEc] = useState(0);
    const [numberOfBus, setNumberOfBus] = useState(0);
    const [numberOfFirst, setNumberOfFirst] = useState(0);
    const [arrivalTime, setArrivalTime] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [economyPrice, seteconomyPrice] = useState("");
    const [businessPrice, setbusinessPrice] = useState("");
    const [firstPrice, setfirstPrice] = useState("");



    const updateFlight = (id) => {
        const flight = {
            From: from, To: to, FlightDate: flightDate, FlightNumber: flightNumber,
            NumberOfEconomySeats: numberOfEc, NumberOfBusinessSeats: numberOfBus,
            NumberOfFirstSeats: numberOfFirst, ArrivalTime: arrivalTime,
            DepartureTime: departureTime, _id: id,
            PriceEconomy: economyPrice, PriceBusiness: businessPrice,
            PriceFirst: firstPrice,
        }
        Axios.put("http://localhost:8000/update", flight).then(() => {
            alert("Flight Updated");
        }).catch((err) => alert(err));


    }


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
                        Update Flight Details
                    </Typography>
                    <br />
                    <Typography variant="h6 " gutterBottom>
                        Enter New Flight Details:
                    </Typography>
                    <br />
                    <Grid container spacing={4} >

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="From"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { setFrom(event.target.value) }}
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
                                onChange={(event) => { setTo(event.target.value) }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Date"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { setFlightDate(event.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Flight Number"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { setFlightNumber(event.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Departure time"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { setDepartureTime(event.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Arrival time"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { setArrivalTime(event.target.value) }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                required
                                label="Economy Seats Available"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { setNumberOfEc(event.target.value) }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                required
                                label="Economy Price"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { seteconomyPrice(event.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                required
                                label="Business Seats Available"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { setNumberOfBus(event.target.value) }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                required
                                label="Business Price"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { setbusinessPrice(event.target.value) }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                required
                                label="First Seats Available"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { setNumberOfFirst(event.target.value) }}
                            />
                        </Grid>



                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                required
                                label="First Price"
                                fullWidth
                                variant="standard"
                                onChange={(event) => { setfirstPrice(event.target.value) }}
                            />
                        </Grid>
                    </Grid>

                    <br />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => { updateFlight(id) }} sx={{ mt: 3, }} variant="contained">
                            Update Flight
                        </Button>
                    </Box>

                </Paper>
            </Container>
        </ThemeProvider>
    );


}




export default Update;