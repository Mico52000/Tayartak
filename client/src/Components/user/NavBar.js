import React , {Component} from 'react'
import './NavBar.css'
import 'tachyons';


export default class SearchBox extends Component{
    render(){
        
        return(
          <div className="margin">
            <header class=" navbarbg fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l ">
            <nav class="f6 fw6 ttu tracked">
            <a class="link dim white b f6 f5-ns dib mr3" href="#" title="Site">Tayartak Airlines</a>
            <a class="link dim white dib mr3" href="/user/home" title="Home">Home</a>
            <a class="link dim white dib mr3" href="/user/bookflight" >Book A Flight</a>
            <a class="link dim white dib mr3" href={`/user/pickseats/${"61c29a921774188e4bd2a4b5"}`} title="Home">Pick seats</a>
              <a class="right link dim white dib mr3" href="/" title="Search">Sign Out</a>


              <a class="link dim white dib mr3" href="/" title="Search">Sign Out</a>
              <a class="link dim white dib mr3" href="/user/edit" title="Edit">View Profile</a>

            </nav>
          </header>
          </div>
            
        )
    }
}