import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './NewGame/Game';
import Home from './Home/Home';
import Lobby from './Lobby/Lobby';

function App() {

  
  return (
    <Router basename={process.env.PUBLIC_URL}>
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Lobby />} />
          <Route path="/play" element={<Game />} />
        </Routes>
      </main> 
    </div>
    </Router>
  );
}

export default App;
