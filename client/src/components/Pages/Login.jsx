import React, { useContext, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { shortenAddress } from '../../utils/addressShortener';

const Login = () => {
    const { state, init } = useEth();

    const renderAcc = (e) => {
        if (state.accounts !== null) {
            return (
                <small className="px-2">
                    Account: {state.accounts}
                </small>
            )
        } else {
            return (
                <div>
                    <p className="lead text-muted">Connect your MetaMask account to continue.</p>
                    <button className="btn btn-block btn-primary mt-3" type="button" onClick={init}>Connect Wallet</button>
                </div>
            )
        }
    };

    return (
        <div className="">
            <section className="py-5 text-center">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light mb-3">Smart Contract Test Site</h1>
                        {renderAcc()}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;