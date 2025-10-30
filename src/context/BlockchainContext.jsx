import { ethers } from 'ethers';
import { createContext, useContext, useEffect, useState } from 'react';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/constants';

const BlockchainContext = createContext();

const SEPOLIA_RPC_URL = "https://ethereum-sepolia.publicnode.com";

export const BlockchainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [proofChainContract, setProofChainContract] = useState(null);
  const [readOnlyContract, setReadOnlyContract] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initReadOnlyContract = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        setReadOnlyContract(contract);
        console.log("Read-only contract initialized.");
      } catch (error) {
        console.error("Failed to initialize read-only contract:", error);
      }
    };
    initReadOnlyContract();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask");
      setLoading(true);

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);

      // After connecting wallet, initialize Ethers and contract
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
        proofChainContract, // Needed by notarization and verification components
        readOnlyContract
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

// Hook to access
export const useBlockchain = () => useContext(BlockchainContext);
