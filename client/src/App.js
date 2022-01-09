import { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import 'tachyons';

import AdminNavBar from './Components/admin/NavBar.js'
import UserNavBar from './Components/user/NavBar.js'

import UserEdit from './routes/user/Edit.js'
import Usereditdata from './routes/user/editdata.js'
import AdminHome from './routes/admin/Home.js'
import AdminSearch from './routes/admin/Search.js'
import AdminAddFlight from './routes/admin/AddFlight.js'
import AdminDisplayAll from './routes/admin/DisplayAll.js'
import AdminUpdate from './routes/admin/Update.js'
import Popup from './routes/user/Popup.js'
import UserHome from './routes/user/Home.js'
import UserBookFlight from './routes/user/bookTrip/BookTrip.js'
import FlightSeatPickerParent from './routes/user/FlightSeatPickerParent.js';
import Reservations from './routes/user/Reservations.js';
import Itinerary from './routes/user/Itinerary.js';

import SignIn from './routes/public/SignIn.js'
import SignUp from './routes/public/SignUp.js'
import GuestBookFlight from './routes/guest/bookTrip/BookTrip.js'

export default class App extends Component {


  render() {


    // here add routes with admin navbar
    function AdminRoutes(){
      return (
        <div>
          <AdminNavBar />
          <Routes>
            <Route path="/home" element={<AdminHome />} />
            <Route path="/search" element={<AdminSearch />} />
            <Route path="/addflight" element={<AdminAddFlight />} />
            <Route path='/displayall' element={<AdminDisplayAll />} />
            <Route path="/update/:id" element={<AdminUpdate />} />
          </Routes>

        </div>
      );
    }


    // here add routes with user navbar
    function UserRoutes(){
      return (
        <div>
          <UserNavBar />
          <Routes>
            <Route path="/home" element={<UserHome />} />
            <Route path="/bookflight" element={<UserBookFlight />} />
            <Route path="/pickseats/:booking" element={<FlightSeatPickerParent/>} />
            <Route path="/edit" element={<UserEdit/>}/>
            <Route path="/editdata/:username/:firstname/:lastname/:email/:passport" element={<Usereditdata/>}/>
            <Route path="/reservations" element ={<Reservations/>} />
            <Route path="/Popup/:id" element={<Popup/>}/>
            <Route path="/viewticket/:BookingId" element={<Itinerary/>}/>
          </Routes>

        </div>
      );
    }


    return (

      <div className="App">

        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="Signin" element = {<SignIn />} />
          <Route path="signup" element = {<SignUp />} />
          <Route path="/guest/bookflight" element = {<GuestBookFlight />} />
          
          {sessionStorage.getItem("loggedUser")!==null? JSON.parse(sessionStorage.getItem("loggedUser")).Type==="admin"?(
            <Route path="admin/*" element={<AdminRoutes />} />
          ):(""):( "")
          }
          {sessionStorage.getItem("loggedUser")!==null? JSON.parse(sessionStorage.getItem("loggedUser")).Type==="user"?(
             <Route path="user/*" element={<UserRoutes />} />
          ):(""):("")
          }

        </Routes>

      </div>
    );
  }
}

