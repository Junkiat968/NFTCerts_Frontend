import React, { useContext, useState } from "react";
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Row, Col, Container } from "react-bootstrap";
// import Pagination from 'react-bootstrap/Pagination'

import { ContractContext } from '../../contexts/ContractProvider';
import Pagination from "../Pagination";

const MyGrades = () => {
  const [postsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    loading,
    setLoading,
    functGetAllTokens,
    transactionsResult,
    tks
  } = useContext(ContractContext);

  const getTokens = (e) => {
    setLoading(true);
    functGetAllTokens();
  };

  const clearLocalStorage = (e) => {
    var getStr = localStorage.getItem('tokens');
    alert(getStr);
    localStorage.removeItem("tokens");
    var clrStr = localStorage.getItem('tokens');
    alert(clrStr);
    window.location.reload(true);
  };

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

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = tkStorage.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
      <div className='page-two container'>
        <h2 className="pb-2 border-bottom text-start mt-5">MyGrades. Testing.</h2>
        <div className="text-center">
          <div className="col-sm-12 text-center my-3">
            <button className="btn btn-block btn-outline-primary" type="button" onClick={getTokens}>Get All Tokens</button>
          </div>
          <div className="col-sm-12 text-center mb-5">
            <button className="btn btn-block btn-outline-primary mt-3" type="button"
              onClick={clearLocalStorage}>Remove Local Storage
            </button>
          </div>
          <div className="d-flex justify-content-around my-3 text-start">
            Your Results:
            <Container>
              <Row>
                {
                  loading ? <h2 className="text-center">Loading...</h2> :
                    null
                }
                {Object.values(currentPosts).map((val, k) =>
                  <Col k={k} xs={6} md={6} lg={4}>
                    <Card className="m-3" style={{ width: '12rem' }}>
                      <Card.Img variant="top" src={`data:image/svg+xml;base64,${val.image}`} />
                      {/* <Card.Body>
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
                      </Card.Body> */}
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