import React, { useContext, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { shortenAddress } from '../../utils/addressShortener';

const Page1 = () => {
  // const { state } = useEth();

  return (
    <div className='page-two container'>
      <h2 className="pb-2 border-bottom text-start mt-5">Add page 1 functions here.</h2>
    </div>
  );
};

export default Page1;