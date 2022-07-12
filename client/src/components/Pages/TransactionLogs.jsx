// import './transactionLogs.css';
import React from 'react';

const TransactionLogs = () => {
    return (
        <div className="container">
            <h2 className="pb-2 border-bottom text-start mt-3">Transaction Logs.</h2>
            <div className='container-fluid p-4 row'>
                <table>
                    <thead>
                        <tr>
                            <th> Transaction </th>
                            <th> Timestamp </th>
                            <th> Tokens transacted </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Uploaded grades ICT1001</td>
                            <td>Fri, 14 May 2022, 14:52:00</td>
                            <td>100</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default TransactionLogs;