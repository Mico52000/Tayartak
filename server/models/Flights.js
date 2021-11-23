const mongoose = require('mongoose')

const FlightSchema = new mongoose.Schema({
   
    FlightDate :{

      type: String
    },
    
    From :
    {
        type : String
    },
   
    
    To :{

        type : String
    },
    FlightNumber :{

        type : String
    },
    NumberOfEconomySeats :{

        type : Number
    },
    
    NumberOfBusinessSeats :{

       type : Number 
    },
     
    NumberOfFirstSeats :{

         type : Number
    },
    ArrivalTime :{
         type :String
    },
    DepartureTime :{
        type : String
    }
   
});
									
		


const FlightModel = mongoose.model('flights',FlightSchema)
module.exports = FlightModel