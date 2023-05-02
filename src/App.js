import React from "react";
import Blocks from "./components/Blocks";
import Account from "./components/Account";
import NFT from "./components/NFT";
import "./App.css";
import ETHUnicorn from "./ETHUnicorn.png";

export default function App() {
    return (
        <div className="App">
            <img
                src={ETHUnicorn}
                alt="Ethereum Rainbow Unicorn is awesomely dashing across page"
            />
            <h1>Super Detailed and Highly Fancy Ethereum Block Explorer</h1>
            <Blocks />
            <hr />
            <Account />
            <hr />
            <NFT />
        </div>
    );
}
