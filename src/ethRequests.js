import Web3 from 'web3';
// import {Eth} from 'web3-eth';
// "Web3.givenProvider" will be set if in an Ethereum supported browser.
// const eth = new Eth(Web3.givenProvider || 'ws://some.local-or-remote.node:8546', options);

const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

// Checks whether the node is mining or not. Returns bool.
export const isNodeMining = async () => {
  try {
    const isMining = await web3.eth.isMining();
    return isMining;
  } catch (err){
    console.error(`IsNodeMining failed to fetch data: ${err}`);
  }
}

// Returns the number of hashes per second that the node is mining with. Returns a Number.
export const getHashRate = async () => {
  try {
    const hashRate = await web3.eth.getHashrate();
    return hashRate;
  } catch (err) {
    console.error(`getHashRate failed to fetch data: ${err}`);
  }
}

// Returns the current gas price oracle. 
// The gas price is determined by the last few blocks median gas price. GasPrice is the wei per unit of gas,.
export const getGasPrice = async () => {
  try {
    return await web3.eth.getGasPrice();
  } catch (err) {
    console.error(`getGasPrice failed to fetch data: ${err}`);
  }
}

// Returns the current block number.
export const getBlockNumber = async () => {
  try {
    return await web3.eth.getBlockNumber();
  } catch (err) {
    console.error(`getBlockNumber failed to fetch data: ${err}`);
  }
}

// web3.eth.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] [, callback])
// Returns a block matching the block number or block hash.

// !!! ==== The argument can be set up with web3.eth.defaultBlock === !!!

/*
Parameters:
  String|Number - The block number or block hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.
  Boolean - (optional, default false) If true, the returned block will contain all transactions as objects, if false it will only contains the transaction hashes.
  Function - (optional) Optional callback, returns an error object as first parameter and the result as second.

*/
export const getBlock = async (blockNumber, returnTransactionObjects) => {
  const defaultBlockNumber = blockNumber ? blockNumber : 'latest';
  const shouldReturnTransactionObjects = returnTransactionObjects === true ? true : false;
  try {
    return await web3.eth.getBlock(defaultBlockNumber, shouldReturnTransactionObjects);
  } catch (err) {
    console.error(`getBlock failed to fetch data: ${err}`);
  }
}

// Get transaction count inside a block. Returns a number
export const getBlockTransactionCount = async (blockNumber) => {
  const defaultBlockNumber = blockNumber ? blockNumber : 'latest';
  try {
    return await web3.eth.getBlockTransactionCount(defaultBlockNumber);
  } catch (err) {
    console.error(`getBlockTransactionCount failed to fetch data: ${err}`);
  }
}

// Check if the Node is syncing. This will happend if a Node is offline for some time
// and needs to sync to latest block
export const isSyncing = async () => {
  try {
    return await web3.eth.isSyncing();
  } catch (err){
    console.error(`isSyncing failed to fetch data: ${err}`);
  }
}

