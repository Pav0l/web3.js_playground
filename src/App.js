import React, { useState, useEffect } from 'react';
import * as net from './networkRequests';
import * as eth from './ethRequests';
const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');

const App = () => {
  // network information
  const [network, setNetwork] = useState({name: '', id: ''});
  const [isListening, setListener] = useState(true);
  const [numberOfPeers, setPeers] = useState('');

  // node information
  const [hashRate, setHashRate] = useState('');
  const [gasPrice, setGasPrice] = useState('');
  const [blockNumber, setBlockNumber] = useState('');
  const [block, setBlock] = useState('');
  const [blockTransCount, setBlockTransCount] = useState('');
  const [isSync, setSync] = useState(false);
  const [isMine, setMine] = useState(false);

  // acc information
  const [acc, setAcc] = useState('');
  const [balance, setBalance] = useState('');

  const getNetworkInfo = () => {
    // get network info
    net.getCurrentNetwork().then(res => setNetwork(res));
    net.isNodeListening().then(res => setListener(res));    
    net.getNumberOfPeers().then(res => setPeers(res));
  }

  const checkNodeInfo = () => {
    let accInterval;
    eth.getHashRate().then(res => setHashRate(res));
    eth.getGasPrice().then(res => setGasPrice(res));
    eth.isNodeMining().then(res => setMine(res));
    eth.isSyncing().then(res => setSync(res));
    eth.getBlock("latest").then(res => setBlock(res));
    eth.getBlockTransactionCount(blockNumber).then(res => setBlockTransCount(res));

    // get latest block info every 5 sec.
    if (isListening && block !== null) {
      accInterval = setInterval(() => {
        // get node info:
        eth.getBlockNumber().then(res => setBlockNumber(res));
        eth.getBlock(blockNumber, true).then(res => setBlock(res));
        eth.getBlockTransactionCount(blockNumber).then(res => setBlockTransCount(res));
      }, 5000)
    } else {
      clearInterval(accInterval);
      alert('No Ethereum Node found. Node is not listening');
    }


  }

  useEffect(() => {
    // get account adress
    web3.eth.getAccounts().then(res => setAcc(res));    
    web3.eth.getBalance('0xFa49cD225cB2189036fc12e1E98cB2e2fb69b96B').then(res => setBalance(res));
    
    getNetworkInfo();
    checkNodeInfo();
  }, []);

  return (
    <div>
      Hello web3.js
      <div>
      <h4>Web3 module</h4>
        <div>Current Provider: {web3.currentProvider.host}</div>
        <div>defaultBlock: {web3.defaultBlock}</div>
        <div>web3 version: {web3.version}</div>
      </div>

      <div>
        <h4>My account</h4>
        <div>My Ethereum adresses: {
          acc &&
          acc.map(acc => <span key={acc}>{acc}</span>)
        }</div>
        <div>My Balance: {web3.utils.fromWei(balance.toString())} ETH</div>
      </div>
      <div>
        <h5>Network information:</h5>
        <div>Network ID: {network.id}</div>
        <div>Network Name: {network.name}</div>
        <div>Node listening for peers: {isListening.toString()}</div>
        <div>Number of peers: {numberOfPeers}</div>
      </div>
      <div>
        <h5>Node information:</h5>
        <div>Hash Rate: {hashRate}</div>
        <div>Gas Price: {gasPrice} wei</div>
        <div>Is node mining: {isMine.toString()}</div>
        <div>Is node syncing: {isSync.toString()}</div>
      </div>
      <div>
        <h5>Block info:</h5>
        <div>Latest Block Number: {block.number}</div>
        <div>Latest Block Hash: {block.hash}</div>
        <div>Latest Block Timestamp: {Date(block.timestamp)}</div>
        <div>Block Transaction Count: {blockTransCount}</div>
      </div>
    </div>
  );
}

export default App;
