import React from 'react'
import {useState,useContext, createContext, useEffect} from 'react';
import {ethers} from 'ethers';
import { AppState } from "./App";
import Abi from './Records.json'
import "./components/Allcss.css";
export const RegisterDoctor = () => {
    const App = useContext(AppState);
    const ethereum=App.ethereum;
    const cadd=App.cadd;
    const [dname,setDname]=useState("");
    const [qual,setQual]=useState("");
    const [address,setAddress]=useState("");
    const [aadhar,setAadhar]=useState("");
    const [reg,setReg]=useState("");
    const [wadd,setWadd]=useState("");


    const Register=async()=>{
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        // console.log(accounts[0]);
        // console.log(ethers);
        console.log(App.account);
      
        try{
          const e=  await App.contract.addDoctor(dname,qual,address,reg,aadhar,wadd);
          setDname("");
          setQual("");
          setAddress("");
          setAadhar("");
          setReg("");
          setWadd("");
            console.log(e);

        }
        catch(error){
            console.log(error);
        }
        
    
      }
      useEffect(()=>{

      })
  return (
    <div className='root'>
    <div className='head'>Register Doctor</div>
    <div className='align'>
       <input type='text' placeholder='Enter your name' onChange={(e)=>{setDname(e.target.value)}}/>
       <input type='text' placeholder='Enter your qualification' onChange={(e)=>{setQual(e.target.value)}}/>
       <input type='text' placeholder='Enter your Address' onChange={(e)=>setAddress(e.target.value)}/>
       <input type='text' placeholder='Enter Registration No.' onChange={(e)=>setReg(e.target.value)}/>
       <input type='text' placeholder='Enter your aadhar number' onChange={(e)=>setAadhar(e.target.value)}/>
       <input type='text' placeholder='Enter wallet address' onChange={(e)=>{setWadd(e.target.value)}}/>
       <button onClick={Register}>Register</button>

    </div>
    </div>
  )
}
