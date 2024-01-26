import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Stick mode force rendering twice and cause break on Tabuleiro states
  <React.StrictMode>
     <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


