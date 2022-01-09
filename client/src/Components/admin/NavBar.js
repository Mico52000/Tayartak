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
            <a class="link dim white dib mr3" href="/admin/home" title="Home">Home</a>
              <a class="link dim white dib mr3" href="/admin/search" title="Search">Search</a>
              <a class="link dim white dib mr3" href="/admin/addflight" title="Search">Add Flight</a>
              <a class="link dim white dib mr3" href="/admin/displayall" title="Search">Display All</a>
              <a class="right link dim white dib mr3" href="/signin" title="Search">Sign Out</a>
            </nav>
          </header>
          </div>
            
        )
    }
}