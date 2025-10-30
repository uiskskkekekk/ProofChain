import { useState } from 'react';
import { FiCopy, FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import FileDropzone from '../components/FileDropzone';
import { useBlockchain } from '../context/BlockchainContext';
import { useFileHandler } from '../hooks/useFileHandler';
import '../styles/pages/Attest.css';
import { formatFileSize } from '../utils/formatFileSize';

const Attest = () => {
  const {
    file,
    fileHash, 
    isLoading: isHashLoading,
    error: fileError,
    ...fileHandlers
  } = useFileHandler();

  const { proofChainContract, currentAccount } = useBlockchain();
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [txError, setTxError] = useState("");
  const navigate = useNavigate();

  // --- BlockChain interaction ---
  const handleAttest = async () => {
    if (!currentAccount) return setTxError("Please connect your wallet first.");
    if (!proofChainContract) return setTxError("Contract not loaded. Please reconnect wallet.");
    if (!fileHash) return setTxError("Please select a file first.");

    setIsTxLoading(true);
    setTxError("");

    try {
      const formattedHash = '0x' + fileHash;
      const tx = await proofChainContract.storeProof(formattedHash);

      console.log("Transaction sent, awaiting confirmation...");

      const receipt = await tx.wait();
      
      // -- redirect to the success page, pass the hash
      navigate(`/success/${receipt.hash}`, { 
        state: { 
          fileHash: fileHash,
          timestamp: Date.now()
        } 
      });

    } catch (err) {
      console.error(err);
      if (err.message && err.message.includes("Proof already exists")) {
        setTxError("Attestation failed: This file's hash already exists on-chain.");
      } else {
        setTxError("Attestation failed. Check console for details.");
      }
    } finally {
      setIsTxLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileHash);
    alert("Hash copied to clipboard!");
  };

  const error = fileError || txError;
  const isLoading = isHashLoading || isTxLoading;

  return (
    <div className="attest-container">
      
      <div className="attest-header">
        <h1>Create a New Attestation</h1>
        <p>Generate a unique digital fingerprint for your file and record it on the blockchain.</p>
      </div>

      {/* --- Upload --- */}
      {(
        <FileDropzone
          {...fileHandlers}
          isLoading={isLoading}
        />
      )}

      {/* --- Error --- */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {isHashLoading && (
        <div className="attestation-details loading-hash">
          <p>Calculating file hash...</p>
        </div>
      )}

      {/* --- Result --- */}
      {file && fileHash && (
        <div className="attestation-details">
          
          {/* File information */}
          <div className="file-info-box">
            <span className="file-icon"><FiFileText /></span>
            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{formatFileSize(file.size)}</span>
            </div>
          </div>

          {/* Hash information */}
          <div className="hash-display">
            <label>File SHA-256 Hash</label>
            <div className="hash-input-wrapper">
              <span>{fileHash}</span>
              <button onClick={copyToClipboard} className="copy-button" title='Copy Hash'>
                <FiCopy />
              </button>
            </div>
            <p className="hash-description">This is the unique digital fingerprint of your file.</p>
          </div>
          
          {/* Attest */}
          <div className="attest-action">
            <button 
              className="attest-button-main"
              onClick={handleAttest}
              disabled={isLoading}
            >
              <ion-icon name="shield-checkmark-outline"></ion-icon>
              {isLoading ? 'Processing...' : 'Attest to Blockchain'}
            </button>
            <p className="attest-helper-text">
              This will open MetaMask to confirm the transaction.
            </p>
          </div>

        </div>
      )}

      {file && !fileHash && isLoading && (
        <div className="attestation-details loading-hash">
          <p>Calculating file hash...</p>
        </div>
      )}

    </div>
  );
};

export default Attest;