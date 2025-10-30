// src/pages/AttestSuccess.jsx

import { FiCheckCircle, FiCopy, FiExternalLink } from 'react-icons/fi';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/pages/AttestSuccess.css'; // 引入新的 CSS

const AttestSuccess = () => {
  const { txHash } = useParams();
  
  const { state } = useLocation();
  
  const fileHash = state?.fileHash || 'N/A';
  const timestamp = state?.timestamp || Date.now();

  const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });
  
  const shortFileHash = fileHash;
  const etherscanLink = `https://sepolia.etherscan.io/tx/${txHash}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Transaction ID copied to clipboard!");
  };

  return (
    <div className="success-container">
      <div className="success-card">
        
        <FiCheckCircle className="success-icon" />

        <h1>File Attestation Confirmed</h1>
        <p className="success-subtitle">
          Your file's unique signature has been permanently recorded on the blockchain.
        </p>

        {/* --- Detail --- */}
        <div className="details-box">
          <h3>Transaction Details</h3>
          
          <div className="detail-item">
            <span>File Hash (SHA-256)</span>
            <strong>{shortFileHash}</strong>
          </div>
          
          <div className="detail-item">
            <span>Timestamp</span>
            <strong>{formattedTimestamp}</strong>
          </div>
          
          <div className="detail-item">
            <span>Transaction ID</span>
            <div className="tx-id-wrapper">
              <span>{txHash}</span>
              <button onClick={() => copyToClipboard(txHash)} className="copy-button" title="Copy Hash">
                <FiCopy />
              </button>
            </div>
          </div>
          
          <a href={etherscanLink} target="_blank" rel="noopener noreferrer" className="scan-link">
            View on Etherscan
            <FiExternalLink size={16} />
          </a>
        </div>

        <div className="button-group">
          <Link to="/attest" className="action-button primary">
            Attest Another File
          </Link>
          <Link to="/verify" className="action-button secondary">
            Verify a File
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default AttestSuccess;