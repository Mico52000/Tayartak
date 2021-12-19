import { Component } from 'react';
import 'tachyons';
import Axios from 'axios';
import CardList from '../../Components/admin/CardList.js';
import './DisplayAll.css';

export default class DisplayAll extends Component{
    constructor(){
        super();
        this.state ={
            data : []
        }

    }

    componentDidMount(){
        Axios.get("http://localhost:8000/search",{
      params: {}
    }).then((resp)=>{this.setState({data : resp.data})}).catch((err)=> alert(err));

    }

    render(){
        return (
            <div className='dlist'>
                <CardList flights = {this.state.data}/>
            </div>
            
        )
        
    }
}