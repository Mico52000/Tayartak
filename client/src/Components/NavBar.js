import React , {Component} from 'react'
import './NavBar.css'
import 'tachyons';


export default class SearchBox extends Component{
    render(){
        
        return(
          <div className="margin">
            <header class=" navbarbg fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l ">
            <nav class="f6 fw6 ttu tracked">
            <a class="link dim white dib mr3" href="/" title="Home">Home</a>
              <a class="link dim white dib mr3" href="/search" title="Search">Search</a>
              <a class="link dim white dib mr3" href="/addflight" title="Search">Add Flight</a>
              <a class="link dim white dib mr3" href="/displayall" title="Search">Display All</a>
            </nav>
          </header>
          </div>
            
        )
    }
}