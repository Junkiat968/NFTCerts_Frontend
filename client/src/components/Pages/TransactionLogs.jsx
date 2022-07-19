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
        // get the events
        const eventFilter = sitnftInstance.filters.IndexedLog(String(state.accounts));
        const events = await sitnftInstance.queryFilter(eventFilter);

        setItems(events);
        // console.log(events);
    }
    // call the function
    fetchData()
        .catch(console.error);

    })

//   async function getPastEvents() {
//     console.log(String(state.accounts));
//     let eventFilter = sitnftInstance.filters.IndexedLog(String(state.accounts));
//     let events = await sitnftInstance.queryFilter(eventFilter);
//     setItems(events);
//     console.log(events)
//   }

  return (
    <div className="container">
      <h2 className="pb-2 border-bottom text-start mt-3">Transaction Logs.</h2>
      <div className="container-fluid p-4 row">
        <table>
          <thead>
            <tr>
              <th> Transaction </th>
              <th> Details </th>
              <th> Etherscan </th>
            </tr>
          </thead>

          <tbody>
            {items.map((d, index) => (
              <tr key={index}>
                <td>{d.transactionHash}</td>
                <td>{d.args.message}</td>
                <td><a href={`https://rinkeby.etherscan.io/tx/${d.transactionHash}`} target="_blank" rel="noreferrer">View in Etherscan</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionLogs;
