import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import Attest from './pages/Attest.jsx';
import AttestSuccess from './pages/AttestSuccess.jsx';
import Home from './pages/Home.jsx';
import Verify from './pages/Verify.jsx';
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <Header />  
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/attest" element={<Attest />} />
          <Route path="/success/:txHash" element={<AttestSuccess />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
