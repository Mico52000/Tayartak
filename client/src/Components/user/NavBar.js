import React , {Component} from 'react'
import './NavBar.css'
import 'tachyons';


export default class SearchBox extends Component{

  handleSignOut(e){
    e.preventDefault();
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('loggedUser');
    window.location.href = '/signin'
  }
    render(){
        
        return(
          <div className="margin">
            <header class=" navbarbgc fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l ">
            <nav class="f6 fw6 ttu tracked">
            <a class="link dim white b f6 f5-ns dib mr3" href="/" title="Site">Tayartak Airlines</a>
            <a class="link dim white dib mr3" href="/user/home" title="Home">Home</a>
            <a class="link dim white dib mr3" href="/user/bookflight" >Book A Flight</a>

              <a class="link dim white dib mr3" href="/user/reservations" title="reservations">My Reservations</a>
              <a class="link dim white dib mr3" href="/user/edit" title="Edit">View Profile</a>
              <a class="link dim white dib mr3" href="/user/editseats/61e5bf1af4b890f18ab04a7f/economy/2/61e34a5a512d74ecf79253e1/0" title="reservations">edit seats</a>
              <a class="link dim white dib mr3" href="/" title="Search">Sign Out</a>
              
              
              <a class="right link dim white dib mr3" onClick={this.handleSignOut} title="Search">Sign Out</a>
             
            </nav>
          </header>
          </div>
            
        )
    }
}