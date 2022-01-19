require('dotenv').config();
const express = require('express');
const App = express();
const mongoose = require('mongoose');
const Flightmodel = require('./models/Flights');
const Reservationmodel = require('./models/Reservations');
const UsersModel = require('./models/Users');
const nodemailer = require('nodemailer');
const cors = require('cors');
App.use(express.json());
App.use(cors());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const stripe = require('stripe')('sk_test_51KFLB0DgCy4UogHBfnDXPKBiSlQOBwqAzV5Fw9tRmvvtL7MeEBTFb4c1CWidgY8tlhkqjXWDBG1QHtKaMRcp45Ql00q8507skE')

const port = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_LINK, { useNewUrlParser: true }).then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));


App.listen(port, () => {
  console.log("You are connected!")
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'projectaclsp2@gmail.com',
    pass: '22122021'
  }
});



App.post('/emailExist', async (req,res)=>{
  const user= await UsersModel.findOne({ Email: req.body.email }).exec();
  if (user !== null) {
    return res.send("email is used before");
  }else{
    return res.send("cool");
  }
  
})

App.post('/login', async (req, res) => {
  // Authenticate User
 
  const user= await UsersModel.findOne({ Username: req.body.username }).exec();
  if (user == null) {
    return res.send("username does not exist");
  }else{

  try {
    if (await bcrypt.compare(req.body.password, user.Password)) {
      const user2 = {
        _id: user._id,
        Username: user.Username,
      }
      const accessToken = generateAccessToken(user2)
      res.json({accessToken:accessToken,user:user})
     
    } else {
      res.send("wrong password");
    }
  } catch {
    res.send("errorrr");
  }
}
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}


function authenticateToken(req,res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token==null){
    return res.send("Token does not exist")
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
    if(err){
      return res.send("Token not valid")
    }
    req.user = user
    next()
  })
}

App.get('/posts', authenticateToken, async (req,res) =>{
  const userx= await UsersModel.findOne({ Username: req.user.Username }).exec();
  res.json(userx);
})


App.post('/register', async (req, res) => {
  const reqbody = req.body;

  const usernameExist= await UsersModel.findOne({ Username: reqbody.username }).exec();
  if(usernameExist!==null){
    return res.send("username exists")
  }

  try {
    const hashedPassword = await bcrypt.hash(reqbody.password, 10)

    const user = new UsersModel({
      FirstName: reqbody.firstName,
      LastName: reqbody.lastName,
      Email: reqbody.email,
      Username: reqbody.username,
      Password: hashedPassword,
      Address: reqbody.address,
      PhoneNumber: reqbody.phoneNumber,
      Passport: reqbody.passportNumber,
      Type: reqbody.type,

    })
    await user.save();
    res.send("You signed up successfully!");
  }
  catch {
    res.send("oopss");
  }

})



//change dep

App.post('/ChangeParent',(req,res)=>{
  let flightId = mongoose.Types.ObjectId(req.body.flightId);
  let resId=mongoose.Types.ObjectId(req.body.res);
  Flightmodel.findById(flightId, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else {
      Reservationmodel.findById(resId,function(err,docss){
        if(err){
          console.log(err);
        }else{
         //console.log(docss);
          //console.log(docs);
          Flightmodel.findById(docss.RetFlight,function(err,docsss){
            if(err){
              console.log(err);
            }else{
              //console.log(docss);
             // console.log(docs.PriceFirst);
              if(docss.CabinRet.toLowerCase()=='economy'){
                if(docss.CabinDep.toLowerCase()=='economy'){
                const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Rettime:docsss.FlightDate,retnum:docsss.FlightNumber,retarrt:docsss.ArrivalTime,retdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,depprice:docs.PriceEconomy,retprice:docsss.PriceEconomy,oldId:flightId,notchanged:docss.RetFlight}
                //console.log(Query);
                res.send(Query);
                }else if(docss.CabinDep.toLowerCase()=='first'){
                  const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Rettime:docsss.FlightDate,retnum:docsss.FlightNumber,retarrt:docsss.ArrivalTime,retdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,depprice:docs.PriceFirst,retprice:docsss.PriceEconomy,oldId:flightId,notchanged:docss.RetFlight}
                //console.log(Query);
                res.send(Query);
                }else{
                  const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Rettime:docsss.FlightDate,retnum:docsss.FlightNumber,retarrt:docsss.ArrivalTime,retdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,depprice:docs.PriceBusiness,retprice:docsss.PriceEconomy,oldId:flightId,notchanged:docss.RetFlight}
                //console.log(Query);
                res.send(Query);
                }
              }else if(docss.CabinRet.toLowerCase()=='first'){
                if(docss.CabinDep.toLowerCase()=='economy'){
                  const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Rettime:docsss.FlightDate,retnum:docsss.FlightNumber,retarrt:docsss.ArrivalTime,retdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,depprice:docs.PriceEconomy,retprice:docsss.PriceFirst,oldId:flightId,notchanged:docss.RetFlight}
                  //console.log(Query);
                  res.send(Query);
                  }else if(docss.CabinDep.toLowerCase()=='first'){
                    const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Rettime:docsss.FlightDate,retnum:docsss.FlightNumber,retarrt:docsss.ArrivalTime,retdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,depprice:docs.PriceFirst,retprice:docsss.PriceFirst,oldId:flightId,notchanged:docss.RetFlight}
                  //console.log(Query);
                  res.send(Query);
                  }else{
                    const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Rettime:docsss.FlightDate,retnum:docsss.FlightNumber,retarrt:docsss.ArrivalTime,retdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,depprice:docs.PriceBusiness,retprice:docsss.PriceFirst,oldId:flightId,notchanged:docss.RetFlight}
                 // console.log(Query);
                  res.send(Query);
                  }
              }else{
                if(docss.CabinDep.toLowerCase()=='economy'){
                  const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Rettime:docsss.FlightDate,retnum:docsss.FlightNumber,retarrt:docsss.ArrivalTime,retdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,depprice:docs.PriceEconomy,retprice:docsss.PriceBusiness,oldId:flightId,notchanged:docss.RetFlight}
                  //console.log(Query);
                  res.send(Query);
                  }else if(docss.CabinDep.toLowerCase()=='first'){
                    const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Rettime:docsss.FlightDate,retnum:docsss.FlightNumber,retarrt:docsss.ArrivalTime,retdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,depprice:docs.PriceFirst,retprice:docsss.PriceBusiness,oldId:flightId,notchanged:docss.RetFlight}
                  //console.log(Query);
                  res.send(Query);
                  }else{
                      const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Rettime:docsss.FlightDate,retnum:docsss.FlightNumber,retarrt:docsss.ArrivalTime,retdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,depprice:docs.PriceBusiness,retprice:docsss.PriceBusiness,oldId:flightId,notchanged:docss.RetFlight}
                  //console.log(Query);
                  res.send(Query);
                  }
              }
              
            }
          })
          
        }
      })
 
     
    }
  });
})

