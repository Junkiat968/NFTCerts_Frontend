import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Col, Row, Nav, Tab, Table } from 'react-bootstrap';
import useEth from "../../contexts/EthContext/useEth";

import "./table.css";
// import { getDropdownMenuPlacement } from "react-bootstrap/esm/DropdownMenu";

const ManageGrades = () => {
  const { state, sitnftInstance } = useEth();
  const [items, setItems] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [mintData, setMintData] = useState({ testTypeInput: "", trimesterInput: "" });
  const [receipt, setReceipt] = useState([]);
  const [receiptLoading, setReceiptLoading] = useState(false);

  function handleMint(evt) {
    const value = evt.target.value;
    setMintData({
      ...mintData,
      [evt.target.name]: value
    });
  }

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  const [uploadedFileName, setUploadedFileName] = useState('');
  const [inputFile, setInputFile] = useState('');
  useEffect(() => {
    setInputFile(document.getElementById("input-file"));
  }, []);
  const handleUpload = () => {
    inputFile?.click();
  };
  const handleDisplayFileDetails = () => {
    inputFile?.files && setUploadedFileName(inputFile.files[0].name);
    readExcel(inputFile.files[0])
  };

  const renderButtons = (e) => {
    return (
      <button className="float-end btn btn-block btn-outline-primary ms-3" type="button"
        onClick={functMultiMint}>Confirm
      </button>
    );
  };

  const renderTable = (e) => {
    return (
      <div>
        <div className="mb-3">
          <input placeholder="Test Type" className="form-control mb-1" type="text" name="testTypeInput"
            value={mintData.testTypeInput} onChange={handleMint}
          />
          <input placeholder="Trimester" className="form-control mb-1" type="text" name="trimesterInput"
            value={mintData.trimesterInput} onChange={handleMint}
          />
        </div>
        <Table responsive hover>
          <thead>
            <tr>
              <th scope="col">Student</th>
              <th scope="col">Student ID</th>
              <th scope="col">Grade</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.Id}>
                <td>{d.Name}</td>
                <td>{d.Id}</td>
                <td>{d.Grade}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  const functMultiMint = async () => {
    const gradeItems = [];
    const { testTypeInput, trimesterInput } = mintData;

    if (!testTypeInput || !trimesterInput) {
      alert('Please enter a valid input!');
      return;
    }

    if (items.length <= 10) {
      for (let i = 0; i < items.length; i++) {
        gradeItems.push({
          moduleCode: selectedModule,
          testType: testTypeInput,
          grade: items[i].Grade.toString(),
          trimester: trimesterInput,
          recipient: items[i].Id.toString()
        });
      }

      try {
        const result = await sitnftInstance.batchMint(
          gradeItems
        );

        const interval = setInterval(function () {
          console.log("awaiting transaction confirmation...");
          setReceipt("Awaiting transaction confirmation...");
          setReceiptLoading(true);
          state.web3.eth.getTransactionReceipt(result.hash, function (err, rec) {
            if (rec) {
              console.log(rec);
              if (rec.status) {
                setReceipt("Transaction Complete.");
                setReceiptLoading(false);
              }
              if (rec.status !== true) {
                setReceiptLoading(false);
                setReceipt("Error occured.");
              }
              clearInterval(interval);
            }
          });
        }, 2000);
      } catch (err) {
        console.error(err);
        setReceipt("Error " + err.reason);
        return err;
      }
    } else {
      alert("Please limit file to 10 rows.");
    }
  }

  return (
    <div className='container' >
      <h2 className="border-bottom text-start mt-3">Manage Grades.</h2>
      <Tab.Container id="left-tabs" defaultActiveKey="ICT1001">
        <Row className="p-1">
          <Col sm={3}>
            <Nav variant="pills" className="flex-column p-3" onSelect={(selectedKey) => setSelectedModule(selectedKey)}>
              <Nav.Item>
                <Nav.Link eventKey="ICT1001">ICT1001 Introduction to Computing</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ICT1002">ICT1002 Programming Fundamentals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ICT2101">ICT2101 Introduction to Software Engineering</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ICT2102">ICT2102 Human Computer Interaction</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ICT3101">ICT3101 Software Verification And Validation</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="ICT1001">
                <div>
                  <div className="p-3 w-100 d-inline-block">
                    <div className="float-start align-middle">
                      {receiptLoading ?
                        <div className="spinner-border text-secondary align-middle me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        null
                      }
                      {receipt}
                    </div>
                    {uploadedFileName ? renderButtons() : null}
                    <input
                      id="input-file"
                      onChange={handleDisplayFileDetails}
                      className="d-none"
                      type="file"
                    />
                    <button
                      onClick={handleUpload}
                      className={`float-end btn btn-outline-${uploadedFileName ? "success" : "primary"
                        }`}
                    >
                      {uploadedFileName ? uploadedFileName : 'Select Excel'}
                    </button>
                  </div>
                  {renderTable()}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="ICT1002">
                <div>
                  <div className="p-3 w-100 d-inline-block">
                    <div className="float-start align-middle">
                      {receiptLoading ?
                        <div className="spinner-border text-secondary align-middle me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        null
                      }
                      {receipt}
                    </div>
                    {uploadedFileName ? renderButtons() : null}
                    <input
                      id="input-file"
                      onChange={handleDisplayFileDetails}
                      className="d-none"
                      type="file"
                    />
                    <button
                      onClick={handleUpload}
                      className={`float-end btn btn-outline-${uploadedFileName ? "success" : "primary"
                        }`}
                    >
                      {uploadedFileName ? uploadedFileName : 'Select Excel'}
                    </button>
                  </div>
                  {renderTable()}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="ICT2101">
                <div>
                  <div className="p-3 w-100 d-inline-block">
                    <div className="float-start align-middle">
                      {receiptLoading ?
                        <div className="spinner-border text-secondary align-middle me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        null
                      }
                      {receipt}
                    </div>
                    {uploadedFileName ? renderButtons() : null}
                    <input
                      id="input-file"
                      onChange={handleDisplayFileDetails}
                      className="d-none"
                      type="file"
                    />
                    <button
                      onClick={handleUpload}
                      className={`float-end btn btn-outline-${uploadedFileName ? "success" : "primary"
                        }`}
                    >
                      {uploadedFileName ? uploadedFileName : 'Select Excel'}
                    </button>
                  </div>
                  {renderTable()}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="ICT2102">
                <div>
                  <div className="p-3 w-100 d-inline-block">
                    <div className="float-start align-middle">
                      {receiptLoading ?
                        <div className="spinner-border text-secondary align-middle me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        null
                      }
                      {receipt}
                    </div>
                    {uploadedFileName ? renderButtons() : null}
                    <input
                      id="input-file"
                      onChange={handleDisplayFileDetails}
                      className="d-none"
                      type="file"
                    />
                    <button
                      onClick={handleUpload}
                      className={`float-end btn btn-outline-${uploadedFileName ? "success" : "primary"
                        }`}
                    >
                      {uploadedFileName ? uploadedFileName : 'Select Excel'}
                    </button>
                  </div>
                  {renderTable()}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="ICT3101">
                <div>
                  <div className="p-3 w-100 d-inline-block">
                    <div className="float-start align-middle">
                      {receiptLoading ?
                        <div className="spinner-border text-secondary align-middle me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        null
                      }
                      {receipt}
                    </div>
                    {uploadedFileName ? renderButtons() : null}
                    <input
                      id="input-file"
                      onChange={handleDisplayFileDetails}
                      className="d-none"
                      type="file"
                    />
                    <button
                      onClick={handleUpload}
                      className={`float-end btn btn-outline-${uploadedFileName ? "success" : "primary"
                        }`}
                    >
                      {uploadedFileName ? uploadedFileName : 'Select Excel'}
                    </button>
                  </div>
                  {renderTable()}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ManageGrades;
