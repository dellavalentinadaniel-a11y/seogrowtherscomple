import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';
import { initScrollTracking, reportWebVitals } from '@/lib/analytics';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);

// Analytics: scroll depth tracking + Core Web Vitals
initScrollTracking();
reportWebVitals();