import React from 'react'
import {useState,useContext, createContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {ethers} from 'ethers';
import { AppState } from "./App";
import Abi from './Records.json'
import "./components/Allcss.css"
export const Doctor = () => {
    const [aadhar,setAadhar]=useState();
    const App = useContext(AppState);
    // const ethereum=App.ethereum;
    // const cadd=App.cadd;
    const [pDetails,setPatientDetails]=useState([]);
    const [data,setPatientData]=useState([]);
    // const cadd="0xc9D2f452eA84F06d36fa86850A8cDdEF79A42524";
    const cadd=App.cadd;
  const {ethereum}=window;
    const getDetails=async()=>{
        console.log(App.ethereum)
        // console.log(aadhar);
      
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        const provider=new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const contract=new ethers.Contract(cadd,Abi,signer);
        const acc=await contract.getAccountByAadhar(aadhar);
        console.log(acc);
        const ydata=await contract.getPatientData(acc);
        const xdata=await contract.getDetails(acc);
        var y = [...ydata].reverse();

        // console.log(data.mobile);
        setPatientDetails(xdata);
        setPatientData(y);
        console.log(ydata);
        
        
    }
    
    // useEffect(()=>{
    //     const fetch=async()=>{
    //         try{
    //         await ethereum.request({method: "wallet_requestPermissions", params: [{eth_accounts: {}}]})
    //         console.log("success");
    //         }
    //         catch(error){
    //             console.log(error);
    //         }
    //     }
    //     fetch();
    // },[ethereum])
   
  return (
    <div className='root'>
    <div className='align'>
        <input type="number" placeholder='Enter Aadhar number of Patient' onChange={(e)=>{
          setAadhar(e.target.value)
        }}/>
        <button type='submit' onClick={getDetails}>Get Details</button>

        {/* <div>
        <p>Name:{pDetails.name}</p>
                <p>Age:{pDetails.age}</p>
                <p>Address:{pDetails.address} </p>
                <p>Email:{pDetails.email} </p>
                <p>Mobile No.:{pDetails.mobile} </p>
                <p>Aadhar:{pDetails.aadhar} </p>


        </div> */}
        <div className='tab'>
        <table >
                  <tr>
                    <td><div className='idata'>Name:</div><div className='pdata'>{pDetails.name}</div></td>
                    <td><div className='idata'>Age:</div><div className='pdata'>{pDetails.age}</div></td>
                  </tr>
                  <tr>
                    <td><div className='idata'>Address:</div><div className='pdata'>{pDetails.address}</div></td>
                    <td> <div className='idata'>Email:</div><div className='pdata'>{pDetails.email}</div> </td>
                  </tr>
                  <tr>
                    <td><div className='idata'>Mobile No.:</div><div className='pdata'>{pDetails.mobile}</div></td>
                    <td><div className='idata'>Aadhar:</div><div className='pdata'>{pDetails.aadhar}</div></td>
                  </tr>
                </table>
                </div>
                <Link className='adata' to={'/PatientData'}>Add Data</Link>
        <div className='tab2'>
          {/* {data.map((e)=>{
            return (
              <>
               <p key={e.sno}>S.NO-{e.sno.toString()}  </p>
            <p>Description:{e.description} </p>
            <p>Physician:{e.doctor} </p>
            <p>Date:{e.date} </p>
            <p>Attachment:{e.hash} </p>
              </>
            )
          })} */}

<table>
  <tr>
    <th>S.No</th>
    <th>Description</th>
    <th>Physician</th>
    <th>Date</th>
    <th>Attachment</th>
  </tr>
  {
    data.map((e)=>{
      return (
        <tr>
        <td>{e.sno.toString()}</td>
        <td>{e.description}</td>
        <td>{e.doctor}</td>
        <td>{e.date}</td>
        <td><a href={`https://infura-ipfs.io/ipfs/${e.hash}`}>Click here</a></td>
      </tr>
      )
    })
  }

  
</table>
           
        </div>
    </div>
    </div>
  )
}
