// src/pages/VerifyResult.jsx
import { useEffect } from 'react';
import { FiCheckCircle, FiCopy, FiXCircle } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/pages/VerifyResult.css';

const VerifyResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  useEffect(() => {
    if (!result) {
      navigate('/verify');
    }
  }, [result, navigate]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Hash copied to clipboard!");
  };

  if (!result) {
    return null; 
  }

  return (
    <div className="result-container">
      {result.success ? (
        <div className="card card-success">
          <div className='card-title'>
            <div className="card-icon">
              <FiCheckCircle className='success'/>
            </div>
            <h2>Verification Successful</h2>
            <p>The file's digital fingerprint has been successfully found on the blockchain.</p>
          </div>
          <div className="details-group">
            <div className="detail-item">
              <span className="label">Attested Hash</span>
              <div className="value-container">
                <span id="attested-hash">{result.hash}</span>
                <button 
                  className="copy-button" 
                  title="Copy Hash"
                  onClick={() => copyToClipboard(result.hash)}
                >
                  <FiCopy />
                </button>
              </div>
            </div>
            <div className="detail-item">
              <span className="label">Original Attestation Timestamp</span>
              <strong className="value">{result.timestamp}</strong>
            </div>
            <div className="detail-item">
              <span className="label">Attested by</span>
              <strong className="value">{result.owner}</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="card card-failed">
          <div className='card-title'>
            <div className="card-icon">
              <FiXCircle className='deny'/>
            </div>
          </div>
          <h2>Verification Failed</h2>
          <p>{result.message || "No proof was found for this file on the blockchain."}</p>
          <div className='details-group'>
            <div className="detail-item">
              <span className="label">Attested Hash</span>
              <div className="value-container">
                <span id="attested-hash">{result.hash}</span>
                <button 
                  className="copy-button" 
                  title="Copy Hash"
                  onClick={() => copyToClipboard(result.hash)}
                >
                  <FiCopy />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="button-group">
        <Link to="/attest" className="action-button primary">
          Attest a File
        </Link>
        <Link to="/verify" className="action-button secondary">
          Verify Another File
        </Link>
      </div>
    </div>
  );
};

export default VerifyResult;