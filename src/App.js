import './App.css';
import Abi from './Records.json'
import {useState, createContext} from 'react';
import { Link } from 'react-router-dom';
import { Login } from './components/Login';
import Web3 from "web3";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import React, { useContext,useEffect } from 'react'
import { ethers } from 'ethers';
import "./components/Allcss.css"
import {  Navigate } from 'react-router-dom'

import {Metamask} from './components/Metamask'
import { PatientData } from './components/PatientData';
import { Home } from './components/Home';
import { Patient } from './components/Patient';
import { Doctor } from './Doctor';
import { RegisterDoctor } from './RegisterDoctor';
import { RegisterPatient } from './RegisterPatient';
const AppState = createContext();

function App() {
  // const cadd="0xc9D2f452eA84F06d36fa86850A8cDdEF79A42524";
  const cadd="0x88990973410adAaF9664b526fA6C3ebf2851ec53";
  const {ethereum}=window;
  const [login,setlogin]=useState(false);
  const [owner,setOwner]=useState("");
  const [accounts,setAccounts]=useState([])
  const [account,setAccount]=useState("");
  const [web3, setWeb3] = useState(new Web3(window.ethereum))
  const [allow,setAllow]=useState(false);
const [loading,setLoading]=useState(true);
const provider = new ethers.providers.Web3Provider(ethereum);
const signer=provider.getSigner();

const [isDoc,setDoc]=useState(false);
const contract=new ethers.Contract(cadd,Abi,signer);
  useEffect(() => {
  // console.log("App");
    const connect = async () => {
   
    
      const pk = localStorage.getItem('cacheKey')
      const nId = localStorage.getItem('cacheNID')

      try {
        if (pk && nId) {
          const accs = await ethereum.request({method: "eth_requestAccounts"});
          
          setAccount(accs[0]);
        
          const web3 = new Web3(window.ethereum)
          
          const accounts = !pk || pk === undefined ? [] : [pk];
          console.log(accounts[0]);
          const networkId = nId;
         
    
          
          
          setDoc(isDoc);
         setlogin(true);

          localStorage.setItem("cacheKey", accounts[0]);
       
          setWeb3(web3)
          setAccounts(accs);
      
          setLoading(false)
        }
        else {
          setLoading(false)
          setlogin(false);
        }
      }

      catch (error) {
        setLoading(false)
        console.error(error);
      }
    }
    connect()
  }, [])

  return (
    <>
     
    <AppState.Provider value={{ethereum ,cadd,login,setlogin,setAccounts,accounts,web3,setWeb3,provider,signer,contract,account,isDoc,owner,allow}}>
   
        
<Router>

<Routes>
   <Route exact path="/"  element={<Login/>}/>
   <Route exact path="/Home"  element={<Home/>}/>
   <Route exact path="/Doctor" element={<Doctor/>}/>
    <Route exact path="/RegisterDoctor" element={<RegisterDoctor/>}/>
   <Route exact path="/Patient" element={<Patient/>}/>
   <Route exact path="/PatientData" element={<PatientData/>}/>
   <Route exact path="/RegisterPatient" element={<RegisterPatient/>}/>
  
</Routes>
</Router>
    </AppState.Provider>
    
    </>
  );
}

export default App;
export {AppState}
