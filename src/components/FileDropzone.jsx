// src/components/FileDropzone.jsx
import { FiUploadCloud } from 'react-icons/fi';
import '../styles/components/FileDropzone.css';

const FileDropzone = ({
  isDragging,
  isLoading,
  fileInputRef,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleBrowseClick,
  handleFileChange
}) => {
  return (
    <div
      className={`dropzone-wrapper ${isDragging ? 'drag-active' : ''} ${isLoading ? 'dropzone-disabled' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="dropzone-content">
        <span className="dropzone-icon"><FiUploadCloud /></span>
        <h3>Drag & drop your file here</h3>
        <p>Or click the button below to browse your files. Max file size: 25MB</p>
        <button onClick={handleBrowseClick} className="browse-files-btn" disabled={isLoading}>
          Browse Files
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default FileDropzone;