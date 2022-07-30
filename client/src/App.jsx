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
import GradeAppeals from './components/Pages/GradeAppeals';
import AccessDenied from './components/Pages/AccessDenied';

class App extends Component {
  static contextType = EthContext;

  render() {
    const { loginState, state } = this.context;

    return (
      <div id="App" >
        <Router>
          <Navigationbar />
          {
            loginState ?
              <Routes>
                <Route path="/" element={<Login />} />
                {state.role === "ADMIN" && (
                  <>
                    <Route path="/" element={<Login />} />
                    <Route path='/ManageAccounts' element={<ManageAccounts />} />
                    <Route path='/TransactionLogs' element={<TransactionLogs />} />
                  </>
                )}
                {state.role === "FACULTY" && (
                  <>
                    <Route path="/" element={<Login />} />
                    <Route path='/ManageGrades' element={<ManageGrades />} />
                    <Route path='/TransactionLogs' element={<TransactionLogs />} />
                    <Route path='/GradeAppeals' element={<GradeAppeals />} />
                  </>
                )}
                {state.role === "STUDENT" && (
                  <>
                    <Route path="/" element={<Login />} />
                    <Route path='/MyGrades' element={<MyGrades />} />
                    <Route path='/TransactionLogs' element={<TransactionLogs />} />
                  </>
                )}
                {/* <Route path="/SITNFT" element={<SITNFT />} /> */}
                {/* <Route path='/ManageFaculty' element={<ManageFaculty />} /> */}
                {/* <Route path='/PurchaseTokens' element={<PurchaseTokens />} /> */}
                {/* <Route path='*' element={<PageNotFound />} /> */}
                <Route path='/SITNFT' element={<AccessDenied />} />
                <Route path='/ManageAccounts' element={<AccessDenied />} />
                <Route path="/ManageGrades" element={<AccessDenied />} />
                <Route path='/TransactionLogs' element={<AccessDenied />} />
                <Route path='/GradeAppeals' element={<AccessDenied />} />
                <Route path='/MyGrades' element={<AccessDenied />} />
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