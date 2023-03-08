import React, {useState, useEffect} from 'react';
import './manager.css';

export default function Manager({account, contractInstance}){
const[accounts, setAccount] = useState('');
const[contractBalance, setContractBalance] = useState(0);
const[winner, setWinner] = useState("No winner yet");

async function get_Account(){
let response = await contractInstance.methods.getManager().call({from:account, gas: 3000000});
console.log("Res:",response);
setAccount(response)
}

async function contract_balance(){
try{
const balance = await contractInstance.methods.getBalance().call({from:account, gas: 3000000});
console.log("Res:",balance);
setContractBalance(balance);
}catch(error){
setContractBalance('you are not the manager')
}
}

async function get_winner(){
try{
 await contractInstance.methods.selectWinner().send({from:account, gas: 3000000});
 const lotteryWinner = await contractInstance.methods.winner().call({from:account, gas: 3000000});
 console.log(lotteryWinner);
 setWinner(lotteryWinner);
}catch(error){
if(error.message.includes("you are not the manager")){
alert("you are not the manager");
}else if (error.message.includes("there should be atleast 3 players")){
alert("there should be atleast 3 players to start the lottery");
}else{
alert("no winner picked yet");
}
}
};

return (
    <ul className="list-group" id="list">
      <div className="center">
        <li className="list-group-item" aria-disabled="true">
          <b>Connected account :</b> {account}
        </li>
        <li className="list-group-item">
          <b> Winner :</b>  {winner}
          <button className="button1" onClick={get_winner}>
            Click For Winner
          </button>

        </li>
        <li className="list-group-item">
          <b>Balance : </b> {contractBalance} ETH
          <button className="button1" onClick={contract_balance}>
            Click For Balance
          </button>
        </li>
      </div>
    </ul>
  );
};

