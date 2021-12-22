import React, { Component } from 'react';

import './Card.css';
import ToggleButton from '@mui/material/ToggleButton';


export default class Card extends Component{
    constructor(){
    super();
    }

  
    render()
    {
        const {Flightnum,departuret,arrivalt,tripDuration,price,isToggled,index} = this.props;

        let btn_class = isToggled ? "cardbgToggled tc bg-blue  dib br3 ma2 pa3  shadow-5 w5"  :
         "cardbg tc bg-blue  dib br3 ma2 pa3  shadow-5 w5";
    return(
          
        <ToggleButton value= "" sx={{ maxWidth: 250, minWidth:250 }}
        onClick={() => this.props.handleClick(index)}
        >
        <div className={btn_class}>
            
            <h6>
            Flight Number : {Flightnum}
            <br/>
            Departure Time: {departuret}
            <br/>
            Arrival Time: {arrivalt} 
            <br/>
            Trip Duration: {tripDuration}
            <br/>
            Price: {"$"+price}
            </h6>
          

        </div>

        </ToggleButton>
       
    )
    }
}
