import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './index.css';
import App from './App';
import AboutUs from './components/AboutUs/AboutUs';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/about" element={<AboutUs />} /> 
      </Routes>
    </Router>
  </React.StrictMode>,
  document.body
);
