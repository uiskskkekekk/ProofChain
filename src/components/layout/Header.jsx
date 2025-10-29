import { Link } from 'react-router-dom';
import { useBlockchain } from '../../context/BlockchainContext.jsx';
import '../../styles/components/layout/Header.css';

const Header = () => {
  const { currentAccount, connectWallet } = useBlockchain();

  return (
    <div className='header-bar'>
      <Link to="/" className="title">
        <img src="./ProofChain-logo.png" className="proofchain-logo" />
        <p>ProofChain</p>
      </Link>
      {/* <div className="title">
        <img src="./ProofChain-logo.png" className="proofchain-logo" />
        <p>ProofChain</p>
      </div> */}
      <div className='wallet-connector'>
        { currentAccount? (
          <p>Connected to {currentAccount.substring(0, 6)}...{currentAccount.substring(currentAccount.length - 4)}</p>
        ) : (
          <button className='connect-wallet' onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </div>
  );
};

export default Header;