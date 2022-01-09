import './AddFlight.css';
import { Component } from 'react';
import Axios from 'axios';
import 'tachyons';


export default class AddFlight extends Component {
    constructor() {
        super();
        this.state = {
            From: null,
            To: null,
            FlightDate: null,
            FlightNumber: null,
            NumberOfEconomySeats: null,
            NumberOfBusinessSeats: null,
            NumberOfFirstSeats: null,
            ArrivalTime: null,
            DepartureTime: null,
            PriceEconomy: null,
            PriceBusiness: null,
            PriceFirst:null,
        }
        this.addFlight = this.addFlight.bind(this);
        this.render = this.render.bind(this);
    }


    addFlight(e){
    
        e.preventDefault();

        Axios.post("http://localhost:8000/addflight",this.state).then((resp)=>{
            alert(resp.data);
            window.location.reload(false);
        }).catch((err) => alert(err));
      }

      
      componentDidMount(){

      }

    render() {
        return (
            <div className="AddFlight">

                <div className="inputs tc">
                    <input type="text" required="required" placeholder="From" onChange={(event) => this.setState({ From: event.target.value })}></input>
                    <input type="text" required="required" placeholder="To" onChange={(event) => this.setState({ To: event.target.value })}></input>
                    <input type="text" required="required" placeholder="Date" onChange={(event) => this.setState({ FlightDate: event.target.value })}></input>
                    <input type="text" required="required" placeholder="Flight Number" onChange={(event) => this.setState({ FlightNumber: event.target.value })}></input>

                    <input type="text" required="required" placeholder="Departure time" onChange={(event) => this.setState({ DepartureTime: event.target.value })}></input>
                    <input type="text" required="required" placeholder="Arrival time" onChange={(event) => this.setState({ ArrivalTime: event.target.value })}></input>
                    
                    <input type="number" required="required" placeholder="Economy Class Seats Available" onChange={(event) => this.setState({ NumberOfEconomySeats: event.target.value })}></input>
                    <input type="number" required="required" placeholder="Business Class Seats Available" onChange={(event) => this.setState({ NumberOfBusinessSeats: event.target.value })}></input>
                    <input type="number" required="required" placeholder="First Class Seats Available" onChange={(event) => this.setState({ NumberOfFirstSeats: event.target.value })}></input>

                    <input type="number" required="required" placeholder="Economy Price" onChange={(event) => this.setState({ PriceEconomy: event.target.value })}></input>
                    <input type="number" required="required" placeholder="Business Price" onChange={(event) => this.setState({ PriceBusiness: event.target.value })}></input>
                    <input type="number" required="required" placeholder="First Price" onChange={(event) => this.setState({ PriceFirst: event.target.value })}></input>

                   
                    <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue" onClick={this.addFlight}>Add Flight</a>

                </div>

            </div>
        );
    }
}


