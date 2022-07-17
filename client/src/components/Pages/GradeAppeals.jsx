import React, { useContext, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { ContractContext } from '../../contexts/ContractProvider';

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
    handleAlertFormChange
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
  const handleCheckAdmin = (e) => {
    const { addressInput } = formAddressData;
    e.preventDefault();
    if (!addressInput) {
      alert('Please enter valid Admin Address!');
      return;
    }
    getStudentAddress();
  };

  const handleCheckFaculty = (e) => {
    const { addressInput } = formAddressData;
    e.preventDefault();
    if (!addressInput) {
      alert('Please enter valid Faculty Address!');
      return;
    }
    functIsFaculty();
  };

  const handleCheckStudent = (e) => {
    const { addressInput } = formAddressData;
    e.preventDefault();
    if (!addressInput) {
      alert('Please enter valid Student Address!');
      return;
    }
    functIsStudent();
  };

  // Faculty Functions
  const functIsStudent = async () => {
    try {
      const { addressInput } = formAddressData;
      const result = await sitnftInstance.isStudent((addressInput).toString());
      setIsStudentResult(result);
      return result;
    } catch (err) {
      setIsStudentResult(err);
      console.error(err);
      return err;
    }
  }

  const renderIsStudent = (e) => {
    return (
      <>
        <div className="row g-3">
          <p className="border-bottom mt-3">Check Student</p>
          <div className="col-sm-6 mt-0">
            {/* <label htmlFor="lastName" className="form-label text-start">Address</label> */}
            <Input placeholder="Address e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
          </div>
          <div className="col-sm-6">
            <div className="row col-sm-12 text-center">
              <div className="col-sm-6 text-center">
                <button className="btn btn-block btn-primary mt-3" type="button" onClick={handleCheckStudent}>Check Student</button>
              </div>
            </div>
            <div className="my-3">
              Result:
              <div className="">
                <small>
                  {isStudentResult.toString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };

  const renderIsAdmin = (e) => {
    return (
      <>
        <div className="row g-3">
          <div className="col-sm-6 ">
            {/* <label htmlFor="lastName" className="form-label text-start">Address</label> */}
            <Input placeholder="Address e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
          </div>
          <div className="col-sm-6">
            <div className="row col-sm-12 text-center">
              <div className="col-sm-6 text-center">
                <button className="btn btn-block btn-primary mt-3" type="button" onClick={functIsAdmin}>Check Admin Status</button>
              </div>
              <div className="col-sm-3 text-center">
                <button className="btn btn-block btn-outline-secondary mt-3" type="button" onClick={makeAdmin}>Make Admin</button>
              </div>
              <div className="col-sm-3 text-center">
                <button className="btn btn-block btn-outline-danger mt-3" type="button" onClick={removeAdmin}>Remove Admin</button>
              </div>
            </div>
            <div className="my-3">
              Result:
              <div className="">
                <small>
                  {isAdminResult.toString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };

  const renderIsFaculty = (e) => {
    return (
      <>
        <div className="row g-3">
          <div className="col-sm-6 ">
            {/* <label htmlFor="lastName" className="form-label text-start">Address</label> */}
          </div>
          <div className="col-sm-6">
            <div className="row col-sm-12 text-center">
              <div className="col-sm-6 text-center">
                <button className="btn btn-block btn-primary mt-3" type="button" onClick={handleCheckFaculty}>Check Faculty Status</button>
              </div>
              <div className="col-sm-3 text-center">
                <button className="btn btn-block btn-outline-secondary mt-3" type="button" onClick={makeFaculty}>Make Faculty</button>
              </div>
              <div className="col-sm-3 text-center">
                <button className="btn btn-block btn-outline-danger mt-3" type="button" onClick={removeFaculty}>Remove Faculty</button>
              </div>
            </div>
            <div className="my-3">
              Result:
              <div className="">
                <small>
                  {isFacultyResult.toString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };

  const renderMint = (e) => {
    return (
      <>
        <p className="border-bottom mt-3">Mint: (Faculty Only)</p>
        <div className="row g-3">
          <div className="col-sm-6 ">
            {/* <label htmlFor="lastName" className="form-label text-start">Address</label> */}
            <input placeholder="Module Code" className="form-control mb-1" type="text" name="moduleCode" value={mintData.moduleCode} onChange={handleMint} />
            <input placeholder="Test Type" className="form-control mb-1" type="text" name="testType" value={mintData.testType} onChange={handleMint} />
            <input placeholder="Grade" className="form-control mb-1" type="text" name="grade" value={mintData.grade} onChange={handleMint} />
            <input placeholder="Trimester" className="form-control mb-1" type="text" name="trimester" value={mintData.trimester} onChange={handleMint} />
            <input placeholder="Recipient ID (200xxxx)" className="form-control mb-1" type="text" name="recipient" value={mintData.recipient} onChange={handleMint} />
          </div>
          <div className="col-sm-6">
            <div className="row col-sm-12 text-center">
              <div className="col-sm-6 text-start">
                <button className="btn btn-block btn-primary mt-3" type="button" onClick={functMint}>Mint</button>
              </div>
            </div>
            <div className="mt-3">
              Result:
              <div className="">
                <small>
                  {mintResult.toString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };

  const renderStudent = (e) => {
    return (
      <>
        <p className="border-bottom mt-3">Add Student:</p>
        <div className="row g-3">
          <div className="col-sm-6 ">
            {/* <label htmlFor="lastName" className="form-label text-start">Address</label> */}
            <input placeholder="Student ID" className="form-control mb-1" type="text" name="studentId" value={formAddStudentData.studentId} onChange={handleStudent} />
            <input placeholder="Student Address" className="form-control mb-1" type="text" name="studentAddress" value={formAddStudentData.studentAddress} onChange={handleStudent} />
          </div>
          <div className="col-sm-6">
            <div className="row col-sm-12 text-center">
              <div className="col-sm-6 text-start">
                <button className="btn btn-block btn-primary mt-3" type="button" onClick={functAddStudent}>Add Student</button>
              </div>
              <div className="col-sm-6 text-start">
                <button className="btn btn-block btn-primary mt-3" type="button" onClick={getStudentAddress}>Get Student Address</button>
              </div>
            </div>
            <div className="mt-3">
              Result:
              <div className="">
                <small>
                  {studentResult.toString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };
  // const renderAlerts = (e) => {
  //   // const { transactions, currentAccount } = useContext(ContractContext);
  
  //   return (
  //     <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
  //       <div className="flex flex-col md:p-12 py-12 px-4">
  //         {currentAccount ? (
  //           <h3 className="text-white text-3xl text-center my-2">
  //             Latest Transactions
  //           </h3>
  //         ) : (
  //           <h3 className="text-white text-3xl text-center my-2">
  //             Connect your account to see the latest transactions
  //           </h3>
  //         )}
  
  //         <div className="flex flex-wrap justify-center items-center mt-10">
  //           {[...transactions].reverse().map((transaction, i) => (
  //             <TransactionsCard key={i} {...transaction} />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
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
                <p className="text-black text-base">Reason: {message}</p>
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

  return (
    <div className='page-two container mb-5'>
      <h2 className="pb-2 border-bottom text-start mt-3">Manage Appeals.</h2>
      {renderIsStudent()}
      {renderStudent()}
      {renderMint()}
      <p className="border-bottom mt-3">Admin/Faculty check:</p>
      {renderIsAdmin()}
      {renderIsFaculty()}
      {renderAlerts()}
      {Transactions()}
    </div>
  );
};

export default GradeAppeals;