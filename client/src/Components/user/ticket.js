import { Component } from 'react';
import 'tachyons';
import Axios from 'axios';
// import CardList from '../Components/CardList.js';
// import NavBar from '../Components/NavBar.js'
import TList from '../user/TList';

export default class ticket extends Component{
    constructor(){
    super();
        this.state ={
            data :[],
            bookingIds :[],
            depFlights :[],
            bookingId : "",        
            depFrom : "",
            depTo :"",
            depDate :"",
            depNumber :"",
            depDtime :"",
            depAtime :"",
            depSeats :[[]],
            Cabin :"",
            numPass : 0,
            retFrom : "",
            retTo :"",
            retDate :"",
            retNumber :"",
            retDtime :"",
            retAtime :"",
            retSeats :[[]],
            TotalPrice :0

        }

    }
    componentDidMount(){
        Axios.get("http://localhost:8000/ticketBooking",{
      params: {Id :this.props.Id}
    }).then((resp)=>{this.setState({data :resp.data})}).catch((err)=> alert(err));

    }


    render(){
       const {Id} =this.props;
        
        return (
            <div>
                <TList bookings ={this.state.data} />
            </div>
            
        )
        
    }
}