// src/pages/Verify.jsx
import { useState } from 'react';
import { FiAlertCircle, FiCopy } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  // --- BlockChain Verify ---
  const handleVerify = async () => {
    const contract = readOnlyContract || proofChainContract;

    if (!contract) return setTxError("Blockchain network not connected.");
    if (!fileHash) return setTxError("Please select a file first.");

    setIsTxLoading(true);
    setTxError("");

    try {
      const formattedHash = '0x' + fileHash;
      const storedRecord = await contract.records(formattedHash);

      let resultData;

      if (storedRecord.timestamp === 0n) { // 0n 是 BigInt 的 0
        resultData = {
          success: false,
          status: 'notFound',
          message: "This file's hash does not exist on the blockchain.",
          hash: fileHash
        };
      } else {
        resultData = {
          success: true,
          status: 'verified',
          timestamp: new Date(Number(storedRecord.timestamp) * 1000).toUTCString(),
          owner: storedRecord.owner,
          hash: fileHash
        };
      }

      navigate('/verify-result', { state: { result: resultData } });

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
              <span>{fileHash}</span>
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

      {/* --- error --- */}
      <div className="verify-results">
        {error && (
          <div className="result-box error">
            <span><FiAlertCircle /></span>
            <p>{error}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Verify;