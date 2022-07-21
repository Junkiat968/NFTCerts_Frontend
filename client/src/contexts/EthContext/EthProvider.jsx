import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { ethers } from "ethers";
import { reducer, actions, initialState } from "./state";

import {
  base64ContractAddress,
  base64ContractABI,
  sitnftContractAddress,
  sitnftContractABI,
} from "../../utils/constants";

const { ethereum } = window;

const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

const ADMIN = "ADMIN";
const FACULTY = "FACULTY";
const STUDENT = "STUDENT";
const NONE = "NONE";

/** Get SITNFT Contract Instance*/
const getSITNFTContract = () => {
  const sitnftContract = new ethers.Contract(
    sitnftContractAddress,
    sitnftContractABI,
    signer
  );
  // console.log(provider, signer, sitnftContract);
  return sitnftContract;
};

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentAccount, setCurrentAccount] = useState("");
  const [loginState, setLoginState] = useState(false);
  const [accChanged, setAccChanged] = useState(false);
  const [isFacultyLogin, setIsFacultyLogin] = useState("");

  const sitnftInstance = getSITNFTContract();

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const accounts = await web3.eth.requestAccounts();
      setCurrentAccount(accounts);
      const networkID = await web3.eth.net.getId();

      const { abi } = artifact;
      let address, contractBase64, contractsitnft, role;
      try {
        address = artifact.networks[networkID].address;
        contractBase64 = new web3.eth.Contract(
          base64ContractABI,
          base64ContractAddress
        );
        contractsitnft = new web3.eth.Contract(
          sitnftContractABI,
          sitnftContractAddress
        );

        if (accounts.length > 0) {
          const hasAdminRole = await contractsitnft.methods
            .isAdmin(accounts[0])
            .call();
          if (hasAdminRole) {
            role = ADMIN;
          } else {
            const hasFacultyRole = await contractsitnft.methods
              .isFaculty(accounts[0])
              .call();
            if (hasFacultyRole) {
              role = FACULTY;
            } else {
              const isStudent = await contractsitnft.methods
                .isStudent(accounts[0])
                .call();
              isStudent ? (role = STUDENT) : (role = NONE);
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
      // DISPATCH
      dispatch({
        type: actions.init,
        data: {
          artifact,
          web3,
          accounts,
          networkID,
          contractBase64,
          contractsitnft,
          role,
        },
      });
    }
  }, []);

  const functIsFaculty = async () => {
    try {
      const result = await sitnftInstance.isFaculty(currentAccount.toString());
      setIsFacultyLogin(result);
    } catch (err) {
      setIsFacultyLogin(err);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const accountConnected = state.accounts;
      if (accountConnected) {
        setLoginState(true);
        functIsFaculty();
      } else {
        // console.log("No accounts found.");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/SITNFT.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    checkIfWalletIsConnected();
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
      window.location.assign("/");
      // window.location.reload();
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
        init,
        currentAccount,
        loginState,
        accChanged,
        setAccChanged,
        getSITNFTContract,
        sitnftInstance,
        isFacultyLogin,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
