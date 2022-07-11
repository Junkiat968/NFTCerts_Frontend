import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import Select from 'react-select';

import useEth from "../../contexts/EthContext/useEth";
// import { ContractContext } from '../../contexts/ContractProvider';
import Pagination from "../Pagination";

const MyGrades = () => {
  const [postsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalTokens, setTotalTokens] = useState(0);
  const [gradeArray, setGradeArray] = useState([]);
  const [gradeImgArray, setGradeImgArray] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const [modulesArray, setModulesArray] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');

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
        for (let i = 0; i < noOfTokens; i++) {
          const tokenId = await sitnftInstance.tokenOfOwnerByIndex(state.accounts[0], i);
          const tempItem = await sitnftInstance.tokenURI(tokenId);
          gradeArray.push(tempItem);
        }

        console.log(gradeArray.length);
        for (let i = 0; i < gradeArray.length; i++) {
          const current = gradeArray[i].split(",");
          // Decode the String
          var decodedString = atob(current[1]);
          const currentJson = JSON.parse(decodedString);
          // modulesArray.push([
          //   { value: gradeArray[i].attributes[0].value },
          //   { label: gradeArray[i].attributes[0].value }
          // ]);

          // Decode Image
          const currentImg = currentJson.image.split(",");
          gradeImgArray.push(currentImg[1]);
          // gradeImgArray.push([i, currentImg[1]]);
        }
        // console.log(modulesArray);

        setTotalTokens(noOfTokens);
        setPageLoading(false);
        return gradeArray;
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
  const currentPosts = gradeImgArray.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <NFTImage
      currentPosts={currentPosts}
      postsPerPage={postsPerPage}
      gradeImgArray={gradeImgArray}
      paginate={paginate}
      currentPage={currentPage}
      totalTokens={totalTokens}
      pageLoading={pageLoading}
      renderLoading={renderLoading}
      changeSelected={changeSelected}
      selectedModule={selectedModule}
      modulesArray={modulesArray}
    />
  );
}

function NFTImage({
  currentPosts,
  postsPerPage,
  gradeImgArray,
  paginate,
  currentPage,
  totalTokens,
  renderLoading,
  pageLoading,
  changeSelected,
  modulesArray,
  selectedModule
}) {

  // useEffect(() => {
  //   // console.log(gradeImgArray);
  // }, [totalTokens]);

  return (
    <div className='container'>
      <h2 className="pb-2 border-bottom text-start my-3">MyGrades. Testing.</h2>
      {
        pageLoading ?
          renderLoading() :
          <div className="">
            {/* <div className="mb-3 text-center">
              <Select options={modulesArray} placeholder="Filter" onChange={changeSelected} />
              {selectedModule}
            </div> */}
            <div className="d-flex justify-content-around text-start mt-3">
              Your Results:
              <Container>
                <Row>
                  {Object.values(currentPosts).map((val, k) =>
                    <Col k={k} xs={8} md={4} lg={3}>
                      {/* {console.log(val)} */}
                      <Card className="m-3" style={{ width: '12rem' }}>
                        <Card.Img variant="top" src={`data:image/svg+xml;base64,${val}`} />
                      </Card>
                    </Col>
                  )}
                </Row>
              </Container>
            </div>
            <Pagination className="text-end mt-3 ms-auto"
              postsPerPage={postsPerPage}
              totalPosts={gradeImgArray.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
      }
    </div>
  );
}

export default MyGrades;