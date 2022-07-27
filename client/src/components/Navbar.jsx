import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, Modal, Button } from "react-bootstrap";
import useEth from "../contexts/EthContext/useEth";
import { shortenAddress } from "../utils/addressShortener";

const Navigationbar = () => {
  const { state } = useEth();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderNav = (e) => {
    if (state.accounts !== null) {
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand as={NavLink} to="/">
            GradeGo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto text-end">
              {/* <Nav.Link as={NavLink} to="/">Home</Nav.Link> */}

              {/* {state.role === "ADMIN" && (
                <Nav.Link as={NavLink} to="/SITNFT" className="m-1">
                  SITNFT
                </Nav.Link>
              )} */}
              {state.role === "STUDENT" && (
                <Nav.Link as={NavLink} to="/MyGrades" className="m-1">
                  Grades
                </Nav.Link>
              )}
              {state.role === "FACULTY" && (
                <Nav.Link as={NavLink} to="/ManageGrades" className="m-1">
                  Manage Grades
                </Nav.Link>
              )}
              {state.role === "ADMIN" && (
                <Nav.Link as={NavLink} to="/ManageAccounts" className="m-1">
                  Manage Accounts
                </Nav.Link>
              )}
              {(state.role === "FACULTY" || state.role === "STUDENT" ||
                state.role === "ADMIN") && (
                  <Nav.Link as={NavLink} to="/TransactionLogs" className="m-1">
                    Transaction Logs
                  </Nav.Link>
                )}
              {/* <Nav.Link as={NavLink} to="/PurchaseTokens">Purchase Tokens</Nav.Link> */}
              {state.role === "FACULTY" && (
                <Nav.Link as={NavLink} to="/GradeAppeals" className="m-1">
                  Manage Appeals
                </Nav.Link>
              )}
            </Nav>
            <Nav className="text-end m-1">
              <li className="nav-item text-white">
                <Button
                  className="btn btn-sm btn-outline-dark"
                  type="button"
                  onClick={handleShow}
                >
                  <small className="nav-link link-white px-2 text-white">
                    Account: {shortenAddress(String(state.accounts))}
                  </small>
                </Button>
              </li>
            </Nav>
          </Navbar.Collapse>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Note.</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center m-3 mx-auto">
              <h6 className="card-subtitle mb-1 text-muted">
                To disconnect wallet:
              </h6>
              <p className="card-text">
                Use the MetaMask extension on your browser.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Understood
              </Button>
            </Modal.Footer>
          </Modal>
        </Navbar>
      );
    }
  };

  return <header className="p-3 bg-dark ">{renderNav()}</header>;
};

export default Navigationbar;