App.post('/changeReservation',async(req,res)=>{
  console.log(req.body);
  let bookingId=mongoose.Types.ObjectId(req.body.bookingId);
  const url = req.body.prevPage;
  const Numseats = req.body.Numseats;
  const newFlight = req.body.newFlightID; 
  const oldFlight = req.body.oldFlightID;      
  const IdNotChanged = req.body.IdNotChanged;
  const depCabin = req.body.oldCabinChanged;
  const detect = req.body.num;
  const oldCabin = req.body.oldCabin;  //unreserve biha
  const newCabin = req.body.newCabin;
  const totalPrice = req.body.TotalPrice;
  const oldprice=req.body.oldprice;
  var departureId ;     
  var returnId;  
  var departureFlight;
  var returnFlight;
  const Query = { _id: { $in: [IdNotChanged, newFlight] } };
 const docs = await Flightmodel.find(Query) ;
  departureFlight = docs[0];
  returnFlight = docs[1];
  if(req.body.num=='1'){
    removeSeatsDep(bookingId);
    const nid = { _id: bookingId };
        const change={DepFlight:req.body.newFlightID,CabinDep:req.body.newCabin,TotalPrice:oldprice+totalPrice};
        await Reservationmodel.updateOne(nid, change);
        

   }else{
    removeSeatsRet(bookingId);
    const nid = { _id: bookingId };
    const change={RetFlight:req.body.newFlightID,CabinRet:req.body.newCabin,TotalPrice:oldprice+totalPrice};
    await Reservationmodel.updateOne(nid, change);
   }
  if(totalPrice >0){
      const session = await stripe.checkout.sessions.create({
         line_items: [
           {
             price_data: {
               currency: 'usd',
               product_data: {
                 name: departureFlight["From"] +"/"+returnFlight["From"],
               },
               unit_amount: totalPrice*100,
             },
             quantity: 1,
             description : "Number of Passengers :"+Numseats +"\n"+"Chosen Cabin :"+newCabin,
            
           }
         ],
         metadata :{
          booking : bookingId, 
          NumberOfSeats  : Numseats,
          FlightId : newFlight,       
          Cabin    : newCabin,
          detect : detect,
          DepId : departureId,
          RetId : returnId,
          DepFrom : departureFlight["From"],
          DepTo : departureFlight["To"],
          DepDate : departureFlight["FlightDate"],
          DepDTime : departureFlight["DepartureTime"],
          DepATime : departureFlight["ArrivalTime"],
          DepFlightNumber : departureFlight["FlightNumber"],
          TotalPrice : totalPrice,
          RetFrom : returnFlight["From"],
          RetTo : returnFlight["To"],
          RetDate : returnFlight["FlightDate"],
          RetDTime : returnFlight["DepartureTime"],
          RetATime : returnFlight["ArrivalTime"],
          RetFlightNumber : returnFlight["FlightNumber"],
         },
         mode: 'payment',
         success_url: 'http://localhost:3000/user/editSuccess?session_id={CHECKOUT_SESSION_ID}',
         cancel_url: url,
       }
       )
       console.log(session.url);
       res.send(session.url);
       
      }
 
 
//lessa elseats
//lessa elprice
});
///////////////////
// App.post('/changeReservation', async (req, res) => {
//   const url = req.body.prevPage;
//   const Numseats = req.body.Numseats;
//   const newFlight = req.body.newFlightID; 
//   const oldFlight = req.body.oldFlightID;      
//   const IdNotChanged = req.body.IdNotChanged;
//   const depCabin = req.body.oldCabinChanged;
//   const detect = req.body.num;
//   const oldCabin = req.body.oldCabin;  //unreserve biha
//   const newCabin = req.body.newCabin;
//   const totalPrice = req.body.TotalPrice;

//   var departureId ;     
//   var returnId;  
//   var departureFlight;
//   var returnFlight;
//   const Query = { _id: { $in: [departureId, returnId] } };
//  const docs = await Flightmodel.find(Query) ;
//   departureFlight = docs[0];
//   returnFlight = docs[1];
//       const session = await stripe.checkout.sessions.create({
//          line_items: [
//            {
//              price_data: {
//                currency: 'usd',
//                product_data: {
//                  name: departureFlight["From"] +"/"+returnFlight["From"],
//                },
//                unit_amount: totalPrice*100,
//              },
//              quantity: 1,
//              description : "Number of Passengers :"+Numseats +"\n"+"Chosen Cabin :"+Cabin,
            
