// import './transactionLogs.css';
import React, { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
// import SITNFT from "./SITNFT";
import { Col, Row, Nav, Tab, Table } from "react-bootstrap";

export const ContractContext = React.createContext();

const TransactionLogs = () => {
  const { state, getSITNFTContract } = useEth();
  const sitnftInstance = getSITNFTContract();
  const [items, setItems] = useState([]);
  const [transferItems, setTransferItems] = useState([]);
  const [mintItems, setMintItems] = useState([]);
  const [remodItems, setRemodItems] = useState([]);
  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  const [transferFrom, setTransferFrom] = useState(null);


  useEffect(() => {
    // declare the the async data fetching
    const fetchData = async () => {
      if (state.role === "FACULTY") {
        setTransferFrom(String(state.accounts))
        setFrom(String(state.accounts))
      } else if (state.role === "STUDENT") {
        setFrom(String(state.accounts))
        setTo(String(state.accounts))
      } else if (state.role === "ADMIN") {
      }
        // indexed log
        const eventFilter = sitnftInstance.filters.IndexedLog(from);
        const events = await sitnftInstance.queryFilter(eventFilter);
        setItems(events);

        // transfer log
        const transferFilter = sitnftInstance.filters.Transfer(transferFrom, to);
        const transferEvent = await sitnftInstance.queryFilter(transferFilter);
        setTransferItems(transferEvent);
        
        // mint log
        const mintFilter = sitnftInstance.filters.Mint(from);
        const mintEvent = await sitnftInstance.queryFilter(mintFilter);
        setMintItems(mintEvent);

        // remod log
        const remodFilter = sitnftInstance.filters.RemodRequest(from);
        const remodEvent = await sitnftInstance.queryFilter(remodFilter);
        setRemodItems(remodEvent);
      // get the events
    };
    // call the function
    fetchData().catch(console.error);
  });

  const renderTransferTable = (e) => {
    return (
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              {/* <th> Transaction </th> */}
              <th> To </th>
              <th> Details </th>
              <th> Etherscan </th>
            </tr>
          </thead>

          <tbody>
            {transferItems.map((d, index) => (
              <tr key={index}>
                {/* <td>{d.transactionHash}</td> */}
                <td>{d.args.to}</td>
                <td>Received TokenID {d.args[2].toString()}</td>
                <td>
                  <a
                    href={`https://rinkeby.etherscan.io/tx/${d.transactionHash}`}
                    target="_blank"
                  >
                    view in etherscan
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  const renderLogTable = (e) => {
    return (
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              {/* <th> Transaction </th> */}
              <th> Sender </th>
              <th> Details </th>
              <th> Etherscan </th>
            </tr>
          </thead>

          <tbody>
            {items.map((d, index) => (
              <tr key={index}>
                {/* <td>{d.transactionHash}</td> */}
                <td>{d.args.sender}</td>
                <td>{d.args.message}</td>
                <td>
                  <a
                    href={`https://rinkeby.etherscan.io/tx/${d.transactionHash}`}
                    target="_blank"
                  >
                    view in etherscan
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  const renderMintTable = (e) => {
    return (
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              {/* <th> Transaction </th> */}
              <th> Module Code </th>
              <th> Sender </th>
              <th> TokenID </th>
              <th> Etherscan </th>
            </tr>
          </thead>

          <tbody>
            {mintItems.map((d, index) => (
              <tr key={index}>
                {/* <td>{d.transactionHash}</td> */}
                <td>{d.args.moduleCode}</td>
                <td>{d.args.sender}</td>
                <td>{d.args.tokenId.toString()}</td>
                <td>
                  <a
                    href={`https://rinkeby.etherscan.io/tx/${d.transactionHash}`}
                    target="_blank"
                  >
                    view in etherscan
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  const renderRemodTable = (e) => {
    return (
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              {/* <th> Transaction </th> */}
              <th> Sender </th>
              <th> Details </th>
              <th> Etherscan </th>
            </tr>
          </thead>

          <tbody>
            {remodItems.map((d, index) => (
              <tr key={index}>
                {/* <td>{d.transactionHash}</td> */}
                <td>{d.args.sender}</td>
                <td>{d.args.message}</td>
                <td>
                  <a
                    href={`https://rinkeby.etherscan.io/tx/${d.transactionHash}`}
                    target="_blank"
                  >
                    view in etherscan
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  if (state.role === "FACULTY") {
    return (
      <div className="container">
        <h2 className="pb-2 border-bottom text-start mt-3">
          Transaction Logs.
        </h2>
        <div className="container-fluid p-3 row">
          <Tab.Container id="left-tabs" defaultActiveKey="log">
            <Row className="p-1">
              <Col sm={3}>
                <Nav
                  variant="pills"
                  className="flex-column pb-3"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="log">Logs</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="mint">Mint</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="remod">Remod Request</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="log">
                    <div>{renderLogTable()}</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="mint">
                    <div>{renderMintTable()}</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="remod">
                    <div>{renderRemodTable()}</div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  } else if (state.role === "STUDENT") {
    return (
      <div className="container">
        <h2 className="pb-2 border-bottom text-start mt-3">
          Transaction Logs.
        </h2>
        <div className="container-fluid p-3 row">
          <Tab.Container id="left-tabs" defaultActiveKey="transfer">
            <Row className="p-1">
              <Col sm={3}>
                <Nav
                  variant="pills"
                  className="flex-column pb-3"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="transfer">Transfer</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="remod">Remod Request</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="transfer">
                    <div>{renderTransferTable()}</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="remod">
                    <div>{renderRemodTable()}</div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  } else if (state.role === "ADMIN") {
    return (
      <div className="container">
        <h2 className="pb-2 border-bottom text-start mt-3">
          Transaction Logs.
        </h2>
        <div className="container-fluid p-3 row">
          <Tab.Container id="left-tabs" defaultActiveKey="log">
            <Row className="p-1">
              <Col sm={3}>
                <Nav
                  variant="pills"
                  className="flex-column pb-3"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="log">Logs</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="transfer">Transfer</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="mint">Mint</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="remod">Remod Request</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="log">
                    <div>{renderLogTable()}</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="transfer">
                    <div>{renderTransferTable()}</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="mint">
                    <div>{renderMintTable()}</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="remod">
                    <div>{renderRemodTable()}</div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  } else return <p>You are not authorized to view this page</p>;
};

export default TransactionLogs;
