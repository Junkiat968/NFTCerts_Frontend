import React from "react";
import './transactionLogs.css';


const ManageApprovals = () => {
    return (
        <div className='table-container'>
            <h2>
                Manage Request
            </h2>
            <table>
                <thead>
                    <tr>
                        <th> Request </th>
                        <th> Tokens transacted </th>
                        <th>  </th>
                        <th>  </th>

                    </tr>
                </thead>                

                <tbody>
                    <tr>
                        <td>Uploaded grades ICT1001</td>
                        <td>100</td>
                        <td> 
                            <button class="accept" onclick="approve()">
                                APPROVE
                            </button>
                        </td>
                        <td> 
                            <button class="reject" onclick="reject()">
                                REJECT
                            </button> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ManageApprovals;