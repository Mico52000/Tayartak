import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default class Checkout extends React.Component {

  constructor() {
    super();
    this.render = this.render.bind(this);
  }



  render() {
    return (
      <React.Fragment>
        <Typography variant="h6 " gutterBottom>
          Enter Trip Details
        </Typography>
        <p/>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="from"
              name="from"
              label="From"
              fullWidth
              variant="standard"
              value={this.props.from}
              onChange={this.props.handleFromChange}
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
              value={this.props.to}
              onChange={this.props.handleToChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="departureDate"
              name="departureDate"
              label="Departure Date"
              fullWidth
              variant="standard"
              value={this.props.departureDate}
              onChange={this.props.handleDepartureDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="returnDate"
              name="returnDate"
              label="Return Date"
              fullWidth
              variant="standard"
              value={this.props.returnDate}
              onChange={this.props.handleReturnDateChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="numberOfPassengers"
              name="numberOfPassengers"
              label="Number of passengers"
              variant="standard"
              type="number"
              value={this.props.numberOfPassengers}
              onChange={this.props.handleNumberOfPassengersChange}
            />
          </Grid>


          <Grid item xs={12}>
            <FormControl variant="standard" sx={{ minWidth: 210 }}>
              <InputLabel id="class" required>Class</InputLabel>
              <Select
                labelId="class"
                id="class"
                value={this.props.cabin}
                onChange={this.props.handleCabinChange}
                label="Class"
              >
                <MenuItem value="null">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"economy"}>Economy class</MenuItem>
                <MenuItem value={"business"}>Business class</MenuItem>
                <MenuItem value={"first"}>First class</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>
      </React.Fragment>
    );
  }

}
