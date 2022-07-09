import React from "react";
import useEth from "../../contexts/EthContext/useEth";

const Login = () => {
    const {
        state,
        init
    } = useEth();

    const renderAcc = (e) => {
        if (state.accounts !== null) {
            return (
                <div>
                    <section className="text-center">
                        <div className="row py-lg-1">
                            <small className="px-2">
                                Account: {state.accounts}
                            </small>
                        </div>
                    </section>
                    <div className="mt-5" >
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-5">
                            <div className="card text-center mt-5 mx-auto" style={{ width: '18rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title mb-3">Note.</h5>
                                    <h6 className="card-subtitle mb-1 text-muted">To disconnect wallet:</h6>
                                    <p className="card-text">Use the MetaMask extension on your browser.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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