import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Col, Row, Nav, Tab, Table } from 'react-bootstrap';
import useEth from "../../contexts/EthContext/useEth";

// import Sidebar from "./Sidebar";
import "./table.css";

export const ContractContext = React.createContext();

const ManageAccounts = () => {
  const { state, getSITNFTContract } = useEth();

  const [items, setItems] = useState([]);

    // Student Functions
    const functAddStudents = async () => {;

      const sitnftInstance = getSITNFTContract();
      console.log(items);
      try {
          const result = await sitnftInstance.multiAddStudentAddress(
            items,
          );

          console.log(result);
          // setStudentResult(result);
          return result;
      } catch (err) {
          console.error(err);
          // setStudentResult(err);
          return err;
      }
  }

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {raw: false});
        resolve(data);
        // console.log(data);
        // console.log(JSON.stringify(data));
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  const [uploadedFileName, setUploadedFileName] = useState('');
  const [inputFile, setInputFile] = useState('');
  useEffect(() => {
    setInputFile(document.getElementById("input-file"));
  }, []);
  const handleUpload = () => {
    inputFile?.click();
  };
  const handleDisplayFileDetails = () => {
    inputFile?.files && setUploadedFileName(inputFile.files[0].name);
    readExcel(inputFile.files[0])
  };

  return (
    <div className="container">
    {/* <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} /> */}
    <div className="p-3 w-100 d-inline-block">
    {/* <label className="mx-3">Choose file: </label> */}
    <input
      id="input-file"
      onChange={handleDisplayFileDetails}
      className="d-none"
      type="file"
    />
    <button className="float-end btn btn-block btn-outline-primary mx-3" type="button"
                      onClick={functAddStudents}>Upload
    </button>
    <button
      onClick={handleUpload}
      className={`float-end btn btn-outline-${
        uploadedFileName ? "success" : "primary"
      }`}
    >
      {uploadedFileName ? uploadedFileName : 'Select excel'}
    </button>

  </div>

    <div>
      <Table responsive hover>
        <thead>
          <tr>
            <th scope="col">Student ID</th>
            <th scope="col">Student Address</th>
          </tr>
        </thead>

        <tbody>
          {items.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.addr}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>

  );
};

export default ManageAccounts;
