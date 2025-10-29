// src/pages/Verify.jsx

import { useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiCopy, FiXCircle } from 'react-icons/fi';
import FileDropzone from '../components/FileDropzone.jsx';
import { useBlockchain } from '../context/BlockchainContext.jsx';
import { useFileHandler } from '../hooks/useFileHandler.jsx';
import '../styles/pages/Verify.css';

const Verify = () => {
  const {
    file,
    fileHash,
    isLoading: isHashLoading,
    error: fileError,
    ...fileHandlers
  } = useFileHandler();

  const { proofChainContract, readOnlyContract } = useBlockchain();
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [txError, setTxError] = useState("");

  const [result, setResult] = useState(null); // null | { success: true, ... } | { success: false, ... }

  // --- BlockChain Verify ---
  const handleVerify = async () => {
    const contract = readOnlyContract || proofChainContract;

    if (!contract) return setTxError("Blockchain network not connected.");
    if (!fileHash) return setTxError("Please select a file first.");

    setIsTxLoading(true);
    setTxError("");
    setResult(null);

    try {
      const formattedHash = '0x' + fileHash;
      const storedRecord = await contract.records(formattedHash);

      if (storedRecord.timestamp === 0n) { // 0n 是 BigInt 的 0
        setResult({
          success: false,
          status: 'notFound',
          message: "This file's hash does not exist on the blockchain."
        });
      } else {
        setResult({
          success: true,
          status: 'verified',
          timestamp: new Date(Number(storedRecord.timestamp) * 1000).toUTCString(),
          owner: storedRecord.owner
        });
      }
    } catch (err) {
      console.error(err);
      setTxError("Verification Failed: Could not connect to the network. Please try again.");
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
    <div className="verify-container">
      <div className="verify-header">
        <h1>Verify File Attestation</h1>
        <p>Drag and drop your file or click to browse. Your file is processed locally and never uploaded.</p>
      </div>

      {(
        <FileDropzone
          {...fileHandlers}
          isLoading={isLoading}
        />
      )}

      {/* --- Hash display and verify --- */}
      {fileHash && (
        <div className="verify-details">
          <div className="verify-hash-display">
            <label>SHA-256 Hash</label>
            <div className="verify-hash-input-wrapper">
              <input type="text" value={fileHash} readOnly />
              <button onClick={copyToClipboard} className="copy-button">
                <FiCopy />
              </button>
            </div>
          </div>
          <div className="verify-action">
            <button 
              className="verify-button-main"
              onClick={handleVerify}
              disabled={isLoading}
            >
              <ion-icon name="key-outline"></ion-icon>
              {isLoading ? 'Verifying...' : 'Verify on Blockchain'}
            </button>
          </div>
        </div>
      )}

      {/* --- 驗證結果顯示區 --- */}
      <div className="verify-results">
        {error && (
          <div className="result-box error">
            <FiAlertCircle />
            <p>{error}</p>
          </div>
        )}
        
        {result && result.success && (
          <div className="result-box success">
            <FiCheckCircle />
            <div className="result-content">
              <h4>File Verified Successfully</h4>
              <p>
                Attestation Date: {result.timestamp} <br />
                Attested by: {result.owner}
              </p>
            </div>
          </div>
        )}

        {result && !result.success && (
          <div className="result-box not-found">
            <FiXCircle />
            <div className="result-content">
              <h4>File Attestation Not Found</h4>
              <p>{result.message}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Verify;