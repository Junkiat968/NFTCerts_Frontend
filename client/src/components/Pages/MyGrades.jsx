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
  const [postsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalTokens, setTotalTokens] = useState(0);
  const [temptArray, setTemptArray] = useState([]);
  const [gradeArray, setGradeArray] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [modulesArray, setModulesArray] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [emptyGrades, setEmptyGrades] = useState(false);
  const [appealStruct, setappealStruct] = useState({ reason: "" , tokenId: ""});
  
  const changeSelected = (e) => {
    try {
      setSelectedModule(e.value);
    } catch (error) {
      setSelectedModule("");
    }
    // setSelectedModule({ selectedLabel: e ? e.value : "" });
  };
  // const changeSelectedAppeal = (e) => {
  //   try {
  //     setappealStruct(e.value);
  //   } catch (error) {
  //     setSelectedModule("");
  //   }
  //   // setSelectedModule({ selectedLabel: e ? e.value : "" });
  // };
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
    formAddressData,
    functIsFaculty,
    getStudentAddress,
    sendTransaction,
    formData,
    handleAlertFormChange,
    handleEvalFormChange,
    setNFTGrade,
    evalData,
    EvalMapping
  } = useContext(ContractContext);
  const { state, sitnftInstance } = useEth();
  // const AlertInput = ({ placeholder, name, type, value, handleAlertFormChange }) => (
  //   <input
  //     placeholder={placeholder}
  //     type={type}
  //     step="0.0001"
  //     value={value}
  //     onChange={(e) => handleAlertFormChange(e, name)}
  //     className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  //   />
  // );
  const handleAlertSubmit = (e) => {
    const { message } = formData;
    // console.log("handlealertsubmit message :",message)
    // console.log("handlealertsubmit formdata :",formData)

  
    e.preventDefault();
  
    if ( !message){
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
          gradeArray.push({ module: currentJson.attributes[0].value, img: currentImg[1], name: currentJson.name, faculty:currentJson.attributes[2].value });
          // console.log("CurrentJSON:",currentJson);
        }
        console.log(modulesArray.length);

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
  const renderLoading = (e) => {
    return (
      <div className="text-center mt-5">
        <h2>Loading data...</h2>
        <small>Please wait..</small>
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
      {/* {
        gradeArray.filter(gradeArray => gradeArray.module.includes(selectedModule)).map(filteredData => (
          <li>
            {filteredData.module}
          </li>
        ))
      } */}
      <NFTImage
        currentPosts={currentPosts}
        postsPerPage={postsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        pageLoading={pageLoading}
        renderLoading={renderLoading}
        emptyGrades={emptyGrades}
        gradeArray={gradeArray}
        appealStruct={appealStruct}
        setappealStruct={setappealStruct}
        handleAlertFormChange={handleAlertFormChange}
        handleAlertSubmit={handleAlertSubmit}
        Input={Input}
        // handleOpen = {handleOpen}
        // handleClose = {handleClose}
        // open = {open}
      />
    </div>
  );
}

function NFTImage({
  currentPosts,
  postsPerPage,
  paginate,
  currentPage,
  renderLoading,
  pageLoading,
  emptyGrades,
  gradeArray,
  appealStruct,
  setappealStruct,
  handleAlertFormChange,
  handleAlertSubmit,
  Input
  // type,
  // setType
  // handleOpen,
  // handleClose,
  // open
}) {

  // useEffect(() => {
  //   // console.log(gradeArray);
  // }, [totalTokens]);

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
                    Your Results:
                    <Container>
                      <Row>
                        {Object.values(currentPosts).map((val, k) =>
                          <Col k={k} xs={8} md={4} lg={3}>
                            <Card className="m-3" style={{ width: '12rem' }}>
                              <Card.Img variant="top" src={`data:image/svg+xml;base64,${val.img}`} />
                              <Card.Body>
                                <Card.Title>{val.name}</Card.Title>
                                <div class="col-sm-12">
                                  
                              {/* <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleAlertFormChange} />
                              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleAlertFormChange} />
                              <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleAlertFormChange} /> */}
                              {/* <Input placeholder="Enter reason for Grade Appeal and Certificate id" name="message" type="text" handleChange={handleAlertFormChange} /> */}
                              <Form.Group controlId={val.name}>
                                {/* <Form.Label>Select Norm Type</Form.Label> */}
                                <Form.Control
                                  as="select"
                                  
                                  // value={type}
                                  // onChange={e => {
                                  //   console.log("e.target.value", e.target.value);
                                  //   // console.log("e.target.id:",e.target.id);
                                  //   console.log("val.name",val.name)
                                  //   setappealStruct({reason:e.target.value,tokenId:val.name})
                                  //   console.log(appealStruct)
                                  // }}
                                  onChange={(e) => handleAlertFormChange(e, val.faculty)}
                                >
                                  <option value="">Select Reason</option>
                                  <option value="Re-Grade">Re-Grade</option>
                                  <option value="Incorrect Certificate">Incorrect Certificate</option>
                                  {/* <option value="3val">3</option> */}
                                </Form.Control>
                                </Form.Group>
                              
                                  <Button variant="outline-danger w-100 mt-2"
                                    type="button"
                                    onClick={handleAlertSubmit}
                                    className=""
                                  >
                                    Submit Appeal
                                  </Button>
                              
                            </div>
                                {/* controlid = formBasicSelect0...many  */}

                                {/* <Button variant="outline-danger w-100 mt-2">Submit Appeal</Button> */}
                              </Card.Body>
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