//            }
//          ],
//          metadata :{
//           booking : bookingId, 
//           NumberOfSeats  : Numseats,
//           FlightId : newFlight,       
//           Cabin    : Cabin,
//           detect : detect,
//           DepId : departureId,
//           RetId : returnId,
//           DepFrom : departureFlight["From"],
//           DepTo : departureFlight["To"],
//           DepDate : departureFlight["FlightDate"],
//           DepDTime : departureFlight["DepartureTime"],
//           DepATime : departureFlight["ArrivalTime"],
//           DepFlightNumber : departureFlight["FlightNumber"],
//           TotalPrice : totalPrice,
//           RetFrom : returnFlight["From"],
//           RetTo : returnFlight["To"],
//           RetDate : returnFlight["FlightDate"],
//           RetDTime : returnFlight["DepartureTime"],
//           RetATime : returnFlight["ArrivalTime"],
//           RetFlightNumber : returnFlight["FlightNumber"],
//          },
//          mode: 'payment',
//          success_url: 'http://localhost:3000/user/editSuccess?session_id={CHECKOUT_SESSION_ID}',
//          cancel_url: url,
//        }
//        )
       
//        res.send(session.url);
//      });





App.post('/mailTicket',(req,res)=>{
  //console.log("hi shaghal");
  const resDetails=req.body;
  console.log(resDetails);
  var mailOptions = {
    from: 'projectaclsp2@gmail.com',
    to: 'linahma73@gmail.com',
    subject: "Tayartak App  "+resDetails.bookingid+"  "+ resDetails.depFrom+"/"+resDetails.depTo,
    text: 'Internet Booking Tayartak \nBOOKINGREF : '+resDetails.bookingid+'this is a round Trip Ticket '+resDetails.depFrom+'/'+resDetails.depTo+'\nDEPARTURE FLIGHT NUMBER: '+resDetails.depNumber+' \nDEPARTURE FLIGHT DEP DATE: '+resDetails.depDate+' \nDEPARTURE FLIGHT DEP TIME: '+resDetails.depDtime+' \nDEPARTURE FLIGHT ARRIVAL TIME: '+resDetails.depAtime+ " \nSEATS : "+resDetails.depSeats+"  \nCABIN: "+resDetails.Cabin+'  \nRETURN FLIGHT NUMBER: '+resDetails.retNumber+' \nRETURN FLIGHT DEP DATE: '+resDetails.retDate+' \nRETURN FLIGHT DEP TIME: '+resDetails.retDtime+' \nRETURN FLIGHT ARRIVAL TIME: '+resDetails.retAtime+ " \nSEATS : "+resDetails.retSeats+"  \nCABIN: "+resDetails.Cabin +"\nTOTAL PRICE: "+resDetails.TotalPrice+"$"

  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("mail sent");
      re.send("Ticket is sent to your mail");
    }
  }
  );
});


