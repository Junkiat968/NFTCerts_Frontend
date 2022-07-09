import React, { useContext, useState } from "react";
// import Placeholder from 'react-bootstrap/Placeholder';
// import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
// import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Row, Col, Card, Container } from "react-bootstrap";
import Select from 'react-select';

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
    functGetAllGrades,
    grades,
    mods
  } = useContext(ContractContext);

  /** Set Data for Module Dropdown */
  const setModuleArray = (e) => {
    const modsJson = JSON.parse(mods);
    // modules.length = 0;
    for (let i = 0; i < modsJson.length; i++) {
      modules.push({ value: modsJson[i], label: modsJson[i] });
    }
  };

  /** FETCH DATA */
  const getGrades = (e) => {
    setLoading(true);
    functGetAllGrades();
  };

  /** CLEAR LOCAL STORAGE DATA  */
  const clearLocalStorage = (e) => {
    localStorage.removeItem("grades");
    localStorage.removeItem("modules");
    // var grades = localStorage.getItem("grades");
    // var mods = localStorage.getItem("modules");
    // alert(grades);
    getGrades();
  };

  /** PROCESSS DATA */
  const processData = (e) => {
    // Data Decode and Processing
    for (let i = 0; i < gradeStorage.length; i++) {
      const current = gradeStorage[i].split(",");
      // Decode the String
      var decodedString = atob(current[1]);
      gradeStorage[i] = JSON.parse(decodedString);
      // Decode Image
      const currentImg = gradeStorage[i].image.split(",");
      gradeStorage[i].image = currentImg[1];
    }
  };

  const gradeStorage = JSON.parse(grades);
  console.log(gradeStorage);

  /** RENDER LOADING */
  const renderLoading = (e) => {
    return (
      <div className="text-center mt-5">
        <div className="mt-3 text-end">
          <button className="btn btn-block btn-outline-primary" type="button"
            onClick={clearLocalStorage}>Refresh Data
          </button>
        </div>
        <h2>Loading data...</h2>
        <small>Please wait..</small>
      </div>
    );
  };

  /** RENDER PAGE */
  const renderPage = (currentPosts, paginate) => {
    return (
      <div className='container'>
        <div className="mt-3 text-end">
          <button className="btn btn-block btn-outline-primary" type="button"
            onClick={clearLocalStorage}>Refresh Data
          </button>
        </div>
        <h2 className="pb-2 border-bottom text-start my-3">MyGrades. Testing.</h2>
        <div className="">
          <div className="mb-3 text-center">
            <Select options={modules} placeholder="Filter" onChange={changeSelected} />
            {selectedModule}
          </div>
          <div className="d-flex justify-content-around text-start mt-3">
            Your Results:
            <Container>
              <Row>
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
          <Pagination className="text-end mt-3 ms-auto"
            postsPerPage={postsPerPage}
            totalPosts={gradeStorage.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  };

  if (gradeStorage == null) {
    getGrades();
    return (
      renderLoading()
    );
  } else {
    // Data Decode and Processing
    processData();
    setModuleArray();

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = gradeStorage.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
      <>
        {
          loading ? renderLoading() : renderPage(currentPosts, paginate)
        }
      </>
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