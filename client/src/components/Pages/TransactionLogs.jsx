// import './transactionLogs.css';
import React, { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

const TransactionLogs = () => {
    const {
        state: { contractsitnft, accounts },
    } = useEth();
    const [totalMinted, setTotalMinted] = useState(0);
    const [tokenArray, setTokenArray] = useState([]);
    const [transactionArray, setTransactionArray] = useState([]);

    useEffect(() => {
        if (!accounts) return;
        const getPastEvents = async () => {
            const option = {
                filter: { sender: accounts[0] },
                fromBlock: 0,
                toBlock: "latest",
            };
            const pastEvent = await contractsitnft.getPastEvents("Mint", option);
            const parsedPastEvent = pastEvent.map((event) => {
                console.log(event);
                return { tokenId: event.returnValues.tokenId };
            });
            setTotalMinted(parsedPastEvent.length);
            setTokenArray(parsedPastEvent);

            const parsedTransactions = pastEvent.map((event) => {
                return { tokenId: event.returnValues.tokenId, sender: event.returnValues.sender, moduleCode: event.returnValues.moduleCode };
            });
            setTransactionArray(parsedTransactions);
        };
        getPastEvents();
    }, [accounts, totalMinted, contractsitnft]);

    return (
        <div className="container">
            <h2 className="pb-2 border-bottom text-start mt-3">Transaction Logs.</h2>
            <div>
                <p className="text-center my-3">Count is {totalMinted}</p>
                {/* {!isNaN(totalMinted) &&
                    tokenArray.map((token) => (
                        <div key={token.tokenId}>
                            <p>TokenId: {token.tokenId}</p>
                            <NFTImage tokenId={token.tokenId} />
                        </div>
                    ))} */}
            </div>
            <div className='container-fluid p-3 row'>
                <table>
                    <thead>
                        <tr>
                            <th> SenderAddress </th>
                            <th> Token ID </th>
                            <th> Module Code </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isNaN(totalMinted) &&
                            transactionArray.map((item) => (
                                <tr key={item.Id} >
                                    <td>{item.sender}</td>
                                    <td>{item.tokenId}</td>
                                    <td>{item.moduleCode}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
};

function NFTImage({ tokenId }) {
    const {
        state: { contractsitnft },
    } = useEth();

    const [metadata, setMetadata] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    useEffect(() => {
        getMetadata();
    });
    const getMetadata = async () => {
        try {
            const metadataURI = await contractsitnft.methods.tokenURI(tokenId).call();
            const json = Buffer.from(metadataURI.substring(29), "base64").toString();
            const result = JSON.parse(json);
            setMetadata(result);
            setImageSrc(result.image);
        } catch (error) { }
    };

    return (
        <div>
            {metadata.length !== 0 ? (
                <div>
                    <p>{metadata.name}</p>
                    <img src={imageSrc} alt="{metadata.name}"></img>
                </div>
            ) : (
                <p>Token has been burned.</p>
            )}
        </div>
    );
}

export default TransactionLogs;