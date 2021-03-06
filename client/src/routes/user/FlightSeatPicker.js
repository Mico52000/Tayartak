
import {Component} from  'react';
import SeatPicker from '../../Components/user/SeatPick/index.js'
import Axios from 'axios';
import './FlightSeatPicker.css'
import Button from '@mui/material/Button';


export default class FlightSeatPicker extends Component {

    FlightSeatPicker(){
        
        
      
    }
    state = {
        loading: false,
        MaxSeats:3,
        CabinDep: "",
        CabinRet: "",
        DepFlightId: "",
        RetFlightId:"",
        DatabaserowsDep:[],
        DatabaserowsRet:[],
        DepRows : [],
        retRows :[],
        DepSeats : [],
        retSeats : [],
        DisablebuttonA:false,
        DisablebuttonB:false,
        DisablebuttonC :true,
        departureId :"",
        returnId :"",
        Cab :"",
        TotalPrice :0
      }
     
    componentDidMount(){
      const {bookingNumber,sessionIden} = this.props;
      console.log(sessionIden);
      Axios.get(`http://localhost:8000/session/${sessionIden}`).then(res =>{
        this.setState({departureId : res.data.metadata.DepId,
                        returnId : res.data.metadata.RetId,
                        
                         Cab :res.data.metadata.Cabin,
                        TotalPrice : res.data.metadata.TotalPrice}
                      )
                      }).catch(err =>{console.log(err)});



        Axios.get("http://localhost:8000/searchReservation",{
            params: {resid:bookingNumber}
          }).then((resp)=>{this.setState({MaxSeats: resp.data.NumSeats,DepFlightId : resp.data.DepFlight,RetFlightId:resp.data.RetFlight});
           this.generateRows(resp.data.DepFlight,resp.data.RetFlight);
           this.setState({CabinDep : resp.data.CabinDep, CabinRet: resp.data.CabinRet});
           if(resp.data.SeatsDep.length>0)
              this.setState({DisablebuttonA:true});
            if(resp.data.SeatsRet.length>0)
              this.setState({DisablebuttonB:true});
          }).catch((err)=> alert(err));
           
    };

    generateRows = ( depFlight,  retFlight) =>{
        Axios.get("http://localhost:8000/searchflightbyId",{
      params: {flightid:depFlight}
      
    }).then((resp)=>{
      
        this.setState({DatabaserowsDep:resp.data.seats})
        var seats = resp.data.seats;
        var rows = [];
       for(let i=0;i<seats.length;i++){
           var row = [];
        seats[i].forEach(element => {
          if(element==null)
          row.push(null)
          else{
            console.log(element.Cabin.localeCompare(this.state.ReservationCabin));
            var seat ={
              id:element.id,
              number: element.number,
              isReserved: element.isReserved,
              isWrongCabin:(element.Cabin.localeCompare(this.state.CabinDep)==0)? false : true,
              tooltip: (element.Cabin.localeCompare(this.state.CabinDep)==0 || (element.isReserved ==true))? "": `You did not reserve the Cabin  : ${element.Cabin}, you can only pick ${this.state.CabinDep} seats `,
              Cabin:element.Cabin,


          }
          row.push(seat);
          }
        });
        rows.push(row);
        

       }
       this.setState({DepRows:rows});
    }).catch((err)=> alert(err));



    Axios.get("http://localhost:8000/searchflightbyId",{
      params: {flightid:retFlight}
      
    }).then((resp)=>{
      
        this.setState({DatabaserowsRet:resp.data.seats})
        var seats = resp.data.seats;
        var rows = [];
       for(let i=0;i<seats.length;i++){
           var row = [];
        seats[i].forEach(element => {
          if(element==null)
          row.push(null)
          else{
            var seat ={
              id:element.id,
              number: element.number,
              isReserved: element.isReserved,
              isWrongCabin:(element.Cabin.localeCompare(this.state.CabinRet)==0)? false : true,
              tooltip: (element.Cabin.localeCompare(this.state.CabinRet)==0 || (element.isReserved ==true))  ? "": `You did not reserve the Cabin  : ${element.Cabin}, you can only pick ${this.state.CabinRet} seats `,
              Cabin:element.Cabin,



          }
          row.push(seat);
          }
        });
        rows.push(row);
        

       }
       this.setState({retRows:rows});
    }).catch((err)=> alert(err));


    };
    addSeatCallback = ({ row, number, id }, addCb) => {
        this.setState({
          loading: true
        }, async () => {
          await new Promise(resolve => setTimeout(resolve, 1500))
          const newTooltip = ""
          addCb(row, number, id, newTooltip)
          this.setState({ loading: false })
        })
      }
     
      addSeatCallbackContinousCaseDep = ({ row, number, id }, addCb, params, removeCb) => {
        this.setState({
          loading: true
        }, async () => {
          if (removeCb) {
            await new Promise(resolve => setTimeout(resolve, 750))
           
            removeCb(params.row, params.number)
            this.setState({DepSeats :  this.state.DepSeats.filter(function(f) { return f !== params.id })});
            console.log(this.state.DepSeats);
          }
          await new Promise(resolve => setTimeout(resolve, 750))
          const newTooltip = ``
          addCb(row, number, id, newTooltip);
          this.setState({DepSeats :  this.state.DepSeats.concat([id])});
          this.setState({ loading: false })
          console.log(this.state.DepSeats);
        })
      }
      addSeatCallbackContinousCaseRet = ({ row, number, id }, addCb, params, removeCb) => {
        this.setState({
          loading: true
        }, async () => {
          if (removeCb) {
            await new Promise(resolve => setTimeout(resolve, 750))
            console.log(`Removed seat ${params.number}, row ${params.row}, id ${params.id}`)
            removeCb(params.row, params.number)
            this.setState({retSeats :  this.state.retSeats.filter(function(f) { return f !== params.id })});
            console.log(this.state.DepSeats);
          }
          await new Promise(resolve => setTimeout(resolve, 750))
          
          const newTooltip = ``
          addCb(row, number, id, newTooltip);
          this.setState({retSeats :  this.state.retSeats.concat([id])});
          this.setState({ loading: false })
          console.log(this.state.retSeats);
        })
      }
     
