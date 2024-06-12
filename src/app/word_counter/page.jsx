'use client';

import React, { useState } from 'react';
import './wordCounter.css';

function WordCounter() {
  const [fileContent, setFileContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        setWordCount(content.split(/\s+/).filter(word => word).length);
        setError('');
      };
      reader.readAsText(file);
    } else {
      setError('Por favor, sube un archivo de texto (.txt)');
      setFileContent('');
      setWordCount(0);
    }
  };

  return (
    <div className="background-tasks">
      <div className="word-counter-container">
        <h1>Contador de Palabras en Archivo de Texto</h1>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="file-input"
        />
        {error && <div className="error-message">{error}</div>}
        {fileContent && (
          <div className="file-content">
            <pre>{fileContent}</pre>
            <div className="word-count">Cantidad de palabras: {wordCount}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WordCounter;
