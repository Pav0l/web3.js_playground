const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');


// Functions that return Promises from the web3.eth requests

// Gets the current network ID. Returns a Number.
// Based on ID, return an object with network ID and name.
export const getCurrentNetwork = async () => {
  try {
    const networkId = await web3.eth.net.getId();
    let networkName;
    switch (networkId) {
      case 1:
        networkName = 'main';
        break;
      case 3:
        networkName = 'ropsten';
        break;
      case 4:
        networkName = 'rinkeby';
        break;
      default:
        networkName = 'unknown/private network';
    }
    return {name: networkName, id: networkId};
  } catch (err){
    console.error("Network ID request failed: ", err);
  }
}
/*
// Equivalent function using the Promise syntax:
export const getCurrentNetworkIdPromise = () => {
  return new Promise((resolve, reject) => {
    resolve(web3.eth.net.getId());
    reject(new Error('Network ID could not be retreived.'))
  })
}
*/

// Guesses the chain the node is connected by comparing the genesis hashes.
// Might not be 100% correct, as private chains could use mainnet/testnet genesis block
export const getNetworkType = async () => {
  try {
    const networkType = await web3.eth.net.getNetworkType();
    return networkType;
  } catch (err){
    console.error(err);
  }
}

// Checks if the node is listening for peers. Returns boolean.
export const isNodeListening = async () => {
  try {
    const isListening = await web3.eth.net.isListening();
    return isListening;
  } catch (err){
    console.error(err);
  }
}

// Get the number of peers connected to. Returns a Number.
export const getNumberOfPeers = async () => {
  try {
    const peerNumber = await web3.eth.net.getPeerCount();
    return peerNumber;
  } catch (err){
    console.error(err);
  }
}
