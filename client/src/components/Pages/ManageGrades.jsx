import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Col, Row, Nav, Tab, Table } from 'react-bootstrap';
import useEth from "../../contexts/EthContext/useEth";

// import Sidebar from "./Sidebar";
import "./table.css";
import { getDropdownMenuPlacement } from "react-bootstrap/esm/DropdownMenu";

const ManageGrades = () => {
  const { state, sitnftInstance } = useEth();
  const [items, setItems] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [mintData, setMintData] = useState({ moduleCodeInput: "", testTypeInput: "", trimesterInput: "" });

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
        onClick={functMultiMint}>Mint
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
    const { moduleCodeInput, testTypeInput, trimesterInput } = mintData;

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
        console.log(gradeItems.toString());
        const result = await sitnftInstance.batchMint(
          gradeItems
        );
        console.log(result.events);
      } catch (err) {
        console.error(err);
        return err;
      }
    } else {
      alert("File too big. Please limit file to 10 rows.");
    }
  }

  return (
    <div className='container' >
      <Tab.Container id="left-tabs" defaultActiveKey="ICT1001">
        <Row className="p-3">
          <Col sm={3}>
            <Nav variant="pills" className="flex-column p-3" onSelect={(selectedKey) => setSelectedModule(selectedKey)}>
              <Nav.Item>
                <Nav.Link eventKey="ICT1001">ICT1001 Introduction to Computing</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ICT2102">ICT2102 Introduction to Software Engineering</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="ICT1001">
                <div>
                  <div className="p-3 w-100 d-inline-block">
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
                      {uploadedFileName ? uploadedFileName : 'Upload Grades'}
                    </button>
                  </div>
                  {renderTable()}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="ICT2102">
                <div>
                  <div className="p-3 w-100 d-inline-block">
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
                      {uploadedFileName ? uploadedFileName : 'Upload Grades'}
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
