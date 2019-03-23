import React, { useState, useEffect } from 'react';
import * as net from './networkRequests';
const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');

const App = () => {
  // network information
  const [network, setNetwork] = useState({name: '', id: ''});
  const [isListening, setListener] = useState(true);
  const [numberOfPeers, setPeers] = useState('');



  const [acc, setAcc] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    // get account adress
    web3.eth.getAccounts()
      .then(res => setAcc(res));
    
    web3.eth.getBalance('0xFa49cD225cB2189036fc12e1E98cB2e2fb69b96B')
      .then(res => setBalance(res));
    
    // get network ID and network type
    net.getCurrentNetwork().then(res => {
      setNetwork(res);
      console.log(`Network ID: ${res.id}, Name: ${res.name}`)
    });

    net.isNodeListening().then(res => setListener(res));
    
    net.getNumberOfPeers().then(res => setPeers(res));

  }, []);



  return (
    <div>
      Hello web3.js
      <div>
        <h5>Network information:</h5>
        <div>Network ID: {network.id}</div>
        <div>Network Name: {network.name}</div>
        <div>Node listening for peers: {isListening.toString()}</div>
        <div>Number of peers: {numberOfPeers}</div>
      </div>
      <ul>
      Web3 module
        <li>Current Provider: {web3.currentProvider.host}</li>
        <li>defaultBlock: {web3.defaultBlock}</li>
        <li>web3 version: {web3.version}</li>
      </ul>

      <ul>
        web3.eth
        <li>My Ethereum adresses: {
          acc &&
          acc.map(acc => <div key={acc}>{acc}</div>)
        }</li>
        <li>My Balance: {web3.utils.fromWei(balance.toString())} ETH</li>
      </ul>
    </div>
  );
}

export default App;
