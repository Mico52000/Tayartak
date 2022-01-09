import React , {Component} from 'react'
// import './NavBar.css'
import 'tachyons';


export default class SearchBox extends Component{
    render(){
        
        return(
          <div className="margin">
            <header class=" fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l ">
            <nav class="f6 fw6 ttu tracked">
            <a class="link dim black b f6 f5-ns dib mr3" href="/" title="Site">Tayartak Airlines</a>
            </nav>
          </header>
          </div>
            
        )
    }
}