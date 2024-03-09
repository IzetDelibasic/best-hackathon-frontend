import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeachRoom from './components/TeachRoom/TeachRoom';
import AboutUs from './components/AboutUs/AboutUs';
import LoginRegister from './components/LoginRegister/LoginRegister';
import HomePage from './components/HomePage/HomePage';
import WorkProgram from './components/WorkProgram/WorkProgram';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<LoginRegister />} /> 
        <Route path="/teach-room" element={<TeachRoom />} />
        <Route path="/work-program" element={<WorkProgram />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
