import React, { useContext, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { shortenAddress } from '../../utils/addressShortener';

const Home = () => {
  // const { state } = useEth();

  return (
    <div className="">
      <section className="py-5 text-center">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light mb-3">HOME</h1>
          </div>
        </div>
      </section>
      <div className="mt-1" >
        <div className="album bg-light" style={{ height: '30rem' }}>
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
    </div>
  );
};

export default Home;