import React, { useState, useEffect, useContext } from "react";
import * as XLSX from "xlsx";
import { Col, Row, Nav, Tab, Table } from 'react-bootstrap';
import useEth from "../../contexts/EthContext/useEth";
import { ContractContext } from '../../contexts/ContractProvider';

// import Sidebar from "./Sidebar";
import "./table.css";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="form-control mb-1"
  />
);

const ManageAccounts = () => {
  const { state, getSITNFTContract, sitnftInstance } = useEth();
  const [items, setItems] = useState([]);
  const [isStudentResult, setIsStudentResult] = useState('');

  const {
    functIsAdmin,
    makeAdmin,
    removeAdmin,
    handleChange,
    isAdminResult,
    functIsFaculty,
    isFacultyResult,
    makeFaculty,
    removeFaculty,
    formAddressData
  } = useContext(ContractContext);

  const handleCheckAdmin = (e) => {
    const { addressInput } = formAddressData;
    e.preventDefault();
    if (!addressInput) {
      alert('Please enter valid Admin Address!');
      return;
    }
    functIsAdmin();
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

  // Student Functions
  const functAddStudents = async () => {
    const sitnftInstance = getSITNFTContract();
    console.log(items);
    try {
      const result = await sitnftInstance.multiAddStudentAddress(
        items,
      );

      console.log(result);
      // setStudentResult(result);
      return result;
    } catch (err) {
      console.error(err);
      // setStudentResult(err);
      return err;
    }
  }

  // Faculty Functions
  const functAddFaculty = async () => {
    const sitnftInstance = getSITNFTContract();
    console.log(items);
    var facultyArr = [];
    for (let i = 0; i < items.length; i++) {
      facultyArr.push(items[i].addr.toString());
    }
    console.log(facultyArr);
    console.log(typeof facultyArr[0])

    try {
      const result = await sitnftInstance.multiAddFaculty(
        facultyArr
      );
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

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

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { raw: false });
        resolve(data);
        // console.log(data);
        // console.log(JSON.stringify(data));
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

  const renderIsAdmin = (e) => {
    return (
      <>
        <div className="row g-3">
          <div className="col-sm-6 ">
            <Input placeholder="Address e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
          </div>
          <div className="col-sm-6">
            <div className="row col-sm-12 text-center">
              <div className="col-sm-6 text-center">
                <button className="btn btn-block btn-primary mt-3" type="button" onClick={handleCheckAdmin}>Check Admin Status</button>
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
            <Input placeholder="Address e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
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

  const renderIsStudent = (e) => {
    return (
      <>
        <div className="row g-3">
          <p className="border-bottom mt-3">Check Student</p>
          <div className="col-sm-6 mt-0">
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

  return (
    <div className='container' >
      <h2 className="border-bottom text-start mt-3">Manage Accounts.</h2>
      <Tab.Container id="left-tabs" defaultActiveKey="Admin">
        <Row className="p-1">
          <Col sm={3}>
            <Nav variant="pills" className="flex-column p-3">
              <Nav.Item>
                <Nav.Link eventKey="Admin">Manage Admin</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Faculty">Manage Faculty</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Students">Manage Students</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="Admin">
                {renderIsAdmin()}
              </Tab.Pane>
              <Tab.Pane eventKey="Faculty">
                {renderIsFaculty()}
                <hr />
                <div className="p-3 w-100 d-inline-block">
                  <input
                    id="input-file"
                    onChange={handleDisplayFileDetails}
                    className="d-none"
                    type="file"
                  />
                  <button className="float-end btn btn-block btn-outline-primary mx-3" type="button"
                    onClick={functAddFaculty}>Upload
                  </button>
                  <button onClick={handleUpload}
                    className={`float-end btn btn-outline-${uploadedFileName ? "success" : "primary"
                      }`}
                  >
                    {uploadedFileName ? uploadedFileName : 'Select excel'}
                  </button>
                </div>
                <div>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Faculty ID</th>
                        <th scope="col">Faculty Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((d) => (
                        <tr key={d.id}>
                          <td>{d.id}</td>
                          <td>{d.addr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Students">
                {renderIsStudent()}
                <hr />
                <div className="p-3 w-100 d-inline-block">
                  <input
                    id="input-file"
                    onChange={handleDisplayFileDetails}
                    className="d-none"
                    type="file"
                  />
                  <button className="float-end btn btn-block btn-outline-primary mx-3" type="button"
                    onClick={functAddStudents}>Upload
                  </button>
                  <button onClick={handleUpload}
                    className={`float-end btn btn-outline-${uploadedFileName ? "success" : "primary"
                      }`}
                  >
                    {uploadedFileName ? uploadedFileName : 'Select excel'}
                  </button>
                </div>
                <div>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Student ID</th>
                        <th scope="col">Student Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((d) => (
                        <tr key={d.id}>
                          <td>{d.id}</td>
                          <td>{d.addr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ManageAccounts;
