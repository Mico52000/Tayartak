import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ChangeBooking from './ChangeBooking';
import FlightSeatPicker from "./FlightSeatPicker";
import {useState} from 'react';
import { useEffect } from 'react';
import axios, * as others from 'axios';
function ChangeParent() {
    const { BookingId,Id,num} = useParams();
    //console.log(BookingId);
    // console.log(useParams().state);
    const[from,setFrom] = useState("");
    const[to,setTo]=useState("");
    const[numseats,setNumseats]=useState("");
    const[price,setPrice]=useState("");
    const[ret,setRet]=useState("");
    const[retnum,setRetnum]=useState("");
    const[retarr,setRetarr]=useState("");
    const[retdept,setRetdept]=useState("");
    const[olddepcabin,setOlddepcabin]=useState("");
    const[oldretcabin,setOldretcabin]=useState("");
    const[depprice,setDepprice]=useState("");
    const[retprice,setRetprice]=useState("");
    const[dep,setDep]=useState("");
    const[depnum,setDepnum]=useState("");
    const[deparr,setDeparr]=useState("");
    const[depdept,setDepdept]=useState("");
    const[depcabin,setdepcabin]=useState("");
    const[oldId,setOldId]=useState("");
    const[notchanged,setNotchanged]=useState("");
    // const[lastname,setLastname]=useState("");
    // const[email,setEmail]=useState("");
    // const[passport,setPassport]=useState("");
    useEffect(() => {
        if(num=='1'){
        axios.post("http://localhost:8000/ChangeParent",{
            flightId:Id,
            res:BookingId
         }).then((resp) =>{setFrom(resp.data.from);
            console.log(resp.data)
            setTo(resp.data.to);
            setNumseats(resp.data.numseats);
            setPrice(resp.data.price);
            setRet(resp.data.Rettime);
            setRetnum(resp.data.retnum);
            setRetarr(resp.data.retarrt);
            setRetdept(resp.data.retdept);
            setOlddepcabin(resp.data.olddepCabin);
            setOldretcabin(resp.data.oldretCabin);
            setDepprice(resp.data.depprice);
            setRetprice(resp.data.retprice);
            setOldId(resp.data.oldId);
            setNotchanged(resp.data.notchanged);
        }).catch((err)=> alert(err));
    }else{
        axios.post("http://localhost:8000/ChangeParentRet",{
            flightId:Id,
            res:BookingId
         }).then((resp) =>{setFrom(resp.data.from);
            console.log(resp.data)
            setTo(resp.data.to);
            setNumseats(resp.data.numseats);
            setPrice(resp.data.price);
            setDep(resp.data.Deptime);
            setDepnum(resp.data.Depnum);
            setDeparr(resp.data.Deparrt);
            setDepdept(resp.data.Depdept);
            setOlddepcabin(resp.data.olddepCabin);
            setOldretcabin(resp.data.oldretCabin);
            setDepprice(resp.data.Depprice);
            setRetprice(resp.data.oldprice);
            setOldId(resp.data.oldId);
            setNotchanged(resp.data.notchanged);
        }).catch((err)=> alert(err));
    }
      
    });
    
  return(num=='1')?
   (
    
      <Fragment>
          
          <ChangeBooking bookingNumber = {BookingId} flighId={Id} From={from} To={to} Numseats={numseats} price={price} Ret={ret} Retnum={retnum} Retarr={retarr} Retdep={retdept} oldcabindep={olddepcabin} oldcabinret={oldretcabin} depprice={depprice}  retprice={retprice} num={num} oldId={oldId} notChanged={notchanged} text={"Edit Departure Flight"}/>
      </Fragment>
   
    ):
    
    <Fragment>
          
          <ChangeBooking bookingNumber = {BookingId} flighId={Id} From={from} To={to} Numseats={numseats} price={price} Dep={dep} Depnum={depnum} Deparr={deparr} Depdep={depdept} oldcabindep={olddepcabin} oldcabinret={oldretcabin} depprice={depprice}  retprice={retprice} num={num} oldId={oldId} notChanged={notchanged} text={"Edit Return Flight"}/>
      </Fragment>
   
    
  }
    



export default ChangeParent;