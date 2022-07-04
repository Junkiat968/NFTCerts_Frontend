import React, { useEffect,useState } from "react";
import "./Login.css";
import { connectors } from "./connectors";
import { useWeb3React } from "@web3-react/core";
export default function Login() {
  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();
  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, []);


  return (
    <div class="overlay">
      <button
        onClick={() => {
          activate(connectors.injected);
          setProvider("injected");
        }}>Connect</button>
      {/* <button onClick={() => { activate(Injected) }}>Metamask</button> */}

      <button onClick={deactivate}>Disconnect</button>
      <div>Connection Status: {active}</div>
      <div>Account: {account}</div>
      <div>Network ID: {chainId}</div>
    </div>
  );
}
