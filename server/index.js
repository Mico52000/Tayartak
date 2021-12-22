require('dotenv').config();
const express = require('express');
const App = express();
const mongoose = require('mongoose');
const Flightmodel = require('./models/Flights');
const Reservationmodel = require('./models/Reservations')
const cors = require('cors');
App.use(express.json());
App.use(cors());
const port = process.env.PORT || 8000;


mongoose.connect(process.env.MONGO_LINK, { useNewUrlParser: true });

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
    DepartureTime: reqbody.DepartureTime,
    Seats:[]
  });


  var totalseats = flight.NumberOfBusinessSeats+flight.NumberOfFirstSeats+flight.NumberOfEconomySeats;
  if(totalseats%6 !=0){
    res.send("The total number of seats must be a multiple of 6");
  }
  else{
  var BusinessSeatsRemaining = flight.NumberOfBusinessSeats;
  var FirstSeatsRemaining = flight.NumberOfFirstSeats;
  var EconomySeatsRemaining = flight.NumberOfEconomySeats;
  var seats =[];
  for(let i=0;i<Math.ceil(totalseats/6.0);i++){
    var row =[];
    for(let  j=1;j<=6;j++){
      var seat = {
        id:i*6 +j,
        number:j,
        isReserved:false,
        Cabin:'',
      }
      if(BusinessSeatsRemaining>0){
        seat.Cabin = 'BusinessClass'
        BusinessSeatsRemaining--;
      }
      else if(FirstSeatsRemaining>0){
        seat.Cabin = 'FirstClass';
        FirstSeatsRemaining--;

      }
      else{
        seat.Cabin = 'Economy';
        EconomySeatsRemaining--;
      }
      if(j== 3 || j== 5){
        row.push(null);
        
      }
        row.push(seat);
    }
    seats.push(row);
  }
  

  flight.Seats=seats;
   await flight.save();
   res.send("Flight Added!");
}
});
App.get('/searchReservation', async (req, res) => {
  console.log(req.query.resid);

  Reservationmodel.findById(req.query.resid,function (err, result) {
    if (err) {
      alert(err);
    }
    else{
      console.log(result);
      res.send(result);
    }
  })});
 
  App.get('/searchflightbyId', async (req, res) => {
  
    Flightmodel.findById(req.query.flightid,function (err, result) {
      if (err) {
        alert(err);
      }
      else{
        try{
          var seatobj = {seats:result.Seats};
          res.send(seatobj);
        }
        catch(err){
          alert(err);
        }
       
      }
    });

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


App.put('/updateResDep',async(req,res)=>{
  
  const reservation=req.body;
 
  var num =mongoose.Types.ObjectId(reservation._id);
  delete reservation._id;
  const nid= {_id:num};
  try{
      
        await Reservationmodel.updateOne(nid,reservation);
          
         res.send("Updated!");
        
          
    }catch(err){
      console.log(err);
  }
 
});

App.put('/updateResRet',async(req,res)=>{
  
  const reservation=req.body;
 
  var num =mongoose.Types.ObjectId(reservation._id);
  delete reservation._id;
  const nid= {_id:num};
  try{
      
        await Reservationmodel.updateOne(nid,reservation);
          
         res.send("Updated!");
        
          
    }catch(err){
      console.log(err);
  }
 
});

App.put('/updateseats',async(req,res)=>{
  
  const flight=req.body;
 
  var num =mongoose.Types.ObjectId(flight._id);
  delete flight._id;
  const nid= {_id:num};
  console.log(flight);
  try{
      
        await Flightmodel.updateOne(nid,flight );
        
          
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

// const flightaya = new Flightmodel({
//   From: "hopa",
//   To: "opa",
//   FlightDate: "aywa",
//   FlightNumber: "13",
//   NumberOfEconomySeats: "14",
//   NumberOfBusinessSeats: "15",
//   NumberOfFirstSeats: "16",
//   ArrivalTime: "69:00",
//   DepartureTime: "420:00",
//   Seats : [
//     [{id: 1, number: 1, isSelected: true, Cabin : "Economy"}, {id: 2, number: 2, Cabin :' FirstClass'}, null, {id: 3, number: '3', isReserved: true, orientation: 'east' ,Cabin : "FirstClass", tooltip: 'Reserved by Rogger'}, {id: 4, number: '4',Cabin : "FirstClass", orientation: 'west'}, null, {id: 5, number: 5,Cabin : "FirstClass"}, {id: 6, number: 6,Cabin : "FirstClass"}],
//     [{id: 7, number: 1, isReserved: true, Cabin : "BusinessClass"}, {id: 8, number: 2, isReserved: true,Cabin : "BusinessClass"}, null, {id: 9, number: '3', isReserved: true, orientation: 'east',Cabin : "BusinessClass"}, {id: 10, number: '4', orientation: 'west',Cabin : "BusinessClass"}, null, {id: 11, number: 5,Cabin : "BusinessClass"}, {id: 12, number: 6,Cabin : "BusinessClass"}],
//     [{id: 13, number: 1,Cabin:"Economy"}, {id: 14, number: 2,Cabin:"Economy"}, null, {id: 15, number: 3, isReserved: true, orientation: 'east',Cabin:"Economy"}, {id: 16, number: '4', orientation: 'west',Cabin:"Economy"}, null, {id: 17, number: 5,Cabin:"Economy"}, {id: 18, number: 6,Cabin:"Economy"}],
//     [{id: 19, number: 1, Cabin:"FirstClass"}, {id: 20, number: 2,Cabin:"BusinessClass"}, null, {id: 21, number: 3, Cabin:"Economy"}, {id: 22, number: '4',Cabin:"Economy"}, null, {id: 23, number: 5,Cabin:"Economy"}, {id: 24, number: 6,Cabin:"Economy"}],
//     [{id: 25, number: 1, isReserved: true,Cabin:"Economy"}, {id: 26, number: 2, Cabin:"Economy"}, null, {id: 27, number: '3', isReserved: true,Cabin:"Economy"}, {id: 28, number: '4', Cabin:"Economy"}, null,{id: 29, number: 5, Cabin:"Economy"}, {id: 30, number: 6, isReserved: true,Cabin:"Economy"}],
    
//   ]
 
// });
// flightaya.save();

// const reservationaya = new Reservationmodel({
//   userId : '61bff21874e339983be37a00',
//   DepFlight:"61c2121134daf78ac49b25de",
//   RetFlight: "61c21277d20bfa2699726c96",
//   NumSeats: 4,
//   Cabin : "Economy",
//   SeatsDep :[],
//   SeatRet :[]


// });
// reservationaya.save();
App.get('/Summary/:departureId/:returnId/:num/:Cabin', async (req,res) =>{
  console.log("here");
  //var departureId = req.params.departureId;
 // console.log(departureId);
  //var returnId = req.params.returnId;
  //console.log(returnId);
  const departureId = mongoose.Types.ObjectId(req.params.departureId);
  const  returnId =mongoose.Types.ObjectId(req.params.returnId);
  const Query = { _id:{$in: [departureId,returnId]}};
  //console.log(Query);
 
 
     Flightmodel.find(Query,(err,docs) =>{
       // if(err) throw err;
        if(docs){
          console.log(docs);
            res.send(docs);
        }
    })
    
  

});

App.get('/Itinerary/:userId/:departureId/:returnId/:num/:Cabin', (req,res) =>{
  console.log("here");
  const  userId = req.params.userId;
  const  departureId = req.params.departureId;
  const  returnId = req.params.returnId;
  const Query = { UserId : userId , DepFlight  : departureId ,RetFlight : returnId}
  const Obj = {             
    arrayOne: [],
    arrayTwo: []
};
  
     ReservationsModel.findOne(Query,(err,docs) =>{
       // if(err) throw err;
        if(docs){
          console.log(docs);
          Obj.arrayOne.push(docs);
          console.log("1");
         console.log(Obj.arrayOne);
            
        }
    })
    
  Flightmodel.findById(departureId,(err,docs) =>{
    Obj.arrayOne.push(docs);
    console.log(Obj.arrayOne);
            
    // a.push(docs);
    // console.log("2");
    // console.log(a);
  })
  Flightmodel.findById(returnId,(err,docs) =>{
    Obj.arrayOne.push(docs);
    console.log(Obj.arrayOne);

    // a.push(docs);
    // console.log("3");
    // console.log(a);
  })
  console.log(Obj.arrayOne);
  res.send(JSON.stringify(Obj.arrayOne));

});

App.post('/reserve/:userId/:departureId/:returnId/:num/:Cabin',async(req,res) =>{

  const  userId = req.params.userId;
  const  departureId = req.params.departureId;
  const  returnId = req.params.returnId;
   console.log("reserve");
   const Query = { UserId : userId , DepFlight  : departureId ,RetFlight : returnId}
   console.log(Query);
   ReservationsModel.findOne(Query,(err,docs) =>{
     
     
      if(docs){
        const reservation = new ReservationsModel({
          UserId : req.params.userId,
      DepFlight : req.params.departureId,
      RetFlight : req.params.returnId,
      NumSeats : req.params.num,
      Seats : "A1-A2",
      Cabin : req.params.Cabin
      
        });
      
        reservation.save();
         
      }
  })
 
});

const flightaya = new Flightmodel({
  From: "hopa",
  To: "opa",
  FlightDate: "aywa",
  FlightNumber: "13",
  NumberOfEconomySeats: "14",
  NumberOfBusinessSeats: "15",
  NumberOfFirstSeats: "16",
  ArrivalTime: "11:00",
  DepartureTime: "12:00",
  Seats : [
    [{id: 1, number: 1, isSelected: true, tooltip: 'Reserved by you'}, {id: 2, number: 2, tooltip: 'Cost: 15$'}, null, {id: 3, number: '3', isReserved: true, orientation: 'east', tooltip: 'Reserved by Rogger'}, {id: 4, number: '4', orientation: 'west'}, null, {id: 5, number: 5}, {id: 6, number: 6}],
    [{id: 7, number: 1, isReserved: true, tooltip: 'Reserved by Matthias Nadler'}, {id: 8, number: 2, isReserved: true}, null, {id: 9, number: '3', isReserved: true, orientation: 'east'}, {id: 10, number: '4', orientation: 'west'}, null, {id: 11, number: 5}, {id: 12, number: 6}],
    [{id: 13, number: 1}, {id: 14, number: 2}, null, {id: 15, number: 3, isReserved: true, orientation: 'east'}, {id: 16, number: '4', orientation: 'west'}, null, {id: 17, number: 5}, {id: 18, number: 6}],
    [{id: 19, number: 1, tooltip: 'Cost: 25$'}, {id: 20, number: 2}, null, {id: 21, number: 3, orientation: 'east'}, {id: 22, number: '4', orientation: 'west'}, null, {id: 23, number: 5}, {id: 24, number: 6}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
    [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'}, {id: 30, number: 6, isReserved: true}],
  ]
 
});
flightaya.save();
