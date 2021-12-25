import { useState, useEffect } from "react";
import Axios from 'axios';
import './Update.css';
import { Component } from 'react';
import 'tachyons';
import { useParams } from 'react-router-dom';


function Update() {
  const { id } = useParams();
  console.log(id);
  // const [ListofFlights, setListofFlights]=useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [numberOfEc, setNumberOfEc] = useState(0);
  const [numberOfBus, setNumberOfBus] = useState(0);
  const [numberOfFirst, setNumberOfFirst] = useState(0);
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [economyPrice, seteconomyPrice] = useState("");
  const [businessPrice, setbusinessPrice] = useState("");
  const [firstPrice, setfirstPrice] = useState("");



  const updateFlight = (id) => {
    const flight = {
      From: from, To: to, FlightDate: flightDate, FlightNumber: flightNumber,
       NumberOfEconomySeats: numberOfEc, NumberOfBusinessSeats: numberOfBus,
        NumberOfFirstSeats: numberOfFirst, ArrivalTime: arrivalTime,
         DepartureTime: departureTime, _id: id,
         EconomyPrice:economyPrice, BusinessPrice:businessPrice,
         FirstPrice:firstPrice,
    }
    Axios.put("http://localhost:8000/update", flight).then(() => {
      alert("Flight Updated");
    });


  }


  return (
    <div className="Update">
      <div className="inputs tc">
        <input type="text" placeholder="From" onChange={(event) => { setFrom(event.target.value) }} />
        <input type="text" placeholder="To" onChange={(event) => { setTo(event.target.value) }} />
        <input type="text" placeholder="FlightDate" onChange={(event) => { setFlightDate(event.target.value) }} />
        <input type="text" placeholder="FlightNumber" onChange={(event) => { setFlightNumber(event.target.value) }} />
        <input type="Text" placeholder="DepartureTime" onChange={(event) => { setDepartureTime(event.target.value) }} />
        <input type="Text" placeholder="ArrivalTime" onChange={(event) => { setArrivalTime(event.target.value) }} />
      
        <input type="number" placeholder="NumberOfEconomySeats" onChange={(event) => { setNumberOfEc(event.target.value) }} />
        <input type="number" placeholder="NumberOfBusinessSeats" onChange={(event) => { setNumberOfBus(event.target.value) }} />
        <input type="number" placeholder="NumberOfFirstSeats" onChange={(event) => { setNumberOfFirst(event.target.value) }} />

        <input type="number" required="required" placeholder="Economy Price" onChange={(event) =>  { seteconomyPrice(event.target.value) }}></input>
        <input type="number" required="required" placeholder="Business Price" onChange={(event) =>  { setbusinessPrice(event.target.value) }}></input>
        <input type="number" required="required" placeholder="First Price" onChange={(event) => { setfirstPrice(event.target.value) }}></input>


        {/* <button onClick={()=>{updateFlight(id)}}> Save</button> */}
        <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" onClick={() => { updateFlight(id) }}  >Update</a>
        <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" href={'/admin/displayall'}  >Back</a>

        {/* <button onClick={()=>{updateFlight(id)}}> </button></div> */}
      </div>
    </div>
  );


}




export default Update;