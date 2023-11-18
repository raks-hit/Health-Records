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
          window.location.href='/Home';
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
       {/* <input type='text' placeholder='Enter Doctor name' onChange={(e)=>{setDname(e.target.value)}}/>
       <input type='text' placeholder='Enter  qualification' onChange={(e)=>{setQual(e.target.value)}}/>
       <input type='text' placeholder='Enter  Address' onChange={(e)=>setAddress(e.target.value)}/>
       <input type='text' placeholder='Enter Registration No.' onChange={(e)=>setReg(e.target.value)}/>
       <input type='text' placeholder='Enter  aadhar number' onChange={(e)=>setAadhar(e.target.value)}/>
       <input type='text' placeholder='Enter wallet address' onChange={(e)=>{setWadd(e.target.value)}}/>
       <button onClick={Register}>Register</button> */}

   
    <form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Full Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"  onChange={(e)=>{setDname(e.target.value)}}/>
      {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Qualification
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="MBBS" onChange={(e)=>{setQual(e.target.value)}}/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Address
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="******************" onChange={(e)=>setAddress(e.target.value)}/>
      <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
        Registration number
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="******" onChange={(e)=>setReg(e.target.value)}/>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        Aadhar Number
      </label>
      <div class="relative">
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="************" onChange={(e)=>setAadhar(e.target.value)}/>
        {/* <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div> */}
      </div>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        Wallet Address
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0x****" onChange={(e)=>{setWadd(e.target.value)}}/>
    </div>
  </div>
  <div class="md:w-2/3">
      <button onClick={Register} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Register
      </button>
    </div>
</form>
</div>
    </div>
  )
}
