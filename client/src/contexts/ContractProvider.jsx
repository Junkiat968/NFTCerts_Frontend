import React, { useEffect, useState } from "react";
import useEth from "./EthContext/useEth";
import { ethers } from "ethers";
export const ContractContext = React.createContext();
const { ethereum } = window;
/** Local/Persistent Storage */
var grades = localStorage.getItem("grades");
var mods = localStorage.getItem("modules");

export const ContractProvider = ({ children }) => {
    const { state, getSITNFTContract } = useEth();
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
    // Alert Constants

    const [formData, setAlertformData] = useState({ message: "", tokenName: "", faculty: "" });

    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);
    // Reevaluation Constants

    const [evalData, setEvalformData] = useState({ targetTokenId: "", newGrade: "" });
    const EvalMapping = useState({});

    const [regradeRequestLoading, setRegradeRequestLoading] = useState(false);
    const [regradeRequestReceipt, setRegradeRequestReceipt] = useState([]);
    const [regradeLoading, setRegradeLoading] = useState(false);
    const [regradeReceipt, setRegradeReceipt] = useState([]);

    /** Form Handling */
    const handleChange = (e, name) => {
        setFormAddressData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const handleAlertFormChange = (e, faculty) => {
        // console.log("handlealertformchange e.target.value = ",e.target.value)
        // console.log("handlealertformchange e.target.value = ",e.target.id)
        // console.log("handlealertformchange event faculty",faculty);
        setAlertformData((prevState) => ({ ...prevState, message: e.target.value, tokenName: e.target.id, faculty: faculty }));

    };
    const handleEvalFormChange = (e, name, position) => {
        setEvalformData((prevState) => ({ ...prevState, [name]: e.target.value, position: position }));

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
    const makeMultiFaculty = async (facultyArr) => {
        facultyArr.map((addr) => {
            formAddressData.addressInput = addr.addr;
            makeFaculty()
        })
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
            // const gradesNo = await sitnftInstance.totalSupply();

            //---------------------------------------------------------------------------------
            const noOfTokens = await sitnftInstance.balanceOf(state.accounts[0]);
            for (let i = 0; i < noOfTokens; i++) {
                const tokenId = await sitnftInstance.tokenOfOwnerByIndex(state.accounts[0], i);
                const tempItem = await sitnftInstance.tokenURI(tokenId);
                result.push(tempItem);
            }
            //---------------------------------------------------------------------------------

            // for (let i = 0; i < gradesNo; i++) {
            //     const tempItem = await sitnftInstance.tokenURI(i + 1);
            //     result.push(tempItem);
            // }
            setLoading(false);
            localStorage.setItem("grades", JSON.stringify(result));
            processModules();
            // window.location.reload(true);
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

    // Alert functions
    const getAllTransactions = async (faculty) => {
        try {
            const sitnftInstance = getSITNFTContract();

            const availableTransactions = await sitnftInstance.getAllTransactions(faculty);
            // console.log("Availabletx:,",availableTransactions);
            // const structuredTransactions = [];
            // availableTransactions.forEach(transaction => {
            //     if (transaction.reviewed ==true){
            //         return;
            //     }else{
            //         structuredTransactions.push({
            //             addressTo: transaction.receiver,
            //               addressFrom: transaction.sender,
            //               timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
            //               message: transaction.message,
            //               tokenName: transaction.tokenName,
            //               reviewed: transaction.reviewed,
            //         });
            //     }
            // })
            const structuredTransactions = availableTransactions.map((transaction) => ({

                //   addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                tokenName: transaction.tokenName,
                reviewed: transaction.reviewed,
                //   keyword: transaction.keyword,
                //   amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));

            // console.log("All Appeal TX:",structuredTransactions);
            setTransactions(structuredTransactions);

        } catch (error) {
            console.log(error);
        }
    };
    const checkIfWalletIsConnect = async () => {
        try {

            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions(accounts[0]);
            } else {
                console.log("No accounts found");
            }

        } catch (error) {
            console.log(error);
        }
    };
    //     const checkIfTransactionsExists = async () => {
    //     try {

    //         const sitnftInstance = getSITNFTContract();
    //         // const currentTransactionCount = await sitnftInstance.getTransactionCount();
    //         // window.localStorage.setItem("transactionCount", currentTransactionCount);

    //     } catch (error) {
    //       console.log(error);
    //       throw new Error("No ethereum object");
    //     }
    //   };
    const sendTransaction = async () => {
        try {
            const { message, tokenName, faculty } = formData;
            const sitnftInstance = getSITNFTContract();
            console.log("SendTransaction() parameters", message, tokenName, tokenName.slice(-1), faculty);
            const transactionHash = await sitnftInstance.addToBlockchain(message, tokenName, tokenName.slice(-1), faculty);

            const interval = setInterval(function () {
                console.log("awaiting transaction confirmation...");
                setRegradeRequestReceipt("Awaiting transaction confirmation...");
                setRegradeRequestLoading(true);
                state.web3.eth.getTransactionReceipt(transactionHash.hash, function (err, rec) {
                    if (rec) {
                        console.log(rec);
                        if (rec.status) {
                            functIsAdmin();
                            setRegradeRequestReceipt("Request sent.");
                            setRegradeRequestLoading(false);
                        }
                        if (rec.status !== true) {
                            setRegradeRequestLoading(false);
                            setRegradeRequestReceipt("Error occured.");
                        }
                        clearInterval(interval);
                    }
                });
            }, 2000);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);
            window.location.reload();

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
    // Reevaluate NFT Grade
    const setNFTGrade = async () => {
        try {
            const { targetTokenId, newGrade } = evalData
            // console.log("tid,ngrade",targetTokenId,newGrade);
            // console.log("setNFTGrade()EvalMapping",EvalMapping);
            // console.log("setNFTGRADE position=",EvalMapping[targetTokenId]);
            const sitnftInstance = getSITNFTContract();
            // const id = ethers.utils.parseEther(1);
            const setNFTGradeRes = await sitnftInstance.setMetadata(targetTokenId, newGrade, EvalMapping[targetTokenId]);
            // console.log("setNFTGrade()Result",setNFTGradeRes;

            const interval = setInterval(function () {
                console.log("awaiting transaction confirmation...");
                setRegradeReceipt("Awaiting transaction confirmation...");
                setRegradeLoading(true);
                state.web3.eth.getTransactionReceipt(setNFTGradeRes.hash, function (err, rec) {
                    if (rec) {
                        console.log(rec);
                        if (rec.status) {
                            functIsAdmin();
                            setRegradeReceipt("Request sent.");
                            setRegradeLoading(false);
                        }
                        if (rec.status !== true) {
                            setRegradeLoading(false);
                            setRegradeReceipt("Error occured.");
                        }
                        clearInterval(interval);
                    }
                });
            }, 2000);

            await setNFTGradeRes.wait();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        checkIfWalletIsConnect();
        // checkIfTransactionsExists();
    }, [transactionCount]);
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
                makeMultiFaculty,
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
                mods,
                transactionCount,
                transactions,
                isLoading,
                sendTransaction,
                formData,
                getAllTransactions,
                handleAlertFormChange,
                handleEvalFormChange,
                setNFTGrade,
                evalData,
                EvalMapping,
                regradeRequestLoading,
                regradeRequestReceipt,
                regradeLoading,
                regradeReceipt
            }}>
            {children}
        </ContractContext.Provider >
    );
}