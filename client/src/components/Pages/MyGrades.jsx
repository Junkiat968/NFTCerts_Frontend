import React, { useContext, useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Row, Col, Card, Container, Button, Tabs, Tab } from "react-bootstrap";
// import Modal from '@material-ui/core/Modal';
import { Form } from "react-bootstrap";
import Select from 'react-select';

import useEth from "../../contexts/EthContext/useEth";
import { ContractContext } from '../../contexts/ContractProvider';
import Pagination from "../Pagination";

const MyGrades = () => {
  const [gradesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalTokens, setTotalTokens] = useState(0);
  const [myNoOfTokens, setMyNoOfTokens] = useState(0);

  const [temptArray, setTemptArray] = useState([]);
  const [gradeArray, setGradeArray] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [modulesArray, setModulesArray] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [emptyGrades, setEmptyGrades] = useState(false);
  const [appealStruct, setAppealStruct] = useState({ reason: "", tokenId: "" });

  const [y1NoOfTokens, setY1NoOfTokens] = useState(0);
  const [y2NoOfTokens, setY2NoOfTokens] = useState(0);
  const [y3NoOfTokens, setY3NoOfTokens] = useState(0);
  const [year1Array, setYear1Array] = useState([]);
  const [year2Array, setYear2Array] = useState([]);
  const [year3Array, setYear3Array] = useState([]);

  const changeSelected = (e) => {
    try {
      setSelectedModule(e.value);
    } catch (error) {
      setSelectedModule("");
    }
  };

  const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="form-control mb-1"
    />
  );

  // Context Constants
  const {
    sendTransaction,
    formData,
    handleAlertFormChange,
    regradeRequestLoading,
    regradeRequestReceipt
  } = useContext(ContractContext);

  const { state, sitnftInstance } = useEth();

  const handleAlertSubmit = (e) => {
    const { message } = formData;
    e.preventDefault();

    if (!message) {
      alert("Please select reason for grade appeal.")
      return;
    }
    sendTransaction();
  };

  useEffect(() => {
    const fetchGrades = async () => {
      setPageLoading(true);
      try {
        const noOfTokens = await sitnftInstance.balanceOf(state.accounts[0]);
        setMyNoOfTokens(noOfTokens.toNumber());
        if (noOfTokens.toNumber() === 0) {
          setEmptyGrades(true);
        }
        for (let i = 0; i < noOfTokens; i++) {
          const tokenId = await sitnftInstance.tokenOfOwnerByIndex(state.accounts[0], i);
          const tempItem = await sitnftInstance.tokenURI(tokenId);
          temptArray.push(tempItem);
        }

        for (let i = 0; i < temptArray.length; i++) {
          const current = temptArray[i].split(",");
          // Decode the String
          var decodedString = atob(current[1]);
          const currentJson = JSON.parse(decodedString);

          if (modulesArray.length === 0) {
            modulesArray.push({ value: currentJson.attributes[0].value, label: currentJson.attributes[0].value });
          }
          else {
            if (!modulesArray.some(modulesArray => modulesArray.value === currentJson.attributes[0].value)) {
              modulesArray.push({ value: currentJson.attributes[0].value, label: currentJson.attributes[0].value });
            }
          }

          // Decode Image
          const currentImg = currentJson.image.split(",");
          gradeArray.push({ module: currentJson.attributes[0].value, img: currentImg[1], name: currentJson.name, faculty: currentJson.attributes[2].value });

          // console.log(currentJson.attributes[0].value);
          switch (currentJson.attributes[0].value[3]) {
            case "1":
              year1Array.push({ module: currentJson.attributes[0].value, img: currentImg[1], name: currentJson.name, faculty: currentJson.attributes[2].value });
              break;
            case "2":
              year2Array.push({ module: currentJson.attributes[0].value, img: currentImg[1], name: currentJson.name, faculty: currentJson.attributes[2].value });
              break;
            case "3":
              year3Array.push({ module: currentJson.attributes[0].value, img: currentImg[1], name: currentJson.name, faculty: currentJson.attributes[2].value });
              break;
            default:
          }
        }

        setY1NoOfTokens(year1Array.length);
        setY2NoOfTokens(year2Array.length);
        setY3NoOfTokens(year3Array.length);

        setTotalTokens(noOfTokens);
        setPageLoading(false);
        return temptArray;
      } catch (err) {
        console.error(err);
        return err;
      }
    }

    fetchGrades();
  }, [state.accounts[0]]);

  /** RENDER LOADING */
  const renderLoading = (myNoOfTokens) => {
    return (
      <div className="text-center mt-5">
        <h2>Loading data...</h2>
        <div>Loading {myNoOfTokens} tokens..
          <small className="mx-1">Please wait...</small>
        </div>
        <div className="spinner-border text-secondary align-middle mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  const filteredGrades = gradeArray.filter(gradeArray => {
    return gradeArray.module.includes(selectedModule);
  });

  // Get current grade
  const indexOfLastGrade = currentPage * gradesPerPage;
  const indexOfFirstGrade = indexOfLastGrade - gradesPerPage;
  const currentGrades = filteredGrades.slice(indexOfFirstGrade, indexOfLastGrade);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mb-5'>
      <h2 className="pb-2 border-bottom text-start my-1 mt-3">Grades</h2>
      <Tabs
        defaultActiveKey="mygrades"
        id="gradesTabs"
        className="my-3 fs-6 fw-bold container"
      >
        <Tab eventKey="mygrades" title="Grades">
          <div className="row w-100 d-inline-block m-2">
            <Row>
              <Col sm={6}>
                {regradeRequestLoading ?
                  <div className="spinner-border text-secondary align-middle mx-1 text-start" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  : null
                }
                <small className="ms-2">
                  {regradeRequestReceipt.toString()}
                </small>
              </Col>
              <Col sm={6}>
                <Select className="float-end w-100" isClearable={true} options={modulesArray} placeholder="Filter" onChange={changeSelected} />
              </Col>
            </Row>
          </div>
          <ALLGRADES
            currentGrades={currentGrades}
            gradesPerPage={gradesPerPage}
            paginate={paginate}
            currentPage={currentPage}
            pageLoading={pageLoading}
            renderLoading={renderLoading}
            emptyGrades={emptyGrades}
            gradeArray={gradeArray}
            appealStruct={appealStruct}
            setAppealStruct={setAppealStruct}
            handleAlertFormChange={handleAlertFormChange}
            handleAlertSubmit={handleAlertSubmit}
            Input={Input}
            myNoOfTokens={myNoOfTokens}
          />
        </Tab>
        <Tab eventKey="transcript" title="Transcript" className="container">
          <p className="fs-5 border-bottom mt-3 fw-bold">Year 1</p>
          <Year1Grades
            pageLoading={pageLoading}
            renderLoading={renderLoading}
            year1Array={year1Array}
            y1NoOfTokens={y1NoOfTokens}
          />
          <p className="fs-5 border-bottom mt-3 fw-bold">Year 2</p>
          <Year2Grades
            pageLoading={pageLoading}
            renderLoading={renderLoading}
            year2Array={year2Array}
            y2NoOfTokens={y2NoOfTokens}
          />
          <p className="fs-5 border-bottom mt-3 fw-bold">Year 3</p>
          <Year3Grades
            pageLoading={pageLoading}
            renderLoading={renderLoading}
            year3Array={year3Array}
            y3NoOfTokens={y3NoOfTokens}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

