import React, { useContext, useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
// const EvalMapping =  {

// }



const GradeAppeals = () => {
  const { state, sitnftInstance } = useEth();
  // console.log(sitnftInstance);

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
    evalData,
    EvalMapping
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

  const handleEvalSubmit = (e) => {
    const { targetTokenId,newGrade } = evalData;
  
    e.preventDefault();
  
    if ( !targetTokenId || !newGrade) return;
  
    setNFTGrade();
  };

  // const renderAlerts = (e) => {
  //   // const { transactions, currentAccount } = useContext(ContractContext);
  
  //   return (
  //     <div class="col-sm-4">
  //     {/* <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleAlertFormChange} />
  //     <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleAlertFormChange} />
  //     <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleAlertFormChange} /> */}
  //     <Input placeholder="Enter reason for Grade Appeal and Certificate id" name="message" type="text" handleChange={handleAlertFormChange} />
  //     <div class="col-sm-3" />
  //         <button
  //           type="button"
  //           onClick={handleAlertSubmit}
  //           className=""
  //         >
  //           Submit Appeal
  //         </button>
      
  //    </div>
  //   );
  // };
  const TransactionsCard = ({ addressFrom, timestamp, message,tokenName,reviewed}) => {
    
    return (
      <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>{message} </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{tokenName} </Card.Subtitle>
        <Card.Text>
            Applied on: {timestamp}
            <br></br>
            Certificate Id: {tokenName.slice(-1)}
        </Card.Text>
        <Card.Link href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
        <p className="">From: {addressFrom}</p>
        </Card.Link>
      </Card.Body>
    </Card>

      // <div className="">
            // <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
      //         <p className="">From: {addressFrom}</p>
      //       </a>
      //       {message && (
      //         <>
      //           <p className="text-black text-base">
      //           Appeal Reason: {message} 
      //           <br></br> 
      //           Certificate Name: {tokenName} 
      //           </p>
      //         </>
      //       )}
      //       <p className="">{timestamp}</p>
      // </div>
    );
  };
  
  const Transactions = () => {
  
    return (
      <div className="">
          {/* {state.accounts ? (
            <h3 className="text-black text-3xl text-center my-2">
              Reevaluation Requests
            </h3>
          ) : (
            <h3 className="text-black text-3xl text-center my-2">
              Connect your account to see the latest transactions
            </h3>
          )} */}
        <Container>
          <Row>
          {[...transactions].map((transaction, i) => (
            
           <Col md="auto">

          {transaction.reviewed ? (<div></div>) : (<TransactionsCard key={i} {...transaction} />)}
          {/* <TransactionsCard key={i} {...transaction} /> */}
 

           <div hidden>
           {EvalMapping[transaction.tokenName.slice(-1)] = i}
           </div>
           {console.log("EvalMap = ",EvalMapping)}
           
           </Col>
          ))}
          </Row>
        </Container>
        
            
      </div>
    );
  };
  const renderEval = (e) => {
    // const { transactions, currentAccount } = useContext(ContractContext);
    return (
      <div class="col-sm-6">
        <p></p>
      <Input placeholder="Certificate Id" name="targetTokenId" type="text" handleChange={handleEvalFormChange} />
      <Input placeholder="Re-evaluated Grade" name="newGrade" type="text" handleChange={handleEvalFormChange} />
      <div class="col-sm-6" />
          <Button
            type="button"
            onClick={handleEvalSubmit}
            className=""
          >
            Submit Re-Evaluation
          </Button>
    </div>
    );
  };

  return (
    <div className='page-two container mb-5'>
      <h2 className="pb-2 border-bottom text-start mt-3">Manage Appeals</h2>
      {/* {renderAlerts()} */}
      {Transactions()}
      {renderEval()}
    </div>
  );
};

export default GradeAppeals;