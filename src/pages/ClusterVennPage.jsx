import React, { useState, useRef } from 'react';
import Layout from '../layout/Layout';

const ClusterVennPage = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleDownloadSample = () => {
    // Sample file download logic would go here
    console.log("Downloading sample file...");
    // In a real implementation, you would fetch/serve a sample file
  };

  const handlePreview = () => {
    if (file) {
      // File preview logic would go here
      console.log("Previewing file:", file.name);
      // In a real implementation, you would parse and display the file
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">ClusterVenn</h1>
            <p className="text-gray-600 mb-2">
              OrthoVenn provides a tool named ClusterVenn for generating Venn diagrams from user-defined cluster files.
            </p>
            <p className="text-gray-600 mb-2">
              ClusterVenn calculates the number of species in the file and provides a convenient way for users to choose which species should be compared.
            </p>
            <p className="text-gray-600 font-medium">
              ClusterVenn can handle more than 6 species.
            </p>
          </div>

          <div 
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all
                      ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'} 
                      ${file ? 'border-green-500 bg-green-50' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClickUpload}
          >
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-lg font-medium text-gray-700">
                {file ? file.name : 'Drop file here or click to upload'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {file ? 'File successfully uploaded' : 'Supports .txt, .csv, .cluster files'}
              </p>
            </div>
          </div>

          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".txt,.csv,.cluster"
          />

          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center text-gray-600 mb-2 sm:mb-0">
              {!file && <span className="mr-1">No file, try to</span>}
              <button 
                onClick={handleDownloadSample}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline focus:outline-none"
              >
                Download sample file
              </button>
            </div>
            <button 
              onClick={handlePreview}
              disabled={!file}
              className={`font-medium ${file ? 'text-blue-600 hover:text-blue-800 hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
            >
              File Preview
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClusterVennPage;