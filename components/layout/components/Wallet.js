import styled from "styled-components";
import { ethers } from "ethers";
import { useState } from "react";

const networks = {
  sepolia: {
    chainId: '0xaa36a7',
    chainName: "Sepolia Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/xGOe71UEWL65ebXRvgj-MkL51ONfefTg"],
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
};

const Wallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();

      // Check if the current network is Sepolia
      if (chainId !== parseInt(networks.sepolia.chainId, 16)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networks.sepolia],
        });
      }

      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAddress(Address);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return (
    <ConnectWalletWrapper onClick={connectWallet}>
      <Balance>
        {balance === '' ? "0 SepoliaETH" : `${balance.slice(0, 4)} SepliaETH`}
      </Balance>
      <Address>
        {address === '' ? "Connect Wallet" : `${address.slice(0, 6)}...${address.slice(-4)}`}
      </Address>
    </ConnectWalletWrapper>
  );
};

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 5px 9px;
  height: 100%;
  color: ${(props) => props.theme.color};
  border-radius: 10px;
  margin-right: 15px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: small;
  cursor: pointer;
`;

const Address = styled.h2`
  background-color: ${(props) => props.theme.bgSubDiv};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  border-radius: 10px;
`;

const Balance = styled.h2`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

export default Wallet;