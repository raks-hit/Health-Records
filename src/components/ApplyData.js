import React from 'react'
import {useState,useContext, createContext, useEffect} from 'react';
import {ethers} from 'ethers';
import { AppState } from "../App";
import Abi from '../Records.json'
import "./Allcss.css"
export const ApplyData = () => {
  const App = useContext(AppState);
  // const ethereum=App.ethereum;
  // const cadd=App.cadd;
  // const cadd="0xc9D2f452eA84F06d36fa86850A8cDdEF79A42524";
const {ethereum}=window;


const [applydata,setApplyData]=useState([]);

useEffect(()=>{
  const fetch=async()=>{
      try{
          const accounts = await ethereum.request({method: "eth_requestAccounts"});
          const provider=new ethers.providers.Web3Provider(ethereum);
          const signer=provider.getSigner();
          const contract=new ethers.Contract(App.cadd,Abi,signer);
          const dataapply=await contract.getapplyDetails();
          // const acc=await contract.getAccountByAadhar(aadhar);
          // console.log(acc);
          // setUser(acc);

         
          setApplyData(dataapply);
          console.log(dataapply[0].name);
          
      // console.log("success");
      }
      catch(error){
          console.log(error);
      }
  }
  fetch();
},[ethereum])

  return (
    <div>
     
       {
        applydata.map((e)=>{
            return(
              <table>
              <tbody className="divide-y divide-gray-200">
              
              <tr>
                
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.qualification}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.haddress}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.regtno}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.aadhar}</td>
                
              </tr>
              </tbody>
              </table>
            )
        
        })}
       
      
    </div>
  )
}
