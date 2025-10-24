import { ethers } from "ethers";
import { createContext, useContext, useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/constants";

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [proofChainContract, setProofChainContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfHash, setPdfHash] = useState(""); // ✅ 新增

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask");

      setLoading(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setProofChainContract(contract);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      throw new Error("Failed to connect wallet");
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        loading,
        currentAccount,
        connectWallet,
        proofChainContract,
        pdfHash,     // ✅ 新增
        setPdfHash,  // ✅ 新增
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

// Hook to access Context
export const useBlockchain = () => useContext(BlockchainContext);
