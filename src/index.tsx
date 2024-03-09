// - React -
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// - Components -
import TeachRoom from './components/TeachRoom/TeachRoom';
import AboutUs from './components/AboutUs/AboutUs';
import LoginRegister from './components/LoginRegister/LoginRegister';
import HomePage from './components/HomePage/HomePage';
import WorkProgram from './components/WorkProgram/WorkProgram';
import GeneratorAI from './components/GeneratorAI/GeneratorAI';
import ParentsTests from './components/ParentsTests/ParentsTests';
import TeacherTests from './components/TeacherTests/TeacherTests';
import Childs from './components/Childs/Childs';
// - Style -
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
        <Route path="/teacher-tests" element={<GeneratorAI />} />
        <Route path="/tests-all" element={<TeacherTests />} />
        <Route path="/tests-parents" element={<ParentsTests />} />
        <Route path="/childs" element={<Childs />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
