import { Link } from 'react-router-dom';
import '../../styles/components/layout/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-bar">
      <div className="footer-copyright">
        <p>© {currentYear} ProofChain. All rights reserved.</p>
      </div>

      <div className="footer-links">
        <Link to="/documentation">Documentation</Link>
        <Link to="/support">Support</Link>
        <Link to="/terms">Terms of Service</Link>
      </div>
    </footer>
  );
};

export default Footer;