import React, { useContext, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const Home = () => {
  const { state } = useEth();
  console.log(state.accounts);

  return (
    <div className="">
      <section className="py-5 text-center">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light mb-3">Smart Contract Test Site</h1>
            {/* {
              state.accounts ?
                <div>No account found.</div> :
                <small className="">Account Address: {state.accounts}</small>
            } */}
            <small className="">Account Address: {state.accounts}</small>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;