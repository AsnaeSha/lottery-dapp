import React,{useEffect, useState} from 'react';
import './App.css';
import Lottery from './contracts/Lottery.json';
import {connectWeb3, connectWeb3Metamask} from './web3_function.js';
import Manager from './components/manager.js';
import Player from './components/players.js';
import Home from './components/home.js';
import Navbar from './components/navbar.js';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
const[contractInstance, setContract] = useState(null)
const[accounts, setAccounts] = useState()
const[address, setAddress] = useState(null)

useEffect(()=>{
async function connect(){
try{
let{accounts, instance, deployedNetwork} = await connectWeb3Metamask();
setAccounts(accounts);
setContract(instance);
setAddress(deployedNetwork.address);
}catch(error){
alert("failed to load accounts, contracts......");
console.log(error);
}
}
connect()
})

 return (
    <div className="App">
       { contractInstance == null ?
    <>

    </> :
        <>

         <BrowserRouter>
            <Routes>
              <Route path="/" element={<><Navbar /><Home /></>}/>
              <Route path="/Manager" element={<><Navbar /><Manager contractInstance={contractInstance} account={accounts[0]} /></>}/>
              <Route path="/player" element={<><Navbar /><Player contractInstance={contractInstance} address = {address} account={accounts[0]} /></>} />
            </Routes>
          </BrowserRouter>
        </>}

    </div>
  );
}

export default App;
