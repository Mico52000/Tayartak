require('dotenv').config();
const express = require('express');
const App = express();
const mongoose = require('mongoose');
const Flightmodel = require('./models/Flights');
const cors = require('cors');
App.use(express.json());
App.use(cors());
const port = process.env.PORT || 8000;


mongoose.connect(process.env.MONGO_LINK, { useNewUrlParser: true }).then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

App.listen(port, () => {
  console.log("You are connected!")
});


App.post('/addflight', async (req, res) => {


  const reqbody = req.body;
  const flight = new Flightmodel({
    From: reqbody.From,
    To: reqbody.To,
    FlightDate: reqbody.FlightDate,
    FlightNumber: reqbody.FlightNumber,
    NumberOfEconomySeats: reqbody.NumberOfEconomySeats,
    NumberOfBusinessSeats: reqbody.NumberOfBusinessSeats,
    NumberOfFirstSeats: reqbody.NumberOfFirstSeats,
    ArrivalTime: reqbody.ArrivalTime,
    DepartureTime: reqbody.DepartureTime
  });

  try{
    await flight.save();
    res.send("Inserted!");
  }catch(err){
    console.log(err);
}
  


});
App.put('/update',async(req,res)=>{
  console.log("linah");
  const flight=req.body;
  console.log(flight);
          Object.keys(flight).forEach(key => {
              if (flight[key] == null || flight[key]==""||flight[key]==0) {
                delete flight[key];
              }
            });
 var num =mongoose.Types.ObjectId(flight._id);
  //console.log(num);
  const nid= {_id:num};
  try{
      
        await Flightmodel.updateOne(nid,flight);
          
         res.send("Updated!");
        
          
    }catch(err){
      console.log(err);
  }
 
});


App.delete("/delete/:id",async (req,res) =>{
  console.log(req.params.id);
  var id =req.params.id;
  id =mongoose.Types.ObjectId(id);
  var myquery = { _id: id };
 
try{
 
 await Flightmodel.deleteOne(myquery),function(err,docs){
     if(err) throw err;
     if(docs){
         console.log("true");
     }
 };
 res.send("item deleted");
}
catch(error){
 console.log(error);
}

 
} );

App.get('/search', async (req, res) => {
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
    if (flight[key] == null || flight[key] == '') {
      delete flight[key];
    }
  });

  // console.log(flight);
  Flightmodel.find(flight, (err, result) => {
    if (!err) {
      // console.log(result);
      res.send(result);
    }
  })
});