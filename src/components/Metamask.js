import React, { useContext, useState ,createContext,useEffect } from 'react'
// import "./style.css"
import "./Allcss.css"
import { Link, Navigate } from 'react-router-dom'
import MetamaskPNG from "../assets/metamask.png"
import AppPNG from "../assets/app.png"
import { ethers } from 'ethers'
import { Home } from './Home'

import { AppState } from '../App'

const Apps=createContext();
export const Metamask = () => {
    // const [is,setis]=useState(false);

    useEffect(()=>{
        console.log("Metamask")
      })
    const App  = useContext(AppState)
    const web3=App.web3;
    const accounts=App.accounts;
    const handleConnect = async (e) => {
        e.preventDefault()
        await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{eth_accounts: {}}]
        });
        const address = await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [{  }]
        })
        let ad = web3.utils.toChecksumAddress(address[0])
        const x=await App.contract.getDoctorData(address[0]);
        console.log(x);
        const owner=await App.contract.getOwner();
      
        const networkId = await web3.eth.net.getId();
        localStorage.setItem('cacheKey', ad)
        localStorage.setItem('cacheNID', networkId)
        window.location.href = "/Home"
        App.setlogin(true);
       
      
    }

    if(accounts.length > 0){
        return <Navigate to="/Home" />
    }
    
    return (
        // <Apps.Provider value={{is,setis}}>
        <div className="create-container">
            {/* <Link to="/" className="backto-home">Back to home</Link> */}
            <div className="split-container">

                <div className="form-container auth">
                    <div className="form">
                        <h2 className="heading">Log In</h2>

                        <div className="login-dg">
                            <img width="60" height="60" src={MetamaskPNG} alt="" />
                            <p>- - - - - - -</p>
                            <img width="60" height="60" src={AppPNG} alt="" />
                        </div>

                        <p className="login-message">Login with Metamask</p>

                        <div className="flex-container">
                            <button onClick={handleConnect}>Connect Metamask</button>
                            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
                                Add Metamask To Chrome
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        // </Apps.Provider>
    )
}
// export {Apps}

