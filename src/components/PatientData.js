import React, { useEffect } from 'react'
import '../App.css';
// import { Button, Form } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
import {useState,useContext} from 'react';
// import { Userstate } from '../Doctor';
import { UserState } from '../Doctor';
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
export const PatientData = (props) => {
  const App2=useContext(UserState);
    const App = useContext(AppState);
    const ethereum=App.ethereum;
    const cadd=App.cadd;
    const [desc,setDesc]=useState("");
    const [doc,setDoc]=useState("");
    const [cid,setCid]=useState("");
const [transaction,setTransaction]=useState("");
   
    const [date,setDate]=useState("");
    
    const [loader, setLoader] = useState(false);
  const [file,setFile]=useState([]);
     const [hash, setHash] = useState("");


    const Register=async()=>{
      console.log("Rakshit" + props.accnt);
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        console.log(accounts[0]);
        console.log(ethers);
        console.log("hello" + App.user);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const contract=new ethers.Contract(cadd,Abi,signer);
        // const acc=await contract.getAccountByAadhar(App.aadhar);
        setLoader(true);

    let ipfsId;
   
   
   
      try {
        const formData = new FormData();
        formData.append("file",file);
        const response = await fetch('https://server-pi-gilt.vercel.app/upload',{
            method:'POST',
            body:formData
          
        }).then(response=>response.json())
        .then(data=>{ 
           setCid(data.cid);
           setTransaction(data.transactionHash)
          console.log("this is" + data.cid)
          console.log(data.transactionHash)
        })
        .catch(error=>{
            console.error(error);
        })
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
            await contract.addPatientData(props.accnt,desc,doc,date.toString(),ipfsId);
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
    {/* <div className='head'>ADD DATA</div> */}
    {/* <div className='align'>
       <input type='text' placeholder='Enter Description of illness' onChange={(e)=>{setDesc(e.target.value)}}/>
      
       <input type='text' placeholder='Enter Name of Physician' onChange={(e)=>setDoc(e.target.value)}/>
       <input type='date' placeholder='Enter Date in DD/MM/YYYY' onChange={(e)=>setDate(e.target.value)}/>
       <input className='file' type='file'  onChange={(e)=>setFile(e.target.files[0])}/>
       <button onClick={Register}>Register</button>

    </div> */}
    <section class=" w-screen p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Add Data</h2>

    <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="text-gray-700 dark:text-gray-200" for="username">Description of illness</label>
                <input id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='Enter Description of illness' onChange={(e)=>{setDesc(e.target.value)}}/>
            </div>

            <div>
                <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Physician name</label>
                <input id="emailAddress" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='Enter Name of Physician' onChange={(e)=>setDoc(e.target.value)}/>
            </div>

            <div>
                <label class="text-gray-700 dark:text-gray-200" for="password">Date</label>
                <input id="password" type="date" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='Enter Date in DD/MM/YYYY' onChange={(e)=>setDate(e.target.value)}/>
            </div>

            <div>
                <label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Time</label>
                <input id="passwordConfirmation" type="time" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
            <div>
    <label for="image" class="block text-sm text-gray-500 dark:text-gray-300">Image</label>

    <input type="file" class="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" onChange={(e)=>setFile(e.target.files[0])} />
</div>
        </div>

        <div class="flex justify-end mt-6">
            <button onClick={Register} class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add Data</button>
        </div>
    </form>
</section>
    </>
  )
}
