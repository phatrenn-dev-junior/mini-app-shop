import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './index.css';

// Initialize the Telegram Web App SDK as early as possible.
WebApp.ready();
WebApp.expand();
try {
  WebApp.setHeaderColor('secondary_bg_color');
} catch {
  /* not available on older clients */
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </HashRouter>
  </React.StrictMode>
);
