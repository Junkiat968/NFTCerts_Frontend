import React, { useContext } from "react";
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Row, Col, Container } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination'
import { ContractContext } from '../../contexts/ContractProvider';

const MyGrades = () => {
  const {
    functGetAllTokens,
    transactionsResult
  } = useContext(ContractContext);

  const renderGrades = (e) => {
    return (
      <>
        <Card style={{ width: '18rem' }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk
              of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
              <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={6} />
          </Card.Body>
        </Card>
      </>
    )
  };

  const getTokens = (e) => {
    functGetAllTokens();
  };

  return (
    <div className='page-two container'>
      <h2 className="pb-2 border-bottom text-start mt-5">MyGrades. Testing.</h2>
      <div className="d-flex row justify-content-around my-3">
        <div className="col-sm-12 text-center mb-5">
          <button className="btn btn-block btn-outline-primary mt-3" type="button" onClick={getTokens}>Get All Tokens</button>
        </div>
        <div className="d-flex justify-content-around my-3">
          Your Results:
          <Container>
            <Row>
              {Object.values(transactionsResult).map((val, k) =>
                <Col k={k} xs={4} md={4} lg={3}>
                  <Card className="m-3" style={{ width: '12rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                    <Card.Body>
                      <Card.Title>{val[0]} - {val[3]}</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>{val[1]}</ListGroupItem>
                      <ListGroupItem>Grade: {val[2]}</ListGroupItem>
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
      {/* <div className="d-flex justify-content-around mt-3">
        {renderGrades()}
      </div>
      <div className='mt-5 text-center'>
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