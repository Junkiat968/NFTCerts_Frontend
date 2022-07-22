// import './transactionLogs.css';
import React, { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
// import SITNFT from "./SITNFT";

export const ContractContext = React.createContext();

const TransactionLogs = () => {
  const { state, getSITNFTContract } = useEth();
  const sitnftInstance = getSITNFTContract();

  const [items, setItems] = useState([]);

  useEffect(() => {
    // declare the the async data fetching
    const fetchData = async () => {
      if (state.role === "FACULTY") {
        const eventFilter = sitnftInstance.filters.IndexedLog(
          String(state.accounts)
        );
        const events = await sitnftInstance.queryFilter(eventFilter);

        setItems(events);
        console.log(events);
      } else if (state.role === "STUDENT") {
        const transferFilter = sitnftInstance.filters.Transfer(
          null,
          state.accounts[0]
        );
        const transferEvent = await sitnftInstance.queryFilter(transferFilter);
        setItems(transferEvent);
      } else if (state.role === "ADMIN") {
        const transferFilter = sitnftInstance.filters.Transfer();
        const transferEvent = await sitnftInstance.queryFilter(transferFilter);
        setItems(transferEvent);
        }
      // get the events
    };
    // call the function
    fetchData().catch(console.error);
  });

  //   async function getPastEvents() {
  //     console.log(String(state.accounts));
  //     let eventFilter = sitnftInstance.filters.IndexedLog(String(state.accounts));
  //     let events = await sitnftInstance.queryFilter(eventFilter);
  //     setItems(events);
  //     console.log(events)
  //   }
  if (state.role === "FACULTY") {
    return (
      <div className="container">
        <h2 className="pb-2 border-bottom text-start mt-3">
          Transaction Logs.
        </h2>
        <div className="container-fluid p-4 row">
          <table>
            <thead>
              <tr>
                <th> Transaction </th>
                <th> Details </th>
                {/* <th> Tokens transacted </th> */}
              </tr>
            </thead>

            <tbody>
              {items.map((d, index) => (
                <tr key={index}>
                  <td>{d.transactionHash}</td>
                  <td>{d.args.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (state.role === "STUDENT") {
    return (
      <div className="container">
        <h2 className="pb-2 border-bottom text-start mt-3">
          Transaction Logs.
        </h2>
        <div className="container-fluid p-4 row">
          <table>
            <thead>
              <tr>
                <th> Transaction </th>
                <th> Details </th>
                {/* <th> Tokens transacted </th> */}
              </tr>
            </thead>

            <tbody>
              {items.map((d, index) => (
                <tr key={index}>
                  <td>{d.transactionHash}</td>
                  <td>Received TokenID {d.args[2].toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (state.role === "ADMIN") {
    return (
      <div className="container">
        <h2 className="pb-2 border-bottom text-start mt-3">
          Transaction Logs.
        </h2>
        <div className="container-fluid p-4 row">
          <table>
            <thead>
              <tr>
                <th> Transaction </th>
                <th> To </th>
                <th> Details </th>
                <th> Tokens transacted </th>
              </tr>
            </thead>

            <tbody>
              {items.map((d, index) => (
                <tr key={index}>
                  <td>{d.transactionHash}</td>
                  <td>{d.args.to}</td>
                  <td>TokenID {d.args[2].toString()}</td>
                  <td><a href={`https://rinkeby.etherscan.io/tx/${d.transactionHash}`}>view in etherscan</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else return <p>You are not authorized to view this page</p>;
};

export default TransactionLogs;
