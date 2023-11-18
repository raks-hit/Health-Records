import React,{useContext,createContext} from 'react'
import { Metamask } from './Metamask'
import { Home } from './Home'
import { First } from './First'
import { AppState } from '../App'
// import { createContext } from 'react'
import { useEffect } from 'react'
const Apps=createContext();
export const Login = () => {
    const App=useContext(AppState);
    useEffect(()=>{
      console.log("Login")
    })
  return (
    <div>
       {
        App.login ?
          <Home/> 
          :
          <Metamask/>
       }
    </div>
  )
}
