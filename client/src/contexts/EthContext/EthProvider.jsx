import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import { ethers } from 'ethers';

import {
  base64ContractAddress,
  base64ContractABI,
  sitnftContractAddress,
  sitnftContractABI
} from '../../utils/constants';
const { ethereum } = window;

const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

/** Get SITNFT Contract Instance*/
const getSITNFTContract = () => {
  const sitnftContract = new ethers.Contract(sitnftContractAddress, sitnftContractABI, signer);
  console.log(provider, signer, sitnftContract);
  return sitnftContract;
}

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentAccount, setCurrentAccount] = useState('');
  const [loginState, setLoginState] = useState(false);
  const [formData, setFormData] = useState({ addressInput: "" });
  const [mintData, setMintData] = useState({
    moduleCode: "",
    testType: "",
    grade: "",
    trimester: "",
    recipient: ""
  });
  const [isAdminResult, setIsAdminResult] = useState('');
  const [isFacultyResult, setIsFacultyResult] = useState('');

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  function handleMint(evt) {
    const value = evt.target.value;
    setMintData({
      ...mintData,
      [evt.target.name]: value
    });
  }

  const init = useCallback(
    // async artifact => {
    //   if (artifact) {
    //     const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    //     const accounts = await web3.eth.requestAccounts();
    //     setCurrentAccount(accounts);
    //     const networkID = await web3.eth.net.getId();


    //     const { abi } = artifact;
    //     let address, contract;
    //     try {
    //       address = artifact.networks[networkID].address;
    //       contract = new web3.eth.Contract(abi, address);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //     dispatch({
    //       type: actions.init,
    //       data: { artifact, web3, accounts, networkID, contract }
    //     });
    //   }
    // }
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        setCurrentAccount(accounts);
        const networkID = await web3.eth.net.getId();

        const { abi } = artifact;
        let address, contractSS, contractC, contractBase64, contractsitnft;
        try {
          address = artifact.networks[networkID].address;
          contractSS = new web3.eth.Contract(abi, address);
          contractBase64 = new web3.eth.Contract(base64ContractABI, base64ContractAddress);
          contractsitnft = new web3.eth.Contract(sitnftContractABI, sitnftContractAddress);
        } catch (err) {
          console.error(err);
        }

        // DISPATCH
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contractSS, contractBase64, contractsitnft }
        });
      }
    }
    , []);

  const checkIfWalletIsConnected = async () => {
    try {
      const accountConnected = state.accounts;
      if (accountConnected) {
        setLoginState(true);
      } else {
        // console.log("No accounts found.");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  }

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

  // ======================================== SITNFT Functions ========================================

  const functIsAdmin = async () => {
    try {
      const { addressInput } = formData;
      const sitnftInstance = getSITNFTContract();
      console.log(addressInput);
      const result = await sitnftInstance.isAdmin((addressInput).toString());
      setIsAdminResult(result);
      return result;
    } catch (err) {
      setIsAdminResult(err);
      console.error(err);
      return err;
    }
  }
  const makeAdmin = async () => {
    const { addressInput } = formData;
    const sitnftInstance = getSITNFTContract();
    try {
      const result = await sitnftInstance.addAdmin((addressInput).toString());
      console.log(result);
      functIsAdmin();
    } catch (err) {
      setIsAdminResult(err);
      console.error(err);
      return err;
    }
  }
  const removeAdmin = async () => {
    const { addressInput } = formData;
    const sitnftInstance = getSITNFTContract();
    try {
      const result = await sitnftInstance.removeAdmin((addressInput).toString());
      console.log(result);
      functIsAdmin();
    } catch (err) {
      setIsAdminResult(err);
      console.error(err);
      return err;
    }
  }

  const functIsFaculty = async () => {
    try {
      const { addressInput } = formData;
      const sitnftInstance = getSITNFTContract();
      const result = await sitnftInstance.isFaculty((addressInput).toString());
      setIsFacultyResult(result);
      return result;
    } catch (err) {
      setIsFacultyResult(err);
      console.error(err);
      return err;
    }
  }
  const makeFaculty = async () => {
    const { addressInput } = formData;
    const sitnftInstance = getSITNFTContract();
    try {
      const result = await sitnftInstance.addFaculty((addressInput).toString());
      console.log(result);
      functIsFaculty();
    } catch (err) {
      setIsFacultyResult(err);
      console.error(err);
      return err;
    }
  }
  const removeFaculty = async () => {
    const { addressInput } = formData;
    const sitnftInstance = getSITNFTContract();
    try {
      const result = await sitnftInstance.removeFaculty((addressInput).toString());
      console.log(result);
      functIsFaculty();
    } catch (err) {
      setIsFacultyResult(err);
      console.error(err);
      return err;
    }
  }

  const mint = async () => {
    const {
      moduleCode,
      testType,
      grade,
      trimester,
      recipient
    } = mintData;

    const sitnftInstance = getSITNFTContract();
    try {
      console.log(
        moduleCode,
        testType,
        grade,
        trimester,
        recipient
      );
      const result = await sitnftInstance.mint(
        moduleCode,
        testType,
        grade,
        trimester,
        recipient
      );
      console.log(result);
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  // ======================================== END SITNFT Functions ========================================

  useEffect(() => {
    checkIfWalletIsConnected();
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
      window.location.reload();
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  },
    [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch,
      init,
      currentAccount,
      loginState,
      functIsAdmin,
      functIsFaculty,
      makeAdmin,
      removeAdmin,
      handleChange,
      formData,
      isAdminResult,
      isFacultyResult,
      makeFaculty,
      removeFaculty,
      mint,
      mintData,
      handleMint
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
