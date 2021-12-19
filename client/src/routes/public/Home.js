import 'tachyons';
import './Home.css';
import { Component } from 'react';


export default class Home extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="Home">

        <h2>Sign in as:</h2>
        {/* later in sprint 3 make this as a 1 sign in page and the backend will determine if the credentials belong to a
        or an admin and route accordingly */}

        <div class="ph3">
          <a class="f4 link dim br1 ph3 pv2 mb2 dib white bg-dark-blue" href={'/user/home'}>User</a>
        </div>
        <div class="ph3">
          <a class="f4 link dim br1 ph3 pv2 mb2 dib white bg-dark-blue" href ={'/admin/home'} >Admin</a>
        </div>


      </div>
    );
  }
}

