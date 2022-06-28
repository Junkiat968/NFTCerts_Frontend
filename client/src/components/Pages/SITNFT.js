import React from "react";
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
    functIsAdmin,
    functIsFaculty,
    makeAdmin,
    removeAdmin,
    handleChange,
    formData,
    isAdminResult,
    isFacultyResult,
    makeFaculty,
    removeFaculty,
    mint,
    mintData,
    handleMint
  } = useEth();
  console.log(isAdminResult);

  const handleCheckAdmin = (e) => {
    const { addressInput } = formData;
    e.preventDefault();
    if (!addressInput) {
      alert('Please enter valid Admin Address!');
      return;
    }
    functIsAdmin();
  };

  const handleCheckFaculty = (e) => {
    const { addressInput } = formData;
    e.preventDefault();
    if (!addressInput) {
      alert('Please enter valid Faculty Address!');
      return;
    }
    functIsFaculty();
  };

  const renderIsAdmin = (e) => {
    return (
      <>
        <p className="border-bottom mt-3">Check if Admin:</p>
        <div className="row g-3">
          <div className="col-sm-6 ">
            {/* <label htmlFor="lastName" className="form-label text-start">Address</label> */}
            <Input placeholder="Address e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
          </div>
          <div className="col-sm-6">
            <div className="row col-sm-12 text-center">
              <div className="col-sm-6 text-center">
                <button className="btn btn-block btn-primary mt-3" type="button" onClick={handleCheckAdmin}>Check Admin Status</button>
              </div>
              <div className="col-sm-3 text-center">
                <button className="btn btn-block btn-outline-secondary mt-3" type="button" onClick={makeAdmin}>Make Admin</button>
              </div>
              <div className="col-sm-3 text-center">
                <button className="btn btn-block btn-outline-danger mt-3" type="button" onClick={removeAdmin}>Remove Admin</button>
              </div>
            </div>
            <div className="mt-3">
              Result:
              <div className="">
                <small>
                  {isAdminResult.toString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };

  const renderIsFaculty = (e) => {
    return (
      <>
        <p className="border-bottom mt-3">Check if Faculty:</p>
        <div className="row g-3">
          <div className="col-sm-6 ">
            {/* <label htmlFor="lastName" className="form-label text-start">Address</label> */}
            <Input placeholder="Address e.g. 0x........." name="addressInput" type="text" handleChange={handleChange} />
          </div>
          <div className="col-sm-6">
            <div className="row col-sm-12 text-center">
              <div className="col-sm-6 text-center">
                <button className="btn btn-block btn-primary mt-3" type="button" onClick={handleCheckFaculty}>Check Faculty Status</button>
              </div>
              <div className="col-sm-3 text-center">
                <button className="btn btn-block btn-outline-secondary mt-3" type="button" onClick={makeFaculty}>Make Faculty</button>
              </div>
              <div className="col-sm-3 text-center">
                <button className="btn btn-block btn-outline-danger mt-3" type="button" onClick={removeFaculty}>Remove Faculty</button>
              </div>
            </div>
            <div className="mt-3">
              Result:
              <div className="">
                <small>
                  {isFacultyResult.toString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };

  const renderMint = (e) => {
    return (
      <>
        <p className="border-bottom mt-3">Mint:</p>
        <div className="row g-3">
          <div className="col-sm-6 ">
            {/* <label htmlFor="lastName" className="form-label text-start">Address</label> */}
            <input placeholder="Module Code" className="form-control mb-1" type="text" name="moduleCode" value={mintData.moduleCode} onChange={handleMint} />
            <input placeholder="Test Type" className="form-control mb-1" type="text" name="testType" value={mintData.testType} onChange={handleMint} />
            <input placeholder="Grade" className="form-control mb-1" type="text" name="grade" value={mintData.grade} onChange={handleMint} />
            <input placeholder="Trimester" className="form-control mb-1" type="text" name="trimester" value={mintData.trimester} onChange={handleMint} />
            <input placeholder="Recipient Address" className="form-control mb-1" type="text" name="recipient" value={mintData.recipient} onChange={handleMint} />
          </div>
          <div className="col-sm-6">
            <div className="row col-sm-12 text-center">
              <div className="col-sm-6 text-start">
                <button className="btn btn-block btn-primary mt-3" type="button" onClick={mint}>Mint</button>
              </div>
            </div>
            <div className="mt-3">
              Result:
              {/* <div className="">
                <small>
                  {isFacultyResult.toString()}
                </small>
              </div> */}
            </div>
          </div>
        </div>
      </>
    )
  };

  return (
    <div className='page-two container mb-5'>
      <h2 className="pb-2 border-bottom text-start mt-5">SITNFT. Testing.</h2>
      {renderIsAdmin()}
      {renderIsFaculty()}
      {renderMint()}
    </div>
  );
};

export default SITNFT;