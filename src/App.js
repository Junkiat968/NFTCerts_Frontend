import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyAccount from './components/pages/myAccount';
import ManageGrades from './components/pages/manageGrades';
import PurchaseTokens from './components/pages/purchaseTokens';
import TransactionLogs from './components/pages/transactionLogs';
import ManageApprovals from './components/pages/manageApprovals';
import Login from './components/pages/Login'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/manageApprovals' element={<ManageApprovals />} />
          <Route exact path='/' element={<ManageGrades />} />
          <Route path='/manageGrades' element={<ManageGrades />} />
          <Route path='/transactionLogs' element={<TransactionLogs />} />
          <Route path='/purchaseTokens' element={<PurchaseTokens />} />
          <Route path='/myAccount' element={<MyAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;