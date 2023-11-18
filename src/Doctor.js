import React from 'react'
import {useState,useContext, createContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {ethers} from 'ethers';
import { AppState } from "./App";
import Abi from './Records.json'
// import { PatientData } from './components/PatientData';
import "./components/Allcss.css"
import { PatientData } from './components/PatientData';
const UserState=createContext();
export const Doctor = () => {
    const [aadharn,setAadharn]=useState("");
    const App = useContext(AppState);
    const [add,setAdd]=useState(false);
    // const ethereum=App.ethereum;
    // const cadd=App.cadd;
    // const [user,setUser]=useState("");
    const [pDetails,setPatientDetails]=useState([]);
    const [data,setPatientData]=useState([]);
    const [fetch,fetchstate]=useState(false);
    const [ad,setad]=useState(false);
    const [adac,setadac]=useState("");
    // const cadd="0xc9D2f452eA84F06d36fa86850A8cDdEF79A42524";
    const cadd=App.cadd;
  const {ethereum}=window;
 const sendData=()=>{
  if(ad==false){
    setad(true);
  }
  else{
    setad(false);
  }
  // console.log("Rakshit" +aadharn+ adac);
  // window.location.href="/PatientData"
  // setad(true);
 }
    const getDetails=async()=>{
        console.log(App.ethereum)
        // console.log(aadhar);
      
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        const provider=new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const contract=new ethers.Contract(cadd,Abi,signer);
        const acc=await contract.getAccountByAadhar(aadharn);
        console.log(acc);
        App.setAadhar(aadharn);
        App.setadac(acc);
        setadac(acc);
        App.setUser(acc);
        const ydata=await contract.getPatientData(acc);
        const xdata=await contract.getDetails(acc);
        fetchstate(true);
        console.log(xdata.name.length);
        if(xdata.name.length>0){
          setAdd(true);
        }
        else{
          setAdd(false);
        }

        var y = [...ydata].reverse();

        // console.log(data.mobile);
        setPatientDetails(xdata);
        setPatientData(y);
        console.log(ydata);
        
        
    }
  
   
  return (
    <>
    {/* <UserState.Provider value={{aadhar,setAadhar,adac,setadac}}> */}
    <div className='root'>
     
    <div className='align'>
   
<div class="bg-white">
    <div class="max-w-3xl px-6 py-16 mx-auto text-center">
        <h1 class="text-3xl  text-gray-800 dark:text-gray-600 font-semibold">Aadhar Number</h1>
        {/* <h1 class="max-w-md mx-auto mt-5 text-gray-500 dark:text-gray-400">Aadhar Number </h1> */}

        <div class="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
            <input id="email" type="text" class="px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="12 digit aadhar number"
             onChange={(e)=>{
              setAadharn(e.target.value)
            }}/>

            <button onClick={getDetails} class="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md sm:mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Fetch Data
            </button>
        </div>
    </div>
</div>

        {
          fetch?
        
        <div className='tab'>
        <table >
                  <tr>
                    <td><div className='idata font-medium text-gray-900'>Name:</div><div className='pdata font-medium text-gray-900'>{pDetails.name}</div></td>
                    <td><div className='idata font-medium text-gray-900'>Age:</div><div className='pdata font-medium text-gray-900'>{pDetails.age}</div></td>
                  </tr>
                  <tr>
                    <td><div className='idata font-medium text-gray-900'>Address:</div><div className='pdata font-medium text-gray-900'>{pDetails.hadd}</div></td>
                    <td> <div className='idata font-medium text-gray-900'>Email:</div><div className='pdata font-medium text-gray-900'>{pDetails.email}</div> </td>
                  </tr>
                  <tr>
                    <td><div className='idata font-medium text-gray-900'>Mobile No.:</div><div className='pdata font-medium text-gray-900'>{pDetails.mobile}</div></td>
                    <td><div className='idata font-medium text-gray-900'>Aadhar:</div><div className='pdata font-medium text-gray-900'>{pDetails.aadhar}</div></td>
                  </tr>
  
                </table>
              

                {
                  add ?
                  <a
                  className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring w-full text-center cursor-pointer"
                 
                  onClick={sendData}
                >
                  <span
                    className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                  ></span>
                
                  <span
                    className="relative text-sm font-bold text-indigo-600 transition-colors group-hover:text-white text-center "
                  >
                    Add Data
                  </span>
                </a>
                :
                <div></div>
             }
           {
            ad?
                <PatientData aadhar={aadharn} accnt={adac}/>
                :
                <div></div>
           }
         
   <div className='tab2'>
  
  <div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            S.No
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Description
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Physician
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Date
          </th>
          <th className="px-4 py-2">Attachment</th>
        </tr>
      </thead>
  
  {
  data.map((e)=>{
      return(
        <tbody className="divide-y divide-gray-200">
        
        <tr>
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {e.sno.toString()}
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.description}</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.doctor}</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.date}</td>
          <td className="whitespace-nowrap px-4 py-2">
            <a
              href={`https://infura-ipfs.io/ipfs/${e.hash}`}
              className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              View
            </a>
          </td>
        </tr>
        </tbody>
      )
  
  })}
  </table>
  </div>
  </div>
                </div>
                :
                <div></div>
                        }
          

        
    </div>
    
   
    </div>
    {/* </UserState.Provider> */}
    </>
  )
}
export {UserState};