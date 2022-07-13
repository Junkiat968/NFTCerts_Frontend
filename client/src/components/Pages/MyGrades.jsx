import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import Select from 'react-select';

import useEth from "../../contexts/EthContext/useEth";
// import { ContractContext } from '../../contexts/ContractProvider';
import Pagination from "../Pagination";

const MyGrades = () => {
  const [postsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalTokens, setTotalTokens] = useState(0);
  const [temptArray, setTemptArray] = useState([]);
  const [gradeArray, setGradeArray] = useState([]);

  // const [gradeImgArray, setGradeImgArray] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const [modulesArray, setModulesArray] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [emptyGrades, setEmptyGrades] = useState(false);

  const people = [
    {
      name: 'James',
      age: 31,
    },
    {
      name: 'John',
      age: 45,
    },
    {
      name: 'Paul',
      age: 65,
    },
    {
      name: 'Ringo',
      age: 49,
    },
    {
      name: 'George',
      age: 34,
    }
  ];
  const changeSelected = (e) => {
    setSelectedModule(e.value);
    // setModuleArray();
  };

  // Context Constants
  // const {
  //   loading,
  //   setLoading
  // } = useContext(ContractContext);
  const { state, sitnftInstance } = useEth();

  useEffect(() => {
    const fetchGrades = async () => {
      setPageLoading(true);
      try {
        const noOfTokens = await sitnftInstance.balanceOf(state.accounts[0]);
        if (noOfTokens == 0) {
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

          // console.log(currentJson.attributes[0].value);
          console.log(modulesArray.length);
          if (modulesArray.length == 0) {
            modulesArray.push({ value: currentJson.attributes[0].value, label: currentJson.attributes[0].value });
            console.log(modulesArray);
          } else {
            for (let i = 0; i < modulesArray.length; i++) {
              if (modulesArray[i].value !== currentJson.attributes[0].value) {
                modulesArray.push({ value: currentJson.attributes[0].value, label: currentJson.attributes[0].value });
              }
            }
          }

          // Decode Image
          const currentImg = currentJson.image.split(",");
          gradeArray.push({ module: currentJson.attributes[0].value, img: currentImg[1] });
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

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = gradeArray.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <NFTImage
      currentPosts={currentPosts}
      postsPerPage={postsPerPage}
      paginate={paginate}
      currentPage={currentPage}
      totalTokens={totalTokens}
      pageLoading={pageLoading}
      renderLoading={renderLoading}
      changeSelected={changeSelected}
      selectedModule={selectedModule}
      modulesArray={modulesArray}
      emptyGrades={emptyGrades}
      gradeArray={gradeArray}
      people={people}
    />
  );
}

function NFTImage({
  currentPosts,
  postsPerPage,
  paginate,
  currentPage,
  totalTokens,
  renderLoading,
  pageLoading,
  changeSelected,
  modulesArray,
  selectedModule,
  emptyGrades,
  gradeArray,
  people
}) {

  // useEffect(() => {
  //   // console.log(gradeArray);
  // }, [totalTokens]);

  return (
    <div className='container'>
      <h2 className="pb-2 border-bottom text-start my-3">MyGrades.</h2>
      {
        pageLoading ?
          renderLoading() :
          <div className="">
            {
              emptyGrades ?
                <div className="text-center mt-5">
                  <h2>There are no grades awarded to you right now.</h2>
                  <small>Please check back again later..</small>
                </div>
                :
                <>
                  <div>
                    {modulesArray.filter(modulesArray => modulesArray.value.includes('M')).map(filteredPerson => (
                      <li>
                        {filteredPerson.value}
                      </li>
                    ))}
                  </div>
                  <div className="d-flex justify-content-around text-start mt-3">
                    Your Results:
                    <Container>
                      <div className="mb-2 text-center">
                        <Select options={modulesArray} placeholder="Filter" onChange={changeSelected} />
                        {selectedModule}
                      </div>
                      <Row>
                        {modulesArray.filter(modulesArray => modulesArray.value.includes('M')).map(filteredModule => (
                          <li>
                            {filteredModule.value}
                          </li>
                        ))}
                        {Object.values(currentPosts).map((val, k) =>
                          <Col k={k} xs={8} md={4} lg={3}>
                            <Card className="m-3" style={{ width: '12rem' }}>
                              <Card.Img variant="top" src={`data:image/svg+xml;base64,${val.img}`} />
                              <Card.Body>
                                <Card.Title>{val.module}</Card.Title>
                                <Button variant="outline-danger w-100 mt-2">Re-evaluate</Button>
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