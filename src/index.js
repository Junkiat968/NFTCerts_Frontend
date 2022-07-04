import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>
);
