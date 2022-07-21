import React, { useContext, useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Row, Col, Card, Container, Button } from "react-bootstrap";
// import Modal from '@material-ui/core/Modal';
import { Form } from "react-bootstrap";
import Select from 'react-select';

import useEth from "../../contexts/EthContext/useEth";
import { ContractContext } from '../../contexts/ContractProvider';
import Pagination from "../Pagination";

const MyGrades = () => {
  const [postsPerPage] = useState(4);
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
    handleAlertFormChange
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

          console.log(currentJson.attributes[0].value);
          switch (currentJson.attributes[0].value[3]) {
            case "1":
              console.log("Year 1");
              year1Array.push({ module: currentJson.attributes[0].value, img: currentImg[1], name: currentJson.name, faculty: currentJson.attributes[2].value });
              break;
            case "2":
              console.log("Year 2");
              year2Array.push({ module: currentJson.attributes[0].value, img: currentImg[1], name: currentJson.name, faculty: currentJson.attributes[2].value });
              break;
            case "3":
              console.log("Year 3");
              year3Array.push({ module: currentJson.attributes[0].value, img: currentImg[1], name: currentJson.name, faculty: currentJson.attributes[2].value });
              break;
            default:
          }
        }
        // console.log(modulesArray.length);
        console.log(year1Array);
        console.log(year2Array);
        console.log(year3Array);

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

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredGrades.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <h2 className="pb-2 border-bottom text-start my-1 mt-3">MyGrades.</h2>
      <div className="p-1 w-100 d-inline-block">
        <Select className="float-end w-25" isClearable={true} options={modulesArray} placeholder="Filter" onChange={changeSelected} />
      </div>
      <p className="fs-5 border-bottom mt-3 fw-bold">Year 1</p>

      <ALLGRADES
        currentPosts={currentPosts}
        postsPerPage={postsPerPage}
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
    </div>
  );
}

function ALLGRADES({
  currentPosts,
  postsPerPage,
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
                        {Object.values(currentPosts).map((val, k) =>
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
                                    Submit Appeal
                                  </Button>
                                </div></Card.Body>
                            </Card>
                          </Col>
                        )}
                      </Row>
                    </Container>
                  </div>
                  <Pagination className="text-end mt-3 ms-auto"
                    postsPerPage={postsPerPage}
                    totalPosts={gradeArray.length}
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

export default MyGrades;