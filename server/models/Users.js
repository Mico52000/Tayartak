const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
   
    Username :{

        type: String
      },
      
      FirstName :
      {
          type : String
      },
     
      
      LastName :{
  
          type : String
      },
      Email :{
  
          type : String
      },
      Passport :{
  
          type : String
      },
      
      Password :{
  
         type : String
      }
       
     
     
  });


const UsersModel = mongoose.model('users',UsersSchema)
module.exports = UsersModel;