//retchange
App.post('/ChangeParentRet',(req,res)=>{
  let flightId = mongoose.Types.ObjectId(req.body.flightId);
  let resId=mongoose.Types.ObjectId(req.body.res);
  Flightmodel.findById(flightId, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else {
      Reservationmodel.findById(resId,function(err,docss){
        if(err){
          console.log(err);
        }else{
         //console.log(docss);
          //console.log(docs);
          Flightmodel.findById(docss.DepFlight,function(err,docsss){
            if(err){
              console.log(err);
            }else{
              // console.log(docs);
              // console.log(docs.PriceFirst);
              if(docss.CabinDep.toLowerCase()=='economy'){
                if(docss.CabinRet.toLowerCase()=='economy'){
                  const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Deptime:docsss.FlightDate,Depnum:docsss.FlightNumber,Deparrt:docsss.ArrivalTime,Depdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,oldprice:docs.PriceEconomy,Depprice:docsss.PriceEconomy,oldId:flightId,notchanged:docss.DepFlight};
                  console.log(Query);
                  res.send(Query);
                  }else if(docss.CabinRet.toLowerCase()=='first'){
                    const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Deptime:docsss.FlightDate,Depnum:docsss.FlightNumber,Deparrt:docsss.ArrivalTime,Depdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,oldprice:docs.PriceFirst,Depprice:docsss.PriceEconomy,oldId:flightId,notchanged:docss.DepFlight};
                  console.log(Query);
                  res.send(Query);
                  }else{
                    const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Deptime:docsss.FlightDate,Depnum:docsss.FlightNumber,Deparrt:docsss.ArrivalTime,Depdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,oldprice:docs.PriceBusiness,Depprice:docsss.PriceEconomy,oldId:flightId,notchanged:docss.DepFlight}
                  console.log(Query);
                  res.send(Query);
                  }
               // const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Deptime:docsss.FlightDate,Depnum:docsss.FlightNumber,Deparrt:docsss.ArrivalTime,Depdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,oldprice:docs.PriceEconomy,Depprice:docsss.PriceEconomy,oldId:docss.DepFlight}
                //console.log(Query);
                //res.send(Query);
              }else if(docss.CabinDep.toLowerCase()=='first'){
                if(docss.CabinRet.toLowerCase()=='economy'){
                  const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Deptime:docsss.FlightDate,Depnum:docsss.FlightNumber,Deparrt:docsss.ArrivalTime,Depdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,oldprice:docs.PriceEconomy,Depprice:docsss.PriceFirst,oldId:flightId,notchanged:docss.DepFlight};
                  console.log(Query);
                  res.send(Query);
                  }else if(docss.CabinRet.toLowerCase()=='first'){
                    const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Deptime:docsss.FlightDate,Depnum:docsss.FlightNumber,Deparrt:docsss.ArrivalTime,Depdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,oldprice:docs.PriceFirst,Depprice:docsss.PriceFirst,oldId:flightId,notchanged:docss.DepFlight};
                    console.log(Query);
                  res.send(Query);
                  }else{
                    const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Deptime:docsss.FlightDate,Depnum:docsss.FlightNumber,Deparrt:docsss.ArrivalTime,Depdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,oldprice:docs.PriceBusiness,Depprice:docsss.PriceFirst,oldId:flightId,notchanged:docss.DepFlight};
                  console.log(Query);
                  res.send(Query);
                  }
              }else{
                if(docss.CabinRet.toLowerCase()=='economy'){
                  const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Deptime:docsss.FlightDate,Depnum:docsss.FlightNumber,Deparrt:docsss.ArrivalTime,Depdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,oldprice:docs.PriceEconomy,Depprice:docsss.PriceBusiness,oldId:flightId,notchanged:docss.DepFlight};
                  console.log(Query);
                  res.send(Query);
                  }else if(docss.CabinRet.toLowerCase()=='first'){
                    const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Deptime:docsss.FlightDate,Depnum:docsss.FlightNumber,Deparrt:docsss.ArrivalTime,Depdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,oldprice:docs.PriceFirst,Depprice:docsss.PriceBusiness,oldId:flightId,notchanged:docss.DepFlight};
                    console.log(Query);
                  res.send(Query);
                  }else{
                    const Query = { numseats:docss.NumSeats,from:docs.From,to:docs.To,price:docss.TotalPrice,Deptime:docsss.FlightDate,Depnum:docsss.FlightNumber,Deparrt:docsss.ArrivalTime,Depdept:docsss.DepartureTime,olddepCabin:docss.CabinDep,oldretCabin:docss.CabinRet,oldprice:docs.PriceBusiness,Depprice:docsss.PriceBusiness,oldId:flightId,notchanged:docss.DepFlight};
                  console.log(Query);
                  res.send(Query);
                  }
              }
              
            }
          })
          
        }
      })
 
     
    }
  });
})
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
    Seats: [],
    PriceEconomy: reqbody.PriceEconomy,
    PriceBusiness: reqbody.PriceBusiness,
    PriceFirst: reqbody.PriceFirst,
  });


  var totalseats = flight.NumberOfBusinessSeats + flight.NumberOfFirstSeats + flight.NumberOfEconomySeats;
  if (totalseats % 6 != 0) {
    res.send("The total number of seats must be a multiple of 6");
  }
  else {
    var BusinessSeatsRemaining = flight.NumberOfBusinessSeats;
    var FirstSeatsRemaining = flight.NumberOfFirstSeats;
    var EconomySeatsRemaining = flight.NumberOfEconomySeats;
    var seats = [];
    for (let i = 0; i < Math.ceil(totalseats / 6.0); i++) {
      var row = [];
      for (let j = 1; j <= 6; j++) {
        var seat = {
          id: i * 6 + j,
          number: j,
          isReserved: false,
          Cabin: '',
        }
        if (BusinessSeatsRemaining > 0) {
          seat.Cabin = 'business'
          BusinessSeatsRemaining--;
        }
        else if (FirstSeatsRemaining > 0) {
          seat.Cabin = 'first';
          FirstSeatsRemaining--;

        }
        else {
          seat.Cabin = 'economy';
          EconomySeatsRemaining--;
        }
        if (j == 3 || j == 5) {
          row.push(null);

        }
        row.push(seat);
      }
      seats.push(row);
    }


    flight.Seats = seats;
    await flight.save();
    res.send("Flight Added!");
  }
});
App.get('/edit', async (req, res) => {
  let user = mongoose.Types.ObjectId("61bff21874e339983be37a00");
  UsersModel.findById(user, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else {
      // console.log(docs);
      res.send(docs);
    }
  });
});
App.put('/updateuser', async (req, res) => {

  const user = req.body;
  // console.log(user);
  var x = 0;
  Object.keys(user).forEach(key => {
    if (user[key] == null || user[key] == "" || user[key] == 0) {
      delete user[key];
      x++;
    }
  });
  // console.log(x);
  // console.log(x == 6);

  var num = mongoose.Types.ObjectId("61bff21874e339983be37a00");
  //console.log(num);
  const nid = { _id: num };
  try {

    await UsersModel.updateOne(nid, user);
    if (x != 6) {
      res.send("Updated!");
    }

  } catch (err) {
    console.log(err);
  }

});
App.get('/searchReservation', async (req, res) => {
  // console.log(req.query.resid);

  Reservationmodel.findById(req.query.resid, function (err, result) {
    if (err) {
      alert(err);
    }
    else {
      // console.log(result);
      res.send(result);
    }
  })
});

App.get('/searchflightbyId', async (req, res) => {
  
  Flightmodel.findById(req.query.flightid, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      try {
        var seatobj = { seats: result.Seats };
        res.send(seatobj);
      }
      catch (err) {
        res.send("oops and error occured")
      }

    }
  });

});
App.put('/update', async (req, res) => {
  // console.log("linah");
  const flight = req.body;
  // console.log(flight);
  Object.keys(flight).forEach(key => {
    if (flight[key] == null || flight[key] == "" || flight[key] == 0) {
      delete flight[key];
    }
  });
  var num = mongoose.Types.ObjectId(flight._id);
  //console.log(num);
  const nid = { _id: num };
  try {

    await Flightmodel.updateOne(nid, flight);

    res.send("Updated!");


  } catch (err) {
    console.log(err);
  }

});

