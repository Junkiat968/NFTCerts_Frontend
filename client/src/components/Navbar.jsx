import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import useEth from "../contexts/EthContext/useEth";
import { shortenAddress } from '../utils/addressShortener';

const Navigationbar = () => {
   const { state } = useEth();

   const renderNav = (e) => {
      if (state.accounts !== null) {
         return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
               {/* <Container> */}
               <Navbar.Brand as={NavLink} to="/">GradeGo</Navbar.Brand>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="me-auto">
                     <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                     <Nav.Link as={NavLink} to="/SITNFT">SITNFT</Nav.Link>
                     <Nav.Link as={NavLink} to="/MyGrades">MyGrades</Nav.Link>
                     <Nav.Link as={NavLink} to="/ManageGrades">Manage Grades</Nav.Link>
                     <Nav.Link as={NavLink} to="/TransactionLogs">Transaction Logs</Nav.Link>
                     <Nav.Link as={NavLink} to="/PurchaseTokens">Purchase Tokens</Nav.Link>
                     <Nav.Link as={NavLink} to="/ManageAccounts">Manage Accounts</Nav.Link>
               </Nav>
               <Nav>
                     <li className="nav-item text-white">
                     <small className="nav-link link-white px-2 text-white">
                           Account: {shortenAddress(String(state.accounts))}
                     </small>
                     </li>
               </Nav>
               </Navbar.Collapse>
               {/* </Container> */}
            </Navbar>
         )
      }
   };

   return (
      <header className="p-3 bg-dark ">
         {renderNav()}
      </header>
   );
};

export default Navigationbar;