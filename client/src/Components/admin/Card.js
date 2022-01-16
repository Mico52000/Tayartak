import React, { Component } from 'react';

import './Card.css';
import Axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';

export default class Card extends Component {
    constructor() {
        super();
        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick(Id) {
        var result = window.confirm("Are you sure you want to delete this flight?");
        if (result) {
            Axios.delete(`http://localhost:8000/delete/${Id}`
            );
            window.location.reload(false);


        }
    }

    render() {
        const { From, To, Date, Flightnum, ecoseats, bisseats, firstseats, arrivalt, departuret,
            ObjectId, PriceEconomy, PriceBusiness, PriceFirst } = this.props;

        let btn_class = "cardbg tc bg-blue  dib br3 ma2 pa2  shadow-5 w5";

        return (

            < ToggleButton value="" sx={{ maxWidth: 250, minWidth: 250 }}>
                <div className={btn_class}>

                    <h6>
                        FROM : {From}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TO : {To}
                        <br />
                        FLIGHT DATE : {Date}
                        <br />
                        FLIGHT NUMBER : {Flightnum}
                        <br />
                        DEPARTURE TIME : {departuret}
                        <br />
                        ARRIVAL TIME : {arrivalt}
                        <br />
                        ECONOMY SEATS AVAILABLE : {ecoseats}
                        <br />
                        ECONOMY PRICE : {PriceEconomy}
                        <br />
                        BUSINESS SEATS AVAILABLE : {bisseats}
                        <br />
                        BUSINESS PRICE : {PriceBusiness}
                        <br />
                        FIRST SEATS AVAILABLE : {firstseats}
                        <br />
                        FIRST PRICE : {PriceFirst}
                    </h6>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <a class=" p grow no-underline br-pill ph2 pv2 mb2 dib white bg-dark-blue " href ={`/admin/update/${ObjectId}`} >Update</a>        
                    <a class=" p grow no-underline br-pill ph2 pv2 mb2 dib white bg-dark-blue " onClick={(event) =>this.buttonClick(ObjectId,event)}>Delete</a>
            
                </Box>
                </div>

            </ToggleButton>

        )
    }
}