App.delete("/deleteres/:id", async (req, res) => {
  // console.log(req.params.id);
  let user = "";
  id = mongoose.Types.ObjectId(req.params.id);
  var myquery = { _id: id };
  Reservationmodel.findById(id, function (err, docs) {
    // console.log(docs);
    if (err) {
      console.log(err);
    }
    else {
      user = mongoose.Types.ObjectId(docs.UserId);
      //mongoose.Types.ObjectId(docs.UserId);
      // console.log("Result : ", user);
      UsersModel.findById(user, function (err, docs) {
        if (err) {
          console.log(err);
        }
        else {

          // console.log(docs);
          var mailOptions = {
            from: 'projectaclsp2@gmail.com',
            to: docs.Email,
            subject: 'Canceled Reservation',
            text: 'This mail is to Inform you that you reservation with number :' + id + ' has been cancelled' + '  TotalPrice is ' + docs.TotalPrice
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              // console.log('Email')
            }
          }
          );
        }
      });
    }
  });


  try {

    await Reservationmodel.deleteOne(myquery), function (err, docs) {
      if (err) throw err;
      if (docs) {
        // console.log("true");
      }
    };
    //res.send("item deleted");
  }
  catch (error) {
    console.log(error);
  }

});
App.put('/updateResDep', async (req, res) => {

  const reservation = req.body;

  var num = mongoose.Types.ObjectId(reservation._id);
  delete reservation._id;
  const nid = { _id: num };
  try {

    await Reservationmodel.updateOne(nid, reservation);

    res.send("Updated!");


  } catch (err) {
    console.log(err);
  }

});
App.get('/reservationsgetBooking', async (req, resp) => {
  const userId = '61bff21874e339983be37a00';
  // console.log("dakhal");
  const Query = { UserId: userId };
  Reservationmodel.find(Query, (err, docs) => {

    resp.send(docs);

  })
});

App.get('/reservationsgetFlights', async (req, resp) => {
  const id = req.query.flightId;
  // console.log(id);
  Flightmodel.findById(id, (err, doc) => {



    resp.send(doc);
  }
  );
}
);
App.put('/updateResRet', async (req, res) => {

  const reservation = req.body;
  console.log(reservation);
  var num = mongoose.Types.ObjectId(reservation._id);
  delete reservation._id;

  const nid = { _id: num };
  console.log(nid);
  try {

    await Reservationmodel.updateOne(nid, reservation);

    res.send("Updated!");


  } catch (err) {
    console.log(err);
  }

});

App.put('/updateseats', async (req, res) => {

  const flight = req.body;

  var num = mongoose.Types.ObjectId(flight._id);
  delete flight._id;
  const nid = { _id: num };
  console.log(flight);
  try {

    await Flightmodel.updateOne(nid, flight);


  } catch (err) {
    console.log(err);
  }

});

App.delete("/delete/:id", async (req, res) => {
  // console.log(req.params.id);
  var id = req.params.id;
  id = mongoose.Types.ObjectId(id);
  var myquery = { _id: id };

  try {

    await Flightmodel.deleteOne(myquery), function (err, docs) {
      if (err) throw err;
      if (docs) {
        // console.log("true");
      }
    };
    res.send("item deleted");
  }
  catch (error) {
    console.log(error);
  }


});

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


App.get('/searchTrip', async (req, res) => {

  const searchCriteria = req.query;
  // console.log(searchCriteria);

  if (searchCriteria.cabin == "economy") {
    await Flightmodel.find({
      From: searchCriteria.from,
      To: searchCriteria.to,
      FlightDate: searchCriteria.departureDate,
      NumberOfEconomySeats: { $gte: searchCriteria.numberOfPassengers },
    }, (err, result) => {
      if (!err) {
        // console.log(result);
        res.send(result);
      }
    }).clone()
  } else if (searchCriteria.cabin == "business") {
    await Flightmodel.find({
      From: searchCriteria.from,
      To: searchCriteria.to,
      FlightDate: searchCriteria.departureDate,
      NumberOfBusinessSeats: { $gte: searchCriteria.numberOfPassengers },
    }, (err, result) => {
      if (!err) {
        // console.log(result);
        res.send(result);
      }
    }).clone()
  } else if (searchCriteria.cabin == "first") {
    await Flightmodel.find({
      From: searchCriteria.from,
      To: searchCriteria.to,
      FlightDate: searchCriteria.departureDate,
      NumberOfFirstSeats: { $gte: searchCriteria.numberOfPassengers },
    }, (err, result) => {
      if (!err) {
        // console.log(result);
        res.send(result);
      }
    }).clone()
  }

});


App.post('/confirmReservation', async (req, res) => {

  const reservationData = req.body;
  const reservation = new Reservationmodel({
    UserId: reservationData.userId,
    DepFlight: reservationData.selectedFlightIDDep,
    RetFlight: reservationData.selectedFlightIDRet,
    NumSeats: reservationData.numberOfPassengers,
    Cabin: reservationData.cabin,
    SeatsDep: [],
    SeatsRet: [],
    TotalPrice: reservationData.totalPrice,
  });
  await reservation.save();


  //now its time to decrement available seats in table flights
  await Flightmodel.findById(reservationData.selectedFlightIDDep, async (err, depFlight) => {
    if (!err) {

      if (reservationData.cabin == "economy") {
        depFlight.NumberOfEconomySeats = depFlight.NumberOfEconomySeats - reservationData.numberOfPassengers;
      }
      else if (reservationData.cabin == "business") {
        depFlight.NumberOfBusinessSeats = depFlight.NumberOfBusinessSeats - reservationData.numberOfPassengers;
      } else {
        depFlight.NumberOfFirstSeats = depFlight.NumberOfFirstSeats - reservationData.numberOfPassengers;
      }

      await Flightmodel.updateOne({ _id: reservationData.selectedFlightIDDep }, depFlight);

    }
  }).clone();

  await Flightmodel.findById(reservationData.selectedFlightIDRet, async (err, retFlight) => {
    if (!err) {

      if (reservationData.cabin == "economy") {
        retFlight.NumberOfEconomySeats = retFlight.NumberOfEconomySeats - reservationData.numberOfPassengers;
      }
      else if (reservationData.cabin == "business") {
        retFlight.NumberOfBusinessSeats = retFlight.NumberOfBusinessSeats - reservationData.numberOfPassengers;
      } else {
        retFlight.NumberOfFirstSeats = retFlight.NumberOfFirstSeats - reservationData.numberOfPassengers;
      }

      await Flightmodel.updateOne({ _id: reservationData.selectedFlightIDRet }, retFlight);

    }
  }).clone();

  // console.log("reservation added!");
  res.send("reservation Added!");

});

