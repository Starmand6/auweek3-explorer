import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

const settings = {
    apiKey: "YnFve6UGn_U5sSvyxsasEODxGOzR6ZMS",
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export default function Blocks() {
    const [blockNumber, setBlockNumber] = useState();
    const [blockHash, setBlockHash] = useState();
    const [blockTimestamp, setBlockTimestamp] = useState();
    const [blockGasLimit, setBlockGasLimit] = useState();
    const [blockGasUsed, setBlockGasUsed] = useState();
    const [transactions, setTransactions] = useState();
    const [lastFiveBlockHashes, setLastFiveBlockHashes] = useState();

    useEffect(() => {
        try {
            async function getBlockNumber() {
                setBlockNumber(await alchemy.core.getBlockNumber());
            }
            getBlockNumber();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            async function getBlockInfo() {
                const block = await alchemy.core.getBlock(blockNumber);
                setBlockHash(block.hash);
                setBlockTimestamp(block.timestamp);
                setBlockGasLimit(block.gasLimit.toString());
                setBlockGasUsed(block.gasUsed.toString());

                const txArray = block.transactions.slice(0, 5);
                setTransactions(txArray.join(", "));
            }
            getBlockInfo();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            const latestBlockHashes = [];
            async function getBlockHashes() {
                const latestBlock = blockNumber;
                for (let i = 1; i < 6; i++) {
                    const block = await alchemy.core.getBlock(latestBlock - i);
                    latestBlockHashes.push(block.hash);
                }
                setLastFiveBlockHashes(latestBlockHashes.join(", "));
            }
            getBlockHashes();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="container block">
            <h2>Latest Block Info</h2>
            <div>Block Number: {blockNumber}</div>
            <div>Block Hash: {blockHash}</div>
            <div>
                Block Timestamp:{" "}
                {new Date(blockTimestamp * 1000).toLocaleString()}{" "}
            </div>
            <div>Block Gas Limit: {blockGasLimit}</div>
            <div>Block Gas Used: {blockGasUsed} </div>
            <div className="container transactions">
                <h2>Latest Block Transaction Hashes</h2>
                <div>{transactions}</div>
            </div>
            <div className="container block">
                <h2>Previous Five Sexiest Block Hashes</h2>
                <div>{lastFiveBlockHashes}</div>
            </div>
        </div>
    );
}
