import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import useEth from "../contexts/EthContext/useEth";
import { shortenAddress } from '../utils/addressShortener';

const Navbar = () => {
   const { state } = useEth();

   const renderNav = (e) => {
      if (state.accounts !== null) {
         return (
            <nav className="py-2 bg-dark">
               <div className="container d-flex flex-wrap">
                  <ul className="nav me-auto">
                     <li><NavLink className="nav-link px-2 text-white" to="/">Home</NavLink></li>
                     <li><NavLink className="nav-link px-2 text-white" to="/SITNFT">SITNFT</NavLink></li>
                     <li><NavLink className="nav-link px-2 text-white" to="/MyGrades">MyGrades</NavLink></li>
                  </ul>
                  <ul className="nav">
                     <div>
                        <li className="nav-item text-white">
                           <small className="nav-link link-white px-2 text-white">
                              Account: {shortenAddress(String(state.accounts))}
                           </small>
                        </li>
                     </div>
                  </ul>
               </div>
            </nav>
         )
      }
   };

   return (
      <header className="p-3 bg-dark ">
         {renderNav()}
      </header>
   );
};

export default Navbar;