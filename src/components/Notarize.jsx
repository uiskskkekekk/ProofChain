import React, { useState } from "react";
import { hashFileSHA256 } from "../utils/fileHasher";
import { useBlockchain } from "../context/BlockchainContext";
import "../App.css";

export default function Notarize() {
  const { setPdfHash, connectWallet, currentAccount } = useBlockchain();
  const [fileName, setFileName] = useState("");
  const [hashValue, setHashValue] = useState("");
  const [fileUrl, setFileUrl] = useState(""); // 用來存 PDF URL

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const hash = await hashFileSHA256(file);
    setHashValue(hash);
    setPdfHash(hash);

    // 生成 PDF 的 URL
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>PDF 存證（產生 SHA-256）</h1>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="file-input"
        />

        {fileName && <p className="file-name">📄 {fileName}</p>}

        {hashValue && (
          <div className="hash-box">
            <strong>SHA-256：</strong> {hashValue}
          </div>
        )}

        {!currentAccount ? (
          <button className="wallet-button" onClick={connectWallet}>
            連接錢包
          </button>
        ) : (
          <p className="file-name">🦊 已連線：{currentAccount}</p>
        )}

        {/* PDF 預覽 */}
        {fileUrl && (
          <iframe
            src={fileUrl}
            width="100%"
            height="500px"
            title="PDF Viewer"
          />
        )}
      </div>
    </div>
  );
}
