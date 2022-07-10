import React from "react";
// import './purchaseTokens.css';
import { Col, Row, Nav, Tab, Table } from 'react-bootstrap';

const PurchaseTokens = () => {
    return (
        <div className="container">
        <Row className="p-3">
        <h2> Get more tokens here! </h2>

        </Row>
        <Row className="p-3">
        <Col sm={2}>
        <div className="token-container">
        <div className="tokensLeft">
        <h4>Tokens left</h4>
        <h2> 3784</h2>
        </div>
        </div>
        </Col>    
        <Col sm={10}>
        <div className="buyTokens">
            <h2> Purchase your tokens here!</h2>
            <form>
                <input type="int" name="tokenAmt" />
                <input type="submit" value="Buy!" />
            </form>
            </div>

        </Col>
        </Row>
        </div>
    )
};

export default PurchaseTokens;