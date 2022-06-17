import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import myAccount from './components/pages/myAccount';
import ManageGrades from './components/pages/manageGrades';
import PurchaseTokens from './components/pages/purchaseTokens';
import transactionLogs from './components/pages/transactionLogs';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<ManageGrades />} />
          <Route path='/transactionLogs' component={transactionLogs} />
          <Route path='/purchaseTokens' element={<PurchaseTokens />} />
          <Route path='/myAccount' component={myAccount} />
        </Routes>
      </Router>
    </>
  );
}

export default App;