      removeSeatCallbackDep = ({ row, number, id }, removeCb) => {
        this.setState({
          loading: true
        }, async () => {
          await new Promise(resolve => setTimeout(resolve, 1500))
          console.log(`Removed seat ${number}, row ${row}, id ${id}`)
          // A value of null will reset the tooltip to the original while '' will hide the tooltip
          const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
          removeCb(row, number, newTooltip)
          this.setState({DepSeats :  this.state.DepSeats.filter(function(f) { return f !== id })});
          this.setState({ loading: false })
        })
      }
      removeSeatCallbackRet = ({ row, number, id }, removeCb) => {
        this.setState({
          loading: true
        }, async () => {
          await new Promise(resolve => setTimeout(resolve, 1500))
          console.log(`Removed seat ${number}, row ${row}, id ${id}`)
          // A value of null will reset the tooltip to the original while '' will hide the tooltip
          const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
          this.setState({retSeats :  this.state.retSeats.filter(function(f) { return f !== id })});
          removeCb(row, number, newTooltip)
          this.setState({ loading: false })
        })
      }
      departureSeatsClick =(e) => {
        
        if(this.state.DepSeats.length!=this.state.MaxSeats)
            {
              alert(`Please select ${this.state.MaxSeats} for the departure flight`);
              return
              
            }
        const {bookingNumber} = this.props;
        Axios.put("http://localhost:8000/updateResDep",{
          _id : bookingNumber,
          SeatsDep:this.state.DepSeats}).then(()=>{
          alert("Flight Updated");
        
      });
      

      var databaserowsnew = this.state.DatabaserowsDep
      for(let i=0;i<databaserowsnew.length;i++){
        databaserowsnew[i].forEach(element => {
       if(element!=null){
         if(this.state.DepSeats.includes(element.id))
         {
           element.isReserved=true;
           
         }
        }
     });
      };
      
      this.setState({DatabaserowsDep:databaserowsnew});
      const flight={
        _id:this.state.DepFlightId,
        Seats:this.state.DatabaserowsDep
      }
      Axios.put("http://localhost:8000/updateseats",flight).then(()=>{
          
      });




      window.location.reload(false);

    };


      returnSeatsClick =(e) => {
        if(this.state.retSeats.length!=this.state.MaxSeats)
            {
              alert(`Please select ${this.state.MaxSeats} for the return flight`);
              return
              
            }
        const {bookingNumber} = this.props;
        Axios.put("http://localhost:8000/updateResRet",{
          _id : bookingNumber,
          SeatsRet:this.state.retSeats}).then(()=>{
          alert("Flight Updated");
      });

      var databaserowsnew = this.state.DatabaserowsRet
      for(let i=0;i<databaserowsnew.length;i++){
        databaserowsnew[i].forEach(element => {
       if(element!=null){
         if(this.state.retSeats.includes(element.id))
         {
           element.isReserved=true;
           
         }
        }
     });
      };
      
      this.setState({DatabaserowsRet:databaserowsnew});
      const flight={
        _id:this.state.RetFlightId,
        Seats:this.state.DatabaserowsRet
      }
      Axios.put("http://localhost:8000/updateseats",flight).then(()=>{
          
      });




      window.location.reload(false);


      };
     
      render() {
        const {DepRows,retRows,loading} = this.state;
        console.log(DepRows);
        return (
          <div className='Container'> 
      <h1>Departure flight seat Picker </h1>
            <div className='seatPicker'>
              <SeatPicker key={this.state.DepRows}
                addSeatCallback={this.addSeatCallbackContinousCaseDep}
                removeSeatCallback={this.removeSeatCallbackDep}
                rows={DepRows}
                maxReservableSeats={this.state.MaxSeats}
                alpha
                visible
                selectedByDefault={false}
                loading={loading}
                tooltipProps={{ multiline: true }}
                continuous
              />
            </div>

            <p>*If the button is greyed out then this reservation has already booked seats</p>
            <Button disabled={this.state.DisablebuttonA} variant="contained" onClick={this.departureSeatsClick}>Submit departure tickets</Button>

            <h1>Return flight seat Picker </h1>
            <div className='seatPicker'>
              <SeatPicker key={this.state.retRows}
                addSeatCallback={this.addSeatCallbackContinousCaseRet}
                removeSeatCallback={this.removeSeatCallbackRet}
                rows={retRows}
                maxReservableSeats={this.state.MaxSeats}
                alpha
                visible
                selectedByDefault={false}
                loading={loading}
                tooltipProps={{ multiline: true }}
                continuous
              />
            </div>


            <p>*If the button is greyed out then this reservation has already booked seats</p>
            <Button disabled={this.state.DisablebuttonB} variant="contained" onClick={this.returnSeatsClick}>Submit return tickets</Button>
            <div>
                
              <Button  href ={`/user/Itinerary/${this.props.bookingNumber}/${this.state.departureId}/${this.state.returnId}/${this.state.Cab}/${this.state.TotalPrice}/${this.state.DepSeats}/${this.state.retSeats}`} >View Your Itinerary</Button>
              </div>
          </div>
        )
      }
  }
