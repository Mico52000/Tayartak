const mongoose = require('mongoose')
const ReservationsSchema = new mongoose.Schema({
UserId :{

    type: String
  },
  
  DepFlight :
  {
      type : String
  },
 
  
  RetFlight :{

      type : String
  },
  NumSeats :{

      type : Number
  },
  Cabin : {
      type: String
  },
  TotalPrice : {
      type : Number
  },CabinDep:{
    type:String
},
CabinRet:{
      type:String
},
  SeatsDep : [],
  SeatsRet:[],
  
});
                                  
                                      
		


const ReservationsModel = mongoose.model('reservations',ReservationsSchema)
module.exports = ReservationsModel;