App.get('/Summary/:departureId/:returnId/:num/:Cabin', async (req, res) => {
  // console.log("here");
  //var departureId = req.params.departureId;
  //console.log(departureId);
  //var returnId = req.params.returnId;
  //console.log(returnId);
  const departureId = mongoose.Types.ObjectId(req.params.departureId);
  const returnId = mongoose.Types.ObjectId(req.params.returnId);
  const Query = { _id: { $in: [departureId, returnId] } };
  //console.log(Query);


  Flightmodel.find(Query, (err, docs) => {
    // if(err) throw err;
    if (docs) {
      // console.log(docs);
      res.send(docs);
    }
  })



});

App.get('/Itinerary/:userId/:departureId/:returnId/:num/:Cabin', (req, res) => {
  // console.log("here");
  const userId = req.params.userId;
  const departureId = req.params.departureId;
  const returnId = req.params.returnId;
  const Query = { UserId: userId, DepFlight: departureId, RetFlight: returnId }
  const Obj = {
    arrayOne: [],
    arrayTwo: []
  };

  Reservationsmodel.findOne(Query, (err, docs) => {
    // if(err) throw err;
    if (docs) {
      // console.log(docs);
      Obj.arrayOne.push(docs);
      // console.log("1");
      // console.log(Obj.arrayOne);

    }
  })

  Flightmodel.findById(departureId, (err, docs) => {
    Obj.arrayOne.push(docs);
    // console.log(Obj.arrayOne);

    // a.push(docs);
    // console.log("2");
    // console.log(a);
  })
  Flightmodel.findById(returnId, (err, docs) => {
    Obj.arrayOne.push(docs);
    // console.log(Obj.arrayOne);

    // a.push(docs);
    // console.log("3");
    // console.log(a);
  })
  // console.log(Obj.arrayOne);
  res.send(JSON.stringify(Obj.arrayOne));

});





App.post('/reserve/:userId/:departureId/:returnId/:num/:Cabin', async (req, res) => {


  const userId = req.params.userId;
  const departureId = req.params.departureId;
  const returnId = req.params.returnId;
  // console.log("reserve");
  const Query = { UserId: userId, DepFlight: departureId, RetFlight: returnId }
  // console.log(Query);
  Reservationsmodel.findOne(Query, (err, docs) => {


    if (!docs) {
      const reservation = new ReservationsModel({
        UserId: req.params.userId,
        DepFlight: req.params.departureId,
        RetFlight: req.params.returnId,
        NumSeats: req.params.num,
        Seats: "A1-A2",
        Cabin: req.params.Cabin
      });
      reservation.save();
    }
  })
});


