import React from 'react'
import {useState,useContext, createContext, useEffect} from 'react';
import {ethers} from 'ethers';
import { AppState } from "./App";
import Abi from './Records.json'
export const RegisterPatient = () => {
    const App = useContext(AppState);
    const ethereum=App.ethereum;
    const cadd=App.cadd;
    const [pname,setPname]=useState("");
    const [age,setAge]=useState("");
    const [email,setEmail]=useState("");
    const [aadhar,setAadhar]=useState("");
    const [mobile,setMobile]=useState("");


    const Register=async()=>{
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        console.log(accounts[0]);
        console.log(ethers);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const contract=new ethers.Contract(cadd,Abi,signer);
        try{
            await contract.addPatient(pname,age,email,mobile,aadhar,accounts[0]);
            console.log("success");
        }
        catch(error){
            console.log(error);
        }
        
    
      }
  return (
    <div>
       <input type='text' placeholder='Enteryour name' onChange={(e)=>{setPname(e.target.value)}}/>
       <input type='text' placeholder='Enter your age' onChange={(e)=>{setAge(e.target.value)}}/>
       <input type='text' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)}/>
       <input type='text' placeholder='Enter Mobile.No' onChange={(e)=>setMobile(e.target.value)}/>
       <input type='text' placeholder='Enter your aadhar number' onChange={(e)=>setAadhar(e.target.value)}/>
       <button onClick={Register}>Register</button>
       

    </div>
  )
}
