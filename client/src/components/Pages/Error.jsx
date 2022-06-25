import React from "react";
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div className="container">
            <h1 className="mt-5 pb-2 border-bottom text-start">Error.</h1>
            <div className="text-center mt-5">
                Please login with your MetaMask account to continue.
            </div>
            <div className="mt-3 text-center">
                <button type="button" className="btn btn-outline-primary mt-3">
                    <NavLink className="nav-link px-2" to="/">Return</NavLink>
                </button>
            </div>
        </div>
    );
};

export default Error;