function ALLGRADES({
  currentGrades,
  gradesPerPage,
  paginate,
  currentPage,
  renderLoading,
  pageLoading,
  emptyGrades,
  gradeArray,
  handleAlertFormChange,
  handleAlertSubmit,
  myNoOfTokens
}) {

  // useEffect(() => {
  //   // console.log(gradeArray);
  // }, [totalTokens]);

  return (
    <div className='container'>
      {
        pageLoading ?
          renderLoading(myNoOfTokens) :
          <div className="">
            {
              emptyGrades ?
                <div className="text-center mt-5">
                  <h2>There are no grades awarded to you right now.</h2>
                  <small>Please check back again later.</small>
                </div>
                :
                <>
                  <div className="d-flex justify-content-around text-start mt-3">
                    <Container>
                      <Row>
                        {Object.values(currentGrades).map((val, k) =>
                          <Col k={k} xs={8} md={4} lg={3}>
                            <Card className="m-3" style={{ width: '12rem' }}>
                              <Card.Img variant="top" src={`data:image/svg+xml;base64,${val.img}`} />
                              <Card.Body>
                                <Card.Title>{val.name}</Card.Title>
                                <div className="col-sm-12">
                                  <Form.Group controlId={val.name}>
                                    <Form.Control
                                      as="select"
                                      onChange={(e) => handleAlertFormChange(e, val.faculty)}
                                    >
                                      <option value="">Select Reason</option>
                                      <option value="Re-Grade">Re-Grade</option>
                                      <option value="Incorrect Certificate">Incorrect Certificate</option>
                                    </Form.Control>
                                  </Form.Group>
                                  <Button variant="outline-danger w-100 mt-2"
                                    type="button"
                                    onClick={handleAlertSubmit}
                                    className=""
                                  >
                                    Submit Request
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        )}
                      </Row>
                    </Container>
                  </div>
                  <Pagination className="text-end mt-3 ms-auto"
                    gradesPerPage={gradesPerPage}
                    totalGrades={gradeArray.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </>
            }
          </div>
      }
    </div>
  );
}

function Year1Grades({
  renderLoading,
  pageLoading,
  year1Array,
  y1NoOfTokens
}) {

  let emptyGrades = false;

  if (y1NoOfTokens === 0) {
    emptyGrades = true;
  }

  return (
    <div className='container'>
      {
        pageLoading ?
          renderLoading() :
          <div className="">
            {
              emptyGrades ?
                <div className="text-center mt-5">
                  <h2>There are no grades awarded to you right now.</h2>
                  <small>Please check back again later.</small>
                </div>
                :
                <>
                  <div className="d-flex justify-content-around text-start mt-3">
                    <Container>
                      <Row>
                        {Object.values(year1Array).map((val, k) =>
                          <Col k={k} xs={8} md={4} lg={3}>
                            <Card className="m-3" style={{ width: '12rem' }}>
                              <Card.Img variant="top" src={`data:image/svg+xml;base64,${val.img}`} />
                              <Card.Body>
                                <Card.Title>{val.name}</Card.Title>
                              </Card.Body>
                            </Card>
                          </Col>
                        )}
                      </Row>
                    </Container>
                  </div>
                </>
            }
          </div>
      }
    </div>
  );
}

function Year2Grades({
  renderLoading,
  pageLoading,
  year2Array,
  y2NoOfTokens
}) {

  let emptyGrades = false;

  if (y2NoOfTokens === 0) {
    emptyGrades = true;
  }

  return (
    <div className='container'>
      {
        pageLoading ?
          renderLoading() :
          <div className="">
            {
              emptyGrades ?
                <div className="text-center mt-5">
                  <h2>There are no grades awarded to you right now.</h2>
                  <small>Please check back again later.</small>
                </div>
                :
                <>
                  <div className="d-flex justify-content-around text-start mt-3">
                    <Container>
                      <Row>
                        {Object.values(year2Array).map((val, k) =>
                          <Col k={k} xs={8} md={4} lg={3}>
                            <Card className="m-3" style={{ width: '12rem' }}>
                              <Card.Img variant="top" src={`data:image/svg+xml;base64,${val.img}`} />
                              <Card.Body>
                                <Card.Title>{val.name}</Card.Title>
                              </Card.Body>
                            </Card>
                          </Col>
                        )}
                      </Row>
                    </Container>
                  </div>
                </>
            }
          </div>
      }
    </div>
  );
}

function Year3Grades({
  renderLoading,
  pageLoading,
  year3Array,
  y3NoOfTokens
}) {

  let emptyGrades = false;

  if (y3NoOfTokens === 0) {
    emptyGrades = true;
  }

  return (
    <div className='container'>
      {
        pageLoading ?
          renderLoading() :
          <div className="">
            {
              emptyGrades ?
                <div className="text-center mt-5">
                  <h2>There are no grades awarded to you right now.</h2>
                  <small>Please check back again later.</small>
                </div>
                :
                <>
                  <div className="d-flex justify-content-around text-start mt-3">
                    <Container>
                      <Row>
                        {Object.values(year3Array).map((val, k) =>
                          <Col k={k} xs={8} md={4} lg={3}>
                            <Card className="m-3" style={{ width: '12rem' }}>
                              <Card.Img variant="top" src={`data:image/svg+xml;base64,${val.img}`} />
                              <Card.Body>
                                <Card.Title>{val.name}</Card.Title>
                              </Card.Body>
                            </Card>
                          </Col>
                        )}
                      </Row>
                    </Container>
                  </div>
                </>
            }
          </div>
      }
    </div>
  );
}

export default MyGrades;