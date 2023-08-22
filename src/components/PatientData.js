import React from 'react'
import '../App.css';
// import { Button, Form } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
import {useState,useContext} from 'react';
import {ethers} from 'ethers';
import { AppState } from "../App";
import Loader from './Loader'
import Abi from '../Records.json'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
const projectId = "2LoPusob0ydhtLA7tdGeIwCSftH";
const projectSecret = "4141f13c311ded4c3a1cc90b77478d76";
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');


const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
  })
export const PatientData = () => {
    const App = useContext(AppState);
    const ethereum=App.ethereum;
    const cadd=App.cadd;
    const [desc,setDesc]=useState("");
    const [doc,setDoc]=useState("");
   
    const [date,setDate]=useState("");
    
    const [loader, setLoader] = useState(false);
  const [file,setFile]=useState([]);
     const [hash, setHash] = useState("");


    const Register=async()=>{
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        console.log(accounts[0]);
        console.log(ethers);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const contract=new ethers.Contract(cadd,Abi,signer);
        setLoader(true);

    let ipfsId;
   
   
   
      try {
        const added = await ipfs.add(file)
        const url = `https://infura-ipfs.io/ipfs/${added.path}`
        ipfsId = `${added.path}`;
        console.log(ipfsId);
        setHash(ipfsId);
        console.log("IPFS URI: ", url)
      } catch (error) {
        console.log('Error uploading file: ', error)
      }  
      if(ipfsId){
        try{
            // const add=await contract.getPatientData()
            await contract.addPatientData(accounts[0],desc,doc,date.toString(),ipfsId);
            console.log("success");
        }
        catch(error){
            console.log(error);
        }
       setLoader(false); 
      }
      }
      async function onChange(e) {
        const filess = e.target.files[0]
            setFile(filess);
        
      }
      if (loader) {
        return (
          <Loader />
        )
    }
  return (
    <>
    <div className='head'>ADD DATA</div>
    <div className='align'>
       <input type='text' placeholder='Enter Description of illness' onChange={(e)=>{setDesc(e.target.value)}}/>
      
       <input type='text' placeholder='Enter Name of Physician' onChange={(e)=>setDoc(e.target.value)}/>
       <input type='date' placeholder='Enter Date in DD/MM/YYYY' onChange={(e)=>setDate(e.target.value)}/>
       <input className='file' type='file'  onChange={(e)=>setFile(e.target.files[0])}/>
       <button onClick={Register}>Register</button>

    </div>
    </>
  )
}
