import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
