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

const GradeAppeals = () => {
  const { state, sitnftInstance } = useEth();

  const {
    transactions,
    handleEvalFormChange,
    setNFTGrade,
    evalData,
    EvalMapping,
    regradeLoading,
    regradeReceipt
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
  const filterAppeals = () => {
    var arr = [];
    transactions.forEach(function (item, index) {
      EvalMapping[item.tokenName.split("Certificate ")[1]] = index;
      if (item.reviewed == 0) {
        arr.push(transactions[index]);
      }
    });
    return arr;
  }
  const handleEvalSubmit = (e) => {
    const { targetTokenId, newGrade } = evalData;

    e.preventDefault();

    if (!targetTokenId || !newGrade) {
      alert("Please complete the required fields.")
      return;
    }

    setNFTGrade();
  };

  const TransactionsCard = ({ addressFrom, timestamp, message, tokenName, reviewed }) => {
    return (
      <Card className="m-3" style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>{message}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{tokenName} </Card.Subtitle>
          <Card.Text>
            Applied on: {timestamp}
            <br></br>
            Certificate Id: {tokenName.split("Certificate ")[1]}
          </Card.Text>
          <Card.Link href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="">From: {addressFrom}</p>
          </Card.Link>
        </Card.Body>
      </Card>
    );
  };

  const Transactions = () => {

    return (
      <div className="">
        <Container>
          <Row md={4}>
            {filterAppeals().length == 0 ?
              <div className="text-center m-5">
                <h2>No appeals found.</h2>
              </div>
              :
              null
            }
            {[...filterAppeals()].map((appeal, i) => (
              <div>
                <TransactionsCard key={i} {...appeal}></TransactionsCard>
              </div>
            ))}
          </Row>
        </Container>
      </div>
    );
  };
  const renderEval = (e) => {
    return (
      <div className="col-sm-6 m-3">
        <p></p>
        <Input placeholder="Certificate Id (example: 6)" name="targetTokenId" type="text" handleChange={handleEvalFormChange} />
        <Input placeholder="New Grade" name="newGrade" type="text" handleChange={handleEvalFormChange} />
        <div className="col-sm-6" />
        <Button
          type="button"
          onClick={handleEvalSubmit}
          className=""
        >
          Confirm
        </Button>
      </div>
    );
  };

  const renderLoading = (e) => {
    return (
      <>
        <div className="row g-3 m-2">
          <div className="row w-100 d-inline-block fs-5">
            <div className="text-end">
              {regradeLoading ?
                <div className="spinner-border text-secondary align-middle m-3 text-end" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                : null
              }
              <small className="">
                {regradeReceipt.toString()}
              </small>
            </div>
          </div>
        </div>
      </>
    )
  };

  return (
    <div className='page-two container mb-5'>
      <h2 className="pb-2 border-bottom text-start mt-3">Manage Appeals</h2>
      {renderLoading()}
      {Transactions()}
      {renderEval()}
    </div>
  );
};

export default GradeAppeals;