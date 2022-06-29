import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import {
    base64ContractAddress,
    base64ContractABI,
    sitnftContractAddress,
    sitnftContractABI
} from '../utils/constants';
const { ethereum } = window;

export const ContractContext = React.createContext();
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

/** Get SITNFT Contract Instance*/
const getSITNFTContract = () => {
    const sitnftContract = new ethers.Contract(sitnftContractAddress, sitnftContractABI, signer);
    console.log(provider, signer, sitnftContract);
    return sitnftContract;
}

export const ContractProvider = ({ children }) => {
    const [formAddressData, setFormAddressData] = useState({ addressInput: "" });
    // Mint Constants 
    const [mintData, setMintData] = useState({
        moduleCode: "",
        testType: "",
        grade: "",
        trimester: "",
        recipient: ""
    });
    const [mintResult, setMintResult] = useState('');
    // Admin Constants
    const [isAdminResult, setIsAdminResult] = useState('');
    // Faculty Constants
    const [isFacultyResult, setIsFacultyResult] = useState('');

    /** Form Handling */
    const handleChange = (e, name) => {
        setFormAddressData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    function handleMint(evt) {
        const value = evt.target.value;
        setMintData({
            ...mintData,
            [evt.target.name]: value
        });
    }

    // Admin Functions
    const functIsAdmin = async () => {
        try {
            const { addressInput } = formAddressData;
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
        const { addressInput } = formAddressData;
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
        const { addressInput } = formAddressData;
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

    // Faculty Functions
    const functIsFaculty = async () => {
        try {
            const { addressInput } = formAddressData;
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
        const { addressInput } = formAddressData;
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
        const { addressInput } = formAddressData;
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

    // Mint Functions
    const functMint = async () => {
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
            setMintResult(result);
            return result;
        } catch (err) {
            console.error(err);
            setMintResult(err);
            return err;
        }
    }

    return (
        <ContractContext.Provider
            value={{
                formAddressData,
                handleChange,
                functIsAdmin,
                makeAdmin,
                removeAdmin,
                isAdminResult,
                functIsFaculty,
                isFacultyResult,
                makeFaculty,
                removeFaculty,
                functMint,
                mintData,
                mintResult,
                handleMint
            }}>
            {children}
        </ContractContext.Provider >
    );
}