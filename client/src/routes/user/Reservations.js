import { Component } from 'react';
import 'tachyons';
import Axios from 'axios';
//import CardList from '../Components/CardList.js';
//import NavBar from '../Components/NavBar.js';
import ResList from '../../Components/user/Reslist.js'
export default class Reservations extends Component{
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
            TotalPrice :0,
            token:sessionStorage.getItem("accessToken"),
        loggedUser:JSON.parse(sessionStorage.getItem("loggedUser"))._id
        }

    }
    componentDidMount(){
        Axios.get("http://localhost:8000/reservationsgetBooking",{
      params: {id:this.state.loggedUser}
    }).then((resp)=>{this.setState({data : resp.data})}).catch((err)=> alert(err));

    }


    render(){
       
        
        return (
            <div>
                <ResList bookings ={this.state.data} />
            </div>
            
        )
        
    }
}