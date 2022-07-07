import React, { useContext, useState } from "react";
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Row, Col, Container } from "react-bootstrap";
import Select from 'react-select';
// import Pagination from 'react-bootstrap/Pagination';

import { ContractContext } from '../../contexts/ContractProvider';
import Pagination from "../Pagination";

const MyGrades = () => {
  // Local Constants
  const [postsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');

  const changeSelected = (e) => {
    setSelectedModule(e.value);
    setModuleArray();
  };

  // Context Constants
  const {
    loading,
    setLoading,
    functGetAllTokens,
    transactionsResult,
    tks,
    mods
  } = useContext(ContractContext);

  /** Set Data for Module Dropdown */
  const setModuleArray = (e) => {
    const modsJson = JSON.parse(mods);
    modules.length = 0;
    for (let i = 0; i < modsJson.length; i++) {
      modules.push({ value: modsJson[i], label: modsJson[i] });
    }
  };

  /** FETCH DATA */
  const getTokens = (e) => {
    setLoading(true);
    functGetAllTokens();
  };

  /** CLEAR LOCAL STORAGE DATA  */
  const clearLocalStorage = (e) => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("modules");
    // var tks = localStorage.getItem("tokens");
    // var mods = localStorage.getItem("modules");
    // alert(tks);
    // alert(mods);
    getTokens();
  };

  /** PROCESSS DATA */
  const processData = (e) => {
    // Data Decode and Processing
    for (let i = 0; i < tkStorage.length; i++) {
      const current = tkStorage[i].split(",");
      // Decode the String
      var decodedString = atob(current[1]);
      tkStorage[i] = JSON.parse(decodedString);
      // Decode Image
      const currentImg = tkStorage[i].image.split(",");
      tkStorage[i].image = currentImg[1];
    }
  };

  const tkStorage = JSON.parse(tks);
  if (tkStorage == null) {
    getTokens();
    return (
      <div className="text-center mt-5">
        <h2>Loading data...</h2>
        <small>Please wait..</small>
      </div>
    );
  } else {
    // Data Decode and Processing
    { processData() }
    { setModuleArray() }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = tkStorage.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
      <div className='page-two container'>
        <div className="mt-3 text-end">
          <button className="btn btn-block btn-outline-primary" type="button"
            onClick={getTokens}>Get All Tokens
          </button>
          <button className="btn btn-block btn-outline-primary" type="button"
            onClick={clearLocalStorage}>Remove Local Storage
          </button>
        </div>
        <h2 className="pb-2 border-bottom text-start my-3">MyGrades. Testing.</h2>
        <div className="text-center">
          <div>
            <Select options={modules} placeholder="Filter" onChange={changeSelected} />
          </div>
          <div>
            {selectedModule}
          </div>
          <div className="d-flex justify-content-around text-start">
            Your Results:
            <Container>
              <Row>
                {
                  loading ? <h2 className="text-center">Loading...</h2> :
                    null
                }
                {Object.values(currentPosts).map((val, k) =>
                  <Col k={k} xs={8} md={4} lg={3}>
                    <Card className="m-3" style={{ width: '12rem' }}>
                      <Card.Img variant="top" src={`data:image/svg+xml;base64,${val.image}`} />
                    </Card>
                  </Col>
                )}
              </Row>
            </Container>
          </div>
          <div className="text-end">
            <Pagination className="mt-3"
              postsPerPage={postsPerPage}
              totalPosts={tkStorage.length}
              paginate={paginate}
            >
            </Pagination>
          </div>
        </div >
        {/* <div className='mt-5 text-center'>
        <Pagination >
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item active>{5}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{8}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div> */}
      </div >
    );
  }
}

export default MyGrades;

// Card
{/* <Card className="m-3" style={{ width: '12rem' }}>
  <Card.Img variant="top" src={`data:image/svg+xml;base64,${val.image}`} />
  <Card.Body>
    <Card.Title style={{ height: '3rem' }}>{val.attributes[1].value} Certificate</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Module{'>'} {val.attributes[0].value}</ListGroupItem>
    <ListGroupItem>Trimester{'>'} {val.attributes[2].value}</ListGroupItem>
    <ListGroupItem>Grade:<br />{val[2]}</ListGroupItem>
    <ListGroupItem></ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card> */}