import './App.css';
import {Component} from  'react';
import { Routes, Route } from "react-router-dom";
import 'tachyons';
import Search from './routes/Search.js'
import Home from './routes/Home.js'

export default class App extends Component {


  render(){
    return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      
    
    </div>
  );
}
}

