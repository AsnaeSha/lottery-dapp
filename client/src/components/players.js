import React, {useState, useEffect} from 'react';
import {ethers} from "ethers";
import Web3 from "web3";
import './players.css';
const web3 = new Web3();

export default function Player({ account, contractInstance, address}){
const [accounts,setAccount] = useState('');
const[getPlayer, setPlayer] = useState([]);
const [transfer, setTransfer] = useState();


async function get_Account(){
let response = await contractInstance.methods.getManager().call({from:account, gas: 3000000});
console.log("Res:",response);
setAccount(response);
}

async function fund(){
try{
let response= await contractInstance.methods.enter().send({from:account,to:address, value: web3.utils.toWei('1','ether')});
console.log(response);
setTransfer(response);
}catch(error){
if(e.message.includes("manager cant participate")){
setTransfer("manager cant participate");
}else if(e.message.includes("you have already participated")){
setTransfer("you have already participated")
}else{
setTransfer("you cannot participate")
}
}
};

async function participants(){
const players = await contractInstance.methods.getAllParticipants().call();
      const getPlayer = await Promise.all(
        players.map((player) => {
          return player;
        })
      );
      console.log(getPlayer);
      setPlayer(getPlayer)
}
participants();

return (
    <>
      <ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item" aria-disabled="true">
            <b>Connected account :</b> {account}
          </li>
          <li className="list-group-item">
            <b>Please transfer 1 ether :</b>
            <button className="button1" onClick={fund}>Click to Transfer</button>
          </li>
          <li className="list-group-item">
            <b>Registered Players </b>:
            <br />
            <br />
            {getPlayer.slice(0,3).map((player, index) => <p key={index}>{player}</p>)}

          </li>
        </div>
      </ul>
    </>
  );
}
