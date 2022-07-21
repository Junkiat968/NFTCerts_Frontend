import React from "react";
import { NavLink } from 'react-router-dom';
import useEth from "../../contexts/EthContext/useEth";

const PageNotFound = () => {
    const { state } = useEth();

    const setLink = (e) => {
        if (state.accounts !== null) {
            return (
                <NavLink className="nav-link px-2" to="/">Return Home</NavLink>
            )
        } else {
            return (
                <NavLink className="nav-link px-2" to="/">Return</NavLink>
            )
        }
    };

    return (
        <div className="container">
            <h1 className="mt-5 pb-2 border-bottom text-start">Access Denied.</h1>
            <div className="text-center mt-5">
                You do not have access to this page.
            </div>
            <div className="mt-3 text-center">
                <button type="button" className="btn btn-outline-primary mt-3">
                    {setLink()}
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;