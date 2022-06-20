import React from "react";
import './purchaseTokens.css';


const PurchaseTokens = () => {
    return (
        <div className="tokenInfo">
            <h2> Get more tokens here! </h2>

            <div className="token-container">
            <div className="tokensLeft">
            <h4>Tokens left</h4>
            <h2> 3784</h2>
            </div>

            <div className="buyTokens">
                <h2> Purchase your tokens here!</h2>
            <form>
                    <input type="int" name="tokenAmt" />
                    <input type="submit" value="Buy!" />
                    </form>
            </div>
            </div>
        </div>
    )
};

export default PurchaseTokens;