App.put('/removeSeatsDep', async (req, resp) => {
  // console.log(req.body)
  const resid = req.body.resid;
  // console.log(resid);
  var reservation = {};
  Reservationmodel.findById(resid, async function (err, result) {

    reservation = result;
    // console.log(reservation);
    const { DepFlight, SeatsDep, cabin } = reservation;
    var DepSeats = [];
   
    Flightmodel.findById(DepFlight, async function (err, result) {
      if (err) {
        
      }
      else {
        try {
          DepSeats = result.Seats;
          
          DepSeats.forEach(row => {
            row.forEach(seat => {
              if (seat != null) {
                if (SeatsDep.includes(seat.id)) {
                
                  seat.isReserved = false;
                
                }
              }
            })
          });
           console.log(DepFlight);
          var num = mongoose.Types.ObjectId(DepFlight);

          const nid = { _id: num };
          try {
            
             await Flightmodel.updateOne(nid, { Seats: DepSeats });

            


          } catch (err) {
            console.log(err);
          }


        }
        catch (err) {
          resp.send("oops and error occured")
        }

      }
    });
   



    await Flightmodel.findById(DepFlight, async  (err, depFlight) => {
      if (!err) {

        if (cabin == "economy") {
          depFlight.NumberOfEconomySeats = depFlight.NumberOfEconomySeats - DepSeats.length;
        }
        else if (cabin == "business") {
          depFlight.NumberOfBusinessSeats = depFlight.NumberOfBusinessSeats - DepSeats.length;
        } else {
          depFlight.NumberOfFirstSeats = depFlight.NumberOfFirstSeats - DepSeats.length;
        }

        await  Flightmodel.updateOne({ _id: DepFlight }, depFlight);

      }
    }).clone();

    

  }
  );
  const reservationToBeUpdated = {
    SeatsDep : []
  };

  var num = mongoose.Types.ObjectId(req.body.resid);
  const nid = { _id: num };
  try {

    await Reservationmodel.updateOne(nid, reservationToBeUpdated);



  } catch (err) {
    console.log(err);
  }
  resp.send("helllooo");


});
async function  removeSeatsDep(resid){
  {
    // console.log(req.body)
    
    // console.log(resid);
    var reservation = {};
    Reservationmodel.findById(resid, async function (err, result) {
  
      reservation = result;
      // console.log(reservation);
      const { DepFlight, SeatsDep, cabin } = reservation;
      var DepartureSeats = [];
     
      Flightmodel.findById(DepFlight, async function (err, result) {
        if (err) {
          alert(err);
        }
        else {
          try {
            DepartureSeats = result.Seats;
            
            DepartureSeats.forEach(row => {
              row.forEach(seat => {
                if (seat != null) {
                  if (SeatsDep.includes(seat.id)) {
                  
                    seat.isReserved = false;
                  
                  }
                }
              })
            });
             console.log(DepFlight);
            var num = mongoose.Types.ObjectId(DepFlight);
  
            const nid = { _id: num };
            try {
              console.log(DepartureSeats[4])
               await Flightmodel.updateOne(nid, { Seats: DepartureSeats });
  
              
  
  
            } catch (err) {
              console.log(err);
            }
  
  
          }
          catch (err) {
            console.log(err);
          }
  
        }
      });
     
  
  
  
      await Flightmodel.findById(DepFlight,  async (err, depFlight) => {
        if (!err) {
  
          if (cabin == "economy") {
            depFlight.NumberOfEconomySeats = depFlight.NumberOfEconomySeats - SeatsDep.length;
          }
          else if (cabin == "business") {
            depFlight.NumberOfBusinessSeats = depFlight.NumberOfBusinessSeats - SeatsDep.length;
          } else {
            depFlight.NumberOfFirstSeats = depFlight.NumberOfFirstSeats - SeatsDep.length;
          }
  
           await Flightmodel.updateOne({ _id: DepFlight }, depFlight);
  
        }
      }).clone();
  
      
  
    })
    const reservationToBeUpdated = {
      SeatsDep : []
    };
  
    var num = mongoose.Types.ObjectId(resid);
    const nid = { _id: num };
    try {
  
      await Reservationmodel.updateOne(nid, reservationToBeUpdated);
  
  
  
    } catch (err) {
      console.log(err);
    }
  
   
  
  
  };
}
App.put('/removeSeatsRet', async (req, resp) => {

  // console.log(req.body)
  const resid = req.body.resid;
  // console.log(resid);
  var reservation = {};
  Reservationmodel.findById(resid, async function (err, result) {

    reservation = result;
    // console.log(reservation);
    const { RetFlight, SeatsRet, cabin } = reservation;
    var ReturnSeats = [];
   
    Flightmodel.findById(RetFlight, async function (err, result) {
      if (err) {
        alert(err);
      }
      else {
        try {
          ReturnSeats = result.Seats;
          
          ReturnSeats.forEach(row => {
            row.forEach(seat => {
              if (seat != null) {
                if (SeatsRet.includes(seat.id)) {
                
                  seat.isReserved = false;
                
                }
              }
            })
          });
           console.log(RetFlight);
          var num = mongoose.Types.ObjectId(RetFlight);

          const nid = { _id: num };
          try {
            
             await Flightmodel.updateOne(nid, { Seats: ReturnSeats });

           


          } catch (err) {
            console.log(err);
          }


        }
        catch (err) {
          resp.send("oops and error occured")
        }

      }
    });
   



    await Flightmodel.findById(RetFlight, async  (err, retFlight) => {
      if (!err) {

        if (cabin == "economy") {
          retFlight.NumberOfEconomySeats = retFlight.NumberOfEconomySeats - SeatsRet.length;
        }
        else if (cabin == "business") {
          retFlight.NumberOfBusinessSeats = retFlight.NumberOfBusinessSeats - SeatsRet.length;
        } else {
          retFlight.NumberOfFirstSeats = retFlight.NumberOfFirstSeats - SeatsRet.length;
        }

        await  Flightmodel.updateOne({ _id: RetFlight }, retFlight);

      }
    }).clone();

    

  }
  );
  const reservationToBeUpdated = {
    SeatsRet : []
  };

  var num = mongoose.Types.ObjectId(req.body.resid);
  const nid = { _id: num };
  try {

    await Reservationmodel.updateOne(nid, reservationToBeUpdated);



  } catch (err) {
    console.log(err);
  }
  resp.send("helllooo");

  
});
async function removeSeatsRet (resid){
  // console.log(req.body)
  // console.log(resid);
  var reservation = {};
  Reservationmodel.findById(resid, async function (err, result) {

    reservation = result;
    // console.log(reservation);
    const { RetFlight, SeatsRet, cabin } = reservation;
    var ReturnSeats = [];
   
    Flightmodel.findById(RetFlight, async function (err, result) {
      if (err) {
        
      }
      else {
        try {
          ReturnSeats = result.Seats;
          
          ReturnSeats.forEach(row => {
            row.forEach(seat => {
              if (seat != null) {
                if (SeatsRet.includes(seat.id)) {
                
                  seat.isReserved = false;
                
                }
              }
            })
          });
           console.log(RetFlight);
          var num = mongoose.Types.ObjectId(RetFlight);

          const nid = { _id: num };
          try {
            
             await Flightmodel.updateOne(nid, { Seats: ReturnSeats });

           


          } catch (err) {
            console.log(err);
          }


        }
        catch (err) {
          resp.send("oops and error occured")
        }

      }
    });
   



    await Flightmodel.findById(RetFlight, async  (err, retFlight) => {
      if (!err) {

        if (cabin == "economy") {
          retFlight.NumberOfEconomySeats = retFlight.NumberOfEconomySeats - SeatsRet.length;
        }
        else if (cabin == "business") {
          retFlight.NumberOfBusinessSeats = retFlight.NumberOfBusinessSeats - SeatsRet.length;
        } else {
          retFlight.NumberOfFirstSeats = retFlight.NumberOfFirstSeats - SeatsRet.length;
        }

        await  Flightmodel.updateOne({ _id: RetFlight }, retFlight);

      }
    }).clone();

    

  }
  );
  const reservationToBeUpdated = {
    SeatsRet : []
  };

  var num = mongoose.Types.ObjectId(resid);
  const nid = { _id: num };
  try {

    await Reservationmodel.updateOne(nid, reservationToBeUpdated);



  } catch (err) {
    console.log(err);
  }
  resp.send("helllooo");
}
App.put('/removeSeats', async (req, resp) => {
  // console.log(req.body)
  const resid = req.body.resid;
  // console.log(resid);
  var reservation = {};
  Reservationmodel.findById(resid, async function (err, result) {

    reservation = result;
    // console.log(reservation);
    const { DepFlight, SeatsDep, RetFlight, SeatsRet, cabin } = reservation;
    var DepartureSeats = [];
    var ReturnSeats = [];
    Flightmodel.findById(DepFlight, async function (err, result) {
      if (err) {
        alert(err);
      }
      else {
        try {
          DepartureSeats = result.Seats;
          DepartureSeats.forEach(row => {
            row.forEach(seat => {
              if (seat != null) {
                if (SeatsDep.includes(seat.id)) {
                  // console.log(seat.id);
                  seat.isReserved = false;
                }
              }
            })
          });
          // console.log(DepFlight);
          var num = mongoose.Types.ObjectId(DepFlight);

          const nid = { _id: num };
          try {

            await Flightmodel.updateOne(nid, { Seats: DepartureSeats });

          


          } catch (err) {
            console.log(err);
          }


        }
        catch (err) {
          resp.send("oops and error occured")
        }

      }
    });
    Flightmodel.findById(RetFlight, async function (err, result) {
      if (err) {
        alert(err);
      }
      else {
        try {
          ReturnSeats = result.Seats;
          ReturnSeats.forEach(row => {
            row.forEach(seat => {
              if (seat != null) {
                if (SeatsRet.includes(seat.id)) {
                  seat.isReserved = false;
                }
              }
            })
          });
          var num = mongoose.Types.ObjectId(RetFlight);

          const nid = { _id: num };
          try {
            // console.log(ReturnSeats);
            await Flightmodel.updateOne(nid, { Seats: ReturnSeats });



          } catch (err) {
            console.log(err);
          }

        }
        catch (err) {

        }

      }
    });



    await Flightmodel.findById(DepFlight, async (err, depFlight) => {
      if (!err) {

        if (cabin == "economy") {
          depFlight.NumberOfEconomySeats = depFlight.NumberOfEconomySeats - SeatsDep.length;
        }
        else if (cabin == "business") {
          depFlight.NumberOfBusinessSeats = depFlight.NumberOfBusinessSeats - SeatsDep.length;
        } else {
          depFlight.NumberOfFirstSeats = depFlight.NumberOfFirstSeats - SeatsDep.length;
        }

        await Flightmodel.updateOne({ _id: DepFlight }, depFlight);

      }
    }).clone();

    await Flightmodel.findById(RetFlight, async (err, retFlight) => {
      if (!err) {

        if (cabin == "economy") {
          retFlight.NumberOfEconomySeats = retFlight.NumberOfEconomySeats - SeatsRet.length;
        }
        else if (cabin == "business") {
          retFlight.NumberOfBusinessSeats = retFlight.NumberOfBusinessSeats - SeatsRet.length;
        } else {
          retFlight.NumberOfFirstSeats = retFlight.NumberOfFirstSeats - SeatsRet.length;
        }

        await Flightmodel.updateOne({ _id: RetFlight }, retFlight);

      }
    }).clone();

  })


});

