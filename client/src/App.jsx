import React, { Component } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { EthProvider, EthContext } from "./contexts/EthContext";
import "./App.css";

// Import Components
import Navigationbar from './components/Navbar.jsx';

// Import Pages
import SITNFT from './components/Pages/SITNFT.jsx';
import Login from './components/Pages/Login';
import MyGrades from './components/Pages/MyGrades.jsx';
import ManageGrades from "./components/Pages/ManageGrades";
import TransactionLogs from "./components/Pages/TransactionLogs";
import PurchaseTokens from "./components/Pages/PurchaseTokens";
import ManageAccounts from "./components/Pages/ManageAccounts";
import Error from './components/Pages/Error';
import PageNotFound from './components/Pages/PageNotFound';

class App extends Component {
  static contextType = EthContext;

  render() {
    const { loginState } = this.context;

    return (
      <div id="App" >
        <Router>
          <Navigationbar />
          {
            loginState ?
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/SITNFT" element={<SITNFT />} />
                <Route path='/MyGrades' element={<MyGrades />} />
                <Route path='/ManageGrades' element={<ManageGrades />} />
                <Route path='/TransactionLogs' element={<TransactionLogs />} />
                {/* <Route path='/PurchaseTokens' element={<PurchaseTokens />} /> */}
                <Route path='/ManageAccounts' element={<ManageAccounts />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
              :
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/SITNFT" element={<Error />} />
                <Route path='/MyGrades' element={<Error />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
          }
        </Router>
      </div>
    );
  };
}

export default App;