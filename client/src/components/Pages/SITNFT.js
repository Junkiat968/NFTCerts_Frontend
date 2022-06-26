import React, { useContext, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="form-control mb-1"
  />
);

const SITNFT = () => {
  const {
    state,
    testFunct,
    makeAdmin,
    removeAdmin,
    handleChange,
    formData,
    isAdminResult
  } = useEth();
  console.log(isAdminResult);

  // const handleCheckAdmin = (e) => {
  //   const { addressInput } = formData;
  //   e.preventDefault();
  //   if (!addressInput) {
  //     alert('Please enter value!');
  //     return;
  //   }
  //   testFunct();
  // };

  return (
    <div className='page-two container'>
      <h2 className="pb-2 border-bottom text-start mt-5">SITNFT.</h2>
      <p>Check if admin:</p>
      <div className="row g-3 mt-3">
        {/* <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label"></label>
          <input type="text" className="form-control" id="firstName" placeholder="" required="" />
        </div> */}
        <div className="col-sm-6 ">
          <label htmlFor="lastName" className="form-label text-start">Address</label>
          <Input placeholder="e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
          {/* <input type="text" className="form-control" id="lastName" placeholder="0x..........." required="" /> */}
          <div className="text-end">
            <button className="btn btn-block btn-primary mt-3" type="button" onClick={testFunct}>Submit</button>
          </div>
          {/* <div className="invalid-feedback">
            0x...........
          </div> */}
        </div>
        <div className="col-sm-6 mt-3">
          isAdmin() Result:
          <div className="">
            <small>
              {isAdminResult.toString()}
            </small>
          </div>
        </div>
      </div>
      <div className="row mt-5 border-top">
        <p>// Work in progress.. //</p>
        <div className="col-sm-6 text-center">
          <button className="btn btn-block btn-primary mt-3" type="button" onClick={makeAdmin}>Make Admin</button>
        </div>
        <div className="col-sm-6 text-center">
          <button className="btn btn-block btn-primary mt-3" type="button" onClick={removeAdmin}>Remove Admin</button>
        </div>
      </div>
    </div>
  );
};

export default SITNFT;