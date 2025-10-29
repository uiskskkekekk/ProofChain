// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import '../styles/pages/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Immutable Proof of Existence for Your Digital Assets.</h1>
        <p>Leverage the power of blockchain to create and verify tamper-proof digital attestations.</p>
      </div>

      <div className="action-boxes">
        <div className="action-box">
          <span className="icon"><ion-icon name="shield-checkmark-outline"></ion-icon></span>
          <h2>Attest a File</h2>
          <p>Create a permanent, verifiable record of your file's existence and integrity on the blockchain.</p>
          <Link to="/attest" className="action-button primary">
            Start Attestation
          </Link>
        </div>

        <div className="action-box dark">
          <span className="icon verify"><ion-icon name="key-outline"></ion-icon></span>
          <h2>Verify a File</h2>
          <p>Check a file against its blockchain record to confirm its authenticity and that it hasn't been altered.</p>
          <Link to="/verify" className="action-button secondary">
            Start Verification
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;