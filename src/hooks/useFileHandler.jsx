// src/hooks/useFileHandler.js
import { useRef, useState } from 'react';
import { hashFileSHA256 } from '../utils/fileHasher';

export const useFileHandler = (props) => {
  const maxSize = props?.maxSize || 25 * 1024 * 1024; // 25MB

  const [file, setFile] = useState(null);
  const [fileHash, setFileHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;

    // remove previous state
    setFile(null);
    setFileHash("");
    setError("");
    
    if (selectedFile.size > maxSize) {
      setError(`File is too large. Max file size is ${maxSize / 1024 / 1024}MB.`);
      return;
    }

    setFile(selectedFile);
    setIsLoading(true);

    try {
      const hash = await hashFileSHA256(selectedFile);
      setFileHash(hash);
    } catch (err) {
      console.error(err);
      setError("Failed to calculate file hash. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Drag ---
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  // --- Click ---
  const handleBrowseClick = () => { fileInputRef.current.click(); };
  const handleFileChange = (e) => { handleFileSelect(e.target.files[0]); };

  const clearFile = () => {
    setFile(null);
    setFileHash("");
    setError("");
  };

  return {
    file,
    fileHash,
    isLoading,
    error,
    isDragging,
    fileInputRef,
    
    // Handlers
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleBrowseClick,
    handleFileChange,
    clearFile
  };
};