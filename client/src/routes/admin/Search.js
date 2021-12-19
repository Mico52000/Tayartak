import './Search.css';
import {Component} from  'react';
import CardList from '../../Components/admin/CardList.js';
import Axios from 'axios';
import 'tachyons';


export default class SearchPage extends Component {
  constructor(){
    super();
    this.state = {
       From : null,
      To : null,
      FlightDate : null,
      FlightNumber : null,
      NumberOfEconomySeats : null,
      NumberOfBusinessSeats : null,
      NumberOfFirstSeats : null,
      ArrivalTime : null,
      DepartureTime : null,
      data : []
    }
    this.buttonClick= this.buttonClick.bind(this);
    this.render= this.render.bind(this);
  }

  buttonClick(e){
    
    e.preventDefault();
    Axios.get("http://localhost:8000/search",{
      params: this.state
    }).then((resp)=>{this.setState({data : resp.data})}).catch((err)=> alert(err));

    // Axios.post("http://localhost:8000/addflight",this.state).then(()=>alert('success')).catch((err) => alert(err));

  }

  render(){
    return (
    <div className="SearchPage">
      <div className="inputs tc">
     <input type ="text" placeholder = "From" onChange={(event) => this.setState({From : event.target.value})}></input>
     <input type ="text" placeholder = "To" onChange={(event) => this.setState({To: event.target.value})}></input>
     <input type ="text" placeholder = "Date" onChange={(event) => this.setState({FlightDate : event.target.value})}></input>
     <input type ="text" placeholder = "Flight Number" onChange={(event) => this.setState({FlightNumber : event.target.value})}></input>
    
     <input type ="text" placeholder ="Economy Class Seats Available" onChange={(event) => this.setState({NumberOfEconomySeats : event.target.value})}></input>
     <input type ="text" placeholder ="Business Class Seats Available" onChange={(event) => this.setState({NumberOfBusinessSeats : event.target.value})}></input>
     <input type ="text" placeholder ="First Class Seats Available" onChange={(event) => this.setState({NumberOfFirstSeats : event.target.value})}></input>

     <input type ="text" placeholder ="Arrival time" onChange={(event) => this.setState({ArrivalTime : event.target.value})}></input>
     <input type ="text" placeholder ="Departuer time" onChange={(event) => this.setState({DepartureTime : event.target.value})}></input>



     <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" onClick={this.buttonClick}>Search for flight</a>
     
     {/* {this.state.data.map((flight)=>{return <div>{flight._id}</div>})} */}
      </div>
      <div className ="list">

      <CardList flights = {this.state.data}/>

      </div>
      
    
    </div>
  );
}
}


