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
        <NavBar/>
          
            <h2>Welcome to the homepage!</h2>
            <p>You can do this, I believe in you.</p>
          
    
        </div>
      );
  }
  }
  
  