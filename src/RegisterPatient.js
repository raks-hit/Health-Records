import React from 'react'
import {useState,useContext, createContext, useEffect} from 'react';
import {ethers} from 'ethers';
import { AppState } from "./App";
import Abi from './Records.json'
import Loader from './components/Loader'
export const RegisterPatient = () => {
    const App = useContext(AppState);
    const ethereum=App.ethereum;
    const cadd=App.cadd;
    const [pname,setPname]=useState("");
    const [age,setAge]=useState("");
    const [email,setEmail]=useState("");
    const [aadhar,setAadhar]=useState("");
    const [mobile,setMobile]=useState("");
const [address,setAddress]=useState("");
const [loader, setLoader] = useState(false);

    const Register=async()=>{
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        console.log(accounts[0]);
        console.log(ethers);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const contract=new ethers.Contract(cadd,Abi,signer);
        setLoader(true);
        try{
            await contract.addPatient(pname,age,email,address,mobile,aadhar,accounts[0]);
            setLoader(false);
            console.log("success");
        }
        catch(error){
            console.log(error);
        }
        
    
      }
      if (loader) {
        return (
          <Loader />
        )
    }
  return (
    <div className='root'>
      <div className='head'>Register</div>
    <div className='align'>
       <input type='text' placeholder='Enteryour name' onChange={(e)=>{setPname(e.target.value)}}/>
       <input type='text' placeholder='Enter your age' onChange={(e)=>{setAge(e.target.value)}}/>
       <input type='text' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)}/>
       <input type='text' placeholder='Enter your Address' onChange={(e)=>setAddress(e.target.value)}/>
       <input type='text' placeholder='Enter Mobile.No' onChange={(e)=>setMobile(e.target.value)}/>
       <input type='text' placeholder='Enter your aadhar number' onChange={(e)=>setAadhar(e.target.value)}/>
       <button onClick={Register}>Register</button>
       

    </div>
    </div>
  )
}
