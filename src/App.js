
// import './Home.css';
import React, { Component } from 'react';
import Login from './Login';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Accounts from './Accounts';
import Signup from './Signup';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to Octank Bank
          </p>
        </header>  
          <Routes>
            <Route exact path="/" element={<Login></Login>}> </Route>
            <Route exact path="/accounts/:id" element={<Accounts></Accounts>}></Route>
            <Route exact path="/signup" element={<Signup></Signup>}></Route>
            <Route exact path="/deposit" element={<Deposit></Deposit>}></Route>
            <Route exact path="/withdraw" element={<Withdraw></Withdraw>}></Route>
          </Routes>
      </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
