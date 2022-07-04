import React, { useState } from "react";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";
import "./uploadBtn.css";

const ManageAccounts = () => {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        console.log(data);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div>
      <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />

      <div class="div-wrapper"> 
        <input
          id="uploadAccounts"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
          hidden
        />
        <label id="uploadAccountBtn" class="uploadBtn" for="uploadAccounts">
          Upload Accounts
        </label>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th scope="col">Student</th>
              <th scope="col">Student ID</th>
            </tr>
          </thead>

          <tbody>
            {items.map((d) => (
              <tr key={d.Id}>
                <th>{d.Name}</th>
                <th>{d.Id}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAccounts;
