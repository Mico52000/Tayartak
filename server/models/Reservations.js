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
  Seats :{

      type : String
  }
  
});
                                  
                                      
		


const ReservationsModel = mongoose.model('reservations',ReservationsSchema)
module.exports = ReservationsModel;