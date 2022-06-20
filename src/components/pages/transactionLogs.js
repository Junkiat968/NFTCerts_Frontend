import './transactionLogs.css';
import React from 'react';

const TransactionLogs = () => {
    return (
        <div className='table-container'>
            <h2>
                Token transaction history
            </h2>
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
    )
};

export default TransactionLogs;