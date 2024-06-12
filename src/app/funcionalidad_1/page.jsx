'use client';

import React, { useState } from 'react';
import './palindrome.css';

function PalindromeChecker() {
  const [word, setWord] = useState('');
  const [message, setMessage] = useState('');

  const checkPalindrome = () => {
    const cleanedWord = word.replace(/[\W_]/g, '').toLowerCase();
    const isPalindrome = cleanedWord === cleanedWord.split('').reverse().join('');
    setMessage(isPalindrome ? 'La palabra es un palíndromo' : 'La palabra NO es un palíndromo');
  };

  return (
    <div className="background-tasks">
      <div className="palindrome-container">
        <h1>Verificador de Palíndromos</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Ingrese una palabra"
          className="palindrome-input"
        />
        <button onClick={checkPalindrome} className="palindrome-button">
          Verificar
        </button>
        {message && (
          <div className={`message ${message.includes('no') ? 'error' : 'success'} show`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default PalindromeChecker;
