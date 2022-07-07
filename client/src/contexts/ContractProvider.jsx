import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import {
    sitnftContractAddress,
    sitnftContractABI
} from '../utils/constants';
const { ethereum } = window;

export const ContractContext = React.createContext();
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

/** Local/Persistent Storage */
var grades = localStorage.getItem("grades");
var mods = localStorage.getItem("modules");

/** Get SITNFT Contract Instance*/
const getSITNFTContract = () => {
    const sitnftContract = new ethers.Contract(sitnftContractAddress, sitnftContractABI, signer);
    console.log(provider, signer, sitnftContract);
    return sitnftContract;
}

export const ContractProvider = ({ children }) => {
    // Get local storage
    const [formAddressData, setFormAddressData] = useState({ addressInput: "" });
    const [loading, setLoading] = useState(false);
    // Admin Constants
    const [isAdminResult, setIsAdminResult] = useState('');
    // Faculty Constants
    const [isFacultyResult, setIsFacultyResult] = useState('');
    // Mint Constants 
    const [mintData, setMintData] = useState({
        moduleCode: "",
        testType: "",
        grade: "",
        trimester: "",
        recipient: ""
    });
    const [mintResult, setMintResult] = useState('');
    // Student Constants
    const [studentResult, setStudentResult] = useState('');
    const [formAddStudentData, setFormAddStudentData] = useState({ studentId: "", studentAddress: "" });
    // Module Constants
    const [modules, setModules] = useState([]);

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
    function handleStudent(evt) {
        const value = evt.target.value;
        setFormAddStudentData({
            ...formAddStudentData,
            [evt.target.name]: value
        });
    }

    // Admin Functions
    const functIsAdmin = async () => {
        try {
            const { addressInput } = formAddressData;
            const sitnftInstance = getSITNFTContract();
            console.log(sitnftInstance);
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

    // Student Functions
    const functAddStudent = async () => {
        const {
            studentId,
            studentAddress,
        } = formAddStudentData;

        const sitnftInstance = getSITNFTContract();
        try {
            const result = await sitnftInstance.addStudentAddress(
                studentId,
                studentAddress,
            );
            console.log(result);
            setStudentResult(result);
            return result;
        } catch (err) {
            console.error(err);
            setStudentResult(err);
            return err;
        }
    }
    const getStudentAddress = async () => {
        const {
            studentId
        } = formAddStudentData;
        const sitnftInstance = getSITNFTContract();
        try {
            const result = await sitnftInstance.getStudentAddress(
                studentId,
            );
            console.log(result);
            setStudentResult(result);
            return result;
        } catch (err) {
            console.error(err);
            setStudentResult(err);
            return err;
        }
    }

    // MyGrade Functions
    const functGetAllGrades = async () => {
        const sitnftInstance = getSITNFTContract();
        try {
            var result = [];
            const gradesNo = await sitnftInstance.totalSupply();
            for (let i = 0; i < gradesNo; i++) {
                const tempItem = await sitnftInstance.tokenURI(i + 1);
                result.push(tempItem);
            }
            setLoading(false);
            localStorage.setItem("grades", JSON.stringify(result));
            processModules();
            window.location.reload(true);
            return result;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    const processModules = (e) => {
        const gradeStorage = JSON.parse(localStorage.getItem("grades"));
        for (let i = 0; i < gradeStorage.length; i++) {
            const current = gradeStorage[i].split(",");
            // Decode the String
            var decodedString = atob(current[1]);
            gradeStorage[i] = JSON.parse(decodedString);
            if (i === 0) {
                modules.push(gradeStorage[i].attributes[0].value);
            } else {
                if (!modules.includes(gradeStorage[i].attributes[0].value.trim())) {
                    modules.push(gradeStorage[i].attributes[0].value.trim());
                }
            }
        }
        localStorage.setItem("modules", JSON.stringify(modules));
    };

    return (
        <ContractContext.Provider
            value={{
                loading,
                setLoading,
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
                handleMint,
                functAddStudent,
                formAddStudentData,
                handleStudent,
                studentResult,
                getStudentAddress,
                functGetAllGrades,
                grades,
                mods
            }}>
            {children}
        </ContractContext.Provider >
    );
}