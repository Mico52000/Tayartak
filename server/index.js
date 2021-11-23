require('dotenv').config();
const express = require('express');
const App = express();
const mongoose = require('mongoose');
const Flightmodel = require('./models/Flights');
const cors = require('cors');
App.use(express.json());
App.use(cors());


console.log(process.env.MONGO_LINK);
mongoose.connect(process.env.MONGO_LINK,{useNewUrlParser: true});




App.post('/insert',async (req,res)=> {
    const from = req.body.From;
    const to = req.body.To;
    const date = req.body.Date;
    const cabin = req.body.Cabin;
    const seats = req.body.seats;

    const flight = new Flightmodel({From :from,To :to ,Date :date,Cabin :cabin, Seats_Available_on_Flight:seats});
    await flight.save();
   
}
);

App.get('/search',async(req,res)=>{
    // const flight = {
    //     From :req.query.From,
    //     To :req.query.To,
    //     Cabin : req.query.Cabin,
    //     FlightDate : req.query.Date,
    //     FlightNumber: req.query.FlightNum,
    //     NumberOfEconomySeats: req.query.Ecoseats,
    //     NumberOfBusinessSeats : req.query.Bisseats,
    //     NumberOfFirstSeats : req.query.Firstseats,

    // }
    const flight = req.query;
    delete flight.data;
    Object.keys(flight).forEach(key => {
        if (flight[key] == null || flight[key]=='') {
          delete flight[key];
        }
      });
   
      console.log(flight);
    Flightmodel.find(flight,(err,result)=>
    {
        if(!err){
        console.log(result);
        res.send(result);
        }
    })
})