App.get('/ticket', async (req, resp) => {

  const id = req.query.Id;
  // console.log(id);
  Reservationmodel.findById(id, (err, docs) => {
    // console.log(docs);
    resp.send(docs);

  })
});
App.get('/ticketBooking', async (req, resp) => {

  const id = req.query.Id;
  // console.log(id);
  Reservationmodel.findById(id, (err, docs) => {
    // console.log(docs);
    resp.send(docs);

  })
});


//const flightaya = new Flightmodel({
//   From: "hopa",
//   To: "opa",
//   FlightDate: "aywa",
//   FlightNumber: "13",
//   NumberOfEconomySeats: "14",
//   NumberOfBusinessSeats: "15",
//   NumberOfFirstSeats: "16",
//   ArrivalTime: "11:00",
//   DepartureTime: "12:00",
//   Seats: [
//     [{ id: 1, number: 1, isSelected: true, tooltip: 'Reserved by you' }, { id: 2, number: 2, tooltip: 'Cost: 15$' }, null, { id: 3, number: '3', isReserved: true, orientation: 'east', tooltip: 'Reserved by Rogger' }, { id: 4, number: '4', orientation: 'west' }, null, { id: 5, number: 5 }, { id: 6, number: 6 }],
//     [{ id: 7, number: 1, isReserved: true, tooltip: 'Reserved by Matthias Nadler' }, { id: 8, number: 2, isReserved: true }, null, { id: 9, number: '3', isReserved: true, orientation: 'east' }, { id: 10, number: '4', orientation: 'west' }, null, { id: 11, number: 5 }, { id: 12, number: 6 }],
//     [{ id: 13, number: 1 }, { id: 14, number: 2 }, null, { id: 15, number: 3, isReserved: true, orientation: 'east' }, { id: 16, number: '4', orientation: 'west' }, null, { id: 17, number: 5 }, { id: 18, number: 6 }],
//     [{ id: 19, number: 1, tooltip: 'Cost: 25$' }, { id: 20, number: 2 }, null, { id: 21, number: 3, orientation: 'east' }, { id: 22, number: '4', orientation: 'west' }, null, { id: 23, number: 5 }, { id: 24, number: 6 }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//     [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
//   ]

// });
// flightaya.save();





