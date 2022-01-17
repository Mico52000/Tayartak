const mongoose = require('mongoose');


const Seat = new mongoose.Schema({
    type: Object,
    id : Number,
    number: Number,
    isReserved: { type: Boolean, default: false },
    Cost : Number,
    Cabin:String

    
});
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

    DepartureTime :{
        type : String
    },
    
    ArrivalTime :{
         type :String
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
   
    Seats : [[Seat]],

    PriceEconomy: {
        type: Number
    },
    PriceBusiness: {
        type: Number
    },
    PriceFirst: {
        type: Number
    },
   
});
									
		


const FlightModel = mongoose.model('flights',FlightSchema)
module.exports = FlightModel;