import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";

const settings = {
    apiKey: "YnFve6UGn_U5sSvyxsasEODxGOzR6ZMS",
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export default function Account() {
    const [address, setAddress] = useState();
    const [ethBalance, setETHBalance] = useState();
    const [nftCount, setNFTCount] = useState();
    const [nftTitles, setNFTTitles] = useState();
    const [tokenAddresses, setTokenAddresses] = useState();
    const [tokenBalances, setTokenBalances] = useState();

    async function getAccountInfo(evt) {
        evt.preventDefault();
        const balanceBigHex = await alchemy.core.getBalance(address);
        const balanceBigNum = balanceBigHex.toHexString();
        const balance = (balanceBigNum / 10 ** 18).toString();
        setETHBalance(balance);

        const nfts = await alchemy.nft.getNftsForOwner(address);
        setNFTCount(nfts.totalCount);
        const nftObjArray = nfts.ownedNfts;
        const titleArray = [];
        for (let i = 0; i < nftObjArray.length; i++) {
            titleArray.push(nftObjArray[i].title);
        }
        setNFTTitles(titleArray.join(", "));

        const responseObject = await alchemy.core.getTokenBalances(address);
        const tokenBalancesArray = responseObject.tokenBalances;
        const addresses = [];
        const balances = [];
        let i = 0;
        while (i < tokenBalancesArray.length) {
            addresses.push(tokenBalancesArray[i].contractAddress);
            balances.push(tokenBalancesArray[i].tokenBalance);
            i++;
        }
        console.log(addresses);
        setTokenAddresses(addresses.join(", "));
        // setTokenBalances(balances);
    }

    return (
        <div className="container block">
            <h2>Account Snooping (on Mainnet)</h2>
            <form onSubmit={getAccountInfo}>
                <label>
                    Please may you enter address you want to creep on:
                    <input
                        type="text"
                        value={address}
                        onChange={(evt) => {
                            setAddress(evt.target.value);
                        }}
                    />
                </label>
                <input type="submit" className="button" value="Submit" />
            </form>
            <div className="balance">Address: {address}</div>
            <div className="balance">ETH Balance: {ethBalance}</div>
            <div className="balance">
                ERC20s Owned (contract addresses): {tokenAddresses}
            </div>
            {/* <div className="balance">
                ERC20 Balances: {tokenBalances.join(", ")}
            </div> */}
            <div className="balance">Total # of NFTs owned: {nftCount}</div>
            <div className="balance">Names of NFTs owned: {nftTitles}</div>
        </div>
    );
}
