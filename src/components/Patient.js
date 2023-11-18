import React from 'react'
import {useState,useContext, createContext, useEffect} from 'react';
import {ethers} from 'ethers';
import { AppState } from "../App";
import Abi from '../Records.json'
import "./Allcss.css"
export const Patient = () => {
    // const [aadhar,setAadhar]=useState();
    const App = useContext(AppState);
    // const ethereum=App.ethereum;
    // const cadd=App.cadd;
    // const cadd="0xc9D2f452eA84F06d36fa86850A8cDdEF79A42524";
  const {ethereum}=window;
  
  const [pDetails,setPatientDetails]=useState([]);
  const [data,setPatientData]=useState([]);
  const [nodata,setnodata]=useState(false);
  // const [user,setUser]=useState("");
  // const [aadhar,setAadhar]=useState("");
    // const getDetails=async()=>{
    //     console.log(App.ethereum)
    //     console.log(aadhar);
      
    //     const accounts = await ethereum.request({method: "eth_requestAccounts"});
    //     const provider=new ethers.providers.Web3Provider(ethereum);
    //     const signer=provider.getSigner();
    //     const contract=new ethers.Contract(cadd,Abi,signer);
    // }
    
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                const provider=new ethers.providers.Web3Provider(ethereum);
                const signer=provider.getSigner();
                const contract=new ethers.Contract(App.cadd,Abi,signer);
                const data=await contract.getDetails(accounts[0]);
                // const acc=await contract.getAccountByAadhar(aadhar);
                // console.log(acc);
                // setUser(acc);
                const ydata=await contract.getPatientData(accounts[0]);
                
                var y = [...ydata].reverse();
                console.log(data.mobile);
                if(ydata.length===0){
                  setnodata(true);
                }
                setPatientData(y);
                setPatientDetails(data);
                console.log(App.login);
            // console.log("success");
            }
            catch(error){
                console.log(error);
            }
        }
        fetch();
    },[ethereum])
   
  return (
    <>
    { App.login ?

    <div className='root' >
        {/* <input type="number" placeholder='Enter Aadhar number of Patient' onChange={(e)=>{
          setAadhar(e.target.value)
        }}/>
        <button type='submit' onClick={getDetails}>Get Details</button> */}

        <div className='alignp2'>
{/* <div className='head'>Your Data</div> */}
            
        <div className='alignp3'>
                {/* <p className='idata'>Name:</p><p className='pdata'>{pDetails.name}</p>
                <p className='idata'>Age:</p><p className='pdata'>{pDetails.age}</p>
                <p className='idata'>Address:</p><p className='pdata'>{pDetails.address}</p>
                <p className='idata'>Email:</p><p className='pdata'>{pDetails.email}</p> 
                <p className='idata'>Mobile No.:</p><p className='pdata'>{pDetails.mobile}</p> 
                <p className='idata'>Aadhar:</p><p className='pdata'>{pDetails.aadhar}</p> */}
                
                <table >
                  <tr>
                    <td><div className='idata'>Name:</div><div className='pdata'>{pDetails.name}</div></td>
                    <td><div className='idata'>Age:</div><div className='pdata'>{pDetails.age}</div></td>
                  </tr>
                  <tr>
                    <td><div className='idata'>Address:</div><div className='pdata'>{pDetails.hadd}</div></td>
                    <td> <div className='idata'>Email:</div><div className='pdata'>{pDetails.email}</div> </td>
                  </tr>
                  <tr>
                    <td><div className='idata'>Mobile No.:</div><div className='pdata'>{pDetails.mobile}</div></td>
                    <td><div className='idata'>Aadhar:</div><div className='pdata'>{pDetails.aadhar}</div></td>
                  </tr>
                </table>


        </div>

           
          


        </div>
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
    <div>Please login first</div> 
}   
</>
  )
}
