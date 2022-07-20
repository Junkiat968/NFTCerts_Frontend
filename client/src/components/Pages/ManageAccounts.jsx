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

  const [studentItems, setStudentItems] = useState([]);
  const [facultyItems, setFacultyItems] = useState([]);

  const [uploadedFileFaculty, setUploadedFileFaculty] = useState('');
  const [inputFacultyFile, setInputFacultyFile] = useState('');
  const [uploadedFileStudent, setUploadedFileStudent] = useState('');
  const [inputStudentFile, setInputStudentFile] = useState('');

  const [isAdminResult, setIsAdminResult] = useState('');
  const [adminResultLoading, setAdminResultLoading] = useState(false);

  const [isFacultyResult, setIsFacultyResult] = useState('');
  const [facultyResultLoading, setFacultyResultLoading] = useState(false);
  const [facultyUploadLoading, setFacultyUploadLoading] = useState(false);
  const [facultyReceipt, setFacultyReceipt] = useState([])

  const [isStudentResult, setIsStudentResult] = useState('');
  const [studentResultLoading, setStudentResultLoading] = useState(false);
  const [studentUploadLoading, setStudentUploadLoading] = useState(false);
  const [studentReceipt, setStudentReceipt] = useState([]);

  const {
    makeAdmin,
    removeAdmin,
    handleChange,
    makeFaculty,
    removeFaculty,
    formAddressData
  } = useContext(ContractContext);

  /** Form Handlers */
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

      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  /** FUNCTION CHECK ADMIN */
  const functIsAdmin = async () => {
    try {
      setAdminResultLoading(true);
      const { addressInput } = formAddressData;
      const sitnftInstance = getSITNFTContract();
      console.log(sitnftInstance);
      const result = await sitnftInstance.isAdmin((addressInput).toString());
      setIsAdminResult(result);
      setAdminResultLoading(false);
      return result;
    } catch (err) {
      setIsAdminResult(err);
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
      setIsFacultyResult(err);
      console.error(err);
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
      setIsStudentResult(err);
      console.error(err);
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
              Result:
              {adminResultLoading ?
                <>
                  <div className="spinner-border text-secondary align-middle mx-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
                : null
              }
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
              Result:
              {facultyResultLoading ?
                <>
                  <div className="spinner-border text-secondary align-middle mx-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
                : null
              }
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
          <div className="col-sm-6 w-100 d-inline-block">
            <Input placeholder="Address e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
          </div>
          <div className="col-sm-6 w-100 d-inline-block mt-1 text-center">
            <button className="btn btn-block btn-primary m-2" type="button" onClick={handleCheckStudent}>Check Student</button>
            <div className="my-2 text-start">
              Result:
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

  useEffect(() => {
    setInputStudentFile(document.getElementById("input-file-Student"));
    setInputFacultyFile(document.getElementById("input-file-Faculty"));
  }, []);

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
                <p className="border-bottom mt-3 fw-bold">Upload Faculty:</p>
                <div className=" w-100 d-inline-block">
                  <div className="float-start align-middle">
                    {facultyUploadLoading ?
                      <div className="spinner-border text-secondary align-middle me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      :
                      null
                    }
                    {facultyReceipt}
                  </div>
                  <input
                    id="input-file-Faculty"
                    onChange={handleDisplayFacultyFileDetails}
                    className="d-none"
                    type="file"
                  />
                  <button className="float-end btn btn-block btn-outline-primary mx-3" type="button"
                    onClick={functAddFaculty}>Upload
                  </button>
                  <button onClick={handleFacultyUpload}
                    className={`float-end btn btn-outline-${uploadedFileFaculty ? "success" : "primary"
                      }`}
                  >
                    {uploadedFileFaculty ? uploadedFileFaculty : 'Select excel'}
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
                <p className="border-bottom mt-3 fw-bold">Upload Students:</p>
                <div className="w-100 d-inline-block">
                  <div className="float-start align-middle">
                    {studentUploadLoading ?
                      <div className="spinner-border text-secondary align-middle me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      :
                      null
                    }
                    {studentReceipt}
                  </div>
                  <input
                    id="input-file-Student"
                    onChange={handleDisplayStudentFileDetails}
                    className="d-none"
                    type="file"
                  />
                  <button className="float-end btn btn-block btn-outline-primary mx-3" type="button"
                    onClick={functAddStudents}>Upload
                  </button>
                  <button onClick={handleStudentUpload}
                    className={`float-end btn btn-outline-${uploadedFileStudent ? "success" : "primary"
                      }`}
                  >
                    {uploadedFileStudent ? uploadedFileStudent : 'Select excel'}
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
    </div>
  );
};

export default ManageAccounts;
