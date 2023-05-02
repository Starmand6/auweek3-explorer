import { Alchemy, Network } from "alchemy-sdk";
import { useState } from "react";

const settings = {
    apiKey: "YnFve6UGn_U5sSvyxsasEODxGOzR6ZMS",
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export default function NFT() {
    const [address, setAddress] = useState();
    const [floorPrice, setFloorPrice] = useState();
    const [nftName, setNFTName] = useState();
    const [nftSymbol, setNFTSymbol] = useState();
    const [nftTotalSupply, setNFTTotalSupply] = useState();

    async function getNFTInfo(evt) {
        evt.preventDefault();

        const floorPriceObj = await alchemy.nft.getFloorPrice(address);
        const price = floorPriceObj.openSea.floorPrice;
        setFloorPrice(price);

        const nftMetaDataObject = await alchemy.nft.getContractMetadata(
            address
        );
        const name = nftMetaDataObject.name;
        setNFTName(name);
        const symbol = nftMetaDataObject.symbol;
        setNFTSymbol(symbol);
        const totalSupply = nftMetaDataObject.totalSupply;
        setNFTTotalSupply(totalSupply);
    }
    return (
        <div className="container block">
            <h2>Non-Fungible Token Forensic Services</h2>
            <form onSubmit={getNFTInfo}>
                <label>
                    NFT Contract Address:
                    <input
                        placeholder="Feed me"
                        value={address}
                        onChange={(evt) => {
                            setAddress(evt.target.value);
                        }}
                    />
                    <input type="submit" className="button" value="Submit" />
                </label>
            </form>
            <div>Token Contract Address: {address}</div>
            <div>NFT Name: {nftName} </div>
            <div>NFT Symbol: {nftSymbol} </div>
            <div>NFT Total Supply: {nftTotalSupply} </div>
            <div>NFT Floor Price (from OpenSea): {floorPrice} ETH</div>
            <p></p>
            <p>White space feels nice.</p>
        </div>
    );
}
