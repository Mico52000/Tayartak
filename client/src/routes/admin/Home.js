import 'tachyons';
import './Home.css';
import {Component} from  'react';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
export default class Home extends Component {
    constructor(){
      super();
      this.state = {
        token:sessionStorage.getItem("accessToken"),
        loggedUser:JSON.parse(sessionStorage.getItem("loggedUser"))
      }
    }
  
    render(){
      return (
        <div className="Home">
          


          <div className='background' ></div>
          <CssBaseline />
            {/* <h2>Welcome to the user's homepage!</h2> */}
           
            {/* {this.state.token}
            <p></p> */}
            {/* {this.state.loggedUser.FirstName}
            {this.state.loggedUser.Type} */}
            
            
          
    
        </div>
      );
  }
  }