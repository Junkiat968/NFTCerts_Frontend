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
  const [postsPerPage] = useState(3);
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

  const removeLS = (e) => {
    var getStr = localStorage.getItem('tokens');
    alert(getStr);
    localStorage.removeItem("tokens");
    var clrStr = localStorage.getItem('tokens');
    alert(clrStr);
    window.reload();
  };

  const tkStorage = JSON.parse(tks);
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
        {/* <div className="col-sm-12 text-center mb-5">
          <button className="btn btn-block btn-outline-primary mt-3" type="button"
            onClick={removeLS}>Remove Local Storage
          </button>
        </div> */}
        <div className="text-end">
          <Pagination className="mt-3"
            postsPerPage={postsPerPage}
            totalPosts={tkStorage.length}
            paginate={paginate}
          />
        </div>
        <div className="d-flex justify-content-around my-3 ">
          Your Results:
          <Container>
            <Row>
              {
                loading ? <h2 className="text-center">Loading...</h2> :
                  null
              }
              {Object.values(currentPosts).map((val, k) =>
                <Col k={k} xs={4} md={4} lg={3}>
                  <Card className="m-3" style={{ width: '12rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                    <Card.Body>
                      <Card.Title>{val[1]} Certificate</Card.Title>
                      {/* <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text> */}
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>Module{'>'} {val[0]}</ListGroupItem>
                      <ListGroupItem>Trimester{'>'} {val[3]}</ListGroupItem>
                      <ListGroupItem>Grade:<br />{val[2]}</ListGroupItem>
                      <ListGroupItem></ListGroupItem>
                    </ListGroup>
                    {/* <Card.Body>
                          <Card.Link href="#">Card Link</Card.Link>
                          <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body> */}
                  </Card>
                </Col>
              )}
            </Row>
          </Container>
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

export default MyGrades;