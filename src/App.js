import React, { Component } from 'react';
const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');

web3.eth.getAccounts()

class App extends Component {
  state = {
    acc: null,
    network: null,
    balance: null,
  }

  componentDidMount() {
    // get account adress
    web3.eth.getAccounts()
      .then(res => this.setAcc(res));

    // get network you are currently on
    web3.eth.net.getNetworkType()
      .then(res => this.setNetwork(res));

    web3.eth.getBalance('adressHere')
      .then(res => this.setState({ balance: res }));
  }

  setAcc = (data) => {
    this.setState({
      acc: data,
    });
  }

  setNetwork = (data) => {
    this.setState({
      network: data,
    });
  }


  render() {
    return (
      <div>
        Hello web3.js
        <div>Network: {this.state.network}</div>
        <ul>
        Web3 module
          <li>Current Provider: {web3.currentProvider.host}</li>
          <li>defaultBlock: {web3.defaultBlock}</li>
          <li>web3 version: {web3.version}</li>
        </ul>

        <ul>
          web3.eth
          <li>My Ethereum adresses: {
            this.state.acc &&
            this.state.acc.map(acc => <div key={acc}>{acc}</div>)
          }</li>
          <li>My Balance: {web3.utils.fromWei(this.state.balance.toString())} wei</li>
        </ul>
      </div>
    );
  }
}

export default App;
