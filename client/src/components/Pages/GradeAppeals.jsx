import React, { useContext, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { ContractContext } from '../../contexts/ContractProvider';
import { Modal, Button, Form } from "react-bootstrap";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="form-control mb-1"
  />
);



const GradeAppeals = () => {
  const { state, sitnftInstance } = useEth();
  console.log(sitnftInstance);

  const [isStudentResult, setIsStudentResult] = useState('');

  const {
    functIsAdmin,
    makeAdmin,
    removeAdmin,
    handleChange,
    formAddressData,
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
    transactionCount,
    transactions,
    getAllTransactions,
    isLoading,
    sendTransaction,
    formData,
    handleAlertFormChange,
    handleEvalFormChange,
    setNFTGrade,
    evalData
  } = useContext(ContractContext);
  const AlertInput = ({ placeholder, name, type, value, handleAlertFormChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleAlertFormChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
  const handleAlertSubmit = (e) => {
    const { message } = formData;
  
    e.preventDefault();
  
    if ( !message) return;
  
    sendTransaction();
  };
  const handleEvalSubmit = (e) => {
    const { targetTokenId,newGrade } = evalData;
  
    e.preventDefault();
  
    if ( !targetTokenId || !newGrade) return;
  
    setNFTGrade();
  };

  const renderAlerts = (e) => {
    // const { transactions, currentAccount } = useContext(ContractContext);
  
    return (
      <div class="col-sm-4">
      {/* <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleAlertFormChange} />
      <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleAlertFormChange} />
      <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleAlertFormChange} /> */}
      <Input placeholder="Enter reason for Grade Appeal and Certificate id" name="message" type="text" handleChange={handleAlertFormChange} />
      <div class="col-sm-3" />
          <button
            type="button"
            onClick={handleAlertSubmit}
            className=""
          >
            Submit Appeal
          </button>
      
     </div>
    );
  };
  const TransactionsCard = ({ addressFrom, timestamp, message}) => {
    return (
      <div className="bg-[#181918] m-4 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
      >
        <div className="flex flex-col items-center w-full mt-3">
          <div className="display-flex justify-start w-full mb-6 p-2">
            <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
              <p className="text-black text-base">From: {addressFrom}</p>
            </a>
            {message && (
              <>
                <p className="text-black text-base">Message from Student: <br></br> {message} {message.tokenName} {console.log("MESSAGE",message)}</p>
              </>
            )}
            <p className="text-black font-bold">{timestamp}</p>
          </div>
         
            

        </div>
      </div>
    );
  };
  
  const Transactions = () => {
  
    return (
      <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
        <div className="flex flex-col md:p-12 py-12 px-4">
          {state.accounts ? (
            <h3 className="text-black text-3xl text-center my-2">
              Reevaluation Requests
            </h3>
          ) : (
            <h3 className="text-black text-3xl text-center my-2">
              Connect your account to see the latest transactions
            </h3>
          )}
  
          <div className="flex flex-wrap justify-center items-center mt-10">
            {[...transactions].reverse().map((transaction, i) => (
              <TransactionsCard key={i} {...transaction} />
            ))}
            {/* {console.log("transactions array,",transactions)
            } */}
          </div>
        </div>
      </div>
    );
  };
  const renderEval = (e) => {
    // const { transactions, currentAccount } = useContext(ContractContext);
    return (
      <div class="col-sm-4">
      <Input placeholder="Certificate Id" name="targetTokenId" type="text" handleChange={handleEvalFormChange} />
      <Input placeholder="Re-evaluated Grade" name="newGrade" type="text" handleChange={handleEvalFormChange} />
      <div class="col-sm-3" />
          <button
            type="button"
            onClick={handleEvalSubmit}
            className=""
          >
            Submit Re-Evaluation
          </button>
    </div>
    );
  };

  return (
    <div className='page-two container mb-5'>
      <h2 className="pb-2 border-bottom text-start mt-3">Manage Appeals</h2>
      {renderAlerts()}
      {Transactions()}
      {renderEval()}
    </div>
  );
};

export default GradeAppeals;