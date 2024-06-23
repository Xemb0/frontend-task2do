import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import About from './About';
import Login from './Login';
import Dashboard from './components/DashBoard';
import Message from './components/Massage';
import Tasks from './components/Task';
import Planning from './components/Planning';
import Global from './components/Global';
import Analytics from './components/Analytics';
import Finance from './components/Finance';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/message" element={<Message />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/global" element={<Global />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
