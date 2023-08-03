import React, { useEffect } from 'react'
import "../App.css";
import  { useContext, useState } from 'react'
import img from "../assets/img2.jpeg"
import img2 from "../assets/img3.jpeg"
import "./Allcss.css"
import { Link, Navigate } from 'react-router-dom'
import MetamaskPNG from "../assets/metamask.png"
import AppPNG from "../assets/app.png"
import { AppState } from '../App';


// import { Apps } from './Metamask';
export const Home = () => {
  
  const App=useContext(AppState);
  // const App2=useContext(Apps);
 const [own,setOwn]=useState(false);
 const [isDoc,setDoc]=useState(false);
 const [pat,setPat]=useState(false);
  const handleDisconnect = () => {
    localStorage.removeItem('cacheKey')
    localStorage.removeItem('cacheNID')
    window.location.href = "/"
  
}
 
useEffect(()=>{
  
  console.log("Home")
  const fetch=async()=>{
    const owner=await App.contract.getOwner();
    console.log(owner);
   
    const accs = await App.ethereum.request({method: "eth_requestAccounts"});
    const isDocs=await App.contract.getDoctorData(accs[0]);
    const isPat=await App.contract.getPatient(accs[0]);
    setPat(isPat);
    setDoc(isDocs);
    
  //  { owner===App.account ?
  //     setOwn(true):
  //     setOwn(false)
  //  }
  if(owner.toLowerCase()==accs[0].toLowerCase()){
    setOwn(true);
  }
    
    
  }
fetch();
},[App.account,App.owner,own])
 
  return (
<>
<div className="login-page">
       <header>
        <h1 className="logo">Medical Records</h1>
           <nav>
              <ul>
              {/* <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
                 <li><a href="#">Contact</a></li> */}
                 <li><button onClick={handleDisconnect}>Disconnect Wallet </button></li>
             </ul>
            </nav>
       </header>
       <div className='imgx'>
<img className='imgxc' src={img2} alt=''/>
</div>
    <div className='hbtn'>
      { isDoc ?
     <Link className="hometag" to={'/Doctor'}>Login as Doctor</Link>
     :
     <div></div>
     }
    
    {
      own ?
      <Link className="hometag" to={'/RegisterDoctor'}>Register Doctor</Link>
      :
      <div></div>
    }
    {
      pat ?
      <Link className='hometag' to={'/Patient'}>Your Data</Link>
      :
      <Link className="hometag" to={'/RegisterPatient'}>Register Patient</Link>
    }
    {/* <Link className="hometag" to={'/Patient'}>Login as Patient</Link> */}
    {/* <Link to={'/Doctor'}>Doctor</Link> */}
    {/* <button onClick={handleDisconnect}>Disconnect</button> */}
    </div>
    </div>
    </>
 

    
  )
}
