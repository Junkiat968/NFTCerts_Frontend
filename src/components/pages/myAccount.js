import React from "react";
import './myAccount.css';

const MyAccount = () => {
    return (
        <div className="userInfo">
            <div className="profile">
                <h4>Jack Wills Pandora</h4>
                <h4> jack_will@sit.singaporetech.edu.sg</h4>
            </div>

            <div className="details">
                <h3> Personal information </h3>       
                <h3> Education </h3>       
            </div>
        </div>

    )
};

export default MyAccount;