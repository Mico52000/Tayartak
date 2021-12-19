import { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import 'tachyons';

import AdminNavBar from './Components/admin/NavBar.js'
import UserNavBar from './Components/user/NavBar.js'

import Home from './routes/public/Home.js'

import AdminHome from './routes/admin/Home.js'
import AdminSearch from './routes/admin/Search.js'
import AdminAddFlight from './routes/admin/AddFlight.js'
import AdminDisplayAll from './routes/admin/DisplayAll.js'
import AdminUpdate from './routes/admin/Update.js'


import UserHome from './routes/user/Home.js'
import FlightSeatPickerParent from './routes/user/FlightSeatPickerParent.js';

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
            <Route path="/pickseats/:booking" element={<FlightSeatPickerParent/>} />
          </Routes>

        </div>
      );
    }


    return (

      <div className="App">

        {/* <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/search" element={<AdminSearch />} />
          <Route path="/admin/addflight" element={<AdminAddFlight />} />
          <Route path ='/admin/displayall' element = {<AdminDisplayAll/>}/>
          <Route path="/admin/update/:id" element={<AdminUpdate/>} /> 
     
        </Routes> */}


        {/* here add routes where you dont want a navbar displayed */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="admin/*" element={<AdminRoutes />} />
          <Route path="user/*" element={<UserRoutes />} />
        </Routes>

      </div>
    );
  }
}

