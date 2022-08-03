import React, { useState, useEffect, useContext } from "react";
import * as XLSX from "xlsx";
import { Col, Row, Nav, Tab, Table, Button } from 'react-bootstrap';
import useEth from "../../contexts/EthContext/useEth";
import { ContractContext } from '../../contexts/ContractProvider';

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
  const [formAddressData, setFormAddressData] = useState({ addressInput: "" });

  /** ROLE CHECKING VARIABLES */
  const [isAdminResult, setIsAdminResult] = useState('');
  const [adminResultLoading, setAdminResultLoading] = useState(false);
  const [isFacultyResult, setIsFacultyResult] = useState('');
  const [facultyResultLoading, setFacultyResultLoading] = useState(false);
  const [isStudentResult, setIsStudentResult] = useState('');
  const [studentResultLoading, setStudentResultLoading] = useState(false);

  /** MAKE & REMOVE ADMIN */
  const [makeRemoveAdminLoading, setMakeRemoveAdminLoading] = useState(false);
  const [makeRemoveAdminReceipt, setMakeRemoveAdminReceipt] = useState([]);

  /** MAKE & REMOVE FACULTY */
  const [makeRemoveFacultyLoading, setMakeRemoveFacultyLoading] = useState(false);
  const [makeRemoveFacultyReceipt, setMakeRemoveFacultyReceipt] = useState([]);

  /** MAKE STUDENT */
  const [formAddStudentData, setFormAddStudentData] = useState({ studentId: "", studentAddress: "" });
  const [studentResult, setStudentResult] = useState('');
  const [makeStudentLoading, setMakeStudentLoading] = useState(false);
  const [makeStudentReceipt, setMakeStudentReceipt] = useState([]);

  /** FACULTY UPLOAD VARIABLES */
  const [facultyItems, setFacultyItems] = useState([]);
  const [uploadedFileFaculty, setUploadedFileFaculty] = useState('');
  const [inputFacultyFile, setInputFacultyFile] = useState('');
  const [facultyUploadLoading, setFacultyUploadLoading] = useState(false);
  const [facultyReceipt, setFacultyReceipt] = useState([]);

  /** STUDENT CHECKING VARIABLES */
  const [studentItems, setStudentItems] = useState([]);
  const [uploadedFileStudent, setUploadedFileStudent] = useState('');
  const [inputStudentFile, setInputStudentFile] = useState('');
  const [studentUploadLoading, setStudentUploadLoading] = useState(false);
  const [studentReceipt, setStudentReceipt] = useState([]);

  /** Form Handlers */
  const handleChange = (e, name) => {
    setFormAddressData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
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
  function handleStudent(evt) {
    const value = evt.target.value;
    setFormAddStudentData({
      ...formAddStudentData,
      [evt.target.name]: value
    });
  }

  /** MAKE & REMOVE ADMIN */
  const makeAdmin = async () => {
    const { addressInput } = formAddressData;
    try {
      const result = await sitnftInstance.addAdmin((addressInput).toString());

      const interval = setInterval(function () {
        console.log("awaiting transaction confirmation...");
        setMakeRemoveAdminReceipt("Awaiting transaction confirmation...");
        setMakeRemoveAdminLoading(true);
        state.web3.eth.getTransactionReceipt(result.hash, function (err, rec) {
          if (rec) {
            console.log(rec);
            if (rec.status) {
              functIsAdmin();
              setMakeRemoveAdminReceipt("Transaction Complete.");
              setMakeRemoveAdminLoading(false);
            }
            if (rec.status !== true) {
              setMakeRemoveAdminLoading(false);
              setMakeRemoveAdminReceipt("Error occured.");
            }
            clearInterval(interval);
          }
        });
      }, 2000);
    } catch (err) {
      setIsAdminResult(err);
      setMakeRemoveAdminLoading(false);
      console.error(err);
      return err;
    }
  }
  const removeAdmin = async () => {
    const { addressInput } = formAddressData;
    try {
      const result = await sitnftInstance.removeAdmin((addressInput).toString());

      const interval = setInterval(function () {
        console.log("awaiting transaction confirmation...");
        setMakeRemoveAdminReceipt("Awaiting transaction confirmation...");
        setMakeRemoveAdminLoading(true);
        state.web3.eth.getTransactionReceipt(result.hash, function (err, rec) {
          if (rec) {
            console.log(rec);
            if (rec.status) {
              functIsAdmin();
              setMakeRemoveAdminReceipt("Transaction Complete.");
              setMakeRemoveAdminLoading(false);
            }
            if (rec.status !== true) {
              setMakeRemoveAdminLoading(false);
              setMakeRemoveAdminReceipt("Error occured.");
            }
            clearInterval(interval);
          }
        });
      }, 2000);
    } catch (err) {
      setIsAdminResult(err);
      setMakeRemoveAdminLoading(false);
      console.error(err);
      return err;
    }
  }

  /** MAKE & REMOVE FACULTY */
  const makeFaculty = async () => {
    const { addressInput } = formAddressData;
    try {
      const result = await sitnftInstance.addFaculty((addressInput).toString());

      const interval = setInterval(function () {
        console.log("awaiting transaction confirmation...");
        setMakeRemoveFacultyReceipt("Awaiting transaction confirmation...");
        setMakeRemoveFacultyLoading(true);
        state.web3.eth.getTransactionReceipt(result.hash, function (err, rec) {
          if (rec) {
            console.log(rec);
            if (rec.status) {
              functIsFaculty();
              setMakeRemoveFacultyReceipt("Transaction Complete.");
              setMakeRemoveFacultyLoading(false);
            }
            if (rec.status !== true) {
              setMakeRemoveFacultyLoading(false);
              setMakeRemoveFacultyReceipt("Error occured.");
            }
            clearInterval(interval);
          }
        });
      }, 2000);
    } catch (err) {
      setIsFacultyResult(err);
      setMakeRemoveFacultyLoading(false);
      console.error(err);
      return err;
    }
  }
  const removeFaculty = async () => {
    const { addressInput } = formAddressData;
    try {
      const result = await sitnftInstance.removeFaculty((addressInput).toString());

      const interval = setInterval(function () {
        console.log("awaiting transaction confirmation...");
        setMakeRemoveFacultyReceipt("Awaiting transaction confirmation...");
        setMakeRemoveFacultyLoading(true);
        state.web3.eth.getTransactionReceipt(result.hash, function (err, rec) {
          if (rec) {
            console.log(rec);
            if (rec.status) {
              functIsFaculty();
              setMakeRemoveFacultyReceipt("Transaction Complete.");
              setMakeRemoveFacultyLoading(false);
            }
            if (rec.status !== true) {
              setMakeRemoveFacultyLoading(false);
              setMakeRemoveFacultyReceipt("Error occured.");
            }
            clearInterval(interval);
          }
        });
      }, 2000);
    } catch (err) {
      setIsFacultyResult(err);
      setMakeRemoveFacultyLoading(false);
      console.error(err);
      return err;
    }
  }

  /** MAKE STUDENT */
  const functMakeStudent = async () => {
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

      const interval = setInterval(function () {
        console.log("awaiting transaction confirmation...");
        setMakeStudentReceipt("Awaiting transaction confirmation...");
        setMakeStudentLoading(true);
        state.web3.eth.getTransactionReceipt(result.hash, function (err, rec) {
          if (rec) {
            console.log(rec);
            if (rec.status) {
              setMakeStudentReceipt("Transaction Complete.");
              setMakeStudentLoading(false);
            }
            if (rec.status !== true) {
              setMakeStudentLoading(false);
              setMakeStudentReceipt("Error occured.");
            }
            clearInterval(interval);
          }
        });
      }, 2000);

      console.log(result);
      setMakeStudentReceipt(result);
      return result;
    } catch (err) {
      console.error(err);
      setMakeStudentReceipt(err);
      setMakeStudentLoading(false);
      return err;
    }
  }

  /** ADD STUDENT*/
  const functAddStudents = async () => {
    const sitnftInstance = getSITNFTContract();
    try {
      const result = await sitnftInstance.multiAddStudentAddress(
        studentItems,
      );

      const interval = setInterval(function () {
        console.log("awaiting transaction confirmation...");
        setStudentReceipt("Awaiting transaction confirmation...");
        setStudentUploadLoading(true);
        state.web3.eth.getTransactionReceipt(result.hash, function (err, rec) {
          if (rec) {
            console.log(rec);
            if (rec.status) {
              setStudentReceipt("Transaction Complete.");
              setStudentUploadLoading(false);
            }
            if (rec.status !== true) {
              setStudentUploadLoading(false);
              setStudentReceipt("Error occured.");
            }
            clearInterval(interval);
          }
        });
      }, 2000);

      return result;
    } catch (err) {
      console.error(err);
      setStudentReceipt(err.toString());
      setStudentUploadLoading(false);
      return err;
    }
  }

  /** ADD FACULTY */
  const functAddFaculty = async () => {
    const sitnftInstance = getSITNFTContract();
    var facultyArr = [];
    for (let i = 0; i < facultyItems.length; i++) {
      facultyArr.push(facultyItems[i].addr.toString());
    }

    try {
      const result = await sitnftInstance.multiAddFaculty(
        facultyArr
      );

      const interval = setInterval(function () {
        console.log("awaiting transaction confirmation...");
        setFacultyReceipt("Awaiting transaction confirmation...");
        setFacultyUploadLoading(true);
        state.web3.eth.getTransactionReceipt(result.hash, function (err, rec) {
          if (rec) {
            console.log(rec);
            if (rec.status) {
              setFacultyReceipt("Transaction Complete.");
              setFacultyUploadLoading(false);
            }
            if (rec.status !== true) {
              setFacultyUploadLoading(false);
              setFacultyReceipt("Error occured.");
            }
            clearInterval(interval);
          }
        });
      }, 2000);

      return result;
    } catch (err) {
      console.error(err);
      setFacultyReceipt(err.toString());
      setFacultyUploadLoading(false);
      return err;
    }
  }

  /** FUNCTION CHECK ADMIN */
  const functIsAdmin = async () => {
    try {
      setAdminResultLoading(true);
      const { addressInput } = formAddressData;
      const sitnftInstance = getSITNFTContract();
      const result = await sitnftInstance.isAdmin((addressInput).toString());
      setIsAdminResult(result);
      setAdminResultLoading(false);
      return result;
    } catch (err) {
      setIsAdminResult(err);
      setAdminResultLoading(false);
      console.error(err);
      return err;
    }
  }

  /** FUNCTION CHECK FACULTY */
  const functIsFaculty = async () => {
    try {
      setFacultyResultLoading(true);
      const { addressInput } = formAddressData;
      const sitnftInstance = getSITNFTContract();
      const result = await sitnftInstance.isFaculty((addressInput).toString());
      setIsFacultyResult(result);
      setFacultyResultLoading(false);
      return result;
    } catch (err) {
      console.error(err);
      setIsFacultyResult(err);
      setFacultyResultLoading(false);
      return err;
    }
  }

  /** FUNCTION CHECK STUDENT */
  const functIsStudent = async () => {
    try {
      setStudentResultLoading(true);
      const { addressInput } = formAddressData;
      const result = await sitnftInstance.isStudent((addressInput).toString());
      setIsStudentResult(result);
      setStudentResultLoading(false);
      return result;
    } catch (err) {
      console.error(err);
      setIsStudentResult(err);
      setStudentResultLoading(false);
      return err;
    }
  }

  /** FACULTY UPLOAD */
  const handleFacultyUpload = () => {
    inputFacultyFile?.click();
  };
  const handleDisplayFacultyFileDetails = () => {
    inputFacultyFile?.files && setUploadedFileFaculty(inputFacultyFile.files[0].name);
    readFacultyExcel(inputFacultyFile.files[0])
  };
  const readFacultyExcel = (file) => {
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
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setFacultyItems(d);
    });
  };

  /** STUDENT UPLOAD */
  const handleStudentUpload = () => {
    inputStudentFile?.click();
  };
  const handleDisplayStudentFileDetails = () => {
    inputStudentFile?.files && setUploadedFileStudent(inputStudentFile.files[0].name);
    readStudentExcel(inputStudentFile.files[0])
  };
  const readStudentExcel = (file) => {
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
      setStudentItems(d);
    });
  };

  /** CHECK ADMIN */
  const renderIsAdmin = (e) => {
    return (
      <>
        <div className="row g-3 mt-1">
          <div className="col-sm-6 w-100 d-inline-block">
            <Input className="m-2" placeholder="Address e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
          </div>
          <div className="col-sm-6 w-100 d-inline-block mt-1 text-center">
            <button className="btn btn-block btn-primary m-2" type="button" onClick={handleCheckAdmin}>Check Admin Status</button>
            <button className="btn btn-block btn-outline-secondary m-2" type="button" onClick={makeAdmin}>Make Admin</button>
            <button className="btn btn-block btn-outline-danger m-2" type="button" onClick={removeAdmin}>Remove Admin</button>
            <div className="my-2 text-start">
              <label htmlFor="adminResult" className="fw-bold m-1 me-2">Result:</label>
              {adminResultLoading || makeRemoveAdminLoading ?
                <>
                  <div className="spinner-border text-secondary align-middle mx-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
                : null
              }
              {/* {makeRemoveAdminReceipt} */}
              <small className="ms-2">
                {isAdminResult.toString()}
              </small>
            </div>
          </div>
        </div>
      </>
    )
  };

  /** CHECK FACULTY */
  const renderIsFaculty = (e) => {
    return (
      <>
        <div className="row g-3 mt-1">
          <div className="col-sm-6 w-100 d-inline-block">
            <Input placeholder="Address e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
          </div>
          <div className="col-sm-6 w-100 d-inline-block mt-1 text-center">
            <button className="btn btn-block btn-primary m-2" type="button" onClick={handleCheckFaculty}>Check Faculty Status</button>
            <button className="btn btn-block btn-outline-secondary m-2" type="button" onClick={makeFaculty}>Make Faculty</button>
            <button className="btn btn-block btn-outline-danger m-2" type="button" onClick={removeFaculty}>Remove Faculty</button>
            <div className="my-2 text-start">
              <label htmlFor="facultyResult" className="fw-bold m-1 me-2">Result:</label>
              {facultyResultLoading || makeRemoveFacultyLoading ?
                <>
                  <div className="spinner-border text-secondary align-middle mx-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
                : null
              }
              {/* {makeRemoveFacultyReceipt} */}
              <small className="ms-2">
                {isFacultyResult.toString()}
              </small>
            </div>
          </div>
        </div>
      </>
    )
  };

  /** CHECK STUDENT */
  const renderIsStudent = (e) => {
    return (
      <>
        <div className="row g-3 mt-1">
          <p className="border-bottom fw-bold m-1">Check Student</p>
          <div className="col-sm-6 w-100 d-inline-block">
            <Input placeholder="Address e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
          </div>
          <div className="col-sm-6 w-100 d-inline-block mt-1 text-center">
            <button className="btn btn-block btn-primary m-2" type="button" onClick={handleCheckStudent}>Check Student</button>
            <div className="my-2 text-start">
              <label htmlFor="studentResult" className="fw-bold m-1 me-2">Result:</label>
              {studentResultLoading ?
                <div className="spinner-border text-secondary align-middle mx-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> : null
              }
              <small className="ms-2">
                {isStudentResult.toString()}
              </small>
            </div>
          </div>
        </div>
      </>
    )
  };

  /** CHECK STUDENT */
  const renderMakeStudent = (e) => {
    return (
      <>
        <div className="row g-3 mt-1">
          <p className="border-bottom fw-bold m-1">Add Student</p>
          <div className="col-sm-6 w-100 d-inline-block">
            <input placeholder="Student ID" className="form-control mb-1" type="text" name="studentId" value={formAddStudentData.studentId} onChange={handleStudent} />
            <input placeholder="Student Address" className="form-control mb-1" type="text" name="studentAddress" value={formAddStudentData.studentAddress} onChange={handleStudent} />
          </div>
          <div className="col-sm-6 w-100 d-inline-block mt-1 text-center">
            <button className="btn btn-block btn-primary mt-3" type="button" onClick={functMakeStudent}>Make Student</button>
            <div className="my-2 text-start">
              <label htmlFor="addStudentResult" className="fw-bold m-1 me-2">Result:</label>
              {makeStudentLoading ?
                <div className="spinner-border text-secondary align-middle mx-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> : null
              }
              <small className="ms-2">
                {makeStudentReceipt.toString()}
              </small>
            </div>
          </div>
        </div>
      </>
    )
  };

  const renderFacultyUploadBtn = (e) => {
    return (
      <button className="float-end btn btn-block btn-outline-primary mx-3" type="button"
        onClick={functAddFaculty}>Confirm
      </button>
    );
  };

  const renderStudentUploadBtn = (e) => {
    return (
      <button className="float-end btn btn-block btn-outline-primary mx-3" type="button"
        onClick={functAddStudents}>Confirm
      </button>
    );
  };

  useEffect(() => {
    setInputStudentFile(document.getElementById("input-file-Student"));
    setInputFacultyFile(document.getElementById("input-file-Faculty"));
  }, []);

  return (
    <div className='container mb-5' >
      <h2 className="border-bottom text-start mt-3">Manage Accounts</h2>
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
                <p className="border-bottom mt-3 fw-bold">Upload Faculty:</p>
                <div className="pb-2 w-100 d-inline-block">
                  <div className="float-start align-middle m-2 mb-3">
                    {facultyUploadLoading ?
                      <div className="spinner-border text-secondary align-middle me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      :
                      null
                    }
                    {facultyReceipt}
                  </div>
                  {uploadedFileFaculty ? renderFacultyUploadBtn() : null}
                  <input
                    id="input-file-Faculty"
                    onChange={handleDisplayFacultyFileDetails}
                    className="d-none"
                    type="file"
                  />
                  <button onClick={handleFacultyUpload}
                    className={`float-end btn btn-outline-${uploadedFileFaculty ? "success" : "primary"
                      }`}
                  >
                    {uploadedFileFaculty ? uploadedFileFaculty : 'Select Excel'}
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
                      {facultyItems.map((d) => (
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
                {renderMakeStudent()}
                <p className="border-bottom mt-4 fw-bold">Upload Students:</p>
                <div className="pb-2 w-100 d-inline-block">
                  <div className="float-start align-middle m-2 mb-3">
                    {studentUploadLoading ?
                      <div className="spinner-border text-secondary align-middle me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      :
                      null
                    }
                    {studentReceipt}
                  </div>
                  {uploadedFileStudent ? renderStudentUploadBtn() : null}
                  <input
                    id="input-file-Student"
                    onChange={handleDisplayStudentFileDetails}
                    className="d-none"
                    type="file"
                  />
                  <button onClick={handleStudentUpload}
                    className={`float-end btn btn-outline-${uploadedFileStudent ? "success" : "primary"
                      }`}
                  >
                    {uploadedFileStudent ? uploadedFileStudent : 'Select Excel'}
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
                      {studentItems.map((d) => (
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
    </div >
  );
};

export default ManageAccounts;
