import 'tachyons';
import './Home.css';
import {Component} from  'react';
import NavBar from '../Components/NavBar.js'

export default class Home extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
  
    render(){
      return (
        <div className="Home">
          
            <h2>Welcome to the homepage!</h2>
            
        </div>
      );
  }
  }
  
  