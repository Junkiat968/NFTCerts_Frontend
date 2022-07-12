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

  const functMultiMint = async () => {
    // const rows = 5;
    // var moduleCode = "M1001";
    // var testType = "Quiz 1";
    // var grade = ["A", "B", "C", "D", "F"];
    // var trimester = "2";

    const gradeItems = [];

    if (items.length <= 10) {
      for (let i = 0; i < items.length; i++) {
        gradeItems.push({
          moduleCode: "M1002",
          testType: "Quiz 1",
          grade: items[i].Grade.toString(),
          trimester: "3",
          recipient: items[i].Id.toString()
        });
      }
    } else {
      alert("file too big");
    }

    try {
      console.log(gradeItems.toString());
      const result = await sitnftInstance.batchMint(
        gradeItems
      );
      for (let i = 0; i < items.length; i++) {
        console.log(
          gradeItems[i]
        );
        // console.log(result);
      }
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  return (
    <div className='container' >
      <Tab.Container id="left-tabs" defaultActiveKey="first">
        <Row className="p-3">
          <Col sm={3}>
            <Nav variant="pills" className="flex-column p-3">
              <Nav.Item>
                <Nav.Link eventKey="first">ICT1001 Introuction to Computing</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">ICT2102 Introduction to Software Engineering</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div>
                  {/* <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} /> */}
                  <div className="p-3 w-100 d-inline-block">
                    <button className="float-end btn btn-block btn-outline-primary mx-3" type="button"
                      onClick={functMultiMint}>Multi-Mint
                    </button>
                    {/* <label className="mx-3">Choose file: </label> */}
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
                  <div>
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
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <h2>h2</h2>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ManageGrades;
