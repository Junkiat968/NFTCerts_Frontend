import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import useEth from "../contexts/EthContext/useEth";
import { shortenAddress } from '../utils/addressShortener';

// class Navbar extends Component {
const Navbar = () => {
   const { state } = useEth();

   // render() {
   return (
      <header className="p-3 bg-dark ">
         <nav className="py-2 bg-dark">
            <div className="container d-flex flex-wrap">
               <ul className="nav me-auto">
                  <li><NavLink className="nav-link px-2 text-white" to="./">Home</NavLink></li>
                  <div>
                     <li><NavLink className="nav-link px-2 text-white" to="./Page2">Page2</NavLink></li>
                  </div>
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
      </header>
   );
   // }
};

export default Navbar;