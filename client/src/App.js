import { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import 'tachyons';
import Search from './routes/Search.js'
import Home from './routes/Home.js'
import AddFlight from './routes/AddFlight.js'
import NavBar from './Components/NavBar.js'
import DisplayAll from './routes/DisplayAll.js'
import Update from'./routes/Update.js'

export default class App extends Component {


  render() {
    return (
      <div className="App">

        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/addflight" element={<AddFlight />} />
          <Route path ='/displayall' element = {<DisplayAll/>}/>
          <Route path="/update/:id" element={<Update/>} /> 
          {/* <Route path="/update" element={<Update />} /> */}
        </Routes>


      </div>
    );
  }
}

