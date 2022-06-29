import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EthProvider } from "./contexts/EthContext";
import { ContractProvider } from "./contexts/ContractProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EthProvider>
      <ContractProvider>
        <App />
      </ContractProvider>
    </EthProvider>
  </React.StrictMode>
);
