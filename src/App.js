import './App.css';
import Abi from './Records.json'
import {useState, createContext} from 'react';

import { Login } from './components/Login';
import Web3 from "web3";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import React, { useEffect } from 'react'
import { First } from './components/First';
import { ethers } from 'ethers';
import "./components/Allcss.css"
// import {  Navigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar';
// import {Metamask} from './components/Metamask'
import { PatientData } from './components/PatientData';
import { Home } from './components/Home';
import { Patient } from './components/Patient';
import { Doctor } from './Doctor';
import { RegisterDoctor } from './RegisterDoctor';
import { Apply } from './Apply';
import { ApplyData } from './components/ApplyData';
import { RegisterPatient } from './RegisterPatient';
// import { First } from './components/First';
const AppState = createContext();

function App() {
  // const cadd="0xc9D2f452eA84F06d36fa86850A8cDdEF79A42524";
  // const cadd="0xd488eE3F222e0367299B551feF757C46f740Ca1d";
  const cadd ="0x5F515606Fa353cB44cbe0ec9138AFB4c694F4420"
  const {ethereum}=window;
  const [login,setlogin]=useState(false);
  const [owner,setOwner]=useState("");
  const [accounts,setAccounts]=useState([])
  const [account,setAccount]=useState("");
  const [web3, setWeb3] = useState(new Web3(window.ethereum))
  const [allow,setAllow]=useState(false);
  const [adac,setadac]=useState("");
  const [user,setUser]=useState("");
  const[aadhar,setAadhar]=useState("");
// const [loading,setLoading]=useState(true);
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
          // const networkId = nId;
         
    
          
          
          setDoc(isDoc);
         setlogin(true);

          localStorage.setItem("cacheKey", accounts[0]);
       
          setWeb3(web3)
          setAccounts(accs);
      
          // setLoading(false)
        }
        else {
          // setLoading(false)
          setlogin(false);
        }
      }

      catch (error) {
        // setLoading(false)
        console.error(error);
      }
    }
    connect()
  }, [ethereum,isDoc])

  return (
    <>
     
    <AppState.Provider value={{ethereum ,cadd,login,setlogin,setAccounts,accounts,web3,setWeb3,provider,signer,contract,account,isDoc,owner,allow,user,setUser,aadhar,setAadhar,adac,setadac}}>
   
        
<Router>

<Routes>
   <Route exact path="/"  element={<Login/>}/>
   <Route exact path="/Home"  element={<Home/>}/>
   <Route exact path="/Doctor" element={<Doctor/>}/>
    <Route exact path="/RegisterDoctor" element={<RegisterDoctor/>}/>
   <Route exact path="/Patient" element={<Patient/>}/>
   <Route exact path="/PatientData" element={<PatientData/>}/>
   <Route exact path="/RegisterPatient" element={<RegisterPatient/>}/>
   <Route exact path="/Apply" element={<Apply/>}/>
   <Route exact path="/ApplyData" element={<ApplyData/>}/>
  
</Routes>
</Router>
    </AppState.Provider>
    
    </>
  );
}

export default App;
